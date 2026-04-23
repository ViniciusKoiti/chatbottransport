import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CustomizePage } from "./pages/CustomizePage";
import { EmbedPage } from "./pages/EmbedPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/widget/embed" element={<EmbedPage />} />
        <Route path="/widget/customize" element={<CustomizePage />} />
        <Route
          path="*"
          element={
            <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
              404 — Página não encontrada
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
