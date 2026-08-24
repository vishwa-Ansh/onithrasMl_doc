import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DocsPage } from "./components/DocsPage";
import { HomePage } from "./components/HomePage";
import { NotFoundPage } from "./components/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/docs/:version" element={<DocsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
