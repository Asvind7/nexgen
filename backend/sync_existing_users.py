import os
import json
import pymysql
from database import get_db_connection

def sync_users_to_csv():
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT name, email, user_data FROM users")
            rows = cursor.fetchall()
            
            base_dir = os.path.dirname(os.path.abspath(__file__))
            l_path = os.path.join(os.path.dirname(base_dir), 'model_training', 'learners_data.csv')
            
            # Ensure folder exists
            os.makedirs(os.path.dirname(l_path), exist_ok=True)
            
            # Initialize/Overwite to ensure all existing are there
            with open(l_path, "w", encoding='utf-8') as f:
                f.write("name,email,score,accuracy,time_taken,level\n")
                
                for row in rows:
                    try:
                        user_data = json.loads(row['user_data']) if row['user_data'] else {}
                    except:
                        user_data = {}
                        
                    # Extract stats if they exist, else 0
                    score = user_data.get('score', 0)
                    accuracy = user_data.get('accuracy', 0)
                    time_taken = user_data.get('time_taken', 0)
                    level = user_data.get('level', 'unranked')
                    
                    f.write(f"{row['name']},{row['email']},{score},{accuracy},{time_taken},{level}\n")
            
            print(f"✅ Synced {len(rows)} existing users to {l_path}")
            
    except Exception as e:
        print(f"❌ Error syncing users: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    sync_users_to_csv()
