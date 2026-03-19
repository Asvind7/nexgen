import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import os

# Define file paths
base_dir = os.path.dirname(os.path.abspath(__file__))
dataset_path = os.path.join(base_dir, 'dataset.csv')

# Point to the backend models folder for seamless sync
backend_models_dir = os.path.join(os.path.dirname(base_dir), 'backend', 'models')
if not os.path.exists(backend_models_dir):
    os.makedirs(backend_models_dir)

model_path = os.path.join(backend_models_dir, 'learner_model.joblib')
encoder_path = os.path.join(backend_models_dir, 'label_encoder.joblib')

def train_model():
    print(f"Loading dataset from {dataset_path}...")
    
    # Check if dataset exists
    if not os.path.exists(dataset_path):
        print("Error: dataset.csv not found!")
        return

    # Load data
    df = pd.read_csv(dataset_path)
    
    # Features and Target
    X = df[['score', 'accuracy', 'time_taken']]
    y = df['level']
    
    # Encode the target labels (beginner, intermediate, advanced)
    le = LabelEncoder()
    y_encoded = le.fit_transform(y)
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)
    
    # Initialize and train model
    print("Training Random Forest Classifier...")
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Evaluate
    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    
    print(f"\nModel Accuracy: {acc * 100:.2f}%")
    print("\nClassification Report:")
    try:
        # Explicitly pass target labels to handle cases where test set is small
        print(classification_report(y_test, y_pred, target_names=le.classes_, labels=range(len(le.classes_))))
    except Exception as e:
        print(f"Error in classification report: {e}")
        print(classification_report(y_test, y_pred)) # Fallback
    
    # Save model and encoder
    print(f"\nSaving model to {model_path}...")
    joblib.dump(model, model_path)
    joblib.dump(le, encoder_path)
    print("Training complete!")

if __name__ == "__main__":
    train_model()
