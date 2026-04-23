import type { ReactNode } from "react";
import type { WidgetSettings } from "../../types/widget";
import { AvatarPicker } from "./AvatarPicker";
import { ColorPickerField } from "./ColorPickerField";

interface SectionProps {
  title: string;
  children: ReactNode;
}

function Section({ title, children }: SectionProps) {
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
        {title}
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {children}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 12px",
  border: "1px solid #e2e8f0",
  borderRadius: 8,
  fontSize: 14,
  outline: "none",
  color: "#1e293b",
  fontFamily: "inherit",
  boxSizing: "border-box",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: "pointer",
  backgroundColor: "#fff",
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  fontSize: 13,
  color: "#475569",
};

interface InitialMessagesListProps {
  messages: string[];
  onChange: (msgs: string[]) => void;
}

function InitialMessagesList({ messages, onChange }: InitialMessagesListProps) {
  function updateAt(index: number, value: string) {
    const next = [...messages];
    next[index] = value;
    onChange(next);
  }

  function removeAt(index: number) {
    onChange(messages.filter((_, i) => i !== index));
  }

  function add() {
    onChange([...messages, ""]);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontSize: 13, color: "#475569" }}>Mensagens iniciais</span>
      {messages.map((msg, i) => (
        <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type="text"
            value={msg}
            onChange={(e) => updateAt(i, e.target.value)}
            placeholder="Mensagem do bot..."
            style={{ ...inputStyle, flex: 1 }}
          />
          <button
            type="button"
            onClick={() => removeAt(i)}
            title="Remover"
            style={{
              flexShrink: 0,
              width: 32,
              height: 32,
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              backgroundColor: "#fff",
              cursor: "pointer",
              color: "#94a3b8",
              fontSize: 16,
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        style={{
          alignSelf: "flex-start",
          padding: "6px 14px",
          border: "1px dashed #cbd5e1",
          borderRadius: 8,
          backgroundColor: "transparent",
          cursor: "pointer",
          fontSize: 13,
          color: "#64748b",
        }}
      >
        + Adicionar mensagem
      </button>
    </div>
  );
}

interface Props {
  draft: WidgetSettings;
  patch: (partial: Partial<WidgetSettings>) => void;
}

export function ConfigForm({ draft, patch }: Props) {
  return (
    <div>
      <Section title="Cabeçalho">
        <label style={labelStyle}>
          Título
          <input
            type="text"
            value={draft.title}
            onChange={(e) => patch({ title: e.target.value })}
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          Subtítulo
          <input
            type="text"
            value={draft.subtitle}
            onChange={(e) => patch({ subtitle: e.target.value })}
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          Alinhamento
          <select
            value={draft.header_layout}
            onChange={(e) =>
              patch({ header_layout: e.target.value as WidgetSettings["header_layout"] })
            }
            style={selectStyle}
          >
            <option value="left">Esquerda</option>
            <option value="center">Centro</option>
            <option value="right">Direita</option>
          </select>
        </label>
      </Section>

      <Section title="Cores">
        <ColorPickerField
          label="Cor primária (cabeçalho e botões)"
          value={draft.primary_color}
          onChange={(v) => patch({ primary_color: v })}
        />
        <ColorPickerField
          label="Fundo do chat"
          value={draft.background_color}
          onChange={(v) => patch({ background_color: v })}
        />
        <ColorPickerField
          label="Fundo das mensagens do bot"
          value={draft.message_background}
          onChange={(v) => patch({ message_background: v })}
        />
      </Section>

      <Section title="Bot">
        <AvatarPicker
          value={draft.bot_avatar}
          onChange={(v) => patch({ bot_avatar: v })}
        />
        <label style={labelStyle}>
          Tamanho do texto
          <select
            value={draft.message_font_size}
            onChange={(e) =>
              patch({ message_font_size: e.target.value as WidgetSettings["message_font_size"] })
            }
            style={selectStyle}
          >
            <option value="small">Pequeno</option>
            <option value="medium">Médio</option>
            <option value="large">Grande</option>
          </select>
        </label>
      </Section>

      <Section title="Mensagens iniciais">
        <InitialMessagesList
          messages={draft.initial_messages}
          onChange={(msgs) => patch({ initial_messages: msgs })}
        />
      </Section>

      <Section title="Campo de entrada">
        <label style={labelStyle}>
          Placeholder
          <input
            type="text"
            value={draft.placeholder}
            onChange={(e) => patch({ placeholder: e.target.value })}
            style={inputStyle}
          />
        </label>
      </Section>
    </div>
  );
}
