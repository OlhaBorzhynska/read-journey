import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "modern-normalize";
import "./index.css";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f1f1f",
            color: "#f9f9f9",
            border: "1px solid rgba(227, 227, 227, 0.3)",
          },
          success: {
            iconTheme: {
              primary: "#30b94d",
              secondary: "#f9f9f9",
            },
          },
          error: {
            iconTheme: {
              primary: "#e74a3b",
              secondary: "#f9f9f9",
            },
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>,
);
