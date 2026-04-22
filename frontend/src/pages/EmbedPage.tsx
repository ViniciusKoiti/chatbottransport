import { MessageInput } from "../components/widget/MessageInput";
import { MessageList } from "../components/widget/MessageList";
import { WidgetHeader } from "../components/widget/WidgetHeader";
import { useChat } from "../hooks/useChat";
import { useChatSession } from "../hooks/useChatSession";
import { useEmbedParams } from "../hooks/useEmbedParams";
import { useWidgetConfig } from "../hooks/useWidgetConfig";

export function EmbedPage() {
  const { tenantId, botId } = useEmbedParams();

  const { config, loading: configLoading, error: configError } = useWidgetConfig(tenantId, botId);
  const { sessionId, loading: sessionLoading, error: sessionError } = useChatSession(tenantId, botId);
  const { messages, sending, error: chatError, send } = useChat(
    tenantId,
    botId,
    sessionId,
    config?.initial_messages
  );

  if (!tenantId || !botId) {
    return <ErrorState message="Parâmetros tenantId e botId são obrigatórios na URL." />;
  }

  if (configLoading || sessionLoading) {
    return <LoadingState />;
  }

  if (configError || sessionError || !config) {
    return <ErrorState message={configError ?? sessionError ?? "Erro ao carregar o widget."} />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: config.background_color,
        fontFamily: "system-ui, -apple-system, sans-serif",
        overflow: "hidden",
      }}
    >
      <WidgetHeader
        title={config.title}
        subtitle={config.subtitle}
        primaryColor={config.primary_color}
        layout={config.header_layout}
      />

      <MessageList
        messages={messages}
        sending={sending}
        primaryColor={config.primary_color}
        messageBackground={config.message_background}
      />

      {chatError && (
        <div
          style={{
            padding: "8px 16px",
            backgroundColor: "#fef2f2",
            color: "#dc2626",
            fontSize: "13px",
            textAlign: "center",
            borderTop: "1px solid #fecaca",
            flexShrink: 0,
          }}
        >
          {chatError}
        </div>
      )}

      <MessageInput
        onSend={send}
        disabled={sending || !sessionId}
        placeholder={config.placeholder}
        primaryColor={config.primary_color}
      />
    </div>
  );
}

function LoadingState() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        color: "#94a3b8",
        fontFamily: "system-ui, sans-serif",
        fontSize: "14px",
      }}
    >
      Carregando...
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: "24px",
        color: "#dc2626",
        fontFamily: "system-ui, sans-serif",
        fontSize: "14px",
        textAlign: "center",
      }}
    >
      {message}
    </div>
  );
}
