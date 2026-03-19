import os
import json
import random
import pandas as pd
from database import get_db_connection, hash_password

def create_dummies():
    users = [
        {"name": "Alice", "level": "Beginner", "xp": 150},
        {"name": "Bob", "level": "Beginner", "xp": 280},
        {"name": "Charlie", "level": "Intermediate", "xp": 1250},
        {"name": "Daisy", "level": "Intermediate", "xp": 1800},
        {"name": "Ethan", "level": "Intermediate", "xp": 2100},
        {"name": "Fiona", "level": "Intermediate", "xp": 2400},
        {"name": "George", "level": "Intermediate", "xp": 2750},
        {"name": "Hannah", "level": "Advanced", "xp": 5600},
        {"name": "Ian", "level": "Advanced", "xp": 6200},
        {"name": "Jack", "level": "Advanced", "xp": 7500},
    ]

    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            for i, u in enumerate(users):
                email = f"user{i+1}@dummy.com"
                password = "Password123"
                hashed = hash_password(password)
                
                # Create user_data string
                user_data = {
                    "level": u['level'],
                    "xp": u['xp'],
                    "streak": random.randint(1, 15),
                    "hearts": 3,
                    "completedModules": []
                }
                
                cursor.execute(
                    "REPLACE INTO users (email, name, password_hash, is_admin, user_data) VALUES (%s, %s, %s, %s, %s)",
                    (email, u['name'], hashed, False, json.dumps(user_data))
                )
                print(f"✅ Updated {u['name']} ({u['level']})")
                
        conn.commit()
        print("\n🚀 10 Dummy Users updated successfully in DB!")
        
        # 1. CLEAN Sync Tracking CSV (OVERWRITE to prevent duplicates like 'Alice Beginner')
        l_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'model_training', 'learners_data.csv')
        with open(l_path, "w", encoding='utf-8') as f:
            f.write("name,email,score,accuracy,time_taken,level\n")
            for u in users:
                idx = users.index(u)
                email = f"user{idx+1}@dummy.com"
                score = 9 if u['level'] == 'Advanced' else 6 if u['level'] == 'Intermediate' else 3
                acc = 95 if u['level'] == 'Advanced' else 75 if u['level'] == 'Intermediate' else 50
                time = 20 if u['level'] == 'Advanced' else 45 if u['level'] == 'Intermediate' else 90
                f.write(f"{u['name']},{email},{score},{acc},{time},{u['level'].lower()}\n")
        print("📊 Cleaned and synchronized 10 dummies to learners_data.csv!")
        
        # 2. Sync Training Dataset
        d_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'model_training', 'dataset.csv')
        if os.path.exists(d_path):
            try:
                # Keep first 50 base entries, then our 10 fresh dummies
                df = pd.read_csv(d_path)
                df_base = df.head(50)
                
                dummy_rows = []
                for i, u in enumerate(users):
                    score = 9 if u['level'] == 'Advanced' else 6 if u['level'] == 'Intermediate' else 3
                    acc = 95 if u['level'] == 'Advanced' else 75 if u['level'] == 'Intermediate' else 50
                    time = 20 if u['level'] == 'Advanced' else 45 if u['level'] == 'Intermediate' else 90
                    dummy_rows.append({
                        'learner_id': 51 + i,
                        'score': score,
                        'accuracy': acc,
                        'time_taken': time,
                        'level': u['level'].lower()
                    })
                
                df_dummies = pd.DataFrame(dummy_rows)
                df_final = pd.concat([df_base, df_dummies])
                df_final.to_csv(d_path, index=False)
                print(f"📊 dataset.csv updated: 50 base + 10 fresh dummies (Total {len(df_final)})")
            except Exception as e:
                print(f"⚠️ Dataset cleanup failed: {e}")
                
            # Now trigger the trainer script
            try:
                from sys import path
                path.append(os.path.join(os.path.dirname(os.path.dirname(__file__)), 'model_training'))
                import train_model
                print("\n🧠 RE-TRAINING ML MODEL AUTOMATICALLY...")
                train_model.train_model()
            except Exception as e:
                print(f"⚠️ Retrain trigger failed: {e}")
    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    create_dummies()
