from typing import Literal
from pydantic import BaseModel


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class CreateSessionRequest(BaseModel):
    tenant_id: str
    bot_id: str
    user_id: str


class SessionResponse(BaseModel):
    session_id: str
    tenant_id: str
    bot_id: str


class SendMessageRequest(BaseModel):
    tenant_id: str
    bot_id: str
    session_id: str
    message: str
    metadata: dict = {}


class SendMessageResponse(BaseModel):
    session_id: str
    messages: list[ChatMessage]
    provider: str
    model: str
