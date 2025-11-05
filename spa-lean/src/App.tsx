import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TemplatesPage from "./pages/TemplatesPage";
import BuilderPage from "./pages/BuilderPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/builder" element={<BuilderPage />} />
        <Route path="*" element={<Navigate to="/templates" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
