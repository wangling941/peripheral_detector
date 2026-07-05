import cv2
import pandas as pd
import os
import sys
import numpy as np
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))
from app.core.preprocessor import Preprocessor
from app.core.segmenter import Segmenter
from app.core.feature_extractor import FeatureExtractor

def extract_hu_moments(mask):
    """Calcula momentos de Hu para describir forma (invariante a escala/rotación)."""
    moments = cv2.moments(mask)
    hu = cv2.HuMoments(moments).flatten()
    return hu

def extract_color_features(img):
    """Extrae color promedio en HSV y RGB."""
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    h_mean = np.mean(hsv[:,:,0])
    s_mean = np.mean(hsv[:,:,1])
    v_mean = np.mean(hsv[:,:,2])
    return {'h_mean': h_mean, 's_mean': s_mean, 'v_mean': v_mean}

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
        
        # Características geométricas
        feat = FeatureExtractor.extract_features(mask)
        if not feat:
            continue
        
        # Añadir momentos de Hu (7 valores)
        hu = extract_hu_moments(mask)
        for i, val in enumerate(hu):
            feat[f'hu_{i}'] = val
        
        # Añadir color promedio
        color = extract_color_features(img_cropped)
        feat.update(color)
        
        # Etiqueta
        feat['label'] = row['label']
        features.append(feat)
    
    return pd.DataFrame(features)

if __name__ == "__main__":
    df_feat = extract_features_from_dataset("data/annotations/labels.csv", "data/processed/")
    df_feat.to_csv("data/annotations/features.csv", index=False)
    print("Características guardadas.")
    print(df_feat.groupby('label').describe())