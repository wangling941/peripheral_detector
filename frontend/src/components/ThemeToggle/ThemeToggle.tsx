import React from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useThemeContext } from "../../context/ThemeContext";
import styles from "./ThemeToggle.module.css";

export const ThemeToggle: React.FC = () => {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <div className={styles.toggleContainer}>
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={(_, val) => val && toggleTheme(val)}
        size="small"
        className={styles.toggleGroup}
      >
        <ToggleButton value="light" className={styles.toggleBtn}>
          ☀️
        </ToggleButton>
        <ToggleButton value="dark" className={styles.toggleBtn}>
          🌙
        </ToggleButton>
        <ToggleButton value="cyberpunk" className={styles.toggleBtn}>
          🤖
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};
