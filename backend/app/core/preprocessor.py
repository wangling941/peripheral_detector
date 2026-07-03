import cv2
import numpy as np
from ..config import settings

class Preprocessor:
    @staticmethod
    def resize(image: np.ndarray, target_size: int = None) -> np.ndarray:
        """Redimensiona la imagen manteniendo la proporción o forzando a target_size x target_size."""
        if target_size is None:
            target_size = settings.MAX_IMAGE_SIZE
        return cv2.resize(image, (target_size, target_size))

    @staticmethod
    def autocrop(image: np.ndarray) -> np.ndarray:
        """Elimina los márgenes blancos o de fondo."""
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        _, thresh = cv2.threshold(gray, 250, 255, cv2.THRESH_BINARY_INV)
        points = cv2.findNonZero(thresh)
        if points is not None:
            x, y, w, h = cv2.boundingRect(points)
            return image[y:y+h, x:x+w]
        return image

    @staticmethod
    def apply_smoothing(image: np.ndarray) -> np.ndarray:
        """Aplica un filtro de suavizado para reducir ruido."""
        return cv2.GaussianBlur(image, (5, 5), 0)