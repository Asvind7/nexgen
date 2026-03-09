# NexGen: Detailed Project Documentation

NexGen is an AI-native, gamified learning ecosystem designed to transform the way individuals learn Python. By moving away from static video lectures and towards an **Active Cognitive Architecture**, NexGen provides a deeply personalized experience that adapts in real-time to a learner's strengths, weaknesses, and psychological state.

---

## 🏗️ System Architecture

NexGen operates on a modern full-stack architecture, decoupling logic into specialized "Engines" that communicate via high-performance REST APIs.

### 1. The Frontend (React/Vite)
The client is responsible for the immersive UI, gamification state, and immediate feedback loops.
- **State Management**: Uses React state and `localStorage` to persist user profiles, XP, hearts, and syllabus progress.
- **Adaptive UI**: Components like `MasterIDE` and `JourneyMap` change their look-and-feel based on the user's progress and the "Phase" of the course they are currently in.
- **Real-time Sanitization**: Implements client-side fail-safes to ensure the AI follows pedagogical rules (e.g., stripping code snippets in Master Mode).

### 2. The Backend (FastAPI)
A high-performance Python server that serves as the "Bridge" to the Neural Engine.
- **Execution Sandbox**: Provides a secure `execute` endpoint that runs user-submitted Python code and returns standard output/errors.
- **AI Gateway**: Connects to **Gemma 3 (Google GenAI)**. It handles prompt engineering, history management, and custom system instruction overrides.
- **Persistence Layer**: Uses SQLite to synchronize user telemetry and progress between sessions.

---

## 🧠 Core Intelligence Modules

### Teacher Engine (`TeacherEngine.js`)
The "Brain" of the platform, responsible for:
- **Persona Matrix**: Shifts the AI tutor's personality (Mentor vs. Rival) based on the user's "Hearts" (lives) remaining.
- **Semantic Grader**: Uses AI to evaluate the *logic* of user code rather than just string matching. It can recognize correct solutions even if the user uses different variable names or formatting.
- **The Psychiatrist (Diagnoser)**: Analyzes telemetry (time taken, error types, retries) to identify specific misconceptions (e.g., "confusing assignment with equality") and adjusts the next question's difficulty.

### Curriculum Engine (`CurriculumEngine.js`)
The "Architect" that builds the learning path:
- **Phase-Based Generation**: Dividies Python into three distinct phases:
    1. **Fundamentals**: Syntax, variables, and control flow.
    2. **Architecture**: Data structures, RegEx, and File I/O.
    3. **Deep Logic**: OOP, optimization, and Data Science.
- **Adaptive Paths**: Based on the initial **Diagnostic Quiz**, the engine skips mastered topics and skips straight to the user's "Level of Optimal Challenge."

### Prompt Factory (`PromptFactory.js`)
The "Linguist" that crafts precise instructions for the AI:
- **Context Injection**: Ensures the AI knows exactly what the user has previously learned so it doesn't repeat itself.
- **Guardrails**: Hardcodes pedagogical rules (e.g., "Ask questions, don't give answers") into every API call.

---

## 🎮 Key User Experiences

### 1. The Journey Map
A "Saga" style map (Candy Crush/Duolingo style) where users progress through regions. Each region concludes with a **Master Project**.

### 2. Master Projects & MasterIDE
A premium, specialized environment for final exams:
- **Project Mentor**: A Socratic AI locked into a "Zero-Code Policy." It helps you find the answer but never types it for you.
- **Indigo Theme**: High-contrast, focused design to signify the importance of the challenge.
- **Mobile Optimized**: Automatically defaults to the Mentor guidance view on phones to ensure the instructions are never missed.

### 3. Boss Arena
A high-stakes coding session where users must solve challenges without losing their hearts. 
- **The "Matchmaker"**: If you fail a specific concept twice, the AI pulls a "targeted remedial question" from the bank and injects it into your current queue.

---

## 🛠️ Local Development & Setup

### Prerequisites
- **Python 3.10+**
- **Node.js 18+**
- **Google GenAI API Key**

### 1. Backend Setup
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
# Create a .env file with GOOGLE_API_KEY=your_key_here
python main.py
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 📊 Evaluation & Pedagogy
NexGen uses the **Socratic Method** as its core teaching philosophy. Instead of providing the solution to a `SyntaxError`, the AI suggests: *"I see a red line at the end of your loop. In Python, how do we signify that a block of code is beginning?"* This forces the "Aha!" moment that leads to long-term memory retention.
