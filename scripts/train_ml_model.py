import pandas as pd
import joblib
import os
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import StandardScaler

def main():
    # Cargar datos
    df = pd.read_csv("data/annotations/features.csv")
    
    # Limpiar: eliminar filas con valores nulos si las hay
    df = df.dropna()
    
    # Seleccionar características numéricas (excluir columnas no numéricas)
    exclude = ['label', 'centroid', 'bbox']
    feature_cols = [col for col in df.columns if col not in exclude and df[col].dtype in ['int64', 'float64']]
    X = df[feature_cols]   # DataFrame con solo numéricas
    y = df['label']
    
    # Convertir a numpy array (2D) explícitamente
    X_array = np.array(X, dtype=np.float64)  # Forzar tipo float
    
    # Escalar características
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X_array)
    
    # Dividir en train/test
    X_train, X_test, y_train, y_test = train_test_split(
        X_scaled, y, test_size=0.2, random_state=42
    )
    
    # Entrenar RandomForest
    model = RandomForestClassifier(
        n_estimators=200, 
        random_state=42, 
        class_weight='balanced'
    )
    model.fit(X_train, y_train)
    
    # Validación cruzada
    cv_scores = cross_val_score(model, X_scaled, y, cv=5)
    print(f"✅ Validación cruzada (5 folds): {cv_scores.mean():.2f} (+/- {cv_scores.std():.2f})")
    
    # Evaluar en test
    y_pred = model.predict(X_test)
    print(f"✅ Accuracy en test: {accuracy_score(y_test, y_pred):.2f}")
    print("\n📊 Classification Report:")
    print(classification_report(y_test, y_pred))
    
    # Guardar modelo y scaler
    os.makedirs("models/heuristics", exist_ok=True)
    joblib.dump(model, "models/heuristics/classifier_rf.pkl")
    joblib.dump(scaler, "models/heuristics/scaler.pkl")
    print("✅ Modelo y scaler guardados en models/heuristics/")

if __name__ == "__main__":
    main()