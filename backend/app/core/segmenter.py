import cv2
import numpy as np
from ..config import settings

class Segmenter:
    @staticmethod
    def hsv_segmentation(image: np.ndarray) -> np.ndarray:
        """
        Aplica segmentación en espacio HSV para aislar objetos oscuros.
        Retorna una máscara binaria.
        """
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        low = np.array(settings.HSV_LOW)
        high = np.array(settings.HSV_HIGH)
        mask = cv2.inRange(hsv, low, high)
        
        # Limpieza morfológica
        kernel = np.ones((11, 11), np.uint8)
        mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
        mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
        return mask