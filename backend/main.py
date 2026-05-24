import uuid
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv

from database import engine, Base, get_db
from core.conversation_manager import ConversationManager
from core.action_engine import ActionEngine

load_dotenv()

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="SpecMate AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine_instance = ActionEngine()

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    session_id: str
    text: str
    sources: Optional[list] = []
    ticket_draft: Optional[dict] = None

@app.post("/api/chat", response_model=ChatResponse)
@app.post("/chat", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest, db: Session = Depends(get_db)):
    session_id = request.session_id or str(uuid.uuid4())
    
    manager = ConversationManager(db)
    session = manager.get_session(session_id)
    
    session_data = {
        "last_intent": session.last_intent,
        "pending_clarification": session.pending_clarification,
        "pending_options": session.pending_options,
        "selected_area": session.selected_area,
        "last_issue_type": session.last_issue_type,
        "last_entity": session.last_entity,
        "last_topic": session.last_topic,
        "last_issue": session.last_issue,
        "last_policy": session.last_policy,
        "last_order": session.last_order
    }
    
    result = engine_instance.process_message(request.message, session_data)
    
    if result.get("session_updates"):
        manager.update_session(session_id, result["session_updates"])
        
    return {
        "session_id": session_id,
        "text": result["text"],
        "sources": result.get("sources", []),
        "ticket_draft": result.get("ticket_draft")
    }

@app.get("/health")
def health_check():
    return {"status": "ok"}
