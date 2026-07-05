import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { CameraCapture } from "./components/CameraCapture/CameraCapture";
import { FileUpload } from "./components/FileUpload/FileUpload";
import { ResultDisplay } from "./components/ResultDisplay/ResultDisplay";
import { ThemeToggle } from "./components/ThemeToggle/ThemeToggle";
import { useDetection } from "./hooks/useDetection";
import { useThemeContext } from "./context/ThemeContext";
import styles from "./App.module.css";

const App: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const { detect, loading, result, error } = useDetection();
  const { mode } = useThemeContext();

  useEffect(() => {
    console.log("🟢 App mounted, mode:", mode);
  }, [mode]);

  const handleCapture = (file: File) => detect(file);
  const handleUpload = (file: File) => detect(file);

  return (
    <Container maxWidth="md" className={styles.appContainer}>
      <ThemeToggle />
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <span className={styles.logoIcon}>🖥️</span>
          <Typography variant="h4" className={styles.title}>
            Detector de Periféricos
          </Typography>
        </div>
        <Typography variant="subtitle1" className={styles.subtitle}>
          Sube una imagen o usa la cámara para identificar monitores, laptops o
          torres de PC
        </Typography>
      </div>

      <Box className={styles.tabsContainer}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} centered>
          <Tab label="📸 Cámara" />
          <Tab label="📁 Subir imagen" />
        </Tabs>
      </Box>

      <Box className={styles.contentBox}>
        {tabValue === 0 && (
          <CameraCapture onCapture={handleCapture} loading={loading} />
        )}
        {tabValue === 1 && (
          <FileUpload onUpload={handleUpload} loading={loading} />
        )}
      </Box>

      {error && (
        <Alert severity="error" className={styles.errorAlert}>
          {error}
        </Alert>
      )}

      {loading && (
        <Box className={styles.loadingBox}>
          <CircularProgress />
          <Typography variant="body1">Procesando imagen...</Typography>
        </Box>
      )}

      {result && !loading && <ResultDisplay result={result} />}
    </Container>
  );
};

export default App;
