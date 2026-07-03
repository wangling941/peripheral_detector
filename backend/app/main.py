from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.routes import detection, health, training
from .config import settings

app = FastAPI(title=settings.APP_NAME, version=settings.APP_VERSION)

# CORS (para que el frontend pueda comunicarse)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, restringir a tu frontend
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas
app.include_router(detection.router, prefix="/api/v1", tags=["Detection"])
app.include_router(health.router, prefix="/api/v1", tags=["Health"])
app.include_router(training.router, prefix="/api/v1", tags=["Training"])

@app.get("/")
async def root():
    return {"message": "Peripheral Detector API is running", "version": settings.APP_VERSION}