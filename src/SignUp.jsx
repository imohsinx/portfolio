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
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  EditNote,
  PersonAddOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useUserAuth } from "./UserAuthContext";
import { useSnackbar } from "notistack";

export default function SignUP() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signUp } = useUserAuth();
  const { enqueueSnackbar } = useSnackbar();
  const matchesSmallDevice = useMediaQuery("(max-width: 800px)");

  let navigate = useNavigate();
  console.log("is small device :", matchesSmallDevice);

  const handleSubmit = async (e) => {
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

    // Check if confirmPassword is not empty and matches password
    if (!confirmPassword || (confirmPassword && password !== confirmPassword)) {
      setError("Confirm Password is required and should match Password");
      enqueueSnackbar(
        "Confirm Password is required and should match Password",
        {
          variant: "error",
        }
      );
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
            ? { boxShadow: "none", maxWidth: "80vw" }
            : { maxWidth: "300px" }
        }
      >
        {error ? (
          <Alert severity="error" style={{ marginBottom: "30px" }}>
            {error}
          </Alert>
        ) : (
          ""
        )}

        <Divider style={{ marginBottom: "30px" }}>
          <Chip
            label="SIGN-UP"
            variant="outlined"
            icon={<EditNote />}
            style={{ padding: "10px" }}
          />
        </Divider>
        <TextField
          variant="outlined"
          style={{ marginBottom: "20px" }}
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
