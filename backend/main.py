import sys
import io
import asyncio
import uuid
import contextlib
import traceback
from collections import deque
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from google import genai
from google.genai import types
from google.api_core import exceptions
import uvicorn
import pymysql
import hashlib
import bcrypt

import os
import json
import random
from dotenv import load_dotenv
import database
import joblib
import pandas as pd
import base64

# Load environment variables
load_dotenv()

# --- CONFIGURATION ---
class Config:
    API_TITLE = "NexGen High-Performance Backend"
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    # UPDATED MODEL: Use Gemini 3.1 Flash Lite Preview
    MODEL_NAME = "gemma-3-27b-it" 
    MAX_TOKENS = 1000
    TEMPERATURE = 0.7
    # RATE LIMITS (Free Tier for Gemma 3 27B-it)
    # Note: These are based on typical Google AI Studio free tier quotas
    RPM_LIMIT = 15      # Requests Per Minute
    TPM_LIMIT = 250000  # Tokens Per Minute
    RPD_LIMIT = 500     # Requests Per Day
    HOST = "0.0.0.0"
    PORT = int(os.getenv("PORT", 8000))


# Initialize DB from separate file
database.init_db()

# --- MODELS ---
class ChatMessage(BaseModel):
    role: str
    content: str
    
class ChatRequest(BaseModel):
    prompt: str = Field(..., min_length=1, description="User input prompt")
    level: str = Field("Beginner", description="User proficiency level")
    topic: str = Field("General Python", description="Current learning topic")
    history: List[Dict[str, str]] = Field(default_factory=list, description="Conversation history")
    system: Optional[str] = Field(None, description="Custom system prompt override")

class ExecutionRequest(BaseModel):
    code: str = Field(..., description="Python code to execute")
    stdin: Optional[str] = Field("", description="Simulated stdin lines, separated by newlines")

class ExecutionResponse(BaseModel):
    output: str
    error: Optional[str] = None

class SignupRequest(BaseModel):
    email: str = Field(..., description="User's email")
    name: str = Field(..., description="User's name")
    password: str = Field(..., description="User's password")

class LoginRequest(BaseModel):
    email: str = Field(..., description="User's email")
    password: str = Field(..., description="User's password")

class SyncRequest(BaseModel):
    email: str = Field(..., description="User's email")
    user_data: dict = Field(..., description="Current state of user dictionary")

class PredictRequest(BaseModel):
    score: float
    accuracy: float
    time_taken: float
    name: Optional[str] = "Anonymous"
    email: Optional[str] = "anonymous@test.com"

# --- APP SETUP ---
app = FastAPI(title=Config.API_TITLE)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Generative AI Client
try:
    print(f"🔧 Initializing Google AI Client with model: {Config.MODEL_NAME}")
    client = genai.Client(api_key=Config.GOOGLE_API_KEY)
except Exception as e:
    print(f"❌ Failed to initialize Google AI Client: {e}")
    client = None

# --- RATE LIMITER ---
class SimpleRateLimiter:
    def __init__(self, rpm: int):
        self.rpm = rpm
        self.interval = 60.0 / rpm
        self.lock = asyncio.Lock()
        self.last_call = 0.0

    async def wait(self):
        async with self.lock:
            now = asyncio.get_event_loop().time()
            elapsed = now - self.last_call
            if elapsed < self.interval:
                wait_time = self.interval - elapsed
                await asyncio.sleep(wait_time)
            self.last_call = asyncio.get_event_loop().time()

chat_limiter = SimpleRateLimiter(Config.RPM_LIMIT)

# --- HELPERS ---
def build_system_prompt(topic: str, level: str) -> str:
    """Constructs the pedagogical system prompt based on context."""
    return (
        f"IDENTITY: **AdaptiveMaster** (Supportive Master Mentor) 🧠\n"
        f"CONTEXT: User Level: **{level}** | Current Topic Focus: **{topic}**\n\n"
        
        "### 📜 CORE PHILOSOPHY\n"
        "- **LEVEL AWARENESS**: If a user asks about an advanced concept, respond with: 'That is a brilliant curiosity! While it's a bit beyond our current mission, I love that you're thinking ahead. Here's a quick look:'\n"
        "- **ADAPTIVE HINTS**: Instead of full answers, provide small definitions or nudge-like hints.\n"
        "- **SOCRATIC METHOD**: Guide them to discover the answer. Ask a follow-up question that helps them think.\n\n"
        
        "### 🎯 INSTRUCTIONAL LOOP\n"
        "1. **ACKNOWLEDGE**: Stay positive and encouraging at all times.\n"
        "2. **BITE-SIZED DEF**: Provide a 1-sentence definition and a tiny code example wrapped in Markdown backticks.\n"
        "3. **PEDAGOGICAL NUDGE**: Ask a follow up question to guide them back to their current level.\n\n"
        
        "### 🚫 STRICT PROHIBITIONS\n"
        "- **NO OVERWHELMING**: No long paragraphs. No multi-file code blocks.\n"
        "- **BE HUMAN**: Be a supportive, expert human mentor 🐍. Keep emojis sparse but encouraging."
    )

def _execute_safe(code: str, stdin: str = "") -> ExecutionResponse:
    """
    Executes code in a controlled environment.
    Redirects stdout and mocks input() with pre-supplied stdin lines.
    """
    buffer = io.StringIO()
    error_msg = None
    
    # Parse stdin lines into a queue
    stdin_lines = stdin.strip().split("\n") if stdin.strip() else []
    stdin_iter = iter(stdin_lines)
    stdin_used = []

    def mock_input(prompt=""):
        buffer.write(str(prompt))  # Show prompt in output
        try:
            val = next(stdin_iter)
            stdin_used.append(val)
            buffer.write(val + "\n")
            return val
        except StopIteration:
            raise EOFError("No more input values provided")

    safe_globals = {"__builtins__": __builtins__, "input": mock_input}
    safe_locals = {}

    try:
        with contextlib.redirect_stdout(buffer):
            exec(code, safe_globals, safe_locals)
        output = buffer.getvalue()
    except Exception:
        output = buffer.getvalue()
        error_msg = traceback.format_exc().splitlines()[-1]
    
    return ExecutionResponse(output=output, error=error_msg)

# --- ENDPOINTS ---

@app.post("/auth/signup")
async def signup(payload: SignupRequest):
    conn = database.get_db_connection()
    # Use centralized helper from database.py
    hashed_password = database.hash_password(payload.password)
    try:
        with conn.cursor() as cursor:
            cursor.execute("INSERT INTO users (email, name, password_hash, user_data) VALUES (%s, %s, %s, %s)", 
                           (payload.email, payload.name, hashed_password, '{}'))
        conn.commit()
    except pymysql.err.IntegrityError:
        conn.close()
        raise HTTPException(status_code=400, detail="Email already exists")
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn.open:
            conn.close()
            
    # APPEND TO learners_data.csv & dataset.csv
    try:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        l_path = os.path.join(os.path.dirname(base_dir), 'model_training', 'learners_data.csv')
        d_path = os.path.join(os.path.dirname(base_dir), 'model_training', 'dataset.csv')
        
        # 1. Sync Tracking CSV
        if not os.path.exists(l_path):
             with open(l_path, "w", encoding='utf-8') as f:
                f.write("name,email,score,accuracy,time_taken,level\n")
        
        with open(l_path, "a", encoding='utf-8') as f:
            f.write(f"{payload.name},{payload.email},0,0,0,beginner\n")

        # 2. Sync Training Dataset
        if os.path.exists(d_path):
            try:
                df_existing = pd.read_csv(d_path)
                next_id = len(df_existing) + 1
            except:
                next_id = 1
                
            with open(d_path, "a", encoding='utf-8') as f:
                # Add a baseline entry for the new user
                f.write(f"\n{next_id},0,0,0,beginner")
        
        print(f"📄 New learner recorded and datasets synced: {payload.email} (Sequential ID: {next_id})")
        
        # 3. Trigger Automatic Retrain
        try:
            from sys import path
            path.append(os.path.join(os.path.dirname(base_dir), 'model_training'))
            import train_model
            asyncio.create_task(asyncio.to_thread(train_model.train_model))
            print("🚀 Background auto-retrain triggered!")
        except Exception as e:
            print(f"⚠️ Retrain trigger failed: {e}")

    except Exception as e:
        print(f"⚠️ Warning: Could not log signup to CSV: {e}")
        
    return {"message": "User created successfully"}

@app.post("/auth/login")
async def login(payload: LoginRequest):
    conn = database.get_db_connection()
    with conn.cursor() as cursor:
        cursor.execute("SELECT password_hash, name, user_data, is_admin FROM users WHERE email = %s", (payload.email,))
        row = cursor.fetchone()
    
    if not row or not database.verify_password(payload.password, row['password_hash']):
        conn.close()
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    name = row['name']
    user_data_str = row['user_data']
    is_admin = bool(row['is_admin'])
    conn.close()
    
    try:
        user_data = json.loads(user_data_str) if user_data_str else {}
    except:
        user_data = {}
        
    return {"message": "Login successful", "user_data": user_data, "name": name, "is_admin": is_admin}

@app.post("/auth/sync")
async def sync_data(payload: SyncRequest):
    conn = database.get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("UPDATE users SET user_data = %s WHERE email = %s", (json.dumps(payload.user_data), payload.email))
        conn.commit()
    finally:
        conn.close()
    return {"message": "Data synced"}

@app.get("/leaderboard")
async def get_leaderboard():
    conn = database.get_db_connection()
    try:
        with conn.cursor() as cursor:
            # Fetch all users
            cursor.execute("SELECT name, user_data FROM users")
            rows = cursor.fetchall()
            
            lb = []
            for row in rows:
                try:
                    user_data = json.loads(row['user_data']) if row['user_data'] else {}
                    xp = user_data.get('xp', 0)
                    lb.append({"name": row['name'], "xp": xp})
                except:
                    lb.append({"name": row['name'], "xp": 0})
            
            # Sort by XP descending
            lb.sort(key=lambda x: x['xp'], reverse=True)
            
            # Add rank
            for i, entry in enumerate(lb):
                entry['rank'] = i + 1
                
            return lb[:10] # Return top 10
    finally:
        conn.close()

@app.get("/")
async def health_check():
    """Health check endpoint to verify backend status."""
    return {"status": "active", "model": Config.MODEL_NAME}

