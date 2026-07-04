import React, { useState } from "react";
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { CameraCapture } from "./components/CameraCapture";
import { FileUpload } from "./components/FileUpload";
import { ResultDisplay } from "./components/ResultDisplay";
import { useDetection } from "./hooks/useDetection";

const App: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const { detect, loading, result, error } = useDetection();

  const handleCapture = (file: File) => {
    detect(file);
  };

  const handleUpload = (file: File) => {
    detect(file);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        🖥️ Detector de Periféricos
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        Sube una imagen o usa la cámara para identificar monitores, laptops o
        torres de PC
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 4 }}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} centered>
          <Tab label="📸 Cámara" />
          <Tab label="📁 Subir imagen" />
        </Tabs>
      </Box>

      <Box sx={{ mt: 3 }}>
        {tabValue === 0 && (
          <CameraCapture onCapture={handleCapture} loading={loading} />
        )}
        {tabValue === 1 && (
          <FileUpload onUpload={handleUpload} loading={loading} />
        )}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
          <Typography variant="body1" sx={{ ml: 2 }}>
            Procesando imagen...
          </Typography>
        </Box>
      )}

      {result && !loading && <ResultDisplay result={result} />}
    </Container>
  );
};

export default App;
