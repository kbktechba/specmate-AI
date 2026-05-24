export const orders = [
  {
    id: "ORD001",
    customer: "O.C.",
    store: "Store 101",
    frame: "Ray-Ban",
    lensType: "Single Vision",
    status: "Ordered",
    orderedDate: "2026-05-20",
    estimatedDelivery: "2026-05-28",
    notes: "Awaiting lab confirmation"
  },
  {
    id: "ORD002",
    customer: "N.B.",
    store: "Store 103",
    frame: "Oakley",
    lensType: "Progressive",
    status: "Shipped",
    orderedDate: "2026-05-18",
    estimatedDelivery: "2026-05-25",
    notes: "Shipped via standard delivery"
  },
  {
    id: "ORD003",
    customer: "E.C.",
    store: "Store 104",
    frame: "Gucci",
    lensType: "Single Vision",
    status: "Ready for Pickup",
    orderedDate: "2026-05-15",
    estimatedDelivery: "2026-05-23",
    notes: "Customer notified via SMS"
  },
  {
    id: "ORD004",
    customer: "J.D.",
    store: "Store 101",
    frame: "Specsavers",
    lensType: "Bifocal",
    status: "In Production",
    orderedDate: "2026-05-21",
    estimatedDelivery: "2026-05-29",
    notes: "Lab processing started"
  },
  {
    id: "ORD005",
    customer: "S.P.",
    store: "Store 105",
    frame: "Prada",
    lensType: "Progressive",
    status: "Delayed",
    orderedDate: "2026-05-10",
    estimatedDelivery: "2026-05-20",
    notes: "Frame out of stock at primary supplier"
  },
  {
    id: "ORD006",
    customer: "A.M.",
    store: "Store 102",
    frame: "Tommy Hilfiger",
    lensType: "Single Vision",
    status: "Completed",
    orderedDate: "2026-05-01",
    estimatedDelivery: "2026-05-09",
    notes: "Picked up by customer"
  },
  {
    id: "ORD007",
    customer: "R.L.",
    store: "Store 108",
    frame: "Hugo Boss",
    lensType: "Single Vision",
    status: "Ordered",
    orderedDate: "2026-05-22",
    estimatedDelivery: "2026-05-30",
    notes: "Standard processing"
  },
  {
    id: "ORD008",
    customer: "K.T.",
    store: "Store 101",
    frame: "Kylie Minogue",
    lensType: "Progressive",
    status: "Shipped",
    orderedDate: "2026-05-19",
    estimatedDelivery: "2026-05-26",
    notes: "In transit"
  },
  {
    id: "ORD009",
    customer: "M.S.",
    store: "Store 104",
    frame: "Levi's",
    lensType: "Single Vision",
    status: "In Production",
    orderedDate: "2026-05-20",
    estimatedDelivery: "2026-05-28",
    notes: "Lens cutting in progress"
  },
  {
    id: "ORD010",
    customer: "B.W.",
    store: "Store 109",
    frame: "DKNY",
    lensType: "Progressive",
    status: "Ready for Pickup",
    orderedDate: "2026-05-16",
    estimatedDelivery: "2026-05-24",
    notes: "Ready at counter"
  }
];

