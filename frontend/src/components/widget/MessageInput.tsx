import { type KeyboardEvent, useState } from "react";

interface Props {
  onSend: (text: string) => void;
  disabled: boolean;
  placeholder: string;
  primaryColor: string;
}

export function MessageInput({ onSend, disabled, placeholder, primaryColor }: Props) {
  const [value, setValue] = useState("");

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const sendDisabled = disabled || !value.trim();

  return (
    <div
      style={{
        padding: "12px 16px",
        borderTop: "1px solid #e2e8f0",
        display: "flex",
        gap: "8px",
        alignItems: "flex-end",
        backgroundColor: "#fff",
        flexShrink: 0,
      }}
    >
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        rows={1}
        style={{
          flex: 1,
          resize: "none",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "10px 14px",
          fontSize: "14px",
          outline: "none",
          fontFamily: "inherit",
          maxHeight: "120px",
          overflowY: "auto",
          lineHeight: "1.5",
          color: "#1e293b",
        }}
      />
      <button
        onClick={handleSend}
        disabled={sendDisabled}
        style={{
          backgroundColor: primaryColor,
          color: "#fff",
          border: "none",
          borderRadius: "12px",
          padding: "10px 18px",
          cursor: sendDisabled ? "not-allowed" : "pointer",
          opacity: sendDisabled ? 0.5 : 1,
          fontSize: "14px",
          fontWeight: 600,
          whiteSpace: "nowrap",
          transition: "opacity 0.15s",
          flexShrink: 0,
        }}
      >
        Enviar
      </button>
    </div>
  );
}
