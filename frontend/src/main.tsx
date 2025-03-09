import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import Background from "./components/Background.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Background>
      <App />
    </Background>
  </BrowserRouter>
);
