class Classifier:
    @staticmethod
    def classify_by_ratio(ratio: float) -> str:
        """Clasifica basado en la relación de aspecto."""
        if ratio > 1.10:
            return "TELEVISION / MONITOR"
        elif 0.85 <= ratio <= 1.10:
            return "LAPTOP / PORTATIL"
        elif ratio < 0.85:
            return "PC DESKTOP (TORRE)"
        else:
            return "DESCONOCIDO"