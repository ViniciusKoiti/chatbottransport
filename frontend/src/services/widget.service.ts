import type { WidgetConfigResponse } from "../types/widget";
import { request } from "./api";

export function fetchWidgetConfig(
  tenantId: string,
  botId: string
): Promise<WidgetConfigResponse> {
  return request<WidgetConfigResponse>(
    `/api/v1/widget/config?tenant_id=${encodeURIComponent(tenantId)}&bot_id=${encodeURIComponent(botId)}`
  );
}
