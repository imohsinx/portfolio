import React, { useState } from "react";
import "./styles/SignUp.css";
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
import {
  PersonAddOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useUserAuth } from "./UserAuthContext";

export default function SignUP() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signUp } = useUserAuth();

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    // Check if email follows the standard email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email && !emailRegex.test(email)) {
      setError("Email should be in the format 'example@example.com'");
      return;
    }

    // Check if password is at least 8 characters long and contains at least one number, one lowercase letter, and one uppercase letter
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (password && !passwordRegex.test(password)) {
      setError(
        "Password should be at least 8 characters long and contain at least one number, one lowercase letter, and one uppercase letter"
      );
      return;
    }

    // Check if password and confirmPassword are the same
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container">
      <Paper className="login_form">
        {error ? (
          <Alert severity="error" style={{ marginBottom: "30px" }}>
            {error}
          </Alert>
        ) : (
          ""
        )}

        <Divider style={{ marginBottom: "30px" }}>
          <Chip label="SIGN-UP" variant="contained" />
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

        <FormControl>
          <InputLabel htmlFor="outlined-adornment-confirm-password">
            Confirm Your Password
          </InputLabel>

          <OutlinedInput
            id="outlined-adornment-confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            label="Confirm Your Password"
          />
        </FormControl>
        <Button
          variant="contained"
          style={{ marginBottom: "30px" }}
          color="secondary"
          startIcon={<PersonAddOutlined />}
          onClick={handleSubmit}
        >
          SIGN-UP
        </Button>

        <Divider style={{ marginBottom: "30px" }}>
          <Chip label="Already Have An Account ?" variant="outlined" />
        </Divider>
        <Button
          variant="outlined"
          style={{ marginBottom: "20px" }}
          color="primary"
          onClick={() => navigate("/")}
        >
          LOGIN
        </Button>
      </Paper>
    </div>
  );
}
