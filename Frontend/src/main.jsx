import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import "./style.scss";
import "./style/button.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);