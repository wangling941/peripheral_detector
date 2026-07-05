# ENTRAMOS AL MODO VENV

.\backend\venv\Scripts\Activate.ps1

# Descargar imágenes

python scripts/download_images.py

# Preprocesar

python scripts/preprocess_dataset.py

# Extraer features

python scripts/extract_features.py

# Entrenar

python scripts/train_ml_model.py
