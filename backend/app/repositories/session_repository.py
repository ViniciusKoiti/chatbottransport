import uuid
from app.models.chat import ChatMessage


class InMemorySessionRepository:
    def __init__(self) -> None:
        self._sessions: dict[str, list[ChatMessage]] = {}

    def create(self, tenant_id: str, bot_id: str) -> str:
        session_id = f"sess_{uuid.uuid4().hex[:12]}"
        self._sessions[session_id] = []
        return session_id

    def exists(self, session_id: str) -> bool:
        return session_id in self._sessions

    def get_messages(self, session_id: str) -> list[ChatMessage]:
        return self._sessions.get(session_id, [])

    def append(self, session_id: str, message: ChatMessage) -> None:
        self._sessions.setdefault(session_id, []).append(message)


session_repo = InMemorySessionRepository()
