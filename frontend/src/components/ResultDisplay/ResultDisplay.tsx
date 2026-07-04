import React, { useEffect } from "react";
import { Card, CardContent, Typography, Chip } from "@mui/material";
import { DetectionResult } from "../../services/api";
import styles from "./ResultDisplay.module.css";

interface ResultDisplayProps {
  result: DetectionResult;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  useEffect(() => {
    console.log("📊 ResultDisplay mounted with result:", result);
  }, [result]);

  const getColor = (classification: string) => {
    if (classification.includes("MONITOR")) return "success";
    if (classification.includes("LAPTOP")) return "warning";
    if (classification.includes("DESKTOP")) return "error";
    return "default";
  };

  return (
    <div className={styles.resultContainer}>
      <Card elevation={3}>
        <CardContent className={styles.resultCard}>
          <Typography variant="h6" className={styles.resultTitle}>
            Resultado de detección
          </Typography>

          <div className={styles.classificationRow}>
            <Typography variant="body1">Clasificación:</Typography>
            <Chip
              label={result.classification}
              color={getColor(result.classification) as any}
              size="medium"
            />
          </div>

          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <Typography className={styles.metricLabel}>
                Ratio (w/h)
              </Typography>
              <Typography className={styles.metricValue}>
                {result.features.ratio.toFixed(2)}
              </Typography>
            </div>
            <div className={styles.metricCard}>
              <Typography className={styles.metricLabel}>Área (px²)</Typography>
              <Typography className={styles.metricValue}>
                {result.features.area.toLocaleString()}
              </Typography>
            </div>
            <div className={styles.metricCard}>
              <Typography className={styles.metricLabel}>Perímetro</Typography>
              <Typography className={styles.metricValue}>
                {result.features.perimeter.toFixed(1)}
              </Typography>
            </div>
            <div className={styles.metricCard}>
              <Typography className={styles.metricLabel}>Centroide</Typography>
              <Typography className={styles.metricValue}>
                ({result.features.centroid[0]}, {result.features.centroid[1]})
              </Typography>
            </div>
          </div>

          <div className={styles.imageContainer}>
            <Typography className={styles.imageLabel}>
              Imagen procesada:
            </Typography>
            <img
              src={`data:image/jpeg;base64,${result.image_base64}`}
              alt="Peripheral detected"
              className={styles.resultImage}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
