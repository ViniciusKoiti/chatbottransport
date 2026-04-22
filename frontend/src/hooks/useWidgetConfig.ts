import { useEffect, useState } from "react";
import { fetchWidgetConfig } from "../services/widget.service";
import type { WidgetSettings } from "../types/widget";

interface UseWidgetConfigResult {
  config: WidgetSettings | null;
  loading: boolean;
  error: string | null;
}

export function useWidgetConfig(
  tenantId: string,
  botId: string
): UseWidgetConfigResult {
  const [config, setConfig] = useState<WidgetSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tenantId || !botId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchWidgetConfig(tenantId, botId)
      .then((res) => setConfig(res.widget))
      .catch(() => setError("Não foi possível carregar a configuração do widget."))
      .finally(() => setLoading(false));
  }, [tenantId, botId]);

  return { config, loading, error };
}
