export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface Session {
  session_id: string;
  tenant_id: string;
  bot_id: string;
}

export interface SendMessageResponse {
  session_id: string;
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  provider: string;
  model: string;
}
