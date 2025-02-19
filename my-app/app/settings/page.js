"use client";

import { useState } from "react";
import { Box, Card, CardContent, Button, Switch, TextField, FormControlLabel, Typography, IconButton, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import MyMiniDrawer from "../../components/MyMiniDrawer";
export default function SettingsPage() {
  const [notifications, setNotifications] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        p: 3,
      }}
    >
        <MyMiniDrawer />
      <Paper 
        elevation={3} 
        sx={{ 
          maxWidth: 600, 
          mx: "auto", 
          p: 3, 
          borderRadius: 3, 
          position: "absolute", 
          top: "50%", 
          left: "50%", 
          transform: "translate(-50%, -50%)" 
        }}
      >
        <Link href="/acceuil" passHref style={{ textDecoration: "none", color: "inherit" }}>
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
        </Link>
        
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Settings
        </Typography>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
            }
            label="Enable Notifications"
            sx={{ mb: 2 }}
          />
          <Button fullWidth variant="contained">Save Changes</Button>
        </Box>
      </Paper>
    </Box>
  );
}
