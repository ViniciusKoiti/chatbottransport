import { useEffect, useRef } from "react";
import type { Message } from "../../types/chat";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";

interface Props {
  messages: Message[];
  sending: boolean;
  primaryColor: string;
  messageBackground: string;
}

export function MessageList({
  messages,
  sending,
  primaryColor,
  messageBackground,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          message={msg}
          primaryColor={primaryColor}
          messageBackground={messageBackground}
        />
      ))}

      {sending && (
        <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "8px" }}>
          <div
            style={{
              backgroundColor: messageBackground,
              borderRadius: "18px 18px 18px 4px",
              padding: "10px 14px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
            }}
          >
            <TypingIndicator color={primaryColor} />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
