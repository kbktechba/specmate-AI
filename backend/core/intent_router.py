import re

class IntentRouter:
    def __init__(self):
        # ORDER MATTERS: specific/longer patterns first, generic ones last
        self.rules = [
            # ServiceNow Incident lookup — specific ID
            (r"\b(inc\s*\d+|incident\s*\d+)\b", "incident_lookup"),

            # GreenPoint update lookup
            (r"\b(gp\s*\d+|greenpoint\s*\d+)\b", "greenpoint_lookup"),

            # SOP lookup
            (r"\b(sop\s*\d+)\b", "sop_lookup"),

            # Order lookup — specific ID (must check before order_help)
            (r"\b(order\s*\d+|ord\d+|ord\s*\d+)\b", "order_lookup"),

            # Policy topics — BEFORE help_request so "how to help with damaged frame" routes here
            (r"\b(refund|damaged\s+frame|frame\s+(is\s+)?damaged|broken\s+frame|replacement|return\s+period|warranty|privacy|data\s+privacy|contact\s+lens\s+return|cancel\s+appointment|appointment\s+cancel|return\s+policy|replace|damaged)\b", "policy_lookup"),

            # IT troubleshooting — before help_request
            (r"\b(printer|wink|a3|pos\s+system|system\s+down|system\s+offline|not\s+printing|receipt\s+printer|log\s*in\s+issue|can'?t\s+log|login\s+problem|barcode\s+scanner|network\s+drop|internet\s+down|tablet\s+battery|card\s+terminal|eftpos|lensometer|report\s+timeout|customer\s+display|device\s+support|pc\s+support|slow\s+system|screen\s+black|system\s+unresponsive)\b", "it_troubleshooting"),

            # Store operations — before help_request
            (r"\b(opening\s+checklist|closing\s+checklist|store\s+opening|start\s+of\s+day|end\s+of\s+day|count\s+float|till\s+float|alarm\s+code|appointment\s+no.?show|no.?show|missed\s+appointment)\b", "store_operations"),

            # Order help — general order questions
            (r"\b(check.*order|order.*status|track.*order|where.*order|order.*delayed|order.*late|order.*ready|pick.*up|pickup|order.*shipped|when.*order|related\s+to\s+orders)\b", "order_help"),

            # Greetings
            (r"\b(hi|hello|hey|good\s+morning|good\s+evening|howdy|greetings)\b", "greeting"),

            # Small talk
            (r"\b(how\s+are\s+you|how\s+is\s+your\s+day|how's\s+your\s+day|how\s+is\s+it\s+going|how's\s+it\s+going|what's\s+up)\b", "small_talk"),

            # Appreciation
            (r"\b(thank\s+you|thanks|appreciate\s+it|cheers|great\s+help)\b", "appreciation"),

            # Policy followup
            (r"\b(what\s+is\s+it\s+for|what\s+about\s+for|what\s+about|more\s+info|tell\s+me\s+more|and\s+for|what\s+if)\b", "policy_followup"),

            # Writing assistance
            (r"\b(rewrite|draft\s+email|draft\s+message|write\s+for\s+me|compose)\b", "writing_assistance"),

            # Unresolved / escalation — before help_request so "raise ticket" routes here
            (r"\b(still\s+not\s+fixed|didn'?t\s+work|not\s+working\s+still|raise\s+(a\s+)?ticket|create\s+(a\s+)?ticket|escalate|log\s+(a\s+)?ticket)\b", "unresolved_issue"),

            # Help request — generic LAST so specific intents above take priority
            (r"\b(need\s+help|i\s+have\s+an\s+issue|assist\s+me|help\s+me|stuck)\b", "help_request"),
        ]

    def route(self, text: str) -> str:
        text_lower = text.lower()
        for pattern, intent in self.rules:
            if re.search(pattern, text_lower):
                return intent
        return "unknown"
