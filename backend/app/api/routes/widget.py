from fastapi import APIRouter, HTTPException
from app.models.widget import UpdateWidgetConfigRequest, WidgetConfigResponse
from app.services.widget_service import get_widget_config, save_widget_config

router = APIRouter()


@router.get("/widget/config", response_model=WidgetConfigResponse)
def get_config(tenant_id: str, bot_id: str) -> WidgetConfigResponse:
    if not tenant_id or not bot_id:
        raise HTTPException(status_code=400, detail="tenant_id and bot_id are required")
    return get_widget_config(tenant_id, bot_id)


@router.put("/widget/config", response_model=WidgetConfigResponse)
def update_config(body: UpdateWidgetConfigRequest) -> WidgetConfigResponse:
    if not body.tenant_id or not body.bot_id:
        raise HTTPException(status_code=400, detail="tenant_id and bot_id are required")
    return save_widget_config(body.tenant_id, body.bot_id, body.widget)
