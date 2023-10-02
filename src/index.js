import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { UserAuthContextProvider } from "./UserAuthContext";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#12A772",
    },
    secondary: {
      main: "#12A772", // your secondary color
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <UserAuthContextProvider>
          <App />
        </UserAuthContextProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
