from sqlalchemy import Column, Integer, String, Boolean, JSON
from database import Base

class SessionState(Base):
    __tablename__ = "sessions"

    id = Column(String, primary_key=True, index=True) # session_id
    last_intent = Column(String, default="")
    pending_clarification = Column(Boolean, default=False)
    pending_options = Column(JSON, default=list)
    selected_area = Column(String, default="")
    last_issue_type = Column(String, default="")
    last_entity = Column(String, default="")
    last_topic = Column(String, default="")
    last_issue = Column(String, default="")
    last_policy = Column(String, default="")
    last_order = Column(String, default="")
