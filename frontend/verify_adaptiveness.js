
// MOCK DATA & CONFIG
const MOCK_QUESTION_BANK = {
    "Syntax": {
        "Concept_Print": [
            { id: "syn_print_easy", type: "mcq", difficulty: 0.2, question: "Easy Print Question" },
            { id: "syn_print_med", type: "mcq", difficulty: 0.5, question: "Medium Print Question" },
            { id: "syn_print_hard", type: "mcq", difficulty: 0.8, question: "Hard Print Question" }
        ],
        "Concept_Variables": [
            { id: "syn_var_easy", type: "mcq", difficulty: 0.2, question: "Easy Var Question" }
        ]
    }
};

// --- LOGIC UNDER TEST (Copied from TeacherEngine.js for isolation) ---

const diagnoseLearnerState = async (telemetry) => {
    console.log("🧠 DIAGNOSING LEARNER STATE...");
    console.log("Telemetry:", JSON.stringify(telemetry, null, 2));

    // SIMULATED AI RESPONSE (Mocking the prompt/LLM)
    // Scenario: User failed "Print" questions repeatedly
    if (telemetry.attempt.passedTests === 0) {
        return {
            misconception: "Confusion with print syntax",
            masteryEstimate: 0.3,
            frustration: 0.7, // High frustration
            recommendedFocus: "Print"
        };
    }
    return {
        misconception: null,
        masteryEstimate: 0.9,
        frustration: 0.1,
        recommendedFocus: "Variables"
    };
};


const selectNextQuestion = (diagnosis, moduleTitle, history = []) => {
    console.log("\n🕵️ MATCHMAKING NEXT QUESTION...");
    console.log(`Diagnosis: Frustration=${diagnosis.frustration}, Mastery=${diagnosis.masteryEstimate}, Focus=${diagnosis.recommendedFocus}`);

    const moduleBank = MOCK_QUESTION_BANK["Syntax"]; // Force Syntax for test
    if (!moduleBank) return null;

    // 1. Identify Target Concept
    // Logic: "Concept_" + recommendedFocus
    let targetConcept = diagnosis.recommendedFocus ? `Concept_${diagnosis.recommendedFocus}` : null;

    // Fuzzy match
    const match = Object.keys(moduleBank).find(k => k.toLowerCase().includes(diagnosis.recommendedFocus.toLowerCase()));
    if (match) targetConcept = match;

    console.log(`Target Concept Pack: ${targetConcept}`);

    const questionPack = moduleBank[targetConcept];
    if (!questionPack) {
        console.log("❌ Concept pack not found.");
        return null;
    }

    // 2. Select Difficulty
    let targetDifficulty = 0.5;
    if (diagnosis.frustration > 0.6) {
        targetDifficulty = 0.2; // Easy/Recovery
        console.log("Strategy: RECOVERY (Lower Difficulty)");
    } else if (diagnosis.masteryEstimate > 0.8) {
        targetDifficulty = 1.0; // Boss/Challenge
        console.log("Strategy: CHALLENGE (Higher Difficulty)");
    }

    // 3. Find best match
    const activeIds = new Set(history.map(q => q.id));
    const candidates = questionPack.filter(q => !activeIds.has(q.id));

    if (candidates.length === 0) return null;

    const bestMatch = candidates.reduce((prev, curr) => {
        return (Math.abs(curr.difficulty - targetDifficulty) < Math.abs(prev.difficulty - targetDifficulty) ? curr : prev);
    });

    return bestMatch;
};

// --- TEST RUNNER ---
async function runVerification() {
    console.log("=== 🧪 STARTING ADAPTIVENESS LOGIC VERIFICATION ===");

    // SCENARIO 1: User Fails (High Frustration)
    // Expectation: System should select an EASIER question from "Concept_Print"
    const failedTelemetry = {
        topic: "Syntax",
        attempt: { passedTests: 0, timeTaken: 120 }
    };

    const diagnosis = await diagnoseLearnerState(failedTelemetry);
    const nextQ = selectNextQuestion(diagnosis, "Syntax", []);

    console.log("\n=== RESULT ===");
    if (nextQ && nextQ.difficulty === 0.2 && nextQ.id === "syn_print_easy") {
        console.log("✅ SUCCESS: System adapted to frustration by selecting an easier question.");
        console.log(`Selected Question: ${nextQ.question} (Diff: ${nextQ.difficulty})`);
    } else {
        console.log("❌ FAILURE: Adaptive logic did not select the expected recovery question.");
        console.log("Selected:", nextQ);
    }
}

runVerification();
