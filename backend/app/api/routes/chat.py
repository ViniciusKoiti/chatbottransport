from fastapi import APIRouter, HTTPException
from app.models.chat import (
    CreateSessionRequest,
    SendMessageRequest,
    SendMessageResponse,
    SessionResponse,
)
from app.repositories.session_repository import session_repo
from app.services.chat_service import process_message

router = APIRouter()


@router.post("/chat/sessions", response_model=SessionResponse)
def create_session(body: CreateSessionRequest) -> SessionResponse:
    session_id = session_repo.create(body.tenant_id, body.bot_id)
    return SessionResponse(
        session_id=session_id,
        tenant_id=body.tenant_id,
        bot_id=body.bot_id,
    )


@router.post("/chat/send", response_model=SendMessageResponse)
def send_message(body: SendMessageRequest) -> SendMessageResponse:
    if not session_repo.exists(body.session_id):
        raise HTTPException(status_code=404, detail="Session not found")
    return process_message(body.session_id, body.message)
