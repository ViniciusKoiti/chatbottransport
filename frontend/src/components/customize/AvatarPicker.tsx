import type { AvatarId } from "../../types/widget";

interface Props {
  value: AvatarId;
  onChange: (id: AvatarId) => void;
}

export const AVATAR_ICONS: Record<AvatarId, React.ReactNode> = {
  default: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  ),
  robot: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <circle cx="9" cy="13" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13" r="1.5" fill="currentColor" stroke="none" />
      <path d="M9 17h6" />
      <path d="M12 8V4" />
      <circle cx="12" cy="3" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  support: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11a9 9 0 1 1 18 0" />
      <path d="M3 11v2a2 2 0 0 0 2 2h1" />
      <path d="M18 11v2a2 2 0 0 1-2 2h-1" />
      <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  chat: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  help: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  agent: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="16" />
      <line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  ),
};

const AVATAR_LABELS: Record<AvatarId, string> = {
  default: "Padrão",
  robot: "Robô",
  support: "Suporte",
  chat: "Chat",
  help: "Ajuda",
  agent: "Agente",
};

export function AvatarIcon({ id, size = 24 }: { id: AvatarId; size?: number }) {
  return (
    <span style={{ display: "flex", width: size, height: size }}>
      {AVATAR_ICONS[id]}
    </span>
  );
}

export function AvatarPicker({ value, onChange }: Props) {
  return (
    <div>
      <span style={{ fontSize: 13, color: "#475569", display: "block", marginBottom: 8 }}>
        Avatar do bot
      </span>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {(Object.keys(AVATAR_ICONS) as AvatarId[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            title={AVATAR_LABELS[id]}
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              border: value === id ? "2px solid #2563EB" : "2px solid #e2e8f0",
              backgroundColor: value === id ? "#eff6ff" : "#fff",
              color: value === id ? "#2563EB" : "#64748b",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "border-color 0.15s, background-color 0.15s",
            }}
          >
            {AVATAR_ICONS[id]}
          </button>
        ))}
      </div>
    </div>
  );
}
