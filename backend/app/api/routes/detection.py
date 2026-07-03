from fastapi import APIRouter, UploadFile, File, HTTPException
import cv2
import numpy as np
from ...core.detector import Detector

router = APIRouter()
detector = Detector()

@router.post("/detect")
async def detect_peripheral(file: UploadFile = File(...)):
    """Endpoint para detectar y clasificar un periférico desde una imagen subida."""
    try:
        # Leer la imagen
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if img is None:
            raise HTTPException(status_code=400, detail="Imagen inválida")
        
        # Ejecutar detección
        result = detector.detect(img)
        if "error" in result:
            raise HTTPException(status_code=400, detail=result["error"])
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))