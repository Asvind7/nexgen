import pymysql
import os
from dotenv import load_dotenv

load_dotenv()

conn = pymysql.connect(
    host=os.getenv('MYSQL_HOST', 'localhost'),
    user=os.getenv('MYSQL_USER', 'root'),
    password=os.getenv('MYSQL_PASSWORD', ''),
    database=os.getenv('MYSQL_DATABASE', 'nexgen_db'),
    port=int(os.getenv('MYSQL_PORT', 3306))
)

try:
    with conn.cursor() as cursor:
        print("--- USER INTERACTIONS ---")
        cursor.execute("SELECT * FROM user_interactions")
        for row in cursor.fetchall():
            print(row)
            
        print("\n--- BOSS PERFORMANCE ---")
        cursor.execute("SELECT * FROM boss_performance")
        for row in cursor.fetchall():
            print(row)
            
        print("\n--- USERS ---")
        cursor.execute("SELECT email, name FROM users")
        for row in cursor.fetchall():
            print(row)
finally:
    conn.close()
