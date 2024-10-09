import "./i18n";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="sy-ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
);
