import { useEffect, useState } from "react";
import { createSession } from "../services/chat.service";

const sessionKey = (tenantId: string, botId: string) =>
  `chat_session__${tenantId}__${botId}`;

interface UseChatSessionResult {
  sessionId: string | null;
  loading: boolean;
  error: string | null;
}

export function useChatSession(
  tenantId: string,
  botId: string
): UseChatSessionResult {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tenantId || !botId) {
      setLoading(false);
      return;
    }

    const key = sessionKey(tenantId, botId);
    const stored = sessionStorage.getItem(key);

    if (stored) {
      setSessionId(stored);
      setLoading(false);
      return;
    }

    // Gera um userId anônimo local; substituir por auth real quando necessário
    const userId = `anon_${Math.random().toString(36).slice(2, 9)}`;

    createSession(tenantId, botId, userId)
      .then((session) => {
        sessionStorage.setItem(key, session.session_id);
        setSessionId(session.session_id);
      })
      .catch(() => setError("Não foi possível iniciar a sessão de chat."))
      .finally(() => setLoading(false));
  }, [tenantId, botId]);

  return { sessionId, loading, error };
}
