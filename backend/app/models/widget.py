from typing import Literal
from pydantic import BaseModel


class WidgetSettings(BaseModel):
    title: str
    subtitle: str
    primary_color: str
    background_color: str
    message_background: str
    bot_color: str
    header_layout: Literal["left", "center", "right"]
    initial_messages: list[str]
    placeholder: str


class WidgetConfigResponse(BaseModel):
    tenant_id: str
    bot_id: str
    widget: WidgetSettings
