import cv2
import pandas as pd
import os
import sys
# Añadir la ruta del backend para importar los módulos core
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))
from app.core.preprocessor import Preprocessor
from app.core.segmenter import Segmenter
from app.core.feature_extractor import FeatureExtractor

def extract_features_from_dataset(annotations_file, image_dir):
    df = pd.read_csv(annotations_file)
    features = []
    for _, row in df.iterrows():
        img_path = os.path.join(image_dir, row['filename'])
        img = cv2.imread(img_path)
        if img is None:
            continue
        # Preprocesar
        img_resized = Preprocessor.resize(img)
        img_cropped = Preprocessor.autocrop(img_resized)
        mask = Segmenter.hsv_segmentation(img_cropped)
        feat = FeatureExtractor.extract_features(mask)
        if feat:
            feat['label'] = row['label']
            features.append(feat)
    return pd.DataFrame(features)

if __name__ == "__main__":
    df_feat = extract_features_from_dataset("data/annotations/labels.csv", "data/processed/")
    df_feat.to_csv("data/annotations/features.csv", index=False)
    print("Características guardadas.")
    # Mostrar estadísticas por categoría
    print(df_feat.groupby('label').describe())