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
        cursor.execute("SELECT id, email, name FROM users WHERE email = 'testuser_unique_125@example.com'")
        user = cursor.fetchone()
        print(f"User Found: {user}")
            
        print("\n--- LAST 10 INTERACTIONS ---")
        cursor.execute("SELECT * FROM user_interactions ORDER BY id DESC LIMIT 10")
        interactions = cursor.fetchall()
        for row in interactions:
            print(row)
            
        print("\n--- BOSS PERFORMANCE ---")
        cursor.execute("SELECT * FROM boss_performance ORDER BY id DESC LIMIT 10")
        boss_logs = cursor.fetchall()
        for row in boss_logs:
            print(row)
finally:
    conn.close()
