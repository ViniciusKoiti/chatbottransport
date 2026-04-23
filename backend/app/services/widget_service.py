from app.models.widget import WidgetConfigResponse, WidgetSettings
from app.repositories.widget_config_repository import widget_config_repo

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
    bot_avatar="default",
    message_font_size="medium",
)


def get_widget_config(tenant_id: str, bot_id: str) -> WidgetConfigResponse:
    saved = widget_config_repo.get(tenant_id, bot_id)
    return WidgetConfigResponse(
        tenant_id=tenant_id,
        bot_id=bot_id,
        widget=saved if saved is not None else _DEFAULT_WIDGET,
    )


def save_widget_config(tenant_id: str, bot_id: str, settings: WidgetSettings) -> WidgetConfigResponse:
    widget_config_repo.save(tenant_id, bot_id, settings)
    return WidgetConfigResponse(tenant_id=tenant_id, bot_id=bot_id, widget=settings)
