from database import get_db_connection

def cleanup_specific_users():
    emails_to_remove = [
        "asvindvincent07@gmail.com",
        "asvindva77@gmail.com",
        "lawrence@gmail.com"
    ]
    
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            for email in emails_to_remove:
                cursor.execute("DELETE FROM users WHERE email = %s", (email,))
                print(f"🗑️ Removed user: {email}")
        conn.commit()
        print("\n✅ Database cleanup complete!")
    except Exception as e:
        print(f"❌ Error during cleanup: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    cleanup_specific_users()
