import { useState } from "react";

interface Props {
  tenantId: string;
  botId: string;
}

export function SharePanel({ tenantId, botId }: Props) {
  const embedUrl = `${window.location.origin}/widget/embed?tenantId=${encodeURIComponent(tenantId)}&botId=${encodeURIComponent(botId)}`;
  const iframeCode = `<iframe\n  src="${embedUrl}"\n  width="380"\n  height="600"\n  style="border:none;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.12)"\n  allow="microphone"\n></iframe>`;

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedIframe, setCopiedIframe] = useState(false);

  function copy(text: string, setter: (v: boolean) => void) {
    navigator.clipboard.writeText(text).then(() => {
      setter(true);
      setTimeout(() => setter(false), 2000);
    });
  }

  const fieldStyle: React.CSSProperties = {
    flex: 1,
    padding: "8px 12px",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    fontSize: 12,
    fontFamily: "monospace",
    color: "#475569",
    backgroundColor: "#f8fafc",
    resize: "none",
    outline: "none",
  };

  const copyBtnStyle: React.CSSProperties = {
    flexShrink: 0,
    padding: "8px 14px",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    backgroundColor: "#fff",
    cursor: "pointer",
    fontSize: 13,
    color: "#475569",
    fontWeight: 500,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 13,
    color: "#475569",
    marginBottom: 6,
    display: "block",
  };

  return (
    <div
      style={{
        padding: "20px 24px",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <h3
        style={{
          margin: "0 0 16px 0",
          fontSize: 13,
          fontWeight: 600,
          color: "#64748b",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        Compartilhar
      </h3>

      <div style={{ marginBottom: 16 }}>
        <span style={labelStyle}>Link direto</span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            readOnly
            value={embedUrl}
            style={{ ...fieldStyle, height: 36 }}
          />
          <button
            type="button"
            onClick={() => copy(embedUrl, setCopiedLink)}
            style={copyBtnStyle}
          >
            {copiedLink ? "Copiado!" : "Copiar"}
          </button>
        </div>
      </div>

      <div>
        <span style={labelStyle}>Código iframe</span>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <textarea
            readOnly
            value={iframeCode}
            rows={5}
            style={fieldStyle}
          />
          <button
            type="button"
            onClick={() => copy(iframeCode, setCopiedIframe)}
            style={copyBtnStyle}
          >
            {copiedIframe ? "Copiado!" : "Copiar"}
          </button>
        </div>
      </div>
    </div>
  );
}