export const servicenow = [
  { id: "INC001", title: "POS System Offline", status: "Open", priority: "P1", group: "L1 IT Support Desk", opened: "2026-05-23", updated: "2026-05-23", description: "Store POS terminal 3 is completely unresponsive.", resolution: "" },
  { id: "INC002", title: "Printer Not Printing Receipts", status: "In Progress", priority: "P2", group: "L1 IT Support Desk", opened: "2026-05-22", updated: "2026-05-23", description: "Receipt printer at till 1 is jammed and not responding to reset.", resolution: "" },
  { id: "INC003", title: "User Unable to Log In", status: "Resolved", priority: "P2", group: "L1 IT Support Desk", opened: "2026-05-21", updated: "2026-05-22", description: "Staff member locked out of WINK system.", resolution: "Password reset performed." },
  { id: "INC004", title: "Barcode Scanner Unresponsive", status: "Open", priority: "P3", group: "Hardware Support", opened: "2026-05-23", updated: "2026-05-23", description: "Wireless scanner in consulting room A is not pairing.", resolution: "" },
  { id: "INC005", title: "Network Drops", status: "In Progress", priority: "P1", group: "Network Support", opened: "2026-05-23", updated: "2026-05-23", description: "Intermittent connection drops across the entire store.", resolution: "" },
  { id: "INC006", title: "Tablet Battery Failing", status: "Resolved", priority: "P3", group: "Hardware Support", opened: "2026-05-18", updated: "2026-05-20", description: "Dispensing tablet dies immediately when unplugged.", resolution: "Replacement tablet shipped." },
  { id: "INC007", title: "Lensometer Calibration Error", status: "Open", priority: "P2", group: "Equipment Support", opened: "2026-05-22", updated: "2026-05-23", description: "Auto-lensometer throwing E-45 calibration error.", resolution: "" },
  { id: "INC008", title: "Card Terminal Sync Issue", status: "Resolved", priority: "P1", group: "Payment Support", opened: "2026-05-19", updated: "2026-05-19", description: "EFTPOS terminal not syncing with POS.", resolution: "Terminal rebooted and IP reconfigured." },
  { id: "INC009", title: "Report Generation Timeout", status: "In Progress", priority: "P3", group: "Software Support", opened: "2026-05-22", updated: "2026-05-23", description: "End of day sales report is timing out before completion.", resolution: "" },
  { id: "INC010", title: "Customer Display Blank", status: "Open", priority: "P3", group: "Hardware Support", opened: "2026-05-23", updated: "2026-05-23", description: "Customer-facing display screen at till 2 is black.", resolution: "" }
];

export const confluence = [
  { id: "SOP001", title: "Printer Troubleshooting SOP", owner: "IT Support", updated: "2026-05-01", purpose: "Standard steps for resolving receipt printer issues.", scope: "All retail stores", steps: ["Check power cable", "Verify paper roll", "Restart printer", "Check POS connection", "Escalate if unresolved"], escalation: "L2 Hardware Support" },
  { id: "SOP002", title: "A3 / WINK Login Issue Escalation Guide", owner: "Systems Team", updated: "2026-04-15", purpose: "Guide for managing failed logins.", scope: "Store staff", steps: ["Verify username", "Use password reset tool", "Check active directory status", "Submit ticket"], escalation: "Access Management Team" },
  { id: "SOP003", title: "Delayed Order Escalation Process", owner: "Supply Chain", updated: "2026-03-20", purpose: "Process for orders exceeding estimated delivery.", scope: "Dispensing staff", steps: ["Check lab status", "Contact lab liaison", "Notify customer", "Apply discount if policy met"], escalation: "Regional Manager" },
  { id: "SOP004", title: "Customer Complaint Handling SOP", owner: "Customer Service", updated: "2026-05-10", purpose: "Standard complaint resolution path.", scope: "All staff", steps: ["Listen to customer", "Acknowledge issue", "Offer immediate solution", "Log in complaint register"], escalation: "Store Manager" },
  { id: "SOP005", title: "Store Opening Checklist", owner: "Operations", updated: "2026-01-05", purpose: "Daily opening routine.", scope: "Duty Managers", steps: ["Disarm alarm", "Turn on lights/displays", "Boot POS systems", "Count float", "Review appointments"], escalation: "N/A" },
  { id: "SOP006", title: "Appointment No-Show Handling SOP", owner: "Operations", updated: "2026-02-28", purpose: "Procedure for missed appointments.", scope: "Front desk staff", steps: ["Wait 10 minutes", "Call customer", "Mark as no-show in system", "Offer rebooking", "Free up slot"], escalation: "N/A" },
  { id: "SOP007", title: "Refund and Replacement Process", owner: "Finance & Retail", updated: "2026-04-01", purpose: "How to process returns.", scope: "Managers", steps: ["Verify eligibility", "Process in POS", "Collect items", "Issue receipt"], escalation: "Finance Team" },
  { id: "SOP008", title: "Integration PC / Device Support Guide", owner: "IT Support", updated: "2026-05-20", purpose: "Support for diagnostic machines connected to network.", scope: "Optometrists", steps: ["Check network cable", "Restart PC", "Verify shared drive access", "Call Helpdesk"], escalation: "L2 IT Support" }
];

