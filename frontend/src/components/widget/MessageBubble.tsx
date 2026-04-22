import type { Message } from "../../types/chat";

interface Props {
  message: Message;
  primaryColor: string;
  messageBackground: string;
}

export function MessageBubble({ message, primaryColor, messageBackground }: Props) {
  const isUser = message.role === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "8px",
      }}
    >
      <div
        style={{
          backgroundColor: isUser ? primaryColor : messageBackground,
          color: isUser ? "#fff" : "#1e293b",
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          padding: "10px 14px",
          maxWidth: "75%",
          fontSize: "14px",
          lineHeight: "1.5",
          boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
          wordBreak: "break-word",
        }}
      >
        {message.content}
      </div>
    </div>
  );
}
