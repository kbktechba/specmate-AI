import os
import re

class AIResponseComposer:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY")
        if self.api_key:
            try:
                from openai import OpenAI
                self.client = OpenAI(api_key=self.api_key)
            except Exception:
                self.client = None
        else:
            self.client = None

    def generate_response(self, prompt: str, system_prompt: str = "", session_context: dict = None) -> str:
        if self.client:
            try:
                context_str = f" Context: {session_context}" if session_context else ""
                response = self.client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system", "content": system_prompt + context_str},
                        {"role": "user", "content": prompt}
                    ],
                    temperature=0.7
                )
                return response.choices[0].message.content
            except Exception:
                pass

        return self._smart_fallback(prompt, session_context)

    def generate_from_document(self, user_question: str, doc_title: str, doc_content: str, issue_type: str = "operations") -> str:
        """Generate a natural language answer directly from document content."""
        if self.client:
            prompt = f"User asked: '{user_question}'. Answer using only this document:\n\nTitle: {doc_title}\nContent: {doc_content}"
            try:
                response = self.client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system", "content": "You are a friendly retail assistant. Answer the user's question directly and helpfully using only the document provided. Keep it concise and friendly."},
                        {"role": "user", "content": prompt}
                    ],
                    temperature=0.7
                )
                return response.choices[0].message.content
            except Exception:
                pass

        # Always use the document content directly — never the generic fallback
        return self._format_doc_answer(user_question, doc_title, doc_content, issue_type)

    def _format_doc_answer(self, question: str, title: str, content: str, issue_type: str) -> str:
        """Format a clear, friendly answer directly from the document content."""
        if issue_type == "it":
            dept = "IT support"
        elif issue_type == "order":
            dept = "Customer Support"
        else:
            dept = "Retail Operations"
            
        return (
            f"Based on our **{title}**:\n\n"
            f"{content}\n\n"
            f"Do you still need help with this? I can help you raise a ticket to {dept}. 😊"
        )

    def _smart_fallback(self, prompt: str, session_context: dict = None) -> str:
        prompt_lower = prompt.lower()
        if "rewrite" in prompt_lower or "draft" in prompt_lower:
            return "Here is a revised version of your message: Please ensure you follow the standard procedures outlined in our manual. Let me know if you need any further assistance."
        if "summarize" in prompt_lower:
            return "In summary: Always check the system first, verify customer details, and escalate if unresolved."
        
        # General common-sense fallback answers for basic chat
        if any(greet in prompt_lower for greet in ["hello", "hi", "hey"]):
            return "Hello there! How can I help you today? I can assist with store operations, order lookups, IT issues, or company policies."
        if "how are you" in prompt_lower:
            return "I'm functioning perfectly, thank you! Ready to help you tackle your daily tasks. What's on the agenda today?"
        if "weather" in prompt_lower or "rain" in prompt_lower:
            return "The weather often impacts our store foot traffic! Heavy rain usually leads to a slight increase in no-shows or late arrivals, so it's a good idea to keep the walk-in waitlist ready."
            
        # Professional Probing for Ambiguous Input / IDs
        if len(prompt.split()) <= 3 and any(char.isdigit() for char in prompt) and prompt.isupper():
            return f"I see you are referring to '{prompt}'. Could you please clarify which system this belongs to? Are you referring to an order, an incident ticket, or policy information?"

        if session_context:
            last_topic = session_context.get("last_topic")
            if last_topic == "orders":
                return f"Since we were just discussing orders, does your question about '{prompt}' relate to a specific order? If you provide the full ID, I can look it up."
            if last_topic == "policies":
                return f"Are you still asking about company policies regarding '{prompt}'? I can search the Knowledge Base if you'd like more specifics."

        return f"I want to ensure I provide the right information about '{prompt}'. Could you clarify if you are referring to orders, tickets, or any specific policy information?"

    def compose_ticket_text(self, ticket_data: dict) -> str:
        prompt = f"Create a professional ticket description based on this data: {ticket_data}"
        system = "You are a helpful IT support assistant drafting tickets."
        if self.client:
            try:
                response = self.client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[{"role": "system", "content": system}, {"role": "user", "content": prompt}],
                    temperature=0.7
                )
                return response.choices[0].message.content
            except Exception:
                pass
        return f"Issue logged for {ticket_data.get('Category', 'Unknown')}. Details: {ticket_data.get('Description', 'N/A')}."
