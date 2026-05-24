from sqlalchemy.orm import Session
import json
from models import SessionState

class ConversationManager:
    def __init__(self, db: Session):
        self.db = db

    def get_session(self, session_id: str) -> SessionState:
        session = self.db.query(SessionState).filter(SessionState.id == session_id).first()
        if not session:
            session = SessionState(
                id=session_id,
                last_intent="",
                pending_clarification=False,
                pending_options=[],
                selected_area="",
                last_issue_type="",
                last_entity=""
            )
            self.db.add(session)
            self.db.commit()
            self.db.refresh(session)
        return session

    def update_session(self, session_id: str, updates: dict) -> SessionState:
        session = self.get_session(session_id)
        for key, value in updates.items():
            if hasattr(session, key):
                setattr(session, key, value)
        self.db.commit()
        self.db.refresh(session)
        return session

    def clear_session(self, session_id: str):
        self.update_session(session_id, {
            "last_intent": "",
            "pending_clarification": False,
            "pending_options": [],
            "selected_area": "",
            "last_issue_type": "",
            "last_entity": ""
        })
