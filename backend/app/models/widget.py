from typing import Literal
from pydantic import BaseModel

AvatarId = Literal["default", "robot", "support", "chat", "help", "agent"]
FontSize = Literal["small", "medium", "large"]


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
    bot_avatar: AvatarId = "default"
    message_font_size: FontSize = "medium"


class WidgetConfigResponse(BaseModel):
    tenant_id: str
    bot_id: str
    widget: WidgetSettings


class UpdateWidgetConfigRequest(BaseModel):
    tenant_id: str
    bot_id: str
    widget: WidgetSettings
