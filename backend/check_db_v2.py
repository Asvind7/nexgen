import pymysql
import os
from dotenv import load_dotenv

load_dotenv()

conn = pymysql.connect(
    host=os.getenv('MYSQL_HOST', 'localhost'),
    user=os.getenv('MYSQL_USER', 'root'),
    password=os.getenv('MYSQL_PASSWORD', '12345'),
    database=os.getenv('MYSQL_DATABASE', 'nexgen_db'),
    port=int(os.getenv('MYSQL_PORT', 3306))
)

try:
    with conn.cursor() as cursor:
        print("\n--- ALL USERS ---")
        cursor.execute("SELECT id, email, name FROM users")
        for row in cursor.fetchall():
            print(row)
            
        print("\n--- ALL USER INTERACTIONS ---")
        cursor.execute("SELECT * FROM user_interactions")
        interactions = cursor.fetchall()
        print(f"Count: {len(interactions)}")
        for row in interactions:
            print(row)
            
        print("\n--- ALL BOSS PERFORMANCE LOGS ---")
        cursor.execute("SELECT * FROM boss_performance")
        boss_logs = cursor.fetchall()
        print(f"Count: {len(boss_logs)}")
        for row in boss_logs:
            print(row)
finally:
    conn.close()
