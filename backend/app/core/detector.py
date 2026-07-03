import cv2
import numpy as np
from .preprocessor import Preprocessor
from .segmenter import Segmenter
from .feature_extractor import FeatureExtractor
from .classifier import Classifier

class Detector:
    def __init__(self):
        self.preprocessor = Preprocessor()
        self.segmenter = Segmenter()
        self.feature_extractor = FeatureExtractor()
        self.classifier = Classifier()

    def detect(self, image: np.ndarray) -> dict:
        """
        Pipeline completo: preprocesamiento, segmentación, extracción y clasificación.
        """
        # 1. Preprocesamiento
        img_resized = self.preprocessor.resize(image)
        img_cropped = self.preprocessor.autocrop(img_resized)
        img_smoothed = self.preprocessor.apply_smoothing(img_cropped)
        
        # 2. Segmentación
        mask = self.segmenter.hsv_segmentation(img_smoothed)
        
        # 3. Extracción de características
        features = self.feature_extractor.extract_features(mask, img_smoothed)
        if not features:
            return {"error": "No se detectó ningún objeto válido"}
        
        # 4. Clasificación
        label = self.classifier.classify_by_ratio(features["ratio"])
        
        # 5. Dibujar resultados (opcional, para depuración)
        result_img = img_cropped.copy()
        x, y, w, h = features["bbox"]
        color = (0, 255, 0) if label == "TELEVISION / MONITOR" else (255, 255, 0) if label == "LAPTOP / PORTATIL" else (0, 165, 255)
        cv2.rectangle(result_img, (x, y), (x+w, y+h), color, 4)
        cv2.putText(result_img, f"{label} (ratio: {features['ratio']})", (x, y-10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0,0,0), 2)
        
        return {
            "classification": label,
            "features": features,
            "image_with_bbox": result_img.tolist()  # Solo si necesitas devolver la imagen codificada
        }