import { useSearchParams } from "react-router-dom";

export function useEmbedParams() {
  const [params] = useSearchParams();
  return {
    tenantId: params.get("tenantId") ?? "",
    botId: params.get("botId") ?? "",
  };
}
