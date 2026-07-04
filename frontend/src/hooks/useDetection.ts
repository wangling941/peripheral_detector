import { useState } from "react";
import { detectPeripheral, DetectionResult } from "../services/api";

export const useDetection = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const detect = async (file: File) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await detectPeripheral(file);
      setResult(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Error al procesar la imagen");
    } finally {
      setLoading(false);
    }
  };

  return { detect, loading, result, error };
};
