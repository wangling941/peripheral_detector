# Paso 1: Regenerar las imágenes procesadas y el labels.csv (solo con las imágenes buenas que dejaste)

powershell

- python scripts/preprocess_dataset.py

📌 Qué hace: Lee todas las imágenes que dejaste en data/raw/monitor/, data/raw/laptop/ y data/raw/desktop/, las redimensiona a 600x600, las guarda en data/processed/ y sobrescribe data/annotations/labels.csv con las que sí existen.

# Paso 2: Regenerar las características (features) con las imágenes buenas

powershell

- python scripts/extract_features.py

📌 Qué hace: Lee el nuevo labels.csv, carga cada imagen desde data/processed/, extrae área, perímetro, ratio, momentos de Hu y color, y genera el nuevo data/annotations/features.csv.
