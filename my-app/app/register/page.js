"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TextField, Button, Box, Typography, Alert, CircularProgress, Dialog, DialogContent } from "@mui/material";
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { useRegister } from "../../backend/blog";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles"; // ✅ Use correct MUI theme import

export default function Page() {
  const router = useRouter();
  const registerMutation = useRegister();
  const theme = useTheme();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false); // ✅ State for modal

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    registerMutation.mutate(formData, {
      onSuccess: () => {
        setOpenModal(true); // ✅ Show modal on success
        setTimeout(() => {
          router.push("/connexion"); // ✅ Redirect after 3 seconds
        }, 3000);
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

      {/* ✅ Pending Status Modal */}
      <Dialog open={openModal} maxWidth="sm" fullWidth>
        <DialogContent
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            p: 4,
          }}
        >
          <Box
            sx={{
              backgroundColor: theme.palette.info.main,
              width: 70,
              height: 70,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <CheckBoxOutlinedIcon sx={{ fontSize: 36, color: "white" }} />
          </Box>

          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            Registration Successful
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Your account is in <strong>pending</strong> status. We will review your request and contact you soon.
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
