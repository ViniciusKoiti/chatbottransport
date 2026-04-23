import { useCallback, useEffect, useState } from "react";
import { fetchWidgetConfig, saveWidgetConfig } from "../services/widget.service";
import type { WidgetSettings } from "../types/widget";

const DEFAULT_SETTINGS: WidgetSettings = {
  title: "Atendimento",
  subtitle: "Como posso ajudar?",
  primary_color: "#2563EB",
  background_color: "#FFFFFF",
  message_background: "#F8FAFC",
  bot_color: "#2563EB",
  header_layout: "left",
  initial_messages: ["Olá! Como posso ajudar você hoje?"],
  placeholder: "Digite sua mensagem",
  bot_avatar: "default",
  message_font_size: "medium",
};

interface UseWidgetEditorResult {
  draft: WidgetSettings;
  loading: boolean;
  saving: boolean;
  error: string | null;
  saved: boolean;
  patch: (partial: Partial<WidgetSettings>) => void;
  save: () => Promise<void>;
  reset: () => void;
}

export function useWidgetEditor(tenantId: string, botId: string): UseWidgetEditorResult {
  const [draft, setDraft] = useState<WidgetSettings>(DEFAULT_SETTINGS);
  const [committed, setCommitted] = useState<WidgetSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!tenantId || !botId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    fetchWidgetConfig(tenantId, botId)
      .then((res) => {
        setDraft(res.widget);
        setCommitted(res.widget);
      })
      .catch(() => setError("Não foi possível carregar a configuração."))
      .finally(() => setLoading(false));
  }, [tenantId, botId]);

  const patch = useCallback((partial: Partial<WidgetSettings>) => {
    setDraft((prev) => ({ ...prev, ...partial }));
  }, []);

  const save = useCallback(async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await saveWidgetConfig(tenantId, botId, draft);
      setCommitted(res.widget);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError("Não foi possível salvar a configuração.");
    } finally {
      setSaving(false);
    }
  }, [tenantId, botId, draft]);

  const reset = useCallback(() => setDraft(committed), [committed]);

  return { draft, loading, saving, error, saved, patch, save, reset };
}
