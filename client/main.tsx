import { createRoot, type Root } from "react-dom/client";
import App from "./App";

declare global {
  interface Window {
    __AGRIMOVE_ROOT__?: Root;
  }
}

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container #root not found");
}

if (!window.__AGRIMOVE_ROOT__) {
  window.__AGRIMOVE_ROOT__ = createRoot(container);
}

window.__AGRIMOVE_ROOT__!.render(<App />);
