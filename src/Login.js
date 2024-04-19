import React, { useState } from "react";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import SERVER_URL from "./config";
import { useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";

const defaultTheme = createTheme();

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/Home"); // Redirect to the home page if already authenticated
    }
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await axios.post(
        `http://${SERVER_URL}:5001/admin/authenticate`,
        formData
      );

      if (response.data.status === "success") {
        console.log("Authentication successful");

        setError("");
        localStorage.setItem("token", response.data.token);
        const role = response.data.role;
        if (role === "admin") {
          navigate("/Home");
        } else if (role === "chef") {
          console.log(response.data.role);
          navigate("/chef/Home");
        }
      } else {
        console.log("Authentication failed");
        setError("Authentication failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={7}
          md={6}
          sx={{
            backgroundImage: 'url("/truckpark.jpg")',

            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src="/logo.png" alt="Logo" className="logo" />

            <Typography component="h1" variant="h5">
              Athentification
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label=" Identifiant"
                name="email"
                autoComplete="email"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mots de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "0084FF" }}
                onClick={handleLogin}
              >
                Confirmer
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Login;
