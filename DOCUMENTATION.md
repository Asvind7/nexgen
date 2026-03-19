# NexGen: Technical Architecture & Deep-Dive Documentation 🧠🚀

NexGen is an **AI-Native Pedagogy Orchestrator** designed to solve the "Passive Learning Problem" in coding education. It replaces static videos with an **Active Cognitive Combat** environment where every interaction is monitored, evaluated, and adapted by a distributed engine of LLMs and Machine Learning models.

---

## 🏗️ 1. High-Level System Architecture

NexGen follows a **Distributed Intelligence Pattern**, where the "Brain" is split between client-side pedagogical rules and server-side neural processing.

### **Core Stack**
- **Frontend**: React 19 + Vite (High-Performance Client)
- **Styling**: Tailwind CSS v4 (Glassmorphic Design System)
- **Backend**: FastAPI (Python 3.10+)
- **Database**: MySQL 8.0 (Persistent Telemetry & Auth)
- **Neural Engine**: Google Gemini 3 Flash / Gemma 3 (Socratic Logic)
- **Predictive ML**: Scikit-Learn Random Forest (Diagnostic Profiling)

---

## 🧠 2. The Intelligence Tier (Engines)

### **A. Teacher Engine (`TeacherEngine.js`)**
The `TeacherEngine` is the central mediator for all AI interactions.
- **Semantic Logic Grading**: Unlike regex-based platforms, `TeacherEngine` uses GenAI to interpret the *intent* of code. If a trainee names a variable `animal` instead of `cat` but follows the logic, they pass.
- **Robust JSON Extraction**: Implements an aggressive sanitization layer to extract structural response data from conversational AI outputs, ensuring the UI never breaks during LLM hallucinations.
- **The Psychiatrist Logic**: Internally tracks user confusion by measuring "Traceback Frequency" and "Time-to-Correction" to adjust the Socratic tone.

### **B. Prompt Factory (`PromptFactory.js`)**
The "Pedagogical Guardrail" system.
- **Context Injection**: Dynamically builds the "Memory" for the AI, ensuring it knows the student's current Phase (1, 2, or 3) so it doesn't use advanced syntax (like `decorators`) for a beginner asking about `if-statements`.
- **Persona Matrix**:
    - **BOSS**: Minimal praise, strict technical requirements, high pressure.
    - **RIVAL**: Competitive, snarky but motivating, focuses on code efficiency.
    - **MENTOR**: Warm, supportive, uses ELI5 (Explain Like I'm 5) analogies.

### **C. Predictive Engine (`train_model.py` / `/predict`)**
Uses a **Random Forest Classifier** trained on student telemetry.
- **Feature Set**: `score` (quiz performance), `accuracy` (pass/fail ratio), and `time_taken` (cognitive load).
- **Output**: Predicts the student’s mastery level (Beginner, Intermediate, Advanced) with >95% accuracy.

### **D. Real-Time Interaction Analyzer (`/predict/interaction`)**
The "Sub-Second Brain":
- **Micro-Inference**: On every single user message or curriculum movement, the frontend calls the backend to run a quick RF inference.
- **Persona Adaptation**: If the model detects a sudden shift in cognitive load (e.g., student takes 5x longer than usual), it instantly instructs the `TeacherEngine` to pivot the AI's persona to **MENTOR** to provide emotional support and scaffolding.

---

## ⚔️ 3. The Coding Combat Core (`BossArena.jsx`)

The "Boss Arena" is where learning happens through struggle.
- **The Socratic Wrapper**: AI mentors are prohibited from providing copy-pasteable code. They must provide **Analogous Conceptual Examples**.
- **Duolingo-Style Queue**:
    - Every module is an array of challenges.
    - Failed challenges are strategically "pushed" to the end of the queue.
    - The Arena doesn't end until the queue is empty, ensuring 100% mastery of the module's target concepts.
- **Live Terminal**: A custom implementation using `react-simple-code-editor` and a backend execution sandbox that mocks `input()` calls for interactive testing.

---

## 📊 4. Data Persistence & Analytics

### **MySQL Database Schema**
- **`users` Table**: Stores credentials using Bcrypt hashing and a JSON `user_data` blob.
- **`user_interactions` Table**: High-resolution telemetry logging every chat message, code execution, and step progress.
- **`boss_performance` Table**: Aggregated session-level analytics for every Boss Arena attempt, tracking global proficiency growth.
- **`user_data` Blob**: Contains the "Digital Twin" of the learner:
    - `xp`: Total experience earned.
    - `hearts`: Current health (gamified motivation).
    - `streak`: Consecutive days of engagement.
    - `completedModules`: Array of mastered competencies.

### **Automated Retraining Loop**
- **Event-Driven Training**: When a new user signs up or a diagnostic quiz is finished, the backend appends the data to `dataset.csv` and triggers an `asyncio.to_thread` process to retrain the ML model.
- **Live Feedback**: This ensures the **Admin Dashboard** reflect the absolute latest student statistics in real-time.

---

## 📂 5. Project Directory Profile

```text
nexgen(web)/
├── backend/
│   ├── main.py              # FastAPI Engine & AI Orchestration
│   ├── database.py          # MySQL Layer & Auth Logic
│   └── models/              # Serialized .joblib ML Models
│
├── frontend/
│   ├── src/
│   │   ├── services/        # TeacherEngine & PromptFactory (The Brain)
│   │   ├── components/      # BossArena & MLDashboard (The Body)
│   │   └── data/            # 3-Phase Curriculum Matrix
│
└── model_training/
    ├── train_model.py       # Random Forest Training Script
    └── dataset.csv          # 70+ User Telemetry Dataset
```

---

## 🚀 6. Pedagogical Values (The Viva Pitch)

1. **Active Mastery**: Students cannot "pass" by luck. The Duolingo-style queue forces them to face their failures until they become comfortable.
2. **Predictive Intervention**: The platform identifies "At-Risk" learners early through ML before they lose interest.
3. **Cognitive Load Management**: The Persona Engine adapts the "Pressure" to keep the user in the **Flow State** (the sweet spot between boredom and anxiety).

---
*Documentation Version: 2.1 | Refinement: High Professional*
