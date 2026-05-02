import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// ── Register Service Worker for offline support ──
if ("serviceWorker" in navigator) {
  const base = import.meta.env.BASE_URL ?? "/";
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(`${base}sw.js`, { scope: base })
      .then((reg) => {
        // Check for SW updates every 60 seconds when the app is open
        setInterval(() => reg.update(), 60_000);
      })
      .catch((err) => {
        console.warn("[Amān SW] registration failed:", err);
      });
  });
}
