import { askGemma } from './GemmaService';
import { PromptFactory } from './PromptFactory';
import { BASICS_EXAMS, ADAPTIVE_QUESTION_BANK } from '../data/exams';

import CONFIG_V2 from '../data/nexgen_config_v2.json';

// --- 1. THE EMPATHY-FIRST PERSONALITY MATRIX (V2 ENGINE) ---
const V2_TEACHER = CONFIG_V2.subsystem_orchestration.teacher_engine.persona_constraints;

const PERSONAS = {
  MENTOR: {
    role: "NexGen Mentor 🧠",
    tone: V2_TEACHER.voice,
    philosophy: "Adaptive Mastery. " + V2_TEACHER.adaptive_logic,
    catchphrase: "Growth is an iterative process. Let's debug this together. ✨"
  },
  RIVAL: {
    role: "Bratty Rival ⚡",
    tone: "Competitive, snarky, but secretly impressed by your progress.",
    philosophy: "Winning isn't everything, it's the only thing. Stay sharp or stay home.",
    catchphrase: "Not bad for a rookie. Try to keep up! 😼"
  },
  BOSS: {
    role: "System Architect 🏗️",
    tone: "Professional, precise, and high-standards.",
    philosophy: "Code quality is paramount. Logic must be flawless.",
    catchphrase: "Architectural integrity verified. Proceed."
  }
};

// --- 2. ADAPTIVE PERSONA LOGIC ---
export const getAdaptivePersona = (hearts) => {
  if (hearts <= 1) return "MENTOR";
  return "RIVAL";
};

// --- 3. THE LESSON GENERATOR (Explain -> Analogy -> Task) ---
// Add hearts and xp as parameters
// --- 3. THE LESSON GENERATOR (Explain -> Analogy -> Task) ---
export const generateLessonContent = async (subLesson, userLevel, currentPersona = "MENTOR", hearts = 3, xp = 0, userName = "Asvind", isCompleted = false) => {
  const persona = PERSONAS[currentPersona];
  const empathyNudge = hearts === 1
    ? "Acknowledge they are on their last heart, but keep it highly encouraging! 💖"
    : "Be energetic and positive! 🌟";

  const prompt = PromptFactory.createLessonPrompt(subLesson, empathyNudge, userName, isCompleted);

  let retries = 2; // Try up to 3 times total
  let delay = 1000; // Start with a 1-second delay

  while (retries >= 0) {
    try {
      const response = await askGemma(prompt, userLevel, [], `Lesson_${subLesson.title}`, subLesson.title);

      // 1. Check if the response is the known backend error string
      if (typeof response === 'string' && response.includes("⚠️")) {
        throw new Error(`Backend Connection Slipped: ${response}`);
      }

      // 2. Check if the response is weird HTML (like a Vercel/Heroku error page)
      if (typeof response === 'string' && response.trim().startsWith('<')) {
        throw new Error("Received HTML instead of JSON from backend.");
      }

      // 3. Clean and parse the JSON response
      // We wrap this in a try block so parsing errors also trigger a retry
      try {
        const cleanJson = response.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanJson);
      } catch (parseError) {
        throw new Error(`Failed to parse JSON: ${response}`);
      }

    } catch (error) {
      console.warn(`Lesson Gen Attempt Failed. Retries left: ${retries}. Error:`, error.message);

      if (retries === 0) {
        console.error("All retries exhausted for Lesson Gen.");
        // Return a structured fallback object that your UI expects
        return {
          message: `Let's dive into **${subLesson.title}**! ${subLesson.context}. (System Note: AI connection unstable, using offline fallback).`,
          chips: ["Show me the code 🚀", "Try connecting again"]
        };
      }

      // Wait before retrying (Exponential Backoff)
      await new Promise(res => setTimeout(res, delay));
      delay *= 2; // Double the delay for the next attempt (1s, 2s)
      retries--;
    }
  }
};

// --- 4. THE NO-SHAME DEBUGGER ---
export const explainError = async (userCode, errorMsg, currentPersona, questionContext = "") => {
  const persona = PERSONAS[currentPersona];

  const prompt = PromptFactory.createErrorPrompt(userCode, errorMsg, persona, questionContext);

  try {
    const response = await askGemma(prompt, "Beginner", [], "SupportiveDebugger", "Python Error");
    return extractJSON(response);
  } catch (e) {
    console.error("explainError Failed", e);
    return { message: "I'm having trouble seeing the matrix right now. Try running the code again!", example: null };
  }
};

// --- 4.5. THE ADAPTIVE HINT GENERATOR (Smart Nudge) ---
export const generateHint = async (activeSubLesson, userCode, currentPersona) => {
  const persona = PERSONAS[currentPersona];

  const prompt = PromptFactory.createHintPrompt(activeSubLesson, userCode, persona);

  return await askGemma(prompt, "Beginner", [], "HintGenerator", activeSubLesson.title);
};

