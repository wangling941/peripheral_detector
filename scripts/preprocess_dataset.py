import cv2
import os
import pandas as pd
from pathlib import Path

INPUT_DIR = "data/raw/"
OUTPUT_DIR = "data/processed/"
ANNOTATIONS_FILE = "data/annotations/labels.csv"

def preprocess_image(img_path, output_path, target_size=(600, 600)):
    img = cv2.imread(img_path)
    if img is None:
        return False
    # Redimensionar manteniendo proporción o forzando
    img = cv2.resize(img, target_size)
    # (Opcional) aplicar autocrop similar al del backend
    cv2.imwrite(output_path, img)
    return True

def main():
    labels = []
    for label_dir in os.listdir(INPUT_DIR):
        label_path = os.path.join(INPUT_DIR, label_dir)
        if not os.path.isdir(label_path):
            continue
        out_label_path = os.path.join(OUTPUT_DIR, label_dir)
        os.makedirs(out_label_path, exist_ok=True)
        for img_file in os.listdir(label_path):
            if img_file.lower().endswith(('.jpg', '.jpeg', '.png')):
                src = os.path.join(label_path, img_file)
                dst = os.path.join(out_label_path, img_file)
                if preprocess_image(src, dst):
                    labels.append({'filename': f"{label_dir}/{img_file}", 'label': label_dir})
                    print(f"Procesado: {img_file} -> {label_dir}")

    # Guardar anotaciones
    df = pd.DataFrame(labels)
    os.makedirs(os.path.dirname(ANNOTATIONS_FILE), exist_ok=True)
    df.to_csv(ANNOTATIONS_FILE, index=False)
    print(f"Anotaciones guardadas en {ANNOTATIONS_FILE}")

if __name__ == "__main__":
    main()