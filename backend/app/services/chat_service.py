import random
from app.models.chat import ChatMessage, SendMessageResponse
from app.repositories.session_repository import session_repo

_MOCK_REPLIES = [
    "Entendido! Posso ajudar com isso.",
    "Claro, vou verificar isso para você.",
    "Obrigado pela sua mensagem. Estamos processando sua solicitação.",
    "Posso ajudar com mais alguma coisa?",
    "Aguarde um momento enquanto verifico as informações.",
    "Essa é uma ótima pergunta! Deixa eu ver o melhor caminho para te ajudar.",
]


def process_message(session_id: str, user_message: str) -> SendMessageResponse:
    session_repo.append(session_id, ChatMessage(role="user", content=user_message))

    reply_text = random.choice(_MOCK_REPLIES)
    assistant_msg = ChatMessage(role="assistant", content=reply_text)
    session_repo.append(session_id, assistant_msg)

    return SendMessageResponse(
        session_id=session_id,
        messages=[assistant_msg],
        provider="mock",
        model="mock-v1",
    )
