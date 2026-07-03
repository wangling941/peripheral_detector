import cv2
import numpy as np
import base64
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

    def detect(self, image: np.ndarray, return_image: bool = True) -> dict:
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
        
        # 5. Dibujar resultados (para depuración y visualización)
        result_img = img_cropped.copy()
        x, y, w, h = features["bbox"]
        
        # Colores por categoría
        if label == "TELEVISION / MONITOR":
            color = (0, 255, 0)  # Verde
        elif label == "LAPTOP / PORTATIL":
            color = (255, 255, 0)  # Cyan
        else:  # PC DESKTOP (TORRE) o DESCONOCIDO
            color = (0, 165, 255)  # Naranja
            
        cv2.rectangle(result_img, (x, y), (x+w, y+h), color, 4)
        cv2.putText(result_img, f"{label} (ratio: {features['ratio']})", (x, y-10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 0), 2)
        
        # 6. Codificar imagen a Base64 para enviarla por JSON
        image_base64 = None
        if return_image:
            _, buffer = cv2.imencode('.jpg', result_img)
            image_base64 = base64.b64encode(buffer).decode('utf-8')
        
        return {
            "classification": label,
            "features": features,
            "image_base64": image_base64  # Imagen en Base64
        }