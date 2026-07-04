import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { Button, CircularProgress } from "@mui/material";
import styles from "./CameraCapture.module.css";

interface CameraCaptureProps {
  onCapture: (file: File) => void;
  loading: boolean;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({
  onCapture,
  loading,
}) => {
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    console.log("📷 CameraCapture component mounted");
  }, []);

  const capture = () => {
    console.log("📸 Capture button clicked");
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      console.log("✅ Image captured, size:", imageSrc.length);
      const blob = dataURLtoBlob(imageSrc);
      const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
      onCapture(file);
    } else {
      console.warn("⚠️ No image captured");
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
    <div className={styles.captureContainer}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
        className={styles.webcam}
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
        className={styles.captureButton}
      >
        {loading ? <CircularProgress size={24} /> : "📸 Capturar imagen"}
      </Button>
    </div>
  );
};
