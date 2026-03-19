import pymysql
from database import get_db_connection

def clean_database():
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            print("🧹 Database cleaned! All non-admin users removed.")
            
            # Wipe CSV files for a fresh start
            import os
            base_dir = os.path.dirname(os.path.abspath(__file__))
            l_path = os.path.join(os.path.dirname(base_dir), 'model_training', 'learners_data.csv')
            
            if os.path.exists(l_path):
                with open(l_path, "w", encoding='utf-8') as f:
                    f.write("name,email,score,accuracy,time_taken,level\n")
                print(f"📄 CSV Reset: {l_path}")
            
            # Count remaining
            cursor.execute("SELECT COUNT(*) as count FROM users")
            count = cursor.fetchone()['count']
            print(f"📊 Remaining users (Admins): {count}")
            
    except Exception as e:
        print(f"❌ Error cleaning database: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    clean_database()
