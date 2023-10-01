import React, { useState } from "react";
import "./styles/Login.css";
import {
  Alert,
  Button,
  Chip,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "./UserAuthContext";
import {
  Google,
  LoginOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

export default function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { logIn, googleSignIn } = useUserAuth();

  const handleSubmit = async () => {
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container">
      <Paper className="login_form">
        {/* <img src={logo} alt="Logo" class="logo" /> */}
        {error ? (
          <Alert severity="error" style={{ marginBottom: "30px" }}>
            {error}
          </Alert>
        ) : (
          ""
        )}

        <Divider style={{ marginBottom: "30px" }}>
          <Chip label="LOGIN" variant="outlined" />
        </Divider>
        <TextField
          variant="outlined"
          style={{ marginBottom: "10px" }}
          label="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormControl>
          <InputLabel htmlFor="outlined-adornment-password">
            Enter Your Password
          </InputLabel>

          <OutlinedInput
            id="outlined-adornment-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "20px" }}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Enter Your Password"
          />
        </FormControl>

        <Button
          variant="contained"
          style={{ marginBottom: "20px" }}
          startIcon={<LoginOutlined />}
          onClick={handleSubmit}
        >
          LOGIN
        </Button>
        <Button
          variant="outlined"
          style={{ marginBottom: "20px" }}
          startIcon={<Google />}
          onClick={handleGoogleSignIn}
        >
          SIGN-IN WITH GOOGLE
        </Button>

        <Divider style={{ marginBottom: "30px" }}>
          <Chip label="Don't Have An Account ?" />
        </Divider>
        <Button
          variant="outlined"
          style={{ marginBottom: "20px" }}
          color="secondary"
          onClick={() => navigate("/signup")}
        >
          SIGN-UP
        </Button>
      </Paper>
    </div>
  );
}