export const sharepoint = [
  { id: "POL001", title: "Refund Policy", owner: "Retail Operations", effective: "2026-01-01", review: "2027-01-01", summary: "Customers may receive a full refund within 30 days if unsatisfied.", action: "Process refund via POS with manager approval.", exceptions: "Custom tinted lenses.", sop: "SOP007" },
  { id: "POL002", title: "Replacement Policy", owner: "Customer Service", effective: "2026-01-01", review: "2027-01-01", summary: "One-time free replacement for prescription changes within 90 days.", action: "Re-order as 'Remake - Prescription Change'.", exceptions: "Damage caused by customer.", sop: "SOP007" },
  { id: "POL003", title: "Return Period Policy", owner: "Retail Operations", effective: "2026-01-01", review: "2027-01-01", summary: "Standard return period is 30 days for glasses and accessories.", action: "Verify purchase date on receipt.", exceptions: "Contact lenses (see POL006).", sop: "SOP007" },
  { id: "POL004", title: "Warranty Policy", owner: "Product Team", effective: "2025-06-01", review: "2026-06-01", summary: "All frames carry a 1-year manufacturer warranty against defects.", action: "Send frame to lab for assessment.", exceptions: "Accidental breakage.", sop: "SOP004" },
  { id: "POL005", title: "Customer Data Privacy Policy", owner: "Legal & Compliance", effective: "2025-10-01", review: "2026-10-01", summary: "All patient records must be kept secure and not shared without consent.", action: "Lock screens, verify identity before sharing info.", exceptions: "Law enforcement request (escalate).", sop: "N/A" },
  { id: "POL006", title: "Contact Lens Return Policy", owner: "Retail Operations", effective: "2026-02-01", review: "2027-02-01", summary: "Unopened boxes can be returned within 60 days.", action: "Check box seals before processing.", exceptions: "Opened or marked boxes.", sop: "SOP007" },
  { id: "POL007", title: "Appointment Cancellation Policy", owner: "Operations", effective: "2026-01-01", review: "2027-01-01", summary: "Customers should provide 24 hours notice for cancellations.", action: "Log cancellation reason in diary.", exceptions: "Medical emergencies.", sop: "SOP006" },
  { id: "POL008", title: "Damaged Frame Return Policy", owner: "Product Team", effective: "2026-03-01", review: "2027-03-01", summary: "Frames broken within 30 days due to accidental damage can be replaced at 50% cost.", action: "Process as 'Accidental Damage Replacement'.", exceptions: "Lost glasses.", sop: "SOP007" }
];

export const greenpoint = [
  { id: "GP001", title: "Summer Lens Upgrade Offer", category: "Promotion", publish: "2026-05-20", region: "National", body: "Free polarization upgrade with any designer frame purchase.", action: "Update POS promotional materials.", expiry: "2026-08-31" },
  { id: "GP002", title: "Student Eyewear Discount Campaign", category: "Promotion", publish: "2026-05-15", region: "National", body: "20% off for valid student ID holders.", action: "Verify student IDs.", expiry: "2026-10-31" },
  { id: "GP003", title: "Two-for-One Frame Promotion", category: "Promotion", publish: "2026-05-10", region: "Regional", body: "Buy one get one free from the $149 range.", action: "Ensure adequate stock on floor.", expiry: "2026-06-30" },
  { id: "GP004", title: "Contact Lens Subscription Reminder", category: "Operations", publish: "2026-05-18", region: "National", body: "Remind customers about the easy re-order service.", action: "Mention service at dispense.", expiry: "" },
  { id: "GP005", title: "Polarized Sunglasses Seasonal Campaign", category: "Marketing", publish: "2026-05-22", region: "National", body: "New marketing assets available for social media.", action: "Download from asset portal.", expiry: "2026-08-31" },
  { id: "GP006", title: "Store Appointment Reminder Update", category: "Systems", publish: "2026-05-12", region: "National", body: "SMS reminders now go out 48 hours in advance.", action: "Inform customers of change.", expiry: "" },
  { id: "GP007", title: "New Frame Collection Launch", category: "Product", publish: "2026-05-01", region: "National", body: "New sustainable frame range arriving next week.", action: "Prepare display area.", expiry: "" },
  { id: "GP008", title: "Customer Satisfaction Focus Week", category: "Operations", publish: "2026-05-19", region: "National", body: "Focus on greeting times and wait management.", action: "Review in morning huddles.", expiry: "2026-05-31" },
  { id: "GP009", title: "Blue Light Lens Awareness Campaign", category: "Marketing", publish: "2026-05-05", region: "National", body: "Promote blue light protection for office workers.", action: "Distribute leaflets.", expiry: "2026-07-31" },
  { id: "GP010", title: "Operational Reminder: Appointment Confirmation", category: "Operations", publish: "2026-05-23", region: "National", body: "Ensure all manual bookings are confirmed verbally.", action: "Front desk to call unconfirmed slots.", expiry: "" }
];
