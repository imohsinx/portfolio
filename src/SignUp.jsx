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
  const { signUp } = useUserAuth();

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
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
