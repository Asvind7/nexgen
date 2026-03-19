import pandas as pd
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
import os
import joblib

# FORCE MATPLOTLIB TO BE NON-INTERACTIVE (Works in all environments!)
import matplotlib
matplotlib.use('Agg')

# Paths
base_dir = os.path.dirname(os.path.abspath(__file__))
dataset_path = os.path.join(base_dir, 'dataset.csv')
model_path = os.path.join(base_dir, 'learner_model.joblib')
encoder_path = os.path.join(base_dir, 'label_encoder.joblib')
output_dir = os.path.join(base_dir, 'graphs')

# Create output dir for images
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Load data
df = pd.read_csv(dataset_path)

def create_dashboard():
    print("Generating Visualizations...")
    
    # Set the style
    plt.style.use('ggplot')
    
    # 1. Level Distribution (Bar Chart)
    try:
        plt.figure(figsize=(8, 6))
        df['level'].value_counts().plot(kind='bar', color=['#3498db', '#2ecc71', '#e74c3c'])
        plt.title("Learner Level Distribution")
        plt.xlabel("Level")
        plt.ylabel("Number of Learners")
        plt.tight_layout()
        plt.savefig(os.path.join(output_dir, '1_level_distribution.png'))
        print("Saved Graph 1: Level Distribution")
    except Exception as e:
        print(f"Failed Graph 1: {e}")

    # 2. Score vs Time Taken (Scatter Plot)
    try:
        plt.figure(figsize=(8, 6))
        colors = {'beginner': 'red', 'intermediate': 'blue', 'advanced': 'green'}
        for level, color in colors.items():
            subset = df[df['level'] == level]
            plt.scatter(subset['score'], subset['time_taken'], color=color, label=level, alpha=0.7)
        plt.title("Score vs Time Taken")
        plt.xlabel("Score")
        plt.ylabel("Time Taken (seconds)")
        plt.legend()
        plt.tight_layout()
        plt.savefig(os.path.join(output_dir, '2_score_vs_time.png'))
        print("Saved Graph 2: Score vs Time Taken")
    except Exception as e:
        print(f"Failed Graph 2: {e}")

    # 3. Accuracy vs Level (Grouped Mean)
    try:
        plt.figure(figsize=(8, 6))
        df.groupby('level')['accuracy'].mean().plot(kind='bar', color='#f39c12')
        plt.title("Average Accuracy by Level")
        plt.xlabel("Level")
        plt.ylabel("Accuracy (%)")
        plt.tight_layout()
        plt.savefig(os.path.join(output_dir, '3_accuracy_by_level.png'))
        print("Saved Graph 3: Accuracy vs Level")
    except Exception as e:
        print(f"Failed Graph 3: {e}")

    # 4. Average Time Taken per Level (Bar Chart)
    try:
        plt.figure(figsize=(8, 6))
        df.groupby('level')['time_taken'].mean().plot(kind='bar', color='#9b59b6')
        plt.title("Average Time Taken per Level")
        plt.xlabel("Level")
        plt.ylabel("Time (seconds)")
        plt.tight_layout()
        plt.savefig(os.path.join(output_dir, '4_average_time_per_level.png'))
        print("Saved Graph 4: Average Time per Level")
    except Exception as e:
        print(f"Failed Graph 4: {e}")

    # 5. BONUS: Confusion Matrix (Impressive!)
    try:
        if os.path.exists(model_path) and os.path.exists(encoder_path):
            model = joblib.load(model_path)
            le = joblib.load(encoder_path)
            
            from sklearn.model_selection import train_test_split
            X = df[['score', 'accuracy', 'time_taken']]
            y = le.transform(df['level'])
            _, X_test, _, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
            
            y_pred = model.predict(X_test)
            cm = confusion_matrix(y_test, y_pred)
            
            plt.figure(figsize=(8, 6))
            # Manual plot instead of disp.plot to avoid tick issues
            plt.imshow(cm, interpolation='nearest', cmap=plt.cm.Blues)
            plt.title("Confusion Matrix (Model Performance)")
            plt.colorbar()
            tick_marks = range(len(le.classes_))
            plt.xticks(tick_marks, le.classes_, rotation=45)
            plt.yticks(tick_marks, le.classes_)
            plt.ylabel('True label')
            plt.xlabel('Predicted label')
            plt.tight_layout()
            plt.savefig(os.path.join(output_dir, '5_confusion_matrix.png'))
            print("Saved Graph 5: Confusion Matrix")
    except Exception as e:
        print(f"Failed Graph 5: {e}")
    
    print(f"\nAll graphs saved in: {output_dir}")
    print("\nPRO TIP: Show these in your PPT for extra marks! 📊🚀")
    
if __name__ == "__main__":
    create_dashboard()
