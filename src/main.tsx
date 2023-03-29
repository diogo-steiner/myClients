import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { App } from "./App";
import { AuthProvider } from "./contexts/auth";
import { GlobalStyled } from "./styles/GlobalStyled";
import { ResetStyled } from "./styles/ResetStyled";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ResetStyled />
    <GlobalStyled />
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
    <ToastContainer autoClose={2000} theme="dark" />
  </React.StrictMode>
);
