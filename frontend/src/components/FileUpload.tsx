import React, { useRef } from "react";
import { Button, Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface FileUploadProps {
  onUpload: (file: File) => void;
  loading: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  loading,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
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
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
        fullWidth
        sx={{ py: 2 }}
      >
        {loading ? "Procesando..." : "📁 Seleccionar imagen"}
      </Button>
      <Typography variant="caption" color="textSecondary">
        Formatos soportados: JPG, PNG, BMP
      </Typography>
    </Box>
  );
};
