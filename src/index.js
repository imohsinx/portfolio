import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { UserAuthContextProvider } from "./UserAuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <UserAuthContextProvider>
        <App />
      </UserAuthContextProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
