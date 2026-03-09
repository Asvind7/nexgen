import React, { useState, useEffect } from 'react';
import {
    Heart, Zap, RefreshCw, Play, Shield, Map as MapIcon, Sparkles,
    Skull, CheckCircle, Lightbulb, HelpCircle, Code, ArrowLeft, ArrowRight
} from 'lucide-react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import confetti from 'canvas-confetti';
import { handleAutoIndent } from '../../utils/editorUtils';
import {
    generateBossExam, diagnoseLearnerState, selectNextQuestion, gradeUserCode
} from '../../services/TeacherEngine';

const BossArena = ({ onComplete, moduleTitle, hearts, setHearts, setXp, moduleId, onReTeach, onBack, subLessons, onVictory, isAdmin = false }) => {
    // STATE: Smart Queue (Duolingo Style)
    const [questionQueue, setQuestionQueue] = useState([]);
    const [qIndex, setQIndex] = useState(0);
    const [completedCount, setCompletedCount] = useState(0); // For progress bar logic originally
    const [qHistory, setQHistory] = useState([]); // NEW: Tracks correct/wrong status of each attempted question

    // UI State
    const [selectedOption, setSelectedOption] = useState(null);
    const [showHint, setShowHint] = useState(false); // 💡 New State

    const currentQ = questionQueue[qIndex];

    // Reset hint on new question
    useEffect(() => {
        setShowHint(false);
    }, [currentQ]);
    const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong'
    const [cooldownTime, setCooldownTime] = useState(null);
    const [explanation, setExplanation] = useState(null); // New: Show explanation on failure
    const [showConfirmModal, setShowConfirmModal] = useState(false); // New: Confirmation for Explain Error

    // Code Mission State
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [runStatus, setRunStatus] = useState("idle");

    // NEW: Adaptive Diagnosis State
    const [streak, setStreak] = useState(0);
    const [previousWeakness, setPreviousWeakness] = useState(null);
    const [startTime, setStartTime] = useState(Date.now()); // For timing questions

    // NEW: Test Cases Tracking
    const [testResults, setTestResults] = useState([]);

    // 🆕 INDENTATION HANDLER
    const handleEditorKeyDown = (e) => handleAutoIndent(e, code, setCode);


    // NEW: Initialize code for missions/debugging
    useEffect(() => {
        if (currentQ && (currentQ.type === 'mission_task' || currentQ.type === 'debugging')) {
            setCode(currentQ.codeTask || "");
        } else {
            setCode("");
        }
        setRunStatus("idle");
        setFeedback(null);
        setExplanation(null);
        setOutput("");
        setStartTime(Date.now());
        setTestResults([]); // Reset test cases
    }, [currentQ]);

    // 0. CHECK COOLDOWN & LOAD EXAM
    useEffect(() => {
        const checkCooldown = () => {
            const stored = localStorage.getItem(`boss_cooldown_${moduleId}`);
            if (stored) {
                const deadline = parseInt(stored, 10);
                if (Date.now() < deadline) {
                    setCooldownTime(deadline);
                    return true;
                } else {
                    localStorage.removeItem(`boss_cooldown_${moduleId}`);
                }
            }
            return false;
        };

        const loadExam = async () => {
            if (checkCooldown()) return;

            // CHECK FOR RESUMED STATE
            const resumedState = localStorage.getItem(`exam_resume_${moduleId}`);
            if (resumedState) {
                const parsed = JSON.parse(resumedState);
                setQuestionQueue(parsed.queue);
                setQIndex(parsed.index);
                setHearts(parsed.hearts || 3);
                setQHistory(parsed.history || Array(parsed.index).fill('correct'));
                localStorage.removeItem(`exam_resume_${moduleId}`);
            } else {
                // GENERATE NEW EXAM (AI or Fallback)
                const userLevel = "Beginner";

                // 🛑 FORCE STATIC BANK FOR PHASE 1
                const MODULE_IMPORTS = {
                    'Syntax': () => import('../../data/modules/phase1/week1/Syntax').then(m => m.SYNTAX_LEVEL_1),
                    'Variables': () => import('../../data/modules/phase1/week1/Variables').then(m => m.VARIABLES_LEVEL_1),
                    'Data Types': () => import('../../data/modules/phase1/week1/DataTypes').then(m => m.DATA_TYPES_LEVEL_1),
                    'Operators': () => import('../../data/modules/phase1/week1/Operators').then(m => m.OPERATORS_LEVEL_1),
                    'Conditionals': () => import('../../data/modules/phase1/week1/Conditionals').then(m => m.CONDITIONALS_LEVEL_1),
                    'Loops': () => import('../../data/modules/phase1/week1/Loops').then(m => m.LOOPS_LEVEL_1),
                    'Functions': () => import('../../data/modules/phase1/week1/Functions').then(m => m.FUNCTIONS_LEVEL_1),
                    'Lists': () => import('../../data/modules/phase1/week3/Lists').then(m => m.LISTS_LEVEL_1),
                    'Tuples': () => import('../../data/modules/phase1/week3/Tuples').then(m => m.TUPLES_LEVEL_1),
                    'Dictionaries': () => import('../../data/modules/phase1/week3/Dictionaries').then(m => m.DICTIONARIES_LEVEL_1),
                    'Sets': () => import('../../data/modules/phase1/week3/Sets').then(m => m.SETS_LEVEL_1),
                    'Comprehensions': () => import('../../data/modules/phase1/week3/Comprehensions').then(m => m.COMPREHENSIONS_LEVEL_1),
                    'String Manipulation': () => import('../../data/modules/phase2/week4/StringManipulation').then(m => m.STRING_MANIPULATION_LEVEL_1),
                    'RegEx': () => import('../../data/modules/phase2/week4/RegEx').then(m => m.REGEX_LEVEL_1),
                    'File I/O': () => import('../../data/modules/phase2/week4/FileIO').then(m => m.FILE_IO_LEVEL_1),
                    'Logic Gates': () => import('../../data/modules/phase1/milestones/LogicGates').then(m => m.LOGIC_GATES_EXAM),
                    'Basics Foundation': () => import('../../data/modules/phase1/milestones/BasicsFoundation').then(m => m.BASICS_FOUNDATION_EXAM),
                    'PHASE 1 MASTER': () => import('../../data/modules/phase1/milestones/Phase1Master').then(m => m.PHASE_1_MASTER_EXAM),
                    'Collection Architect': () => import('../../data/modules/phase2/milestones/CollectionArchitect').then(m => m.COLLECTION_ARCHITECT_EXAM),
                    'Text & Storage': () => import('../../data/modules/phase2/milestones/TextStorage').then(m => m.TEXT_STORAGE_EXAM),
                    'PHASE 2 MASTER': () => import('../../data/modules/phase2/milestones/Phase2Master').then(m => m.PHASE_2_MASTER_EXAM),
                    'Advanced Logic': () => import('../../data/modules/phase3/milestones/AdvancedLogic').then(m => m.ADVANCED_LOGIC_EXAM),
                    'System Architect': () => import('../../data/modules/phase3/milestones/SystemArchitect').then(m => m.SYSTEM_ARCHITECT_EXAM),
                    'Package Architect': () => import('../../data/modules/phase3/milestones/PackageArchitect').then(m => m.PACKAGE_ARCHITECT_EXAM),
                    'Data Scientist': () => import('../../data/modules/phase3/milestones/DataScientist').then(m => m.DATA_SCIENTIST_EXAM),
                    'PHASE 3 MASTER': () => import('../../data/modules/phase3/milestones/Phase3Master').then(m => m.PHASE_3_MASTER_EXAM),
                };


                const staticLoader = Object.keys(MODULE_IMPORTS).find(key => moduleTitle.includes(key));

                if (staticLoader) {
                    console.log(`Loading Fixed Bank for: ${staticLoader}`);
                    try {
                        const moduleData = await MODULE_IMPORTS[staticLoader]();
                        if (moduleData && moduleData.questions) {
                            setQuestionQueue(moduleData.questions);
                        }
                    } catch (err) {
                        console.error(`Failed to load module: ${staticLoader}`, err);
                    }
                } else {
                    const examData = await generateBossExam(moduleTitle, userLevel, "RIVAL", subLessons);
                    if (examData && examData.questions) {
                        setQuestionQueue(examData.questions);
                    } else if (onBack) {
                        onBack();
                    }
                }
            }
            setStartTime(Date.now());
        };

        loadExam();

        const timer = setInterval(() => {
            if (cooldownTime && Date.now() > cooldownTime) {
                setCooldownTime(null);
                localStorage.removeItem(`boss_cooldown_${moduleId}`);
                loadExam();
            }
        }, 1000);

        return () => clearInterval(timer);

    }, [moduleId, moduleTitle, subLessons]);

    // Loading State
    if (cooldownTime) {
        const remainingMinutes = Math.ceil((cooldownTime - Date.now()) / 60000);
        return (
            <div className="fixed inset-0 bg-slate-950 z-[120] flex flex-col items-center justify-center p-6 animate-fade-in text-center">
                <Skull size={80} className="text-slate-700 mb-6" />
                <h2 className="text-3xl font-black text-white mb-2">SYSTEM LOCKED</h2>
                <p className="text-slate-500 mb-8 max-w-sm">Vital signs critical. Regeneration protocol active.</p>
                <div className="bg-slate-900 border border-slate-800 px-8 py-4 rounded-xl">
                    <span className="text-4xl font-mono font-bold text-red-500 animate-pulse">{remainingMinutes}m</span>
                    <span className="block text-xs uppercase tracking-widest text-slate-600 mt-1">Remaining</span>
                </div>
                <button onClick={() => window.location.reload()} className="mt-8 text-slate-500 hover:text-white text-xs uppercase tracking-widest font-bold">Retreat to Safety</button>
            </div>
        );
    }

    if (!currentQ) return <div className="fixed inset-0 bg-slate-950 z-[110] flex items-center justify-center text-emerald-500 animate-pulse font-mono">GENERATING BOSS ENCOUNTER...</div>;

    // 1. UNIFIED HANDLE ANSWER (Nuanced 4-Scenario Logic)
    const handleAnswer = async (scenario, explanationText = "") => {
        if (feedback === 'correct') return; // Don't re-process if already fully correct

        const isCorrect = scenario === 'full_correct';
        const losesHeart = scenario === 'wrong' || scenario === 'concept_error';
        const isPartial = scenario === 'partial_correct';

        const timeTaken = (Date.now() - startTime) / 1000;

        const telemetry = {
            topic: moduleTitle,
            questionConcepts: currentQ.concepts || [],
            expectedConcept: currentQ.explanation || "General",
            regexCheck: currentQ.regexCheck,
            attempt: {
                passedTests: isCorrect ? 1 : 0,
                totalTests: 1,
                timeTaken: timeTaken,
                expectedTime: 60,
                retries: 0,
                runtimeErrors: [],
                finalOutput: output || String(selectedOption),
                expectedOutput: currentQ.expectedOutput || currentQ.correctAnswer || ""
            },
            previousWeakness: previousWeakness,
            streak: isCorrect ? (streak > 0 ? streak + 1 : 1) : (streak < 0 ? streak - 1 : -1)
        };

        if (!isCorrect || streak > 2) {
            diagnoseLearnerState(telemetry).then(diagnosis => {
                console.log("🧠 Diagnosis:", diagnosis);
                setPreviousWeakness(diagnosis.misconception);

                const nextQ = selectNextQuestion(diagnosis, moduleTitle, questionQueue);
                if (nextQ) {
                    setQuestionQueue(prev => {
                        const newQueue = [...prev];
                        newQueue.splice(qIndex + 1, 0, nextQ);
                        return newQueue;
                    });
                }
            });
        }

        setQHistory(prev => {
            const newHist = [...prev];
            newHist[qIndex] = isCorrect ? 'correct' : (isPartial ? 'partial' : 'wrong');
            return newHist;
        });

        setStreak(isCorrect ? (streak > 0 ? streak + 1 : 1) : (streak < 0 ? streak - 1 : -1));

        if (isCorrect) {
            setFeedback("correct");
            setCompletedCount(prev => prev + 1);
            const reward = currentQ.xpReward || 50;
            setXp(prev => prev + reward);
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 }, zIndex: 9999 });

            const successMsg = currentQ.explanation || explanationText || "Perfect! You've mastered this challenge.";
            setExplanation(successMsg);
        } else if (isPartial) {
            setFeedback("partial");
            setExplanation(explanationText || "Concept is correct, but the expected output is different. Fix the output details! (No Heart Lost)");
            // No heart lost, no streak reset? User didn't specify. I'll stay in neutral streak.
        } else {
            setFeedback("wrong");
            const failReason = explanationText || currentQ.hint || "Logic verification failed.";
            setExplanation(failReason);
            if (losesHeart) {
                setHearts(h => Math.max(0, h - 1));
            }

            // Only add to retry queue for significant failures
            if (losesHeart) {
                setQuestionQueue(prev => {
                    const baseId = currentQ.id.replace('retry_', '');
                    const newQ = { ...currentQ, id: `retry_${baseId}_${Date.now()}` };
                    return [...prev, newQ];
                });
            }
        }
    };

    const moveToNext = () => {
        setFeedback(null);
        setRunStatus("idle");
        setExplanation(null);
        setOutput("");
        setTestResults([]);

        if (qIndex < questionQueue.length - 1) {
            setQIndex(prev => prev + 1);
            setSelectedOption(null);
            setStartTime(Date.now());
        } else {
            onComplete();
        }
    };

    const handleReTeachAction = (explanationRequest = null) => {
        localStorage.setItem(`exam_resume_${moduleId}`, JSON.stringify({
            queue: questionQueue,
            index: qIndex,
            hearts: hearts
        }));
        onReTeach(explanationRequest);
    };

    const handleRunExamCode = async () => {
        setRunStatus("running");

        // Handle Normal Single-Execution Mode vs Multi-Test-Case Mode
        if (currentQ.testCases && currentQ.testCases.length > 0) {
            handleRunTestCases();
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: code })
            });
            const data = await response.json();
            const cleanOutput = data.output ? data.output.trim() : "";

            const verifyConcepts = (code, question) => {
                if (question.requiredConcepts && question.requiredConcepts.length > 0) {
                    for (const requiredStr of question.requiredConcepts) {
                        // Quote-agnostic check for simple requirements
                        let regexPattern = requiredStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

                        // NEW: Make spaces flexible (matches 1 or more whitespace characters)
                        regexPattern = regexPattern.replace(/\\\s+/g, '\\s+');

                        if (requiredStr === "'" || requiredStr === '"') {
                            regexPattern = "['\"]";
                        } else if (requiredStr.includes('(') && requiredStr.includes(')')) {
                            // Generic function call with quotes and optional spaces
                            regexPattern = regexPattern
                                .replace(/['"].*?['"]/g, "['\"].*?['\"]")
                                .replace(/\\\(/g, '\\s*\\(\\s*')
                                .replace(/\\\)/g, '\\s*\\)');
                        } else if (requiredStr.includes("'") || requiredStr.includes('"')) {
                            // Generic function call or bracket access with quotes
                            regexPattern = regexPattern.replace(/['"].*?['"]/g, "['\"].*?['\"]");
                        }

                        const regex = new RegExp(regexPattern, 'i');
                        if (!regex.test(code)) {
                            return { passed: false, message: `Requirement Missing: You need to use '${requiredStr}' in your solution! 💡` };
                        }
                    }
                }
                if (question.antiHardcode && question.expectedOutput) {
                    const normalizedExpectation = String(question.expectedOutput).replace(/[\[\]]/g, "");
                    if (code.includes(`"${normalizedExpectation}"`) || code.includes(`'${normalizedExpectation}'`)) {
                        return { passed: false, message: "Don't hardcode the answer! Use code to calculate or generate it." };
                    }
                }
                return { passed: true };
            };

            const conceptCheck = verifyConcepts(code, currentQ);
            const grading = await gradeUserCode(code, currentQ.question || moduleTitle, currentQ.learningGoals, cleanOutput, currentQ.expectedOutput);

            let passesRegex = true;
            if (currentQ.regexCheck) {
                const regex = currentQ.regexCheck instanceof RegExp
                    ? currentQ.regexCheck
                    : new RegExp(currentQ.regexCheck);
                if (!regex.test(code)) passesRegex = false;
            }

            let outputCorrect = grading.passed || (cleanOutput === String(currentQ.expectedOutput).trim());

            // RELAX OUTPUT MATCHING FOR OPEN-ENDED QUESTIONS (LIKE PRINTING THEIR OWN NAME)
            if (currentQ.id === "syn_c2" || (currentQ.concepts && currentQ.concepts.includes("comments"))) {
                outputCorrect = true; // Any output is acceptable
            }
            const conceptsCorrect = conceptCheck.passed && passesRegex;
            const isTypo = data.error && (data.error.includes("NameError") || data.error.includes("AttributeError"));

            if (conceptsCorrect && outputCorrect && !data.error) {
                // SCENARIO 1: FULLY CORRECT
                setRunStatus("success");
                setOutput("✅ MISSION COMPLETE!");
                handleAnswer('full_correct');
            } else if (isTypo || (conceptsCorrect && !outputCorrect)) {
                // SCENARIO 2: CONCEPT OK / OUTPUT WRONG (or Typo/NameError)
                setRunStatus("warning");
                const partialMsg = isTypo
                    ? `Close! You have a spelling mistake in your variable or function name.\n\nError: ${data.error.split('\n').pop()}\n(No hearts lost! Fix the typo to proceed.)`
                    : `Concept is correct, but output is wrong!\nExpected: "${currentQ.expectedOutput}"\nGot: "${cleanOutput}"\n(No hearts lost! Fix the output to proceed.)`;
                setOutput(`⚠️ ${partialMsg}`);
                handleAnswer('partial_correct', partialMsg);
            } else if (!conceptsCorrect && outputCorrect) {
                // SCENARIO 3: OUTPUT OK / CONCEPT MISSING
                setRunStatus("error");
                const conceptErrorMsg = conceptCheck.message || "Output is correct, but you didn't use the required concepts. Heart lost.";
                setOutput(`❌ ${conceptErrorMsg}`);
                handleAnswer('concept_error', conceptErrorMsg);
            } else {
                // SCENARIO 4: FULLY WRONG
                setRunStatus("error");
                const failMsg = grading.feedback || grading.mentor_feedback || "Logic verification failed.";
                setOutput(`❌ ${failMsg}\n\nYour Output: "${cleanOutput}"`);
                handleAnswer('wrong', failMsg);
            }
        } catch (e) {
            setRunStatus("error");
            setOutput("❌ System Error");
        }
    };

    // --- NEW: Automated Test Cases Runner ---
    const handleRunTestCases = async () => {
        setRunStatus("running");
        setTestResults([]);

        let allPassed = true;
        let newResults = [];
        let executionOutput = "";

        // Send a single combined script to the backend to avoid 3 separate API calls
        // This makes the execution lightning fast.
        let fullTestScript = code + "\n\nprint('---TEST_BOUNDARY---')\n";
        currentQ.testCases.forEach((t, i) => {
            fullTestScript += `try:\n    ${t.inputCode}\nexcept Exception as e:\n    print(f"Error: {e}")\n`;
            if (i < currentQ.testCases.length - 1) {
                fullTestScript += `print('---TEST_BOUNDARY---')\n`;
            }
        });

        try {
            const response = await fetch('http://localhost:8000/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: fullTestScript })
            });
            const data = await response.json();

            if (data.error && !data.output) {
                // If there's a compilation/syntax error in their main code
                setOutput(`❌ Syntax/Compilation Error:\n${data.error}`);
                setRunStatus("error");
                handleAnswer(false, "Code did not compile. " + data.error);
                return;
            }

            const rawOutputs = (data.output || "").split('---TEST_BOUNDARY---\n');
            const cleanUserOutput = rawOutputs.length > 0 ? rawOutputs[0].trim() : ""; // The output from their main editor area if any

            // Collect any prints they made outside test cases
            if (cleanUserOutput && cleanUserOutput !== "") {
                executionOutput += `Your Prints:\n${cleanUserOutput}\n\n`;
            }

            // Verify each test case
            for (let i = 0; i < currentQ.testCases.length; i++) {
                const tc = currentQ.testCases[i];
                // rawOutputs[0] is user prints. Tests start at index 1.
                const rawTestCaseOutput = rawOutputs[i + 1] !== undefined ? rawOutputs[i + 1].trim() : "";
                const isPassed = rawTestCaseOutput === tc.expectedOutput;

                newResults.push({
                    input: tc.inputCode,
                    expected: tc.expectedOutput,
                    actual: rawTestCaseOutput,
                    passed: isPassed
                });

                if (!isPassed) allPassed = false;
            }

            setTestResults(newResults);

            // Concepts verification for test cases
            const verifyConcepts = (code, question) => {
                if (question.requiredConcepts && question.requiredConcepts.length > 0) {
                    for (const requiredStr of question.requiredConcepts) {
                        let regexPattern = requiredStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                        const regex = new RegExp(regexPattern, 'i');
                        if (!regex.test(code)) return false;
                    }
                }
                if (question.regexCheck) {
                    const regex = question.regexCheck instanceof RegExp ? question.regexCheck : new RegExp(question.regexCheck);
                    if (!regex.test(code)) return false;
                }
                return true;
            };

            const conceptsCorrect = verifyConcepts(code, currentQ);
            const isTypo = data.error && (data.error.includes("NameError") || data.error.includes("AttributeError"));

            if (allPassed && conceptsCorrect && !data.error) {
                setRunStatus("success");
                setOutput(`${executionOutput}✅ All test cases passed! MASTERFUL logic.`);
                handleAnswer('full_correct');
            } else if (isTypo || (conceptsCorrect && !allPassed)) {
                setRunStatus("warning");
                const partialMsg = isTypo
                    ? `Spelling mistake detected in your variable/logic. Fix the typo! (No hearts lost)`
                    : `Concept is OK, but test cases failed. No hearts lost! Fix the logic.`;
                setOutput(`${executionOutput}⚠️ ${partialMsg}`);
                handleAnswer('partial_correct', partialMsg);
            } else if (!conceptsCorrect && allPassed) {
                setRunStatus("error");
                setOutput(`${executionOutput}❌ Test cases passed, but required concepts were missing! Heart lost.`);
                handleAnswer('concept_error', "Missing required structure/concepts despite passing tests.");
            } else {
                setRunStatus("error");
                setOutput(`${executionOutput}❌ Failed both logic and structure.`);
                handleAnswer('wrong', "Test cases failed and missing required concepts.");
            }

        } catch (e) {
            setRunStatus("error");
            setOutput("❌ Execution Error. Is backend running?");
            handleAnswer('wrong', "Execution system failure.");
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-950 z-[110] flex flex-col items-center justify-start overflow-y-auto p-4 md:p-12 pb-32 animate-fade-in font-sans">
            <div className="w-full max-w-2xl mb-6 flex justify-between items-end shrink-0 relative z-50">
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-2 text-slate-500 font-bold uppercase tracking-widest text-[8px] md:text-[10px]">
                        <span className="truncate max-w-[150px] md:max-w-none">{moduleTitle} // BOSS FIGHT</span>
                    </div>
                    <div className="flex gap-1.5 w-full">
                        {Array.from({ length: questionQueue.length }).map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${qHistory[i] === 'correct'
                                    ? 'bg-emerald-500'
                                    : qHistory[i] === 'partial'
                                        ? 'bg-emerald-500/30'
                                        : qHistory[i] === 'wrong'
                                            ? 'bg-red-500/50'
                                            : i === qIndex && feedback === null
                                                ? 'bg-emerald-500/20 animate-pulse'
                                                : 'bg-slate-800'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="ml-4 flex gap-2">
                    <button
                        onClick={() => onVictory()}
                        className="bg-emerald-900/30 hover:bg-emerald-500 text-emerald-400 hover:text-white p-2 rounded-lg transition-colors border border-emerald-500/30"
                        title="Dev: Instant Win ⚡"
                    >
                        <Zap size={16} />
                    </button>
                    <button
                        onClick={() => handleReTeachAction(null)}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white p-2 rounded-lg transition-colors active:scale-95"
                        title="Consult Mentor (Pause Exam)"
                    >
                        <Shield size={16} />
                    </button>
                    <button
                        onClick={onBack}
                        className="bg-slate-800 hover:bg-red-900/50 text-slate-400 hover:text-red-400 p-2 rounded-lg transition-colors active:scale-95"
                        title="Retreat to Map"
                    >
                        <MapIcon size={16} />
                    </button>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 md:p-10 rounded-[2.5rem] w-full max-w-2xl shadow-2xl relative flex flex-col shrink-0 mb-10">
                <div className="absolute top-0 right-0 p-32 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="mb-4 relative z-10">
                    {(currentQ.type === 'mission_task' || currentQ.type === 'debugging') ? (
                        <span className="bg-purple-500/20 text-purple-400 text-[10px] px-2 py-1 rounded font-black border border-purple-500/30">
                            CODE CHALLENGE +100 XP
                        </span>
                    ) : (
                        <span className="bg-blue-500/20 text-blue-400 text-[10px] px-2 py-1 rounded font-black border border-blue-500/30">
                            THEORY CHECK +50 XP
                        </span>
                    )}
                </div>

                <div className="absolute top-8 right-8 flex gap-1 z-20">
                    {[1, 2, 3].map(i => (
                        <Heart key={i} size={16} className={`transition-all ${i <= hearts ? "text-red-500 fill-red-500" : "text-slate-800"}`} />
                    ))}
                </div>

                <h2 className="text-xl md:text-2xl font-black text-white mb-6 relative z-10 leading-tight">{currentQ.question}</h2>

                <div className="relative z-10 flex-1">
                    {(currentQ.type === 'mcq' || currentQ.type === 'multiple_choice') && currentQ.options && (() => {
                        // --- SHUFFLE OPTIONS: Randomize order but keep correct answer tracked ---
                        const rawOpts = Array.isArray(currentQ.options)
                            ? currentQ.options.reduce((acc, val, idx) => ({ ...acc, [String.fromCharCode(65 + idx)]: val }), {})
                            : currentQ.options;

                        // Stable shuffle per question (seed from question id to avoid re-shuffling on re-render)
                        const entries = Object.entries(rawOpts);
                        const seed = currentQ.id ? currentQ.id.split('').reduce((s, c) => s + c.charCodeAt(0), 0) : 0;
                        const shuffled = [...entries].sort((a, b) => {
                            const ha = Math.sin(seed + a[0].charCodeAt(0)) * 10000;
                            const hb = Math.sin(seed + b[0].charCodeAt(0)) * 10000;
                            return (ha - Math.floor(ha)) - (hb - Math.floor(hb));
                        });

                        // Map new display letters to original option letters
                        const displayLetters = ['A', 'B', 'C', 'D'];
                        const shuffledOpts = {};
                        const reverseMap = {}; // newLetter -> originalLetter
                        shuffled.forEach(([origKey, val], idx) => {
                            const newKey = displayLetters[idx];
                            shuffledOpts[newKey] = val;
                            reverseMap[newKey] = origKey;
                        });

                        // Find which new display letter holds the correct answer
                        const shuffledCorrect = Object.keys(shuffledOpts).find(
                            newKey => shuffledOpts[newKey] === currentQ.correctAnswer || reverseMap[newKey] === currentQ.correctAnswer
                        );

                        return (
                            <div className="grid gap-3">
                                {Object.entries(shuffledOpts).filter(([, val]) => val !== undefined).map(([key, val]) => (
                                    <button
                                        key={key}
                                        onClick={() => {
                                            setSelectedOption(key);
                                            const isCorrect = key === shuffledCorrect;
                                            handleAnswer(isCorrect ? 'full_correct' : 'wrong');
                                        }}
                                        disabled={feedback !== null}
                                        className={`p-4 rounded-xl border-2 text-left transition-all font-bold flex justify-between items-center group
                                            ${(feedback === 'correct' && key === shuffledCorrect) ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' :
                                                (feedback === 'wrong' && selectedOption === key) ? 'bg-red-500/20 border-red-500 text-red-400' :
                                                    'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-800/80'}
                                        `}
                                    >
                                        <span><span className="opacity-50 mr-4 font-mono">{key}</span> {val}</span>
                                        {(feedback === 'correct' && key === shuffledCorrect) && <CheckCircle size={20} />}
                                        {(feedback === 'wrong' && selectedOption === key) && <span className="text-red-500 text-xs">WRONG</span>}
                                    </button>
                                ))}
                            </div>
                        );
                    })()}

                    {(currentQ.type === 'mission_task' || currentQ.type === 'debugging') && (
                        <div className="space-y-4">
                            <div className="flex justify-end mb-2">
                                {currentQ.hint && (
                                    !showHint ? (
                                        <button
                                            onClick={() => setShowHint(true)}
                                            className="text-xs text-emerald-400 font-bold hover:text-emerald-300 flex items-center gap-1 transition-colors"
                                        >
                                            <Lightbulb size={12} /> Show Hint
                                        </button>
                                    ) : (
                                        <div className="text-xs text-slate-400 bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-700/50 animate-fade-in flex items-start gap-2">
                                            <Lightbulb size={12} className="text-yellow-500 shrink-0 mt-0.5" />
                                            <span>{currentQ.hint}</span>
                                        </div>
                                    )
                                )}
                            </div>
                            <div className="bg-[#1d1f21] p-1 rounded-xl border border-slate-700 font-mono text-sm relative group">
                                <Editor
                                    value={code}
                                    onValueChange={c => setCode(c)}
                                    highlight={code => Prism.highlight(code, Prism.languages.python, 'python')}
                                    padding={16}
                                    textareaId="boss-editor-area"
                                    onKeyDown={handleEditorKeyDown}
                                    style={{ fontFamily: '"Fira Code", monospace', fontSize: 13, backgroundColor: 'transparent', minHeight: '120px' }}
                                />
                            </div>
                            <div className="flex justify-between items-center bg-slate-800/50 p-2 rounded-lg border border-slate-700/50">
                                <span className="text-xs font-bold text-slate-500 uppercase">Input / Output</span>
                            </div>
                            <div className="p-4 font-mono text-xs text-slate-400 whitespace-pre-wrap shrink-0 bg-slate-950/50 rounded-xl border border-slate-800/50 mt-2">
                                {output || "Run your code to see output..."}
                            </div>

                            {/* NEW: Multi-Test Case UI */}
                            {currentQ.testCases && currentQ.testCases.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Test Runner</div>
                                    <div className="grid gap-2">
                                        {currentQ.testCases.map((tc, i) => {
                                            const res = testResults[i];
                                            return (
                                                <div key={i} className={`p-3 rounded-lg border font-mono text-xs flex flex-col gap-1 transition-all ${!res ? 'bg-slate-900 border-slate-800 text-slate-500' :
                                                    res.passed ? 'bg-emerald-900/10 border-emerald-500/30 text-emerald-400' : 'bg-red-900/10 border-red-500/30 text-red-400'
                                                    }`}>
                                                    <div className="flex justify-between">
                                                        <span><span className="opacity-50">Test #{i + 1}:</span> {tc.inputCode}</span>
                                                        {res && (res.passed ? <CheckCircle size={14} className="opacity-80" /> : <Zap size={14} className="opacity-80" />)}
                                                    </div>
                                                    <div className="flex justify-between items-center mt-1">
                                                        <span className="opacity-70">Expected: '{tc.expectedOutput}'</span>
                                                        {res && !res.passed && <span className="font-bold">Got: '{res.actual}'</span>}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {feedback === null && (
                                <button
                                    onClick={handleRunExamCode}
                                    disabled={runStatus === "running"}
                                    className="w-full mt-4 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    {runStatus === "running" ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} fill="currentColor" />}
                                    Submit Logic
                                </button>
                            )}
                        </div>
                    )}

                    {feedback === 'partial' && (
                        <div className="mt-8 pt-8 border-t border-slate-800 animate-fade-in-up flex items-end gap-3 justify-start">
                            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0 mb-1 shadow-lg shadow-emerald-500/20">
                                <Sparkles size={16} className="text-white" />
                            </div>
                            <div className="flex-1 bg-slate-800/40 p-4 md:p-5 rounded-[2rem] rounded-bl-none border border-emerald-500/20">
                                <p className="text-emerald-400 font-bold text-sm leading-relaxed">{explanation}</p>
                                <button
                                    onClick={() => {
                                        setFeedback(null);
                                        setRunStatus("idle");
                                        setExplanation(null);
                                    }}
                                    className="mt-4 w-full py-3 bg-emerald-600 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:scale-[1.02] transition-transform"
                                >
                                    Refine Output
                                </button>
                            </div>
                        </div>
                    )}

                    {feedback === 'correct' && (
                        <div className="mt-8 pt-8 border-t border-slate-800 animate-fade-in-up flex items-end gap-3 justify-start">
                            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0 mb-1 shadow-lg shadow-emerald-500/20">
                                <Sparkles size={16} className="text-white" />
                            </div>
                            <div className="flex-1 bg-emerald-500/10 p-4 md:p-5 rounded-[2rem] rounded-bl-none border border-emerald-500/30">
                                <p className="text-emerald-400 font-bold text-sm leading-relaxed mb-4">{explanation}</p>
                                <button
                                    onClick={moveToNext}
                                    className="w-full py-3 bg-white text-emerald-700 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-[1.02] transition-transform"
                                >
                                    Next Challenge →
                                </button>
                            </div>
                        </div>
                    )}

                    {feedback === 'wrong' && (
                        <div className="mt-8 pt-8 border-t border-slate-800 animate-fade-in-up flex items-end gap-3 justify-start">
                            <div className="w-8 h-8 rounded-xl bg-red-500 flex items-center justify-center shrink-0 mb-1 shadow-lg shadow-red-500/20">
                                <Sparkles size={16} className="text-white" />
                            </div>
                            <div className="flex-1 bg-red-500/5 p-4 md:p-5 rounded-[2rem] rounded-bl-none border border-red-500/20">
                                <div className="mb-4 text-[10px] font-black text-red-400 uppercase tracking-widest">Logic Failure</div>
                                <p className="text-slate-300 text-sm leading-relaxed font-medium mb-6">{explanation}</p>
                                <div className="space-y-2">
                                    <button
                                        onClick={moveToNext}
                                        className="w-full py-3 bg-slate-800 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-700 transition-colors border border-slate-700"
                                    >
                                        Skip Question
                                    </button>
                                    {!(moduleTitle.toLowerCase().includes("exam") || moduleTitle.toLowerCase().includes("master")) && (
                                        <button
                                            onClick={() => setShowConfirmModal(true)}
                                            className="w-full py-3 bg-red-600/10 text-red-500 border border-red-500/30 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-red-600 hover:text-white transition-all"
                                        >
                                            Explain Error
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {hearts === 0 && !isAdmin && (
                    <div className="mt-8 p-6 bg-red-900/20 border-2 border-red-500 rounded-3xl text-center">
                        <Skull size={32} className="text-red-500 mx-auto mb-2" />
                        <h3 className="text-white font-black uppercase tracking-widest mb-2 text-sm">Vital Signs Critical</h3>
                        <p className="text-red-400 text-xs mb-4">You have no hearts left. You should revisit the topic study nodes before attempting this boss again.</p>
                        <button onClick={onBack} className="w-full py-3 bg-red-600 text-white font-black rounded-xl text-xs uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2">
                            <ArrowLeft size={16} /> Return to Map
                        </button>
                    </div>
                )}

                {feedback === null && (
                    <div className="mt-6 flex justify-start items-center opacity-50 hover:opacity-100 transition-opacity">
                        <button
                            onClick={onBack}
                            className="text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-red-400 transition-colors flex items-center gap-2"
                        >
                            <MapIcon size={12} /> Exit Boss Fight
                        </button>
                    </div>
                )}
            </div>

            {showConfirmModal && (
                <div className="fixed inset-0 z-[150] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
                    <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] max-w-sm w-full shadow-2xl scale-in">
                        <HelpCircle size={48} className="text-emerald-500 mb-6 mx-auto animate-pulse" />
                        <h3 className="text-xl font-black text-white text-center mb-2">Need a Hint?</h3>
                        <p className="text-slate-400 text-center mb-8 text-sm leading-relaxed">
                            Pausing the test to visit the Mentor. They will explain exactly what went wrong. Proceed?
                        </p>
                        <div className="grid gap-3">
                            <button
                                onClick={() => {
                                    setShowConfirmModal(false);
                                    handleReTeachAction({
                                        type: "explain_error",
                                        code: code,
                                        error: output,
                                        question: currentQ.question,
                                        context: currentQ.teachMe ? `Focus on concepts from ${currentQ.teachMe}. Provide a brief review flashcard!` : (currentQ.learningGoals || currentQ.explanation || currentQ.hint)
                                    });
                                }}
                                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black uppercase tracking-widest text-sm transition-all"
                            >
                                Proceed to Mentor
                            </button>
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl font-black uppercase tracking-widest text-sm transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BossArena;
