import axios from "axios";

declare const process: {
  env: {
    REACT_APP_API_URL?: string;
  };
};

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
console.log("🌐 API_BASE_URL:", API_BASE_URL);

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
  console.log("📡 detectPeripheral() called with file:", file.name);
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post<DetectionResult>(
      `${API_BASE_URL}/api/v1/detect`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    console.log("✅ API response status:", response.status);
    return response.data;
  } catch (error) {
    console.error("❌ API request failed:", error);
    throw error;
  }
};
