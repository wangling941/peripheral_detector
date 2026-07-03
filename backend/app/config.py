import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    APP_NAME: str = "Peripheral Detector API"
    APP_VERSION: str = "1.0.0"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./peripherals.db")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "dev-secret-key")
    DEBUG: bool = os.getenv("DEBUG", "True").lower() == "true"
    MAX_IMAGE_SIZE: int = 600  # Resolución estándar
    MIN_AREA_THRESHOLD: int = 5000  # Píxeles mínimos para considerar un objeto
    HSV_LOW: tuple = (0, 0, 0)      # Negro bajo (H,S,V)
    HSV_HIGH: tuple = (180, 255, 85) # Negro alto

settings = Settings()