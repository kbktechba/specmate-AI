import re

class OrdersService:
    @staticmethod
    def get_order(order_id: str):
        normalized = re.sub(r"[^\d]", "", order_id)
        if normalized:
            normalized = f"ORD{normalized.zfill(3)}"
        
        db = {
            "ORD001": {"customer": "O.C.", "frame": "Ray-Ban", "lens_type": "Single Vision", "status": "Ordered", "expected_delivery": "2026-05-28"},
            "ORD002": {"customer": "N.B.", "frame": "Oakley", "lens_type": "Progressive", "status": "Shipped", "expected_delivery": "2026-05-25"},
            "ORD003": {"customer": "E.C.", "frame": "Gucci", "lens_type": "Single Vision", "status": "Ready for Pickup", "expected_delivery": "2026-05-23"},
            "ORD004": {"customer": "J.D.", "frame": "Specsavers", "lens_type": "Bifocal", "status": "In Production", "expected_delivery": "2026-05-29"},
            "ORD005": {"customer": "S.P.", "frame": "Prada", "lens_type": "Progressive", "status": "Delayed", "expected_delivery": "2026-05-20"},
            "ORD006": {"customer": "A.M.", "frame": "Tommy Hilfiger", "lens_type": "Single Vision", "status": "Completed", "expected_delivery": "2026-05-09"},
            "ORD007": {"customer": "R.L.", "frame": "Hugo Boss", "lens_type": "Single Vision", "status": "Ordered", "expected_delivery": "2026-05-30"},
            "ORD008": {"customer": "K.T.", "frame": "Kylie Minogue", "lens_type": "Progressive", "status": "Shipped", "expected_delivery": "2026-05-26"},
            "ORD009": {"customer": "M.S.", "frame": "Levi's", "lens_type": "Single Vision", "status": "In Production", "expected_delivery": "2026-05-28"},
            "ORD010": {"customer": "B.W.", "frame": "DKNY", "lens_type": "Progressive", "status": "Ready for Pickup", "expected_delivery": "2026-05-24"}
        }
        return db.get(normalized)

class PoliciesService:
    @staticmethod
    def get_policy(keyword: str):
        db = [
            {"id": "POL001", "title": "Refund Policy", "content": "Customers may receive a full refund within 30 days if unsatisfied. Process refund via POS with manager approval. Exceptions: Custom tinted lenses."},
            {"id": "POL002", "title": "Replacement Policy", "content": "One-time free replacement for prescription changes within 90 days. Re-order as 'Remake - Prescription Change'. Exceptions: Damage caused by customer."},
            {"id": "POL003", "title": "Return Period Policy", "content": "Standard return period is 30 days for glasses and accessories. Verify purchase date on receipt. Exceptions: Contact lenses (see POL006)."},
            {"id": "POL004", "title": "Warranty Policy", "content": "All frames carry a 1-year manufacturer warranty against defects. Send frame to lab for assessment. Exceptions: Accidental breakage."},
            {"id": "POL005", "title": "Customer Data Privacy Policy", "content": "All patient records must be kept secure and not shared without consent. Lock screens, verify identity before sharing info."},
            {"id": "POL006", "title": "Contact Lens Return Policy", "content": "Unopened boxes can be returned within 60 days. Check box seals before processing. Exceptions: Opened or marked boxes."},
            {"id": "POL007", "title": "Appointment Cancellation Policy", "content": "Customers should provide 24 hours notice for cancellations. Log cancellation reason in diary. Exceptions: Medical emergencies."},
            {"id": "POL008", "title": "Damaged Frame Return Policy", "content": "Frames broken within 30 days due to accidental damage can be replaced at 50% cost. Process as 'Accidental Damage Replacement'. Exceptions: Lost glasses."}
        ]
        
        # Simple search scoring
        best_match = None
        max_score = 0
        search_terms = keyword.lower().split()
        
        for policy in db:
            score = 0
            title_words = policy["title"].lower()
            for term in search_terms:
                if len(term) > 3 and term in title_words:
                    score += 1
            if score > max_score:
                max_score = score
                best_match = policy
                
        # Fallback if no specific match
        if best_match is None and any(w in keyword.lower() for w in ["refund", "return"]):
            best_match = db[0]
            
        return best_match

class KnowledgeBaseService:
    @staticmethod
    def get_article(topic: str):
        db = [
            {"id": "SOP001", "title": "Printer Troubleshooting SOP", "content": "Check power cable, Verify paper roll, Restart printer, Check POS connection. Escalate to L2 Hardware Support if unresolved."},
            {"id": "SOP002", "title": "A3 / WINK Login Issue Escalation Guide", "content": "Verify username, Use password reset tool, Check active directory status, Submit ticket. Escalate to Access Management Team."},
            {"id": "SOP003", "title": "Delayed Order Escalation Process", "content": "Check lab status, Contact lab liaison, Notify customer, Apply discount if policy met. Escalate to Regional Manager."},
            {"id": "SOP004", "title": "Customer Complaint Handling SOP", "content": "Listen to customer, Acknowledge issue, Offer immediate solution, Log in complaint register. Escalate to Store Manager."},
            {"id": "SOP005", "title": "Store Opening Checklist", "content": "Disarm alarm, Turn on lights/displays, Boot POS systems, Count float, Review appointments."},
            {"id": "SOP006", "title": "Appointment No-Show Handling SOP", "content": "Wait 10 minutes, Call customer, Mark as no-show in system, Offer rebooking, Free up slot."},
            {"id": "SOP007", "title": "Refund and Replacement Process", "content": "Verify eligibility, Process in POS, Collect items, Issue receipt. Escalate to Finance Team."},
            {"id": "SOP008", "title": "Integration PC / Device Support Guide", "content": "Check network cable, Restart PC, Verify shared drive access, Call Helpdesk. Escalate to L2 IT Support."}
        ]
        
        best_match = None
        max_score = 0
        search_terms = topic.lower().split()
        
        for article in db:
            score = 0
            title_words = article["title"].lower()
            for term in search_terms:
                if len(term) > 3 and term in title_words:
                    score += 1
            if score > max_score:
                max_score = score
                best_match = article
                
        return best_match

