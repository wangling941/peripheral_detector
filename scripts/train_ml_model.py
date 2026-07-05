import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

def main():
    df = pd.read_csv("data/annotations/features.csv")
    X = df[['area', 'perimeter', 'ratio']]
    y = df['label']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    y_pred = model.predict(X_test)
    print(f"Accuracy: {accuracy_score(y_test, y_pred):.2f}")
    print(classification_report(y_test, y_pred))
    
    # Guardar modelo
    os.makedirs("models/heuristics", exist_ok=True)
    joblib.dump(model, "models/heuristics/classifier_rf.pkl")
    print("Modelo guardado en models/heuristics/classifier_rf.pkl")

if __name__ == "__main__":
    main()