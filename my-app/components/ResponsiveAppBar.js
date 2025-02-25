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
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../context/store/authSlice";
import { getAuthToken, decodeToken } from "../backend/JwtUtils";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeContext } from "@/config/Theme"; // ✅ Import the Theme Context

const settings = ["Account", "Logout"];

function ResponsiveAppBar() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [scrolled, setScrolled] = React.useState(false);
    const [isAdmin, setIsAdmin] = React.useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    // ✅ Use theme context to get mode and setMode
    const { mode, setMode } = useThemeContext();

    const isDarkMode = mode === "dark"; // ✅ Check dark mode

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    React.useEffect(() => {
        const token = getAuthToken();
        if (token) {
            const decoded = decodeToken(token);
            setIsAdmin(decoded?.role === "ADMIN");
        } else {
            setIsAdmin(false);
        }
    }, [isLoggedIn]);

    const handleLogout = () => {
        dispatch(logout());
        setIsAdmin(false);
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
                bgcolor: isDarkMode
                    ? (scrolled ? "#1e1e1e" : "rgba(30, 30, 30, 0.7)") // ✅ Darker background in dark mode
                    : (scrolled ? "white" : "rgba(255, 255, 255, 0.7)"),
                color: isDarkMode ? "white" : "black",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                boxShadow: scrolled
                    ? (isDarkMode ? "0px 4px 10px rgba(255, 255, 255, 0.1)" : "0px 4px 10px rgba(0, 0, 0, 0.1)")
                    : "none",
                transition: "background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                zIndex: 1300,
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: "center" }}>
                    <Image src="/logo.png" alt="Logo" width={120} height={28} />

                    <Box sx={{ display: "flex", gap: 3, ml: 11 }}>
                        <Button component={Link} href="/" sx={{ color: "secondary.main", fontWeight: 700, fontFamily: "monospace", fontSize: "1.2rem" }}>
                            Home
                        </Button>
                        <Button component={Link} href="/acceuil" sx={{ color: "secondary.main", fontWeight: 700, fontFamily: "monospace", fontSize: "1.2rem" }}>
                            Blog
                        </Button>

                        {isAdmin && (
                            <Button component={Link} href="/administration" sx={{ color: "secondary.main", fontWeight: 700, fontFamily: "monospace", fontSize: "1.2rem" }}>
                                Administration
                            </Button>
                        )}
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />

                    {/* ✅ Fix Dark Mode Toggle Button */}
                    <IconButton onClick={() => setMode(mode === "light" ? "dark" : "light")} sx={{ mr: 2 }}>
                        {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>

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
                                color: "primary.main",
                                fontWeight: 700,
                                fontFamily: "monospace",
                                fontSize: "1.2rem",
                                borderRadius: "8px",
                                backgroundColor: "primary.light",
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

//test commit


export default ResponsiveAppBar;