@app.post("/chat")
async def chat_endpoint(payload: ChatRequest):
    """
    Handles chat interactions with the AI Tutor.
    Manages history, context, and persona injection.
    """
    if not client:
        print("❌ API Client not initialized")
        raise HTTPException(status_code=503, detail="AI Service Unauthorized")

    try:
        # Rate limit check
        await chat_limiter.wait()
        
        # print(f"💬 Chat Request: Prompt Length={len(payload.prompt)}, Topic={payload.topic}")


        # 1. Prepare Context
        # Keep last 6 messages to maintain context window efficiency
        recent_history = list(deque(payload.history, maxlen=6))


        
        # 2. Build Prompt — use custom override if provided (e.g. guided/master project mode)
        system_instruction = payload.system if payload.system else build_system_prompt(payload.topic, payload.level)
        
        contents = []
        
        # Map history to Google GenAI Content types
        for msg in recent_history:
            role = "model" if msg.get("role") in ["ai", "assistant", "model"] else "user"
            contents.append(types.Content(role=role, parts=[types.Part.from_text(text=msg.get("content", ""))]))
        
        # Append current user prompt
        contents.append(types.Content(role="user", parts=[types.Part.from_text(text=payload.prompt)]))

        # 3. Inject System Instruction (V3 Fix for Gemma 27b/Gemini)
        # Merges system prompt into the first user message or adds it if history is empty
        
        # ADD JSON CONSTRAINT TO SYSTEM PROMPT if it looks like a structured request
        if system_instruction and any(keyword in system_instruction.lower() for keyword in ["json", "output format", "schema"]):
            system_instruction = str(system_instruction) + "\n\nIMPORTANT: YOU MUST OUTPUT VALID JSON ONLY. DO NOT INCLUDE ANY MARKDOWN CODE BLOCKS OR TEXT OUTSIDE THE JSON."

        if contents:
            if contents[0].role == "user":
                original_text = contents[0].parts[0].text
                contents[0].parts[0].text = f"{system_instruction}\n\n---\n\n{original_text}"
            else:
                # If first history item is model (rare but possible), prepend explicit user instructions
                contents.insert(0, types.Content(role="user", parts=[types.Part.from_text(text=system_instruction)]))
        else:
            # Fallback for empty history/prompt (should cover pydantic validator though)
            contents.append(types.Content(role="user", parts=[types.Part.from_text(text=system_instruction)]))

        # 4. Generate Response
        # WRAP BLOCKING CALL IN THREAD
        response = await asyncio.to_thread(
            client.models.generate_content,
            model=Config.MODEL_NAME,
            contents=contents,
            config=types.GenerateContentConfig(
                max_output_tokens=Config.MAX_TOKENS,
                temperature=Config.TEMPERATURE
            )
        )
        return {"response": response.text}

    except Exception as e:
        # Check for 429/Resource Exhausted specifically in the error message or type
        err_str = str(e).upper()
        if "429" in err_str or "RESOURCE_EXHAUSTED" in err_str or "QUOTA" in err_str:
             print("⚠️ Quota Limit Reached (429)")
             # Return a friendly structured error that the frontend extractJSON can handle if needed
             # or a friendly string for general chat
             return {"response": "😓 Phew! My brain is overheating (Rate Limit). Give me 10-20 seconds to cool down! 🧊"}
        
        print(f"❌ GenAI Error Details: {traceback.format_exc()}")
        # Return a friendly error to the frontend instead of 500
        return {"response": "⚠️ My connection slipped! Please try asking again. 🔌"}

@app.post("/execute", response_model=ExecutionResponse)
async def execute_code_endpoint(payload: ExecutionRequest):
    """
    Executes Python code from the frontend editor.
    Runs in a thread pool to prevent blocking the async event loop.
    """
    try: 
        res = await asyncio.to_thread(_execute_safe, payload.code, payload.stdin or "")
        return res
    except Exception as e:
        print(f"❌ Execution Error: {e}")
        return ExecutionResponse(output="", error=str(e))

@app.post("/predict")
async def predict_level_endpoint(payload: PredictRequest):
    """
    Predicts the learner level based on quiz performance using the trained ML model.
    """
    try:
        # Paths relative to the backend folder
        base_path = os.path.dirname(__file__)
        model_file = os.path.join(base_path, "models", "learner_model.joblib")
        encoder_file = os.path.join(base_path, "models", "label_encoder.joblib")
        
        if not os.path.exists(model_file):
            raise FileNotFoundError("Model files not found in backend/models/")

        # Load model and encoder
        model = joblib.load(model_file)
        le = joblib.load(encoder_file)

        # Prepare input
        input_data = pd.DataFrame([{
            'score': payload.score,
            'accuracy': payload.accuracy,
            'time_taken': payload.time_taken
        }])

        # Predict
        prediction_encoded = model.predict(input_data)
        level_name = le.inverse_transform(prediction_encoded)[0]

        # Log new data to dataset.csv (CRITICAL FOR CONTINUOUS LEARNING)
        try:
            # dataset.csv is in model_training folder
            dataset_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'model_training', 'dataset.csv')
            if os.path.exists(dataset_path):
                # Using pandas to handle the append safely
                df_existing = pd.read_csv(dataset_path)
                next_id = len(df_existing) + 1
                new_row = pd.DataFrame([{
                    'learner_id': next_id,
                    'score': payload.score,
                    'accuracy': payload.accuracy,
                    'time_taken': payload.time_taken,
                    'level': level_name
                }])
                new_row.to_csv(dataset_path, mode='a', header=False, index=False)
                print(f"📊 Dataset updated! User performance recorded as {level_name}")
                
            # ALSO UPDATE learners_data.csv (Combined Tracking)
            l_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'model_training', 'learners_data.csv')
            if os.path.exists(l_path):
                # Using append to keep track of every quiz attempt
                with open(l_path, "a", encoding='utf-8') as f:
                    # name,email,score,accuracy,time_taken,level
                    f.write(f"{payload.name},{payload.email},{payload.score},{payload.accuracy},{payload.time_taken},{level_name}\n")
                print(f"📊 Tracking updated for: {payload.name}")
        except Exception as e:
            print(f"⚠️ Warning: Could not log to CSV: {e}")

        return {"level": level_name}
    except Exception as e:
        print(f"❌ Prediction Error: {e}")
        # Rule-based fallback
        level = "beginner"
        if payload.score >= 8: level = "advanced"
        elif payload.score >= 5: level = "intermediate"
        return {"level": level, "error": str(e)}

