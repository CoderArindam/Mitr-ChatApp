import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "./components/ui/sonner.jsx";
import "../public/assets/stylesheets/bootstrap.css";
import "../public/assets/stylesheets/style.css";

createRoot(document.getElementById("root")).render(
  <>
    <App />
    <Toaster closeButton />
  </>
);
