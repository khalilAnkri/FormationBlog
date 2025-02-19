"use client";

import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { theme } from "@/config/Theme";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../context/store/authSlice";

const settings = ["Account", "Logout"];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [scrolled, setScrolled] = React.useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    router.push("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        top: "20px",
        left: 0,
        right: 0,
        width: "90%",
        maxWidth: "66%",
        margin: "0 auto",
        bgcolor: scrolled ? "white" : "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        borderRadius: "16px",
        boxShadow: scrolled ? "0px 4px 10px rgba(0, 0, 0, 0.1)" : "none",
        transition: "background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        zIndex: 1300,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "center" }}>
          <Image src="/logo.png" alt="Logo" width={120} height={28} />

          <Box sx={{ display: "flex", gap: 3, ml: 11 }}>
            <Button component={Link} href="/" sx={{ color: theme.palette.secondary.main, fontWeight: 700, fontFamily: "monospace", fontSize: "1.2rem" }}>
              Home
            </Button>
            <Button component={Link} href="/acceuil" sx={{ color: theme.palette.secondary.main, fontWeight: 700, fontFamily: "monospace", fontSize: "1.2rem" }}>
              Blog
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {isLoggedIn ? (
            <>
              <Tooltip title="Open settings">
                <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ p: 0 }}>
                  <Avatar alt="User" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      setAnchorElUser(null);
                      if (setting === "Logout") handleLogout();
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Button
              component={Link}
              href="/connexion"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                fontFamily: "monospace",
                fontSize: "1.2rem",
                borderRadius: "8px",
                backgroundColor: theme.palette.primary.light,
                color: "white",
              }}
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;