import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Paper,
} from "@mui/material";
import { DetectionResult } from "../services/api";

interface ResultDisplayProps {
  result: DetectionResult;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const getColor = (classification: string) => {
    if (classification.includes("MONITOR")) return "success";
    if (classification.includes("LAPTOP")) return "warning";
    if (classification.includes("DESKTOP")) return "error";
    return "default";
  };

  return (
    <Box mt={4}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Resultado de detección
          </Typography>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="body1">Clasificación:</Typography>
            <Chip
              label={result.classification}
              color={getColor(result.classification) as any}
              size="medium"
            />
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper variant="outlined" sx={{ p: 1 }}>
                <Typography variant="caption" color="textSecondary">
                  Ratio (w/h)
                </Typography>
                <Typography variant="h6">
                  {result.features.ratio.toFixed(2)}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper variant="outlined" sx={{ p: 1 }}>
                <Typography variant="caption" color="textSecondary">
                  Área (px²)
                </Typography>
                <Typography variant="h6">
                  {result.features.area.toLocaleString()}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper variant="outlined" sx={{ p: 1 }}>
                <Typography variant="caption" color="textSecondary">
                  Perímetro
                </Typography>
                <Typography variant="h6">
                  {result.features.perimeter.toFixed(1)}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper variant="outlined" sx={{ p: 1 }}>
                <Typography variant="caption" color="textSecondary">
                  Centroide
                </Typography>
                <Typography variant="h6">
                  ({result.features.centroid[0]}, {result.features.centroid[1]})
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Box mt={2}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Imagen procesada:
            </Typography>
            <Box
              component="img"
              src={`data:image/jpeg;base64,${result.image_base64}`}
              alt="Peripheral detected"
              sx={{
                width: "100%",
                maxHeight: 400,
                objectFit: "contain",
                border: "1px solid #ddd",
                borderRadius: 1,
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
