import type { Message } from "../../types/chat";
import type { WidgetSettings } from "../../types/widget";
import { AvatarIcon } from "./AvatarPicker";
import { MessageInput } from "../widget/MessageInput";
import { MessageList } from "../widget/MessageList";
import { WidgetHeader } from "../widget/WidgetHeader";

const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Olá! Como posso ajudar você hoje?",
    timestamp: new Date(),
  },
  {
    id: "2",
    role: "user",
    content: "Preciso de informações sobre meu pedido.",
    timestamp: new Date(),
  },
  {
    id: "3",
    role: "assistant",
    content: "Claro! Pode me informar o número do pedido?",
    timestamp: new Date(),
  },
];

const fontSizeMap: Record<WidgetSettings["message_font_size"], string> = {
  small: "12px",
  medium: "14px",
  large: "16px",
};

interface Props {
  settings: WidgetSettings;
}

export function WidgetPreview({ settings }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <p
        style={{
          fontSize: 12,
          color: "#94a3b8",
          fontFamily: "system-ui, -apple-system, sans-serif",
          margin: 0,
        }}
      >
        Prévia do widget
      </p>
      <div
        style={{
          width: 380,
          height: 600,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          backgroundColor: settings.background_color,
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: fontSizeMap[settings.message_font_size],
        }}
      >
        <WidgetHeader
          title={settings.title}
          subtitle={settings.subtitle}
          primaryColor={settings.primary_color}
          layout={settings.header_layout}
          avatar={<AvatarIcon id={settings.bot_avatar} size={22} />}
        />
        <MessageList
          messages={MOCK_MESSAGES}
          sending={false}
          primaryColor={settings.primary_color}
          messageBackground={settings.message_background}
        />
        <MessageInput
          onSend={() => {}}
          disabled={true}
          placeholder={settings.placeholder}
          primaryColor={settings.primary_color}
        />
      </div>
    </div>
  );
}
