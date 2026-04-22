import type { SendMessageResponse, Session } from "../types/chat";
import { request } from "./api";

export function createSession(
  tenantId: string,
  botId: string,
  userId: string
): Promise<Session> {
  return request<Session>("/api/v1/chat/sessions", {
    method: "POST",
    body: JSON.stringify({ tenant_id: tenantId, bot_id: botId, user_id: userId }),
  });
}

export function sendMessage(
  tenantId: string,
  botId: string,
  sessionId: string,
  message: string,
  metadata: Record<string, string> = {}
): Promise<SendMessageResponse> {
  return request<SendMessageResponse>("/api/v1/chat/send", {
    method: "POST",
    body: JSON.stringify({
      tenant_id: tenantId,
      bot_id: botId,
      session_id: sessionId,
      message,
      metadata,
    }),
  });
}
