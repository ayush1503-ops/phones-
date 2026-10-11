import "@fontsource-variable/fraunces/index.css";
import "@fontsource-variable/inter/index.css";
import "@fontsource-variable/jetbrains-mono/index.css";
import "@/app/globals.css";
import { createRoot } from "react-dom/client";
import App from "@/vite/App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root was not found.");
}

createRoot(rootElement).render(<App />);
