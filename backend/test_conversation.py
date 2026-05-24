import uuid
import sys
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def run_tests():
    session_id = str(uuid.uuid4())
    
    tests = [
        ("hi", "Hello!"),
        ("how are you", "I'm doing well"),
        ("how is your day", "I'm doing well"),
        ("thank you", "You're welcome"),
        ("I need help", "Orders / IT"),
        ("Orders", "Sure — I can help with orders"),
        ("ORD001", "**Order ID:**"),
        ("printer issue", "restarting the system"),
        ("no", "ticket for the support team"),
        ("refund policy", "According to our policies"),
        ("and what is it for contact lens", "Contact lens returns follow the same")
    ]
    
    for i, (msg, expected) in enumerate(tests, 1):
        resp = client.post("/api/chat", json={"message": msg, "session_id": session_id})
        assert resp.status_code == 200
        data = resp.json()
        print(f"Test {i}: {msg}")
        if expected not in data["text"]:
            print(f"FAILED. Expected '{expected}' in '{data['text']}'")
            sys.exit(1)
        
        if i == 7:
            assert "**Customer:**" in data["text"]
            assert "Olivia Carter" in data["text"]
            assert "**Actions:**" in data["text"]
            
        if i == 9:
            draft = data["ticket_draft"]
            assert draft is not None
            assert draft["Issue Summary"] == "Printer not responding"
            assert draft["Symptoms"] == "printer issue"
            
    print("ALL TESTS PASSED!")

if __name__ == "__main__":
    run_tests()
