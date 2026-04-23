import type { WidgetConfigResponse, WidgetSettings } from "../types/widget";
import { request } from "./api";

export function fetchWidgetConfig(
  tenantId: string,
  botId: string
): Promise<WidgetConfigResponse> {
  return request<WidgetConfigResponse>(
    `/api/v1/widget/config?tenant_id=${encodeURIComponent(tenantId)}&bot_id=${encodeURIComponent(botId)}`
  );
}

export function saveWidgetConfig(
  tenantId: string,
  botId: string,
  widget: WidgetSettings
): Promise<WidgetConfigResponse> {
  return request<WidgetConfigResponse>("/api/v1/widget/config", {
    method: "PUT",
    body: JSON.stringify({ tenant_id: tenantId, bot_id: botId, widget }),
  });
}
