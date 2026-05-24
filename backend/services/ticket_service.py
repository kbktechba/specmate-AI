class TicketService:
    @staticmethod
    def draft_ticket(issue_type: str, session_data: dict) -> dict:
        category = "Unknown"
        team = "Unknown"
        link = ""
        
        if issue_type == "it":
            category = "IT Issue"
            team = "L1 IT Support Desk"
            link = "https://servicenow.specmate-demo.com"
        elif issue_type == "order":
            category = "Order / fulfilment issues"
            team = "Customer Service - BCDC"
            link = "https://customerservice.specmate-demo.com"
        elif issue_type == "operations":
            category = "Store operational issues"
            team = "L1 Retail Operations"
            link = "https://retailops.specmate-demo.com"

        description = session_data.get("description", "User reported an issue that requires further assistance.")
        
        symptoms = description if description and description.lower() not in ["no", "still not fixed", "didn't work", "not working still"] else "TBD"
        
        if session_data.get("last_issue"):
            symptoms = session_data.get("last_issue")
            
        summary = f"Assistance needed with {category}"
        if symptoms != "TBD":
            summary = symptoms[0].upper() + symptoms[1:] if symptoms else summary
            if "printer" in summary.lower() and "responding" not in summary.lower():
                summary = "Printer not responding"
        
        troubleshooting = "TBD"
        if issue_type == "it" and symptoms != "TBD":
            troubleshooting = "- Restarted system\n- Checked connections"

        draft = {
            "Issue Summary": summary,
            "Category": category,
            "Description": description,
            "Symptoms": symptoms,
            "Troubleshooting Tried": troubleshooting,
            "Store": "Store 123", # Mock store
            "Recommended Priority": "Medium",
            "Recommended Team": team,
            "Suggested Channel": "Web Portal",
            "Ticket Link": link
        }
        
        return draft
