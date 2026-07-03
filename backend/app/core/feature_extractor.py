import cv2
import numpy as np
from ..config import settings

class FeatureExtractor:
    @staticmethod
    def extract_features(mask: np.ndarray, original_image: np.ndarray = None):
        """
        Extrae contornos y descriptores geométricos.
        Retorna un diccionario con área, perímetro, centroide, bounding box y ratio.
        """
        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        if not contours:
            return None
        
        # Seleccionar el contorno más grande
        c = max(contours, key=cv2.contourArea)
        area = cv2.contourArea(c)
        if area < settings.MIN_AREA_THRESHOLD:
            return None
        
        perimeter = cv2.arcLength(c, True)
        x, y, w, h = cv2.boundingRect(c)
        ratio = w / h if h > 0 else 0
        
        # Centroide
        M = cv2.moments(c)
        cx = int(M['m10'] / M['m00']) if M['m00'] != 0 else 0
        cy = int(M['m01'] / M['m00']) if M['m00'] != 0 else 0
        
        return {
            "area": int(area),
            "perimeter": round(perimeter, 2),
            "centroid": (cx, cy),
            "bbox": (x, y, w, h),
            "ratio": round(ratio, 2)
        }