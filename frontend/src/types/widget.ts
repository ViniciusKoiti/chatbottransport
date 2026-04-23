export type AvatarId = "default" | "robot" | "support" | "chat" | "help" | "agent";
export type FontSize = "small" | "medium" | "large";

export interface WidgetSettings {
  title: string;
  subtitle: string;
  primary_color: string;
  background_color: string;
  message_background: string;
  bot_color: string;
  header_layout: "left" | "center" | "right";
  initial_messages: string[];
  placeholder: string;
  bot_avatar: AvatarId;
  message_font_size: FontSize;
}

export interface WidgetConfigResponse {
  tenant_id: string;
  bot_id: string;
  widget: WidgetSettings;
}
