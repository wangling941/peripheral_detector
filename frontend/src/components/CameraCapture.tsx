import React, { useRef } from "react"; // eliminar useState
import Webcam from "react-webcam";
import { Button, Box, CircularProgress } from "@mui/material";

interface CameraCaptureProps {
  onCapture: (file: File) => void;
  loading: boolean;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({
  onCapture,
  loading,
}) => {
  const webcamRef = useRef<Webcam>(null);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      // Convertir base64 a File
      const blob = dataURLtoBlob(imageSrc);
      const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
      onCapture(file);
    }
  };

  const dataURLtoBlob = (dataURL: string): Blob => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
        videoConstraints={{
          facingMode: "environment",
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={capture}
        disabled={loading}
        fullWidth
      >
        {loading ? <CircularProgress size={24} /> : "📸 Capturar imagen"}
      </Button>
    </Box>
  );
};
