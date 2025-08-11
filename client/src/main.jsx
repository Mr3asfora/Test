import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./assets/css/normalize.css";
import "./assets/css/all.min.css";
import "./assets/css/index.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
