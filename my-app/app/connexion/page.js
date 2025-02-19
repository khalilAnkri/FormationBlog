"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Box, Typography, Alert, CircularProgress } from "@mui/material";
import { useLogin } from "../../backend/blog";  
import { useDispatch } from "react-redux";  
import { login } from "../../context/store/authSlice";  

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch(); 
  const loginMutation = useLogin();  

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    loginMutation.mutate(formData, {
      onSuccess: (data) => {
        // ✅ Dispatch the login action with the token
        dispatch(login(data.token)); // Assuming the API returns a token
        router.push("/acceuil"); // ✅ Redirect after successful login
      },
      onError: (err) => {
        console.error("Login Error:", err.message);
      },
    });
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url("/backgroundLog.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          width: 400,
          padding: 3,
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: 1,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>

        {loginMutation.isError && <Alert severity="error">{loginMutation.error.message}</Alert>}

        <TextField
          label="Username"
          name="username"
          type="text"
          fullWidth
          margin="normal"
          required
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          required
          value={formData.password}
          onChange={handleChange}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loginMutation.isLoading}
        >
          {loginMutation.isLoading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>

        <Typography align="center" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <a href="/register" style={{ color: "#1976d2", textDecoration: "none" }}>
            Sign up
          </a>
        </Typography>
      </Box>
    </Box>
  );
}