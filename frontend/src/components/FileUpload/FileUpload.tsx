import React, { useRef, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styles from "./FileUpload.module.css";

interface FileUploadProps {
  onUpload: (file: File) => void;
  loading: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  loading,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("📁 FileUpload component mounted");
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("📁 File selected:", file.name, "size:", file.size);
      onUpload(file);
    } else {
      console.warn("⚠️ No file selected");
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <Button
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        onClick={() => {
          console.log("🖱️ Upload button clicked");
          fileInputRef.current?.click();
        }}
        disabled={loading}
        fullWidth
        className={styles.uploadButton}
      >
        {loading ? "Procesando..." : "📁 Seleccionar imagen"}
      </Button>
      <Typography variant="caption" className={styles.fileInfo}>
        Formatos soportados: JPG, PNG, BMP
      </Typography>
    </div>
  );
};