@app.get("/leaderboard")
async def get_leaderboard():
    """Returns top learners sorted by XP from the database."""
    conn = database.get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT name, email, user_data FROM users WHERE is_admin = FALSE")
            rows = cursor.fetchall()
            
            leaderboard = []
            for row in rows:
                try:
                    data = json.loads(row['user_data'] or '{}')
                    xp = data.get('xp', 0)
                    level = data.get('level', 'Beginner')
                    leaderboard.append({
                        "name": row['name'],
                        "email": row['email'],
                        "xp": xp,
                        "level": level
                    })
                except:
                    continue
            
            # Sort by XP descending
            leaderboard.sort(key=lambda x: x['xp'], reverse=True)
            
            # Add rank
            for i, entry in enumerate(leaderboard):
                entry['rank'] = i + 1
                
            return leaderboard[0:10] # Top 10
    except Exception as e:
        print(f"❌ Leaderboard Error: {e}")
        return []
    finally:
        conn.close()

@app.get("/dashboard")
async def get_ml_dashboard():
    """Returns dataset statistics and base64-encoded graphs for presentation."""
    base_dir = os.path.dirname(os.path.abspath(__file__))
    # Graphs are stored in the model_training folder
    graphs_dir = os.path.join(os.path.dirname(base_dir), 'model_training', 'graphs')
    dataset_path = os.path.join(os.path.dirname(base_dir), 'model_training', 'dataset.csv')
    
    try:
        # 1. Dataset Stats
        df = pd.read_csv(dataset_path)
        stats = {
            "total_learners": len(df),
            "avg_accuracy": float(df['accuracy'].mean()),
            "avg_score": float(df['score'].mean()),
            "level_counts": df['level'].value_counts().to_dict()
        }
        
        # 2. Collect Graphs as Base64
        graphs = {}
        if os.path.exists(graphs_dir):
            for filename in os.listdir(graphs_dir):
                if filename.endswith(".png"):
                    with open(os.path.join(graphs_dir, filename), "rb") as img_file:
                        encoded_string = base64.b64encode(img_file.read()).decode('utf-8')
                        graphs[filename] = f"data:image/png;base64,{encoded_string}"
        
        return {"stats": stats, "graphs": graphs}
    except Exception as e:
        print(f"❌ Dashboard Error: {e}")
        return {"error": str(e)}

if __name__ == "__main__":
    print(f"🚀 Starting Backend on {Config.HOST}:{Config.PORT}")
    try:
        uvicorn.run(app, host=Config.HOST, port=Config.PORT)
    except KeyboardInterrupt:
        print("\n🛑 Server stopping...")
    except Exception as e:
        print(f"\n🔥 Server CRASHED: {e}")
        traceback.print_exc()