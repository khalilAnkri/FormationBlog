"use client";

import { Container, Typography, Button, Paper, Box } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useRouter } from "next/navigation";
import { theme } from "@/config/Theme";
import { motion } from "framer-motion";

export default function AuthRequired({ message = "You need to be authenticated to access this page.", redirectPath = "/connexion" }) {
  const router = useRouter();

  return (
    <Container
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          maxWidth: 700,
          width: "100%",
          textAlign: "center",
          borderRadius: "16px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
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
          <LockOutlinedIcon sx={{ fontSize: 36, color: "white" }} />
        </Box>

        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Access Restricted
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {message}
        </Typography>

        <Button
          variant="contained"
          width="60%"
          onClick={() => router.push(redirectPath)}
          sx={{
            backgroundColor: theme.palette.primary.main,
            fontWeight: "bold",
            py: 1.5,
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Go to Login
        </Button>
      </Paper>
    </Container>
  );
}
