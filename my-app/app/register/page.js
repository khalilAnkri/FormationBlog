"use client";

import { useState } from "react";
import { TextField, Button, Box, Typography, Alert, CircularProgress } from "@mui/material";
import { useRegister } from "../../backend/blog";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const registerMutation = useRegister();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    registerMutation.mutate(formData, {
      onSuccess: () => {
        router.push("/connexion"); 
      },
      onError: (err) => {
        setError(err.message);
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
        onSubmit={handleRegister}
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
          Register
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

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
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          required
          value={formData.email}
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

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={registerMutation.isLoading}>
          {registerMutation.isLoading ? <CircularProgress size={24} color="inherit" /> : "Register"}
        </Button>

        <Typography align="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <a href="/connexion" style={{ color: "#1976d2", textDecoration: "none" }}>
            Login
          </a>
        </Typography>
      </Box>
    </Box>
  );
}