// --- HELPER: ROBUST JSON EXTRACTOR ---
const extractJSON = (text) => {
  if (!text) throw new Error("Empty response received");

  // --- Step 1: Aggressive Cleaning ---
  // Strip markdown code blocks (even if nested or weirdly formatted)
  let cleaned = text
    .replace(/```json/gi, '')
    .replace(/```python/gi, '')
    .replace(/```/g, '')
    .trim();

  try {
    // Attempt 1: Direct parse
    return JSON.parse(cleaned);
  } catch (e) {
    // Attempt 2: Precise extraction between { and }
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');

    if (start === -1 || end === -1) {
      throw new Error("No JSON object markers ({}) found in response.");
    }

    const jsonStr = cleaned.slice(start, end + 1);

    try {
      // Sanitize common AI artifacts
      const sanitized = jsonStr
        .replace(/,\s*}/g, '}')  // Remove trailing commas in objects
        .replace(/,\s*]/g, ']')  // Remove trailing commas in arrays
        .replace(/[\u201C\u201D]/g, '"'); // Replace smart quotes with straight quotes
      // NOTE: Do NOT unescape \" here — that breaks valid JSON with escaped strings inside values

      return JSON.parse(sanitized);
    } catch (innerError) {
      console.error("JSON Extraction Failed after sanitization attempt:", innerError);
      throw new Error(`Invalid JSON structure: ${text.slice(0, 100)}...`);
    }
  }
};

// --- 5. THE BOSS EXAM GENERATOR (Dynamic) ---


export const generateBossExam = async (moduleTitle, userLevel, currentPersona, subLessonContext = []) => {
  const persona = PERSONAS[currentPersona];

  if (!moduleTitle || typeof moduleTitle !== 'string') {
    console.error("generateBossExam Critical Error: Invalid moduleTitle", moduleTitle);
    // Return emergency fallback immediately if title is missing
    return EmergencyFallback();
  }

  // 1. STRIP 'EXAM:' PREFIX IF PRESENT
  const cleanTitle = moduleTitle.replace(/^EXAM:\s*/i, '').trim();

  // 1.5 CHECK FOR STATIC EXAM (BASICS MODULE & MILESTONES)
  const staticKey = Object.keys(BASICS_EXAMS).find(key =>
    key.toLowerCase() === cleanTitle.toLowerCase() ||
    key.toLowerCase() === moduleTitle.toLowerCase()
  );

  if (staticKey) {
    console.log(`Loading Static Exam for: ${moduleTitle} (Matched: ${staticKey})`);
    return BASICS_EXAMS[staticKey];
  }

  console.log(`Generating Dynamic Exam for: ${moduleTitle} (Adaptive Mode Active)`);

  // 2. GENERATE DYNAMIC EXAM
  const contextStr = subLessonContext.length > 0
    ? subLessonContext.map(s => `- ${s.title}: ${s.codeTask || "Concept"}`).join("\n")
    : "General knowledge of " + moduleTitle;

  // Add randomness to force variety
  const seed = Date.now();

  const prompt = PromptFactory.createBossExamPrompt(moduleTitle, userLevel, contextStr, seed);

  try {
    // Note: We use askGemma but expect JSON. This relies on the model following instructions.
    // In a real prod app, validation/retry logic is needed.
    const response = await askGemma(prompt, userLevel, [], `Exam_${moduleTitle} `, moduleTitle);

    // Safety Check: If backend returns an error message string
    if (typeof response === 'string' && response.includes("⚠️")) {
      throw new Error("Backend Connection Failed");
    }

    // ROBUST PARSING
    return extractJSON(response);

  } catch (e) {
    console.error("Exam Gen Error", e);

    // FALLBACK: Try to find a static exam for this module (Redundant but safe)
    if (staticKey && BASICS_EXAMS[staticKey]) {
      const fallbackExam = BASICS_EXAMS[staticKey];
      return {
        ...fallbackExam,
        title: `${fallbackExam.title} (Offline Mode ⚠️)`
      };
    }

    // FINAL FALLBACK: Emergency Exam
    return EmergencyFallback();
  }
};

const EmergencyFallback = () => ({
  title: "⚠️ AI SYSTEM OFFLINE",
  questions: [
    {
      id: "offline_1",
      type: "mcq",
      question: "The AI Backend is unreachable. What should you do?",
      options: { "A": "Panic", "B": "Check Terminal & Restart Python", "C": "Ignore it" },
      correctAnswer: "B",
      hint: "The brain needs power (python main.py).",
      explanation: "Restarting the backend service usually fixes connection issues."
    }
  ]
});

// --- 6. INTERACTIVE COMPANION (Restored) ---
// Handles "Why?" and general questions with deep context
export const evaluateAnswer = async (question, userAnswer, context, currentPersona, topic = "General Python", expectedCode = null, userName = "Asvind") => {
  const persona = PERSONAS[currentPersona];

  const prompt = PromptFactory.createEvaluationPrompt(question, userAnswer, context, persona, topic, expectedCode, userName);

  try {
    const response = await askGemma(prompt, "Beginner", [], context, topic);
    return extractJSON(response);
  } catch (e) {
    console.error("evaluateAnswer Failed", e);
    return { message: "My sensors are a bit fuzzy. Can you repeat that?", example: null };
  }
};

// --- 7. THE SEMANTIC GOAL-BASED GRADER (New AI Judge) ---
export const gradeUserCode = async (userCode, topic, learningGoals, userOutput = "", expectedOutput = "") => {
  console.log("DEBUG: gradeUserCode received:", JSON.stringify(userCode));
  const prompt = PromptFactory.createGradingPrompt(userCode, topic, learningGoals);

  try {
    const response = await askGemma(prompt, "Beginner", [], "AutoGrader", topic);

    // Safety: Check for Error string
    const resData = extractJSON(response);
    return {
      ...resData,
      feedback: resData.feedback || resData.mentor_feedback,
      mentor_feedback: resData.mentor_feedback || resData.feedback
    };
  } catch (error) {
    console.warn("AI Grading Failed, falling back to local verification", error);

    // --- LOCAL FALLBACK LOGIC ---
    // If AI fails (connection or parsing), we do a simple keyword/logic check
    const code = userCode.toLowerCase();
    const goals = learningGoals.toLowerCase();
    const hasOutput = userOutput && userOutput.trim().length > 0;

    // 1. Check for missing print statement (Common issue)
    // If there is NO output, we check if the goal was just to "create" or "initialize"
    if (!hasOutput) {
      const creationKeywords = ["create", "define", "initialize", "setup"];
      const outputKeywords = ["print", "show", "display", "access", "output"];

      const isCreationGoal = creationKeywords.some(kw => goals.includes(kw));
      const isOutputGoal = outputKeywords.some(kw => goals.includes(kw));

      // If it's a creation goal and NOT an explicit output goal, let it pass 
      // as long as the code has basic structure matching the goal.
      if (isCreationGoal && !isOutputGoal) {
        // Check for basic syntax markers based on context
        const hasDelimiters = (goals.includes("tuple") && code.includes("(")) ||
          (goals.includes("list") && code.includes("[")) ||
          (goals.includes("dict") && code.includes("{")) ||
          (goals.includes("set") && code.includes("{"));

        if (hasDelimiters) {
          return {
            passed: true,
            mentor_feedback: "I noticed you've successfully created the object! 🚀 (Tip: Use print() if you want to see the results in the console.)"
          };
        }
      }

      if (isOutputGoal || isCreationGoal) {
        return {
          passed: false,
          mentor_feedback: "Your logic seems to be there, but I don't see any output! Did you forget to use a `print()` statement to show your result?"
        };
      }
    }

    // 2. Check for missing print keyword if goal explicitly requires it
    if (goals.includes("print") && !code.includes("print(")) {
      return {
        passed: false,
        mentor_feedback: "Mission Goal: You need to use the `print()` function to display the result."
      };
    }

    // 2. Check for missing function definition
    if (goals.includes("function") || goals.includes("def ")) {
      if (!code.includes("def ")) {
        return {
          passed: false,
          mentor_feedback: "It looks like you haven't defined the function yet. Remember to use the `def` keyword!"
        };
      }
    }

    // 3. Simple pass-through for "First Line" type lessons if logic exists
    if (topic.includes("First Line")) {
      const printRegex = /print\s*\(\s*(['"])(?:(?!\1).)*\1\s*\)/;
      if (printRegex.test(code)) {
        return { passed: true, mentor_feedback: "Basic syntax verified (Offline Mode). Logic looks good!" };
      }
    }

    if (topic.includes("Comments")) {
      if (code.includes("#") && code.length > 5) {
        return { passed: true, mentor_feedback: "Comment detected (Offline Mode)." };
      }
    }

    // 4. Fuzzy string match as final fallback if expectedOutput provided
    if (expectedOutput) {
      const cleanUser = userOutput.trim().toLowerCase();
      const cleanExpected = expectedOutput.trim().toLowerCase();

      // Calculate Levenshtein Distance
      const distance = levenshteinDistance(cleanUser, cleanExpected);

      // Allow 1 error per 5 characters, with a minimum of 1 allowed error for words > 3 chars
      const allowedErrors = Math.max(1, Math.floor(cleanExpected.length / 5));
      const isCloseEnough = distance <= allowedErrors;

      if (cleanUser === cleanExpected || (cleanExpected.length > 3 && isCloseEnough)) {
        return {
          passed: true,
          feedback: "Correct! (Offline Fallback)",
          mentor_feedback: "Correct! (Offline Fallback)"
        };
      }
    }

    // Default Fallback
    return {
      passed: false,
      feedback: "I'm having trouble connecting to my logic core, but your code seems to be missing a key requirement. double-check the mission instructions!",
      mentor_feedback: "I'm having trouble connecting to my logic core, but your code seems to be missing a key requirement. double-check the mission instructions!"
    };
  }
};


// --- 9. LEARNING DIAGNOSIS ENGINE (The Psychiatrist) ---
export const diagnoseLearnerState = async (telemetry) => {
  /*
    Input telemetry format:
    {
      topic: "variables",
      questionConcepts: ["assignment", "mutation"],
      expectedConcept: "reference vs value",
      attempt: {
        passedTests: 2,
        totalTests: 5,
        timeTaken: 140,
        expectedTime: 60,
        retries: 3,
        runtimeErrors: ["TypeError", "NameError"],
        finalOutput: "10 10",
        expectedOutput: "10 20"
      },
      previousWeakness: "mutation",
      streak: -2
    }
  */

  const prompt = PromptFactory.createDiagnosisPrompt(telemetry);

  try {
    // We use a specialized "Diagnoser" persona tag for the logs/context, though askGemma generic handles it.
    const response = await askGemma(prompt, "Diagnoser", [], "DiagnosisEngine", telemetry.topic);

    if (typeof response === 'string' && response.includes("⚠️")) {
      throw new Error("Diagnosis Backend Unavailable");
    }

    return extractJSON(response);

  } catch (e) {
    console.error("Diagnosis Failed:", e);
    // Return a neutral/safe diagnosis so the game can continue
    return {
      misconception: "General error analysis failed",
      secondaryIssues: [],
      masteryEstimate: 0.5,
      frustration: 0.0,
      confidence: 0.5,
      difficultyAdjustment: 0,
      recommendedFocus: telemetry.topic
    };
  }
};

// --- 10. ADAPTIVE QUESTION SELECTOR (The Matchmaker) ---

export const selectNextQuestion = (diagnosis, moduleTitle, history = []) => {
  // 1. Get the Question Bank for this Module
  const moduleBank = ADAPTIVE_QUESTION_BANK[moduleTitle];
  if (!moduleBank) return null; // No adaptive bank, fallback to default queue

  // 2. Identify Target Concept (Focus vs Random)
  // If diagnosis says "drill drilling", we find a matching concept pack
  let targetConcept = diagnosis.recommendedFocus ? `Concept_${diagnosis.recommendedFocus}` : null;

  // Fuzzy match concept keys
  if (targetConcept) {
    const match = Object.keys(moduleBank).find(k => k.toLowerCase().includes(diagnosis.recommendedFocus.toLowerCase()));
    if (match) targetConcept = match;
  }

  // Fallback: If no specific focus or not found, pick a concept we haven't exhausted
  if (!targetConcept || !moduleBank[targetConcept]) {
    const keys = Object.keys(moduleBank);
    targetConcept = keys[Math.floor(Math.random() * keys.length)];
  }

  const questionPack = moduleBank[targetConcept];
  if (!questionPack) return null;

  // 3. Select Difficulty based on Frustration/Mastery
  // - High Frustration (>0.6) -> Drop difficulty 
  // - High Mastery (>0.8) -> Increase difficulty
  // - Misconception detected -> Pick a middle-difficulty conceptual trap

  let targetDifficulty = 0.5; // Default Medium

  if (diagnosis.frustration > 0.6) {
    targetDifficulty = 0.2; // Easy/Recovery
  } else if (diagnosis.masteryEstimate > 0.8) {
    targetDifficulty = 1.0; // Boss/Challenge
  } else if (diagnosis.misconception) {
    targetDifficulty = 0.5; // Targeted Trap
  }

  // 4. Find best match in the pack that hasn't been played OR is currently in queue
  const activeIds = new Set(history.map(q => q.id));
  const candidates = questionPack.filter(q => !activeIds.has(q.id));

  if (candidates.length === 0) return null; // Pack exhausted

  // Find closest difficulty
  const bestMatch = candidates.reduce((prev, curr) => {
    return (Math.abs(curr.difficulty - targetDifficulty) < Math.abs(prev.difficulty - targetDifficulty) ? curr : prev);
  });

  return {
    ...bestMatch,
    aiReasoning: `Selected for ${diagnosis.misconception ? 'Misconception: ' + diagnosis.misconception : 'Mastery Level'}`
  };
};

// --- HELPER: LEVENSHTEIN DISTANCE ---
const levenshteinDistance = (a, b) => {
  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1 // deletion
          )
        );
      }
    }
  }

  return matrix[b.length][a.length];
};