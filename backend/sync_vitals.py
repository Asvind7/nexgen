import os
import json
import pandas as pd
from database import get_db_connection

def sync_vitals_to_dataset():
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            # Only pull users who have actually taken the quiz (level != unranked)
            cursor.execute("SELECT user_data FROM users")
            rows = cursor.fetchall()
            
            base_dir = os.path.dirname(os.path.abspath(__file__))
            dataset_path = os.path.join(os.path.dirname(base_dir), 'model_training', 'dataset.csv')
            
            if not os.path.exists(dataset_path):
                print("❌ dataset.csv not found!")
                return

            df = pd.read_csv(dataset_path)
            start_count = len(df)
            
            new_entries = []
            for row in rows:
                try:
                    user_data = json.loads(row['user_data']) if row['user_data'] else {}
                    level = user_data.get('level', 'unranked').lower()
                    
                    # Only add if they have a real level and scores
                    if level != 'unranked' and 'score' in user_data:
                        new_entries.append({
                            'learner_id': len(df) + len(new_entries) + 1,
                            'score': user_data.get('score', 0),
                            'accuracy': user_data.get('accuracy', 0),
                            'time_taken': user_data.get('time_taken', 0),
                            'level': level
                        })
                except:
                    continue
            
            if new_entries:
                df_new = pd.DataFrame(new_entries)
                df_combined = pd.concat([df, df_new], ignore_index=True)
                df_combined.to_csv(dataset_path, index=False)
                print(f"✅ Added {len(new_entries)} real student records to dataset.csv")
                print(f"📈 Total Training Samples: {len(df_combined)}")
            else:
                print("ℹ️ No new quiz performances found in DB to sync.")
                
    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    sync_vitals_to_dataset()