class ServiceNowService:
    INCIDENTS = {
        "INC001": {"title": "POS System Offline", "status": "Open", "priority": "P1", "group": "L1 IT Support Desk", "opened": "2026-05-23", "description": "Store POS terminal 3 is completely unresponsive.", "resolution": ""},
        "INC002": {"title": "Printer Not Printing Receipts", "status": "In Progress", "priority": "P2", "group": "L1 IT Support Desk", "opened": "2026-05-22", "description": "Receipt printer at till 1 is jammed and not responding to reset.", "resolution": ""},
        "INC003": {"title": "User Unable to Log In", "status": "Resolved", "priority": "P2", "group": "L1 IT Support Desk", "opened": "2026-05-21", "description": "Staff member locked out of WINK system.", "resolution": "Password reset performed by Access Management team."},
        "INC004": {"title": "Barcode Scanner Unresponsive", "status": "Open", "priority": "P3", "group": "Hardware Support", "opened": "2026-05-23", "description": "Wireless scanner in consulting room A is not pairing.", "resolution": ""},
        "INC005": {"title": "Network Drops", "status": "In Progress", "priority": "P1", "group": "Network Support", "opened": "2026-05-23", "description": "Intermittent connection drops across the entire store.", "resolution": ""},
        "INC006": {"title": "Tablet Battery Failing", "status": "Resolved", "priority": "P3", "group": "Hardware Support", "opened": "2026-05-18", "description": "Dispensing tablet dies immediately when unplugged.", "resolution": "Replacement tablet shipped to store."},
        "INC007": {"title": "Lensometer Calibration Error", "status": "Open", "priority": "P2", "group": "Equipment Support", "opened": "2026-05-22", "description": "Auto-lensometer throwing E-45 calibration error.", "resolution": ""},
        "INC008": {"title": "Card Terminal Sync Issue", "status": "Resolved", "priority": "P1", "group": "Payment Support", "opened": "2026-05-19", "description": "EFTPOS terminal not syncing with POS.", "resolution": "Terminal rebooted and IP reconfigured."},
        "INC009": {"title": "Report Generation Timeout", "status": "In Progress", "priority": "P3", "group": "Software Support", "opened": "2026-05-22", "description": "End of day sales report is timing out before completion.", "resolution": ""},
        "INC010": {"title": "Customer Display Blank", "status": "Open", "priority": "P3", "group": "Hardware Support", "opened": "2026-05-23", "description": "Customer-facing display screen at till 2 is black.", "resolution": ""}
    }

    @staticmethod
    def get_incident(text: str):
        import re
        match = re.search(r"inc\s*(\d+)", text.lower())
        if match:
            inc_id = f"INC{match.group(1).zfill(3)}"
            return inc_id, ServiceNowService.INCIDENTS.get(inc_id)
        return None, None

class SharePointService:
    pass

class GreenPointService:
    @staticmethod
    def get_update(topic: str):
        db = [
            {"id": "GP001", "title": "Summer Lens Upgrade Offer", "content": "Free polarization upgrade with any designer frame purchase. Update POS promotional materials."},
            {"id": "GP002", "title": "Student Eyewear Discount Campaign", "content": "20% off for valid student ID holders. Verify student IDs."},
            {"id": "GP003", "title": "Two-for-One Frame Promotion", "content": "Buy one get one free from the $149 range. Ensure adequate stock on floor."},
            {"id": "GP004", "title": "Contact Lens Subscription Reminder", "content": "Remind customers about the easy re-order service. Mention service at dispense."},
            {"id": "GP005", "title": "Polarized Sunglasses Seasonal Campaign", "content": "New marketing assets available for social media. Download from asset portal."},
            {"id": "GP006", "title": "Store Appointment Reminder Update", "content": "SMS reminders now go out 48 hours in advance. Inform customers of change."},
            {"id": "GP007", "title": "New Frame Collection Launch", "content": "New sustainable frame range arriving next week. Prepare display area."},
            {"id": "GP008", "title": "Customer Satisfaction Focus Week", "content": "Focus on greeting times and wait management. Review in morning huddles."},
            {"id": "GP009", "title": "Blue Light Lens Awareness Campaign", "content": "Promote blue light protection for office workers. Distribute leaflets."},
            {"id": "GP010", "title": "Operational Reminder: Appointment Confirmation", "content": "Ensure all manual bookings are confirmed verbally. Front desk to call unconfirmed slots."}
        ]
        best_match = None
        max_score = 0
        search_terms = topic.lower().split()
        for update in db:
            score = 0
            title_words = update["title"].lower()
            for term in search_terms:
                if len(term) > 3 and term in title_words:
                    score += 1
            if score > max_score:
                max_score = score
                best_match = update
        return best_match

class CompanyInfoService:
    pass
