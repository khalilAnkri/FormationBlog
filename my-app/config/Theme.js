import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { createContext, useContext, useState, useEffect } from "react";

// Create Theme Context
const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

const getStoredTheme = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("theme") === "dark" ? "dark" : "light";
  }
  return "light";
};

export const ThemeProviderWrapper = ({ children }) => {
  const [mode, setMode] = useState(getStoredTheme());

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: "#7bb0ff",
        second: "#d7daef",
      },
      secondary: {
        main: "#FF067E",
      },
      background: {
        default: mode === "dark" ? "#121212" : "#ffffff",
        paper: mode === "dark" ? "#1e1e1e" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#ffffff" : "#000000",
      },
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
    },
  });

  return (
      <ThemeContext.Provider value={{ mode, setMode }}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeContext.Provider>
  );
};
