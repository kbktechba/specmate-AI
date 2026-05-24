from core.intent_router import IntentRouter
from core.ai_composer import AIResponseComposer
from services.data_services import OrdersService, PoliciesService, KnowledgeBaseService, GreenPointService, ServiceNowService
from services.ticket_service import TicketService
import os

PORTAL_URL = os.getenv("PORTAL_URL", "http://localhost:3001")

class ActionEngine:
    def __init__(self):
        self.router = IntentRouter()
        self.ai = AIResponseComposer()

    def process_message(self, text: str, session: dict) -> dict:
        # Default response struct
        response = {
            "text": "",
            "sources": [],
            "ticket_draft": None,
            "session_updates": {}
        }

        intent = self.router.route(text)
        
        if intent == "unknown":
            # Intercept generic one-word queries to avoid returning random documents
            generic_terms = ["policy", "policies", "help", "question", "issue", "ticket", "order", "orders", "incident", "kb", "knowledge base"]
            if text.strip().lower() in generic_terms:
                topic = text.strip().lower()
                response["text"] = f"I see you're looking for information about {topic}. Could you please provide a few more details or a specific keyword so I can find the exact {topic} you need?"
                response["session_updates"]["last_intent"] = "general_qa"
                response["session_updates"]["last_topic"] = topic
                return response

            # Fallback search across all databases before giving up
            policy = PoliciesService.get_policy(text)
            kb = KnowledgeBaseService.get_article(text)
            gp = GreenPointService.get_update(text)
            
            # Select the best match based on which one actually found something
            found_docs = []
            if policy: found_docs.append(("policy", policy))
            if kb: found_docs.append(("kb", kb))
            if gp: found_docs.append(("gp", gp))
            
            if found_docs:
                doc_type, doc = found_docs[0]
                
                response["text"] = self.ai.generate_from_document(
                    user_question=text,
                    doc_title=doc["title"],
                    doc_content=doc["content"]
                )
                
                if doc_type == "policy":
                    response["sources"].append({"title": doc["title"], "link": f"{PORTAL_URL}/sharepoint/{doc['id']}"})
                elif doc_type == "kb":
                    response["sources"].append({"title": doc["title"], "link": f"{PORTAL_URL}/confluence/{doc['id']}"})
                elif doc_type == "gp":
                    response["sources"].append({"title": doc["title"], "link": f"{PORTAL_URL}/greenpoint/{doc['id']}"})
                return response
            
            if session.get("last_intent") in ["order_help", "it_troubleshooting", "store_operations"]:
                intent = "unresolved_issue"
            else:
                response["text"] = self.ai.generate_response(
                    prompt=text,
                    system_prompt="You are SpecMate AI, a helpful assistant. Tackle general questions with common sense. If it's a specific issue, mention that you can also look up company policies, check order status, or raise support tickets.",
                    session_context=session
                )
                response["session_updates"]["last_intent"] = "general_qa"
                return response

        # Intent handlers
        if intent == "greeting":
            response["text"] = "Hello! How can I assist you today?"
            response["session_updates"]["pending_clarification"] = False
        
        elif intent == "small_talk":
            response["text"] = "I'm doing well and ready to help. What can I help you with today?"
            response["session_updates"]["pending_clarification"] = False
            
        elif intent == "appreciation":
            response["text"] = "You're welcome. Let me know if you need anything else."
            response["session_updates"]["pending_clarification"] = False

        elif intent == "help_request":
            response["text"] = "Orders / IT / Policies / Store Operations?"
            response["session_updates"]["pending_clarification"] = True
            response["session_updates"]["last_intent"] = "help_request"

        elif intent == "order_help":
            response["text"] = "Sure — I can help with orders. Please provide an order ID, customer name, or describe the issue."
            response["session_updates"]["last_intent"] = "order_help"
            response["session_updates"]["last_topic"] = "orders"
            
        elif intent == "order_lookup":
            order_data = OrdersService.get_order(text)
            if order_data:
                order_id = text.upper()
                import re
                normalized = re.sub(r"[^\d]", "", order_id)
                if normalized:
                    order_id = f"ORD{normalized.zfill(3)}"
                
                md = f"**Order ID:**\n{order_id}\n\n"
                md += f"**Customer:**\n{order_data['customer']}\n\n"
                md += f"**Frame:**\n{order_data['frame']}\n\n"
                md += f"**Lens Type:**\n{order_data['lens_type']}\n\n"
                md += f"**Status:**\n{order_data['status']}\n\n"
                md += f"**Expected Delivery:**\n{order_data['expected_delivery']}\n\n"
                md += "Do you still need help? I will help you raise a ticket to Customer Support.\n\n"
                md += f"**Actions:**\n\n[Track Order]({PORTAL_URL}/orders/{order_id})  [Customer Service]({PORTAL_URL}/servicenow)  [Raise Ticket]({PORTAL_URL}/servicenow)"
                
                response["text"] = md
                response["sources"].append({
                    "title": f"Order Record {order_id}",
                    "link": f"{PORTAL_URL}/orders/{order_id}"
                })
                response["session_updates"]["last_order"] = order_id
            else:
                response["text"] = "I couldn't find an order matching that ID. Could you verify the number?"
            response["session_updates"]["last_intent"] = "order_lookup"
            response["session_updates"]["last_topic"] = "orders"

        elif intent == "policy_lookup":
            policy = PoliciesService.get_policy(text)
            if policy:
                 response["text"] = self.ai.generate_from_document(
                     user_question=text,
                     doc_title=policy["title"],
                     doc_content=policy["content"],
                     issue_type="operations"
                 )
                 response["sources"].append({
                     "title": policy["title"],
                     "link": f"{PORTAL_URL}/sharepoint/{policy['id']}"
                 })
                 response["session_updates"]["last_policy"] = policy["title"]
            else:
                 response["text"] = "I couldn't find a specific policy for that. Could you try rephrasing your question?"
            response["session_updates"]["last_intent"] = "policy_lookup"
            response["session_updates"]["last_topic"] = "policies"
            
        elif intent == "policy_followup":
            if session.get("last_policy") == "Returns and Warranty Policy" and "contact lens" in text.lower():
                response["text"] = "Contact lens returns follow the same Returns and Warranty policy unless specified otherwise."
                response["sources"].append({
                     "title": "Returns and Warranty Policy",
                     "link": f"{PORTAL_URL}/sharepoint/POL010"
                 })
            else:
                response["text"] = "Specific follow-up guidance wasn't found based on the previous context."
            response["session_updates"]["last_intent"] = "policy_followup"

        elif intent == "it_troubleshooting":
            # Try to find a relevant SOP first
            kb = KnowledgeBaseService.get_article(text)
            if kb:
                response["text"] = self.ai.generate_from_document(
                    user_question=text,
                    doc_title=kb["title"],
                    doc_content=kb["content"],
                    issue_type="it"
                )
                response["sources"].append({"title": kb["title"], "link": f"{PORTAL_URL}/confluence/{kb['id']}"})
            else:
                response["text"] = "Let me help you troubleshoot this. Please try restarting the system first and ensure all cables are securely connected. Do you still need help? I will help you raise a ticket to IT support."
            response["session_updates"]["last_intent"] = "it_troubleshooting"
            response["session_updates"]["last_issue_type"] = "it"
            response["session_updates"]["last_issue"] = text

        elif intent == "incident_lookup":
            inc_id, incident = ServiceNowService.get_incident(text)
            if incident:
                status_emoji = "✅" if incident["status"] == "Resolved" else ("🔴" if incident["priority"] == "P1" else "🟡")
                md = f"**Incident {inc_id}: {incident['title']}**\n\n"
                md += f"**Status:** {status_emoji} {incident['status']}\n\n"
                md += f"**Priority:** {incident['priority']}\n\n"
                md += f"**Assigned to:** {incident['group']}\n\n"
                md += f"**Opened:** {incident['opened']}\n\n"
                md += f"**Description:** {incident['description']}\n\n"
                if incident['resolution']:
                    md += f"**Resolution:** {incident['resolution']}\n\n"
                    md += f"**Actions:**\n\n[View in ServiceNow]({PORTAL_URL}/servicenow/{inc_id})  [Re-open Ticket]({PORTAL_URL}/servicenow)\n\n"
                else:
                    md += "This incident is currently being worked on. Do you still need help? I can raise a support ticket to IT support.\n\n"
                    md += f"**Actions:**\n\n[Track Incident]({PORTAL_URL}/servicenow/{inc_id})  [Customer Service]({PORTAL_URL}/servicenow)  [Escalate Ticket]({PORTAL_URL}/servicenow)\n\n"
                response["text"] = md
                response["sources"].append({"title": f"Incident {inc_id}", "link": f"{PORTAL_URL}/servicenow/{inc_id}"})
            else:
                response["text"] = f"I couldn't find an incident matching that number. Please check the ID and try again."
            response["session_updates"]["last_intent"] = "incident_lookup"

        elif intent == "greenpoint_lookup":
            import re as _re
            gp_match = _re.search(r"gp\s*(\d+)", text.lower())
            if gp_match:
                gp_id = f"GP{gp_match.group(1).zfill(3)}"
                update = GreenPointService.get_update(gp_id)
                if update:
                    response["text"] = self.ai.generate_from_document(text, update["title"], update["content"], issue_type="operations")
                    response["sources"].append({"title": update["title"], "link": f"{PORTAL_URL}/greenpoint/{gp_id}"})
                else:
                    response["text"] = f"I couldn't find a GreenPoint update for {gp_id}."
            response["session_updates"]["last_intent"] = "greenpoint_lookup"

        elif intent == "sop_lookup":
            import re as _re
            sop_match = _re.search(r"sop\s*(\d+)", text.lower())
            if sop_match:
                sop_id = f"SOP{sop_match.group(1).zfill(3)}"
                article = KnowledgeBaseService.get_article(sop_id)
                if article:
                    response["text"] = self.ai.generate_from_document(text, article["title"], article["content"], issue_type="operations")
                    response["sources"].append({"title": article["title"], "link": f"{PORTAL_URL}/confluence/{sop_id}"})
                else:
                    response["text"] = f"I couldn't find a procedure for {sop_id}."
            response["session_updates"]["last_intent"] = "sop_lookup"

        elif intent == "store_operations":
            kb = KnowledgeBaseService.get_article(text)
            if kb:
                response["text"] = self.ai.generate_from_document(text, kb["title"], kb["content"], issue_type="operations")
                response["sources"].append({"title": kb["title"], "link": f"{PORTAL_URL}/confluence/{kb['id']}"})
            else:
                response["text"] = "For store operations questions, please ensure you consult the daily checklist. What specific part of operations do you need help with?"
            response["session_updates"]["last_intent"] = "store_operations"
            response["session_updates"]["last_issue_type"] = "operations"
            response["session_updates"]["last_topic"] = "store_operations"

        elif intent == "writing_assistance":
            response["text"] = self.ai.generate_response(text, "You are a helpful assistant rewriting messages.")
            
        elif intent == "unresolved_issue":
            issue_type = session.get("last_issue_type", "it")
            draft = TicketService.draft_ticket(issue_type, {"description": text, "last_issue": session.get("last_issue")})
            response["text"] = "I understand. I've drafted a ticket for the support team so they can assist you further."
            response["ticket_draft"] = draft
            response["session_updates"]["last_intent"] = "unresolved_issue"

        return response
