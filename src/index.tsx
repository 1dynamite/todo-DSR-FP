import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SWRDevTools } from "swr-devtools";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SWRDevTools>
      <App />
    </SWRDevTools>
  </React.StrictMode>
);
