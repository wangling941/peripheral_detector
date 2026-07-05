import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

type ThemeMode = "light" | "dark" | "cyberpunk";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: (newMode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useThemeContext must be used within ThemeProvider");
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>("cyberpunk");

  const toggleTheme = (newMode: ThemeMode) => setMode(newMode);

  const theme = createTheme({
    palette:
      mode === "cyberpunk"
        ? {
            mode: "dark",
            primary: { main: "#9c27b0" }, // Morado neón
            secondary: { main: "#00e5ff" }, // Cian neón
            background: { default: "#000000", paper: "#3a1d5c" },
            text: { primary: "#585656", secondary: "#575454" },
            error: { main: "#ff1744" },
            warning: { main: "#ffea00" },
            info: { main: "#00e5ff" },
            success: { main: "#00e676" },
          }
        : mode === "dark"
          ? {
              mode: "dark",
              primary: { main: "#1976d2" },
              secondary: { main: "#dc004e" },
              text: { primary: "#000000", secondary: "#000000" },
              background: { default: "#121212", paper: "#2a5688" },
            }
          : {
              mode: "light",
              primary: { main: "#1976d2" },
              secondary: { main: "#dc004e" },
              background: { default: "#ffffff", paper: "#ffffff" },
            },
    typography: {
      fontFamily: '"Orbitron", "Roboto", sans-serif',
      h4: { fontWeight: 700, letterSpacing: "0.1em" },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            boxShadow: mode === "cyberpunk" ? "0 0 10px #9c27b0" : "none",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background:
              mode === "cyberpunk"
                ? "linear-gradient(145deg, #1a1a2e, #16213e)"
                : undefined,
            border: mode === "cyberpunk" ? "1px solid #9c27b0" : undefined,
            boxShadow:
              mode === "cyberpunk"
                ? "0 0 30px rgba(156, 39, 176, 0.3)"
                : undefined,
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
