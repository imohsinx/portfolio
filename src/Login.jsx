import React, { useState } from "react";
import "./styles/Login.css";
import {
  Alert,
  Button,
  Chip,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "./UserAuthContext";
import {
  Google,
  Lock,
  LockOpenOutlined,
  LoginOutlined,
  LoginRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";
import GoogleButton from "react-google-button";

export default function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const matchesSmallDevice = useMediaQuery("(max-width: 800px)");

  const { logIn, googleSignIn } = useUserAuth();
  console.log("is small device :", matchesSmallDevice);

  const handleSubmit = async () => {
    // Check if email is not empty and follows the standard email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || (email && !emailRegex.test(email))) {
      setError(
        "Email is required and should be in the format 'example@example.com'"
      );
      enqueueSnackbar(
        "Email is required and should be in the format 'example@example.com'",
        {
          variant: "error",
        }
      );
      return;
    }

    // Check if password is not empty, at least 8 characters long and contains at least one number, one lowercase letter, and one uppercase letter
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!password || (password && !passwordRegex.test(password))) {
      setError(
        "Password is required, should be at least 8 characters long and contain at least one number, one lowercase letter, and one uppercase letter"
      );
      enqueueSnackbar(
        "Password is required, should be at least 8 characters long and contain at least one number, one lowercase letter, and one uppercase letter",
        {
          variant: "error",
        }
      );
      return;
    }

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
    <div
      className="container"
      style={
        matchesSmallDevice
          ? { alignItems: "center", justifyContent: "flex-start" }
          : {}
      }
    >
      <Paper
        className="login_form"
        style={
          matchesSmallDevice
            ? { boxShadow: "none", maxWidth: "300px" }
            : { maxWidth: "300px" }
        }
      >
        {/* <img src={logo} alt="Logo" class="logo" /> */}
        {error ? (
          <Alert severity="error" style={{ marginBottom: "30px" }}>
            {error}
          </Alert>
        ) : (
          ""
        )}

        <Divider style={{ marginBottom: "30px" }}>
          <Chip
            icon={<LockOpenOutlined />}
            label="LOGIN"
            variant="outlined"
            style={{ padding: "10px" }}
          />
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

        <GoogleButton
          onClick={handleGoogleSignIn}
          style={{
            marginBottom: "20px",
            width: "100%",
            borderRadius: "3px",
          }}
        />

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
