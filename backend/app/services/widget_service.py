from app.models.widget import WidgetConfigResponse, WidgetSettings

# Mock config — substituir por consulta ao banco quando existir
_DEFAULT_WIDGET = WidgetSettings(
    title="Atendimento",
    subtitle="Como posso ajudar?",
    primary_color="#2563EB",
    background_color="#FFFFFF",
    message_background="#F8FAFC",
    bot_color="#2563EB",
    header_layout="left",
    initial_messages=["Olá! Como posso ajudar você hoje?"],
    placeholder="Digite sua mensagem",
)


def get_widget_config(tenant_id: str, bot_id: str) -> WidgetConfigResponse:
    return WidgetConfigResponse(
        tenant_id=tenant_id,
        bot_id=bot_id,
        widget=_DEFAULT_WIDGET,
    )
