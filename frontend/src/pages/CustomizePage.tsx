import { useSearchParams } from "react-router-dom";
import { ConfigForm } from "../components/customize/ConfigForm";
import { SharePanel } from "../components/customize/SharePanel";
import { WidgetPreview } from "../components/customize/WidgetPreview";
import { useWidgetEditor } from "../hooks/useWidgetEditor";

export function CustomizePage() {
  const [params] = useSearchParams();
  const tenantId = params.get("tenantId") ?? "";
  const botId = params.get("botId") ?? "";

  const { draft, loading, saving, error, saved, patch, save, reset } =
    useWidgetEditor(tenantId, botId);

  if (!tenantId || !botId) {
    return (
      <div
        style={{
          padding: 40,
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#64748b",
          textAlign: "center",
        }}
      >
        Os parâmetros <code>tenantId</code> e <code>botId</code> são obrigatórios na URL.
      </div>
    );
  }

  if (loading) {
    return (
      <div
        style={{
          padding: 40,
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#94a3b8",
          textAlign: "center",
        }}
      >
        Carregando configuração...
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        fontFamily: "system-ui, -apple-system, sans-serif",
        backgroundColor: "#f8fafc",
      }}
    >
      {/* Sidebar esquerda */}
      <aside
        style={{
          width: 420,
          flexShrink: 0,
          overflowY: "auto",
          backgroundColor: "#fff",
          borderRight: "1px solid #e2e8f0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Cabeçalho da página */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#0f172a" }}>
            Personalizar widget
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#94a3b8" }}>
            {tenantId} / {botId}
          </p>
        </div>

        {/* Formulário */}
        <ConfigForm draft={draft} patch={patch} />

        {/* Compartilhar */}
        <SharePanel tenantId={tenantId} botId={botId} />

        {/* Ações */}
        <div
          style={{
            padding: "16px 24px",
            display: "flex",
            gap: 10,
            alignItems: "center",
            backgroundColor: "#fff",
            borderTop: "1px solid #e2e8f0",
            position: "sticky",
            bottom: 0,
          }}
        >
          <button
            type="button"
            onClick={reset}
            disabled={saving}
            style={{
              flex: 1,
              padding: "10px 0",
              border: "1px solid #e2e8f0",
              borderRadius: 10,
              backgroundColor: "#fff",
              cursor: saving ? "not-allowed" : "pointer",
              fontSize: 14,
              fontWeight: 500,
              color: "#64748b",
            }}
          >
            Descartar
          </button>
          <button
            type="button"
            onClick={() => void save()}
            disabled={saving}
            style={{
              flex: 2,
              padding: "10px 0",
              border: "none",
              borderRadius: 10,
              backgroundColor: saved ? "#16a34a" : "#2563EB",
              cursor: saving ? "not-allowed" : "pointer",
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
              transition: "background-color 0.2s",
            }}
          >
            {saving ? "Salvando..." : saved ? "Salvo!" : "Salvar"}
          </button>
        </div>

        {error && (
          <div
            style={{
              padding: "12px 24px",
              backgroundColor: "#fef2f2",
              borderTop: "1px solid #fecaca",
              fontSize: 13,
              color: "#dc2626",
            }}
          >
            {error}
          </div>
        )}
      </aside>

      {/* Área principal — preview */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflowY: "auto",
          padding: 32,
        }}
      >
        <WidgetPreview settings={draft} />
      </main>
    </div>
  );
}
