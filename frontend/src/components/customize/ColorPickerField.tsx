interface Props {
  label: string;
  value: string;
  onChange: (hex: string) => void;
}

export function ColorPickerField({ label, value, onChange }: Props) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontSize: 13, color: "#475569" }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: 36,
            height: 36,
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            cursor: "pointer",
            padding: 2,
            backgroundColor: "#fff",
          }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const v = e.target.value;
            if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) onChange(v);
          }}
          maxLength={7}
          style={{
            width: 90,
            fontFamily: "monospace",
            fontSize: 13,
            padding: "6px 10px",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            outline: "none",
            color: "#1e293b",
          }}
        />
      </div>
    </label>
  );
}
