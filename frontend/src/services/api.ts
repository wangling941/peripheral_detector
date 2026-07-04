import axios from "axios";

// Declarar process para evitar error de TypeScript
declare const process: {
  env: {
    REACT_APP_API_URL?: string;
  };
};

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export interface DetectionResult {
  classification: string;
  features: {
    area: number;
    perimeter: number;
    centroid: [number, number];
    bbox: [number, number, number, number];
    ratio: number;
  };
  image_base64: string;
}

export const detectPeripheral = async (
  file: File,
): Promise<DetectionResult> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post<DetectionResult>(
    `${API_BASE_URL}/api/v1/detect`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};
