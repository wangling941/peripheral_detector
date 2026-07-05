import joblib
import numpy as np
from pathlib import Path

class Classifier:
    def __init__(self):
        model_path = Path(__file__).parent.parent.parent / "models" / "heuristics" / "classifier_rf.pkl"
        if model_path.exists():
            self.model = joblib.load(model_path)
        else:
            self.model = None

    def classify_by_ratio(self, ratio: float) -> str:
        if ratio > 1.10:
            return "TELEVISION / MONITOR"
        elif 0.85 <= ratio <= 1.10:
            return "LAPTOP / PORTATIL"
        elif ratio < 0.85:
            return "PC DESKTOP (TORRE)"
        else:
            return "DESCONOCIDO"

    def classify(self, features: dict) -> str:
        if self.model is None:
            return self.classify_by_ratio(features['ratio'])
        X = np.array([[features['area'], features['perimeter'], features['ratio']]])
        label = self.model.predict(X)[0]
        return label.upper()