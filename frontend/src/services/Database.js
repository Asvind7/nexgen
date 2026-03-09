import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

let db = null;

export const initDatabase = async () => {
  try {
    const sqlite3 = await sqlite3InitModule(); // This wakes up the engine
    db = new sqlite3.oo1.DB("/nexgen.db", "c");
    
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        level TEXT DEFAULT 'Beginner',
        xp INTEGER DEFAULT 0
      );
    `);
    
    console.log("Memory is ready! 🧠");
  } catch (err) {
    console.error("SQL Error:", err);
  }
};

export const getDb = () => db;