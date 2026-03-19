import pymysql
import os
import bcrypt
import hashlib
from dotenv import load_dotenv

load_dotenv()

DB_HOST = os.getenv("MYSQL_HOST", "localhost")
DB_USER = os.getenv("MYSQL_USER", "root")
DB_PASS = os.getenv("MYSQL_PASSWORD", "")
DB_NAME = os.getenv("MYSQL_DATABASE", "nexgen_db")
DB_PORT = int(os.getenv("MYSQL_PORT", 3306))

ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
ADMIN_NAME = os.getenv("ADMIN_NAME", "Admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

def get_db_connection():
    return pymysql.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASS,
        database=DB_NAME,
        port=DB_PORT,
        cursorclass=pymysql.cursors.DictCursor
    )

def hash_password(plain: str) -> str:
    pre_hashed = hashlib.sha256(plain.encode('utf-8')).hexdigest().encode('utf-8')
    return bcrypt.hashpw(pre_hashed, bcrypt.gensalt()).decode('utf-8')

def verify_password(plain: str, hashed: str) -> bool:
    pre_hashed = hashlib.sha256(plain.encode('utf-8')).hexdigest().encode('utf-8')
    return bcrypt.checkpw(pre_hashed, hashed.encode('utf-8'))

def init_db():
    # Attempt to create database if it doesn't exist
    try:
        conn = pymysql.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASS,
            port=DB_PORT
        )
        with conn.cursor() as cursor:
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}")
        conn.commit()
    except Exception as e:
        print(f"Error creating database: {e}")
    finally:
        if 'conn' in locals() and conn.open:
            conn.close()

    # Create tables
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    name VARCHAR(255) NOT NULL,
                    password_hash VARCHAR(255) NOT NULL,
                    is_admin BOOLEAN DEFAULT FALSE,
                    user_data LONGTEXT
                )
            ''')
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS boss_performance (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    user_email VARCHAR(255) NOT NULL,
                    module_id VARCHAR(255) NOT NULL,
                    score FLOAT NOT NULL,
                    accuracy FLOAT NOT NULL,
                    time_taken FLOAT NOT NULL,
                    predicted_level VARCHAR(50),
                    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS user_interactions (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    user_email VARCHAR(255) NOT NULL,
                    interaction_type VARCHAR(50) NOT NULL, -- 'message', 'step_move', 'run_code'
                    score FLOAT,
                    accuracy FLOAT,
                    time_taken FLOAT,
                    predicted_level VARCHAR(50),
                    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            # Add is_admin column to existing tables if it doesn't exist yet
            try:
                cursor.execute("ALTER TABLE users ADD COLUMN is_admin BOOLEAN DEFAULT FALSE")
            except Exception:
                pass  # Column already exists
        conn.commit()

        # Seed admin user if not exists
        with conn.cursor() as cursor:
            cursor.execute("SELECT id FROM users WHERE email = %s", (ADMIN_EMAIL,))
            if not cursor.fetchone():
                hashed = hash_password(ADMIN_PASSWORD)
                cursor.execute(
                    "INSERT INTO users (email, name, password_hash, is_admin, user_data) VALUES (%s, %s, %s, %s, %s)",
                    (ADMIN_EMAIL, ADMIN_NAME, hashed, True, '{}')
                )
                print(f"✅ Admin account created: {ADMIN_EMAIL}")
            else:
                print(f"ℹ️  Admin account already exists: {ADMIN_EMAIL}")
        conn.commit()

    except Exception as e:
        print(f"Error initializing tables: {e}")
    finally:
        conn.close()
