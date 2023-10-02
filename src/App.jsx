import "./styles/App.css";
import Login from "./Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUP from "./SignUp";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Home";
import RedirectToHome from "./RedirectToHome";

function App() {
  return (
    <div className="App">
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
          <Route
            path="/"
            element={
              <RedirectToHome>
                <Login />
              </RedirectToHome>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectToHome>
                <SignUP />
              </RedirectToHome>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
