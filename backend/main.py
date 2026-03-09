import sys
import io
import asyncio
import uuid
import contextlib
import traceback
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
# ... existing SQLite logic explicitly removed from headers ...
import json
from dotenv import load_dotenv
import database

# Load environment variables
load_dotenv()

# --- CONFIGURATION ---
class Config:
    API_TITLE = "NexGen High-Performance Backend"
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    # UPDATED MODEL: Use Gemma 2 9B (Fallback)
    MODEL_NAME = "gemma-3-27b-it" 
    MAX_TOKENS = 1000
    TEMPERATURE = 0.7
    HOST = "0.0.0.0"
    PORT = 8000

import bcrypt

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

# --- HELPERS ---
def build_system_prompt(topic: str, level: str) -> str:
    """Constructs the pedagogical system prompt based on context."""
    return (
        f"IDENTITY: **AdaptiveMaster** (Warm Master Mentor) 🧠\n"
        f"CONTEXT: User Level: **{level}** | Current Topic Focus: **{topic}**\n\n"
        
        "### 📜 CORE PHILOSOPHY\n"
        "- **LEVEL AWARENESS/ADVANCED TOPIC**: If a user asks about a complex topic (e.g., Classes, Modules) that is beyond their current {level} or {topic}:\n"
        "   1. You **MUST** start your response with this EXACT phrase: 'you are asking the topic which is too adavanced for you anyway I can help you'\n"
        "   2. Briefly state what the topic is.\n"
        "   3. Provide a brief answer. ANY Python code you provide MUST be wrapped in triple backticks (```python ... ```) for syntax highlighting.\n"
        "- **ADAPTIVE HINTS**: Instead of full answers, provide small definitions or nudge-like hints.\n"
        "- **SOCRATIC METHOD**: Guide them to discover the answer. Ask a follow-up question that helps them think.\n\n"
        
        "### 🎯 INSTRUCTIONAL LOOP\n"
        "1. **ACKNOWLEDGE**: If it's an advanced topic, you MUST use the exact fallback phrase mentioned in the LEVEL AWARENESS rule.\n"
        "2. **BITE-SIZED DEF**: Provide a 1-sentence definition and a tiny code example wrapped in Markdown backticks.\n"
        "3. **PEDAGOGICAL NUDGE**: Ask a follow up question to guide them back to their current level.\n\n"
        
        "### 🚫 STRICT PROHIBITIONS\n"
        "- **NO OVERWHELMING**: No long paragraphs. No multi-file code blocks.\n"
        "- **STRICT TOPIC GUARD**: Stay focused on **{topic}** unless the user explicitly asks for something else. If they do, use the 'Advanced Topic' acknowledgment mentioned above.\n"
        "- **NO SPOILERS**: Don't give full solutions if they are in the middle of a coding mission.\n"
        "- **BE HUMAN**: No 'As an AI'. Be a supportive, expert human mentor 🐍. Keep emojis sparse but encouraging."
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
    cursor = conn.cursor()
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
    return {"message": "User created successfully"}

@app.post("/auth/login")
async def login(payload: LoginRequest):
    conn = database.get_db_connection()
    cursor = conn.cursor()
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
        # print(f"💬 Chat Request: Prompt Length={len(payload.prompt)}, Topic={payload.topic}")

        # 1. Prepare Context
        # Keep last 6 messages to maintain context window efficiency
        recent_history = payload.history[-6:] if payload.history else []
        
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

    except exceptions.ResourceExhausted:
         print("⚠️ Quota Limit Reached")
         return {"response": "😓 Phew! My brain is overheating (Rate Limit). Give me 10 seconds to cool down! 🧊"}
    
    except Exception as e:
        print(f"❌ GenAI Error Details: {traceback.format_exc()}")
        # Return a friendly error to the frontend instead of 500
        return {"response": "⚠️ My connection slipped! Please try asking again. 🔌"}

    except BaseException as e:
        print(f"🔥 CRITICAL ERROR: {e}")
        traceback.print_exc()
        raise e # Let detailed crash happen if it's system related, or catch?

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

if __name__ == "__main__":
    print(f"🚀 Starting Backend on {Config.HOST}:{Config.PORT}")
    try:
        uvicorn.run(app, host=Config.HOST, port=Config.PORT)
    except KeyboardInterrupt:
        print("\n🛑 Server stopping...")
    except Exception as e:
        print(f"\n🔥 Server CRASHED: {e}")
        traceback.print_exc()