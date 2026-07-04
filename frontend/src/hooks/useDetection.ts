import { useState } from "react";
import { detectPeripheral, DetectionResult } from "../services/api";

export const useDetection = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const detect = async (file: File) => {
    console.log("🔍 detect() called with file:", file.name, "size:", file.size);
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log("📤 Sending request to API...");
      const data = await detectPeripheral(file);
      console.log("✅ API response received:", data);
      setResult(data);
    } catch (err: any) {
      console.error("❌ API error:", err);
      const errorMsg =
        err.response?.data?.detail || "Error al procesar la imagen";
      setError(errorMsg);
    } finally {
      setLoading(false);
      console.log("🏁 Detection process finished");
    }
  };

  return { detect, loading, result, error };
};
