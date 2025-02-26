import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./const.ts";
import App from "./components/App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);
