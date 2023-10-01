import { useState } from "react";
import "./styles/App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./Login";
import { UserAuthContextProvider } from "./UserAuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUP from "./SignUp";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Home";
import { SnackbarProvider } from "notistack";

// const StyledSwitch = styled(Switch)(({ theme }) => ({
//   backgroundColor: "rgba(255,255,255,0.1)",
//   padding: theme.spacing(1),
//   border: "1px solid dashed",
//   position: "absolute",
//   top: "0",
//   right: "0",
// }));

function App() {
  const [theme] = useState(false);
  const darkTheme = createTheme({
    palette: {
      mode: theme ? "dark" : "light",
    },
  });

  // const handleChange = (event) => {
  //   setTheme(event.target.checked);
  // };

  return (
    <div className="App">
      <SnackbarProvider maxSnack={3}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <UserAuthContextProvider>
            <Router>
              <Routes>
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUP />} />
              </Routes>
            </Router>
          </UserAuthContextProvider>

          {/* <StyledSwitch checked={theme} color="success" onChange={handleChange} /> */}
        </ThemeProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
