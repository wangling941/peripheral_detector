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
import { useDetection } from "./hooks/useDetection";
import styles from "./App.module.css";

const App: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const { detect, loading, result, error } = useDetection();

  useEffect(() => {
    console.log("🟢 App component mounted");
    console.log(
      "🔍 API URL:",
      process.env.REACT_APP_API_URL || "http://localhost:8000",
    );
  }, []);

  const handleCapture = (file: File) => {
    console.log("📸 Captured file:", file.name, "size:", file.size);
    detect(file);
  };

  const handleUpload = (file: File) => {
    console.log("📁 Uploaded file:", file.name, "size:", file.size);
    detect(file);
  };

  useEffect(() => {
    if (result) console.log("✅ Detection result:", result);
    if (error) console.error("❌ Detection error:", error);
  }, [result, error]);

  return (
    <Container maxWidth="md" className={styles.appContainer}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        className={styles.title}
      >
        🖥️ Detector de Periféricos
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        className={styles.subtitle}
      >
        Sube una imagen o usa la cámara para identificar monitores, laptops o
        torres de PC
      </Typography>

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
