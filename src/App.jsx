import "./styles/App.css";
import Login from "./Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUP from "./SignUp";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUP />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
