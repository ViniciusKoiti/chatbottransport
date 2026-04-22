import { useCallback, useEffect, useRef, useState } from "react";
import { sendMessage } from "../services/chat.service";
import type { Message } from "../types/chat";

function makeMessage(role: "user" | "assistant", content: string): Message {
  return { id: crypto.randomUUID(), role, content, timestamp: new Date() };
}

interface UseChatResult {
  messages: Message[];
  sending: boolean;
  error: string | null;
  send: (text: string) => Promise<void>;
}

export function useChat(
  tenantId: string,
  botId: string,
  sessionId: string | null,
  initialMessages?: string[]
): UseChatResult {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initializedRef = useRef(false);

  // Popula as mensagens iniciais uma única vez quando a config chegar
  useEffect(() => {
    if (!initializedRef.current && initialMessages && initialMessages.length > 0) {
      setMessages(initialMessages.map((c) => makeMessage("assistant", c)));
      initializedRef.current = true;
    }
  }, [initialMessages]);

  const send = useCallback(
    async (text: string) => {
      if (!sessionId || !text.trim() || sending) return;

      setMessages((prev) => [...prev, makeMessage("user", text)]);
      setSending(true);
      setError(null);

      try {
        const res = await sendMessage(tenantId, botId, sessionId, text);
        const replies = res.messages
          .filter((m) => m.role === "assistant")
          .map((m) => makeMessage("assistant", m.content));
        setMessages((prev) => [...prev, ...replies]);
      } catch {
        setError("Erro ao enviar mensagem. Tente novamente.");
      } finally {
        setSending(false);
      }
    },
    [sessionId, tenantId, botId, sending]
  );

  return { messages, sending, error, send };
}
