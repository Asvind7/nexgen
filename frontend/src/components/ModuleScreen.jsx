import React, { useState, useEffect, useRef } from 'react';
import { API_URL } from '../config';
import {
    ArrowLeft, Heart, Zap, Send, Code, Terminal, Cpu, ChevronUp, Sparkles, Skull, Play, Shield, CheckCircle, Map as MapIcon, RefreshCw, Lightbulb, Target, HelpCircle, Copy, Trophy, X
} from 'lucide-react';
import {
    generateLessonContent, evaluateAnswer, explainError,
    gradeUserCode, generateHint
} from '../services/TeacherEngine';

// Syntax Highlighting
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css';

import { SYLLABUS_DETAILS } from '../data/syllabus_details';
import confetti from 'canvas-confetti';

// Modular Components & Utils
import BossArena from './Module/BossArena';
import MasterIDE from './MasterIDE';
import ProjectIDE from './ProjectIDE';
import { handleAutoIndent } from '../utils/editorUtils';

export default function ModuleScreen({ module, onBack, onComplete, isAdmin = false, user, setUser }) {
    // --- SAFETY CHECK ---
    if (!module) return <div className="text-white p-10">Loading Module...</div>;

    const [currentStep, setCurrentStep] = useState(0);
    const [initialUserHearts] = useState(user.hearts); // Track starting hearts
    const { hearts, xp, name: userName } = user;

    // Modes: 'briefing' -> 'lecture' -> 'boss_intro' -> 'boss_fight' -> 'victory_lap'
    const [mode, setMode] = useState(isAdmin ? "lecture" : "briefing");
    const [persona, setPersona] = useState("RIVAL");

    // Chat
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    // Playground
    const [showPlayground, setShowPlayground] = useState(false);
    const [lessonPhase, setLessonPhase] = useState("teaching"); // phases: "teaching", "ready", "assignment"
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [runStatus, setRunStatus] = useState("idle");
    const [hint, setHint] = useState(null);
    const [hintLoading, setHintLoading] = useState(false);

    // NEW: Success Modal State
    const [missionSuccess, setMissionSuccess] = useState(false);
    const [hasDefeatedBoss, setHasDefeatedBoss] = useState(false);
    const [quickChips, setQuickChips] = useState([]);
    const [showTip, setShowTip] = useState(false);
    const [activeExplanationRequest, setActiveExplanationRequest] = useState(null);
    const [isExplainingError, setIsExplainingError] = useState(false);

    const chatEndRef = useRef(null);

    // FORCE SUB-LESSONS REFRESH
    const syllabusKey = module?.projectTitle || module?.title;
    const freshData = syllabusKey ? SYLLABUS_DETAILS[syllabusKey] : null;
    const fallbackData = !freshData && module?.title
        ? Object.keys(SYLLABUS_DETAILS).find(key => module.title.toLowerCase().includes(key.toLowerCase()))
        : null;
    const subLessons = freshData || (fallbackData ? SYLLABUS_DETAILS[fallbackData] : module?.subLessons) || [];
    const activeSubLesson = subLessons[currentStep];

    // --- EFFECTS ---
    useEffect(() => {
        if (activeSubLesson) {
            const initialCode = activeSubLesson.startingCode || activeSubLesson.codeTask || `# Goal: ${activeSubLesson.learningGoals || activeSubLesson.context}\n\n`;
            setCode(initialCode);
            setMissionSuccess(false);
            setRunStatus("idle");
            setOutput("");
            setHint(null);
            setShowTip(false);

            if (mode === 'lecture' && !isExplainingError) {
                startLecture();
            }
        }
    }, [activeSubLesson, mode]);

    useEffect(() => {
        setPersona(hearts < 2 ? "MENTOR" : "RIVAL");
    }, [hearts]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading, output]);

    // --- QUICK CHIPS AUTO-RENDERER ---
    useEffect(() => {
        if (!showPlayground && lessonPhase === 'assignment') {
            setQuickChips(["Resume Assignment 🚀"]);
        } else if (!showPlayground && lessonPhase === 'ready') {
            setQuickChips(["Start Assignment 🚀"]);
        }
    }, [showPlayground, lessonPhase]);

    const handleExplainErrorFlow = async (req) => {
        setLoading(true);
        setMode("lecture");
        setIsExplainingError(true);
        setShowPlayground(false);
        setMessages([{ role: 'user', content: "Can you explain why my code failed during the test?" }]);

        try {
            const errorContext = req.question ? `Question: ${req.question}\nError: ${req.error}` : req.error;
            const explanation = await explainError(req.code, errorContext, persona, req.context || "");
            setMessages(prev => [...prev, { role: 'ai', content: explanation.message, example: explanation.example, showExample: false, persona: persona }]);
            setQuickChips(["I understand now! Back to Boss Fight 🚀", "Can you explain differently?"]);
        } catch (err) {
            setMessages(prev => [...prev, { role: 'ai', content: "I'm having a bit of trouble connecting to my logic core. Try looking at your code again." }]);
            setQuickChips(["I understand now! Back to Boss Fight 🚀"]);
        }
        setLoading(false);
    };

    // --- LOGIC ---
    const startLecture = async () => {
        // For master challenges/projects, go straight to the IDE (boss_fight mode)
        const isMaster = module.type === 'master' || module.type === 'phase_master' || module.type === 'project' || module.id?.includes('exam') || module.id?.includes('project');
        if (isMaster) {
            setMode("boss_fight");
            return;
        }

        setLoading(true);
        setMode("lecture");
        setLessonPhase("teaching");
        setShowPlayground(false);
        setQuickChips([]); // Hide any old chips during load

        try {
            if (activeExplanationRequest) {
                const { code, error, context } = activeExplanationRequest;
                setMessages([{ role: 'user', content: `Master, can you explain this error?\n\nCode: \`${code}\`\nError: ${error}` }]);
                const explanation = await explainError(code, error, persona, context || "");
                setMessages(prev => [...prev, { role: 'ai', content: explanation.message, example: explanation.example, showExample: false, persona: persona }]);
                setActiveExplanationRequest(null);
            } else {
                const isCompleted = module.status === 'completed';
                const data = await generateLessonContent(activeSubLesson, "Beginner", persona, hearts, xp, userName, isCompleted);
                setMessages([{ role: 'ai', content: data.message, example: data.example, showExample: false, persona: persona }]);
            }
            setQuickChips(["I understood! 👍", "Can you explain more?"]);
        } catch (err) {
            setMessages([{ role: 'ai', content: "⚠️ Connection unstable. Check backend." }]);
        }
        setLoading(false);
    };

    const validateSyntax = (userCode, lessonTask, validationRules) => {
        if (validationRules && validationRules.mustInclude) {
            for (const requiredStr of validationRules.mustInclude) {
                // Escape special characters for regex
                let escaped = requiredStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

                // NEW: Treat lone single quote as any quote marker
                if (requiredStr === "'") {
                    escaped = "['\"]";
                }

                // If it looks like a bracket access or method call, allow spaces
                let regexPattern = escaped;
                if (requiredStr.length > 1 && (requiredStr.includes("'") || requiredStr.includes('"'))) {
                    const content = requiredStr.replace(/['"]/g, '');
                    const escContent = content.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

                    if (requiredStr.startsWith('[') && requiredStr.endsWith(']')) {
                        regexPattern = `\\[\\s*['"]${escContent}['"]\\s*\\]`;
                    } else if (requiredStr.startsWith('.') && requiredStr.endsWith('()')) {
                        const methodName = content.replace(/^\./, '').replace(/\(\)$/, '');
                        regexPattern = `\\.\\s*${methodName}\\s*\\(\\s*\\)`;
                    } else if (requiredStr.includes('(') && requiredStr.includes(')')) {
                        // Generic function call with quotes and optional spaces
                        regexPattern = escaped
                            .replace(/['"].*?['"]/g, "['\"].*?['\"]")
                            .replace(/\\\(/g, '\\s*\\(\\s*')
                            .replace(/\\\)/g, '\\s*\\)');
                    }
                }

                const regex = new RegExp(regexPattern, 'i');
                if (!regex.test(userCode)) {
                    return { valid: false, error: validationRules.errorMessage || `Missing: "${requiredStr}"` };
                }
            }
        }

        // Legacy keyword checks
        const cleanCode = userCode.replace(/("|')[^"']*("|')/g, "");
        const uniqueKeywords = [];
        if (lessonTask.includes("for ")) uniqueKeywords.push("for");
        if (lessonTask.includes("while ")) uniqueKeywords.push("while");
        if (lessonTask.includes("def ")) uniqueKeywords.push("def");
        if (lessonTask.includes("=") && !lessonTask.includes("==")) uniqueKeywords.push("=");
        const missing = uniqueKeywords.filter(kw => !cleanCode.includes(kw));

        if (missing.length > 0) {
            return { valid: false, error: `Missing core concept: "${missing[0]}".` };
        }
        return { valid: true };
    };

    const handleRunCode = async () => {
        setRunStatus("running");
        setOutput("Thinking...");

        if (activeSubLesson.codeTask) {
            const syntaxCheck = validateSyntax(code, activeSubLesson.codeTask, activeSubLesson.validation);
            if (!syntaxCheck.valid) {
                if (!isAdmin) {
                    setUser(prev => ({
                        ...prev,
                        hearts: Math.max(0, prev.hearts - 1),
                        lastHeartLossTime: Date.now()
                    }));
                }
                setRunStatus("error");
                const hint = `Instruction Missed\n\n${syntaxCheck.error}`;
                setOutput(`❌ ${hint}`);
                setMessages(prev => [...prev, { role: 'ai', content: hint, persona: persona }]);
                setLoading(false);
                return;
            }
        }

        try {
            const response = await fetch(`${API_URL}/execute`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: code })
            });

            const data = await response.json();

            if (data.error) {
                const isTypo = data.error.includes("NameError") || data.error.includes("AttributeError");
                if (!isTypo && !isAdmin) {
                    setUser(prev => ({
                        ...prev,
                        hearts: Math.max(0, prev.hearts - 1),
                        lastHeartLossTime: Date.now()
                    }));
                }
                setRunStatus("error");
                setOutput(`❌ Python Error\n\n${data.error}`);
                const isExam = module.title.toLowerCase().includes("exam") || module.title.toLowerCase().includes("master") || module.type === 'master';
                if (!isExam) {
                    const explanation = await explainError(code, data.error, persona);
                    setMessages(prev => [...prev, { role: 'ai', content: explanation.message, example: explanation.example, showExample: false, persona: persona }]);
                } else {
                    setMessages(prev => [...prev, { role: 'ai', content: "Syntax Error detected. Logic refinement required. (Assistance restricted during EXAM)", persona: persona }]);
                }
                setLoading(false);
                return;
            }

            const rawOutput = data.output || "";
            const goals = activeSubLesson.learningGoals || `The user must print: "${activeSubLesson.expectedOutput}"`;
            setMessages(prev => [...prev, { role: 'ai', content: "🔍 Analyzing logic...", persona: persona }]);
            const gradingResult = await gradeUserCode(code, activeSubLesson.title, goals, rawOutput);

            if (gradingResult.passed) {
                triggerSuccess(`Correct! ${gradingResult.mentor_feedback}`);
                setOutput(`✅ Output:\n${rawOutput}\n\n💡 Mentor: ${gradingResult.mentor_feedback}`);
            } else {
                // CONCEPT MISSED - User requested no heart loss for these errors in lessons
                setRunStatus("error");
                setOutput(`❌ Concept Missed\n\n✅ Output:\n${rawOutput}\n\n💡 Mentor: ${gradingResult.mentor_feedback}`);
                setMessages(prev => [...prev, { role: 'ai', content: gradingResult.mentor_feedback, persona: persona }]);
            }
        } catch (err) {
            setOutput("System Error: Could not reach backend.");
            setRunStatus("error");
        }
        setLoading(false);
    };

    const triggerSuccess = (msg) => {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, zIndex: 9999 });

        const isPerfect = user.hearts === initialUserHearts;
        const isProject = module.type === 'project' || module.type === 'phase_master';
        const baseXp = isProject ? 100 : 50;
        const bonusXp = isPerfect ? (isProject ? 100 : 50) : 0;

        setUser(prev => {
            const newXp = prev.xp + baseXp + bonusXp;

            // Update leaderboard
            let newLeaderboard = [...(prev.leaderboard || [])];
            const userEntry = newLeaderboard.find(e => e.isUser);
            if (userEntry) {
                userEntry.xp = newXp;
                newLeaderboard.sort((a, b) => b.xp - a.xp);
                newLeaderboard = newLeaderboard.map((e, i) => ({ ...e, rank: i + 1 }));
            }

            return {
                ...prev,
                xp: newXp,
                achievements: {
                    ...(prev.achievements || {}),
                    perfectClears: isPerfect ? ((prev.achievements?.perfectClears || 0) + 1) : (prev.achievements?.perfectClears || 0)
                },
                leaderboard: newLeaderboard
            };
        });

        setMissionSuccess(true);
        setRunStatus("success");
        setOutput(`✅ ${msg}${isPerfect ? ' 🏆 PERFECT CLEAR! +50 BONUS XP' : ''}`);
        if (msg !== "Correct!") {
            setMessages(prev => [...prev, { role: 'ai', content: isPerfect ? `🏆 IMPRESSIVE! A perfect run. ${msg}` : msg, persona: persona }]);
        }
    };

    const handleNextLevel = () => {
        setMissionSuccess(false);
        setShowPlayground(false);
        setMessages([]);
        setQuickChips([]);
        setLessonPhase("teaching");

        if (hasDefeatedBoss) {
            onComplete();
            return;
        }

        if (currentStep < subLessons.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setMode("boss_intro");
        }
    };

    const handleQuickReply = (text) => {
        if (text === "I understood! 👍") {
            setLessonPhase("ready");
            setMessages(prev => [...prev, { role: 'user', content: text }, { role: 'ai', content: "Ready for the assignment?", persona: persona }]);
            setQuickChips(["Start Assignment 🚀"]);
        } else if (text === "Start Assignment 🚀" || text === "Resume Assignment 🚀") {
            setLessonPhase("assignment");
            setShowPlayground(true);
            setQuickChips([]);
        } else if (text === "Resume Exam 🚀") {
            setMode("boss_fight");
            setQuickChips([]);
        } else if (text === "I understand now! Back to Boss Fight 🚀") {
            setMode("boss_fight");
            setQuickChips([]);
        } else if (text === "Can you explain more?" || text === "Can you explain differently?") {
            handleSendMessage(text);
        } else {
            setInput(text);
            setTimeout(() => handleSendMessage(), 100);
        }
    };

    const handleEditorKeyDown = (e) => handleAutoIndent(e, code, setCode);

    const handleSendMessage = async (textOverride = null) => {
        const textToSend = textOverride || input;
        if (!textToSend.trim() || loading) return;
        setMessages(prev => [...prev, { role: 'user', content: textToSend }]);
        setInput("");
        setLoading(true);
        const response = await evaluateAnswer("Hint", textToSend, activeSubLesson.context, persona, activeSubLesson.title, activeSubLesson.codeTask, userName);
        setMessages(prev => [...prev, { role: 'ai', content: response.message, example: response.example, showExample: false, persona: persona }]);
        setLoading(false);
    };

    const handleGetHint = async () => {
        if (!activeSubLesson?.codeTask) return;
        setHintLoading(true);
        try {
            const hintMsg = await generateHint(activeSubLesson, code, persona);
            setHint(hintMsg);
        } catch (err) {
            setHint("Try looking at your code again!");
        }
        setHintLoading(false);
    };

    const formatMessage = (text) => {
        if (!text) return "";
        const parts = text.split(/(```[\s\S]*?```|`[^`]+`|\*\*[^*]+\*\*)/g);
        return parts.map((part, index) => {
            if (!part) return null;
            if (part.startsWith('```')) {
                let rawCode = part.slice(3, -3);
                if (rawCode.startsWith('python')) rawCode = rawCode.slice(6);
                else if (rawCode.startsWith('py')) rawCode = rawCode.slice(2);
                const html = Prism.highlight(rawCode.trim(), Prism.languages.python, 'python');
                return (
                    <div key={index} className="group relative my-4 bg-slate-950 rounded-xl border border-slate-800/50 overflow-hidden shadow-2xl font-mono transition-all hover:border-emerald-500/30 select-none">
                        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/50 border-b border-slate-800/50">
                            <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500/40" /><div className="w-2 h-2 rounded-full bg-yellow-500/40" /><div className="w-2 h-2 rounded-full bg-emerald-500/40" /></div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1"><Code size={10} className="text-emerald-500" />Python</span>
                        </div>
                        <pre className="p-5 text-[13px] overflow-x-auto bg-slate-950/50"><code dangerouslySetInnerHTML={{ __html: html }} /></pre>
                    </div>
                );
            }
            if (part.startsWith('`')) {
                const html = Prism.highlight(part.slice(1, -1), Prism.languages.python, 'python');
                return <code key={index} className="font-mono text-[11px] bg-slate-950 px-1.5 py-0.5 rounded-md border border-slate-700 text-emerald-400 mx-0.5 inline-block select-none" dangerouslySetInnerHTML={{ __html: html }} />;
            }
            if (part.startsWith('**')) return <strong key={index} className="text-emerald-400 font-bold">{part.slice(2, -2)}</strong>;
            return <span key={index} className="whitespace-pre-wrap">{part}</span>;
        }).filter(Boolean);
    };

    const VictoryOverlay = () => (
        <div className="absolute inset-0 z-[60] bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in">
            <div className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center mb-6 animate-bounce"><CheckCircle size={64} className="text-white" /></div>
            <h2 className="text-4xl font-black text-white mb-2">{hasDefeatedBoss ? "Boss Defeated!" : "Level Complete!"}</h2>
            <p className="text-emerald-400 font-bold uppercase tracking-widest mb-8 text-sm">+{hasDefeatedBoss ? "200" : "50"} XP EARNED</p>
            <button onClick={() => hasDefeatedBoss ? onComplete() : handleNextLevel()} className="bg-white text-emerald-600 px-10 py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-transform flex items-center gap-2">
                {hasDefeatedBoss ? "Claim Badge" : (currentStep < subLessons.length - 1 ? "Next Level" : "Face Boss")} <ArrowLeft className="rotate-180" />
            </button>
        </div>
    );

    if (mode === 'briefing') {
        return (
            <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col items-center justify-start animate-fade-in p-8 text-center font-sans">
                <Sparkles size={64} className="text-emerald-400 mb-6 animate-bounce" />
                <h1 className="text-2xl md:text-4xl font-black text-white mb-4">{module.topic}</h1>
                <p className="text-slate-400 mb-8 max-w-md text-sm md:text-base">{module.description}</p>
                <button onClick={startLecture} className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest flex items-center gap-2">Start Mission <Play size={16} fill="currentColor" /></button>
                <button onClick={onBack} className="mt-6 text-slate-500 hover:text-white flex items-center gap-2"><MapIcon size={14} /> Return to Map</button>
            </div>
        );
    }


    if (mode === 'boss_fight') {
        const isMasterProject = module.type === 'master' || module.type === 'phase_master' || module.type === 'project' || module.id?.includes('exam') || module.id?.includes('project') || module.title?.toLowerCase().includes('exam') || module.title?.toLowerCase().includes('project');

        if (isMasterProject) {
            const masterTask = subLessons[0] || {};
            return (
                <MasterIDE
                    title={module.title || module.topic || 'Master Project'}
                    initialCode={masterTask.startingCode || (masterTask.codeTask ? `# Task: ${masterTask.codeTask}\n\n` : `# ${masterTask.title || 'Master Project'}\n# ${masterTask.learningGoals || 'Complete the challenge below'}\n\n`)}
                    task={{
                        question: masterTask.learningGoals || masterTask.context || masterTask.title || 'Complete the master challenge.',
                        hint: masterTask.educationalTip || masterTask.hint || null,
                        requiredConcepts: masterTask.requiredConcepts || [],
                    }}
                    onClose={onBack}
                    onVictory={() => {
                        const isPerfect = user.hearts === initialUserHearts;
                        setUser(prev => {
                            const newXp = prev.xp + 200 + (isPerfect ? 300 : 0);
                            let newLeaderboard = [...(prev.leaderboard || [])];
                            const userEntry = newLeaderboard.find(e => e.isUser);
                            if (userEntry) {
                                userEntry.xp = newXp;
                                newLeaderboard.sort((a, b) => b.xp - a.xp);
                                newLeaderboard = newLeaderboard.map((e, i) => ({ ...e, rank: i + 1 }));
                            }
                            return {
                                ...prev,
                                xp: newXp,
                                achievements: {
                                    ...(prev.achievements || {}),
                                    masterExamAces: isPerfect ? ((prev.achievements?.masterExamAces || 0) + 1) : (prev.achievements?.masterExamAces || 0)
                                },
                                leaderboard: newLeaderboard
                            };
                        });
                        setHasDefeatedBoss(true);
                        setMode('victory_lap');
                        setMissionSuccess(true);
                    }}
                />
            );
        }

        return <BossArena
            onComplete={() => { setMode("victory_lap"); setHasDefeatedBoss(true); setXp(x => x + 200); setMissionSuccess(true); }}
            onReTeach={(req) => req ? handleExplainErrorFlow(req) : setMode("lecture")}
            onBack={onBack}
            moduleTitle={module.title || module.topic}
            hearts={hearts}
            setHearts={(h) => setUser(prev => {
                const newHearts = typeof h === 'function' ? h(prev.hearts) : h;
                const heartLost = newHearts < prev.hearts;
                if (heartLost && isAdmin) return prev;
                return {
                    ...prev,
                    hearts: newHearts,
                    lastHeartLossTime: heartLost ? Date.now() : prev.lastHeartLossTime
                };
            })}
            setXp={(x) => setUser(prev => ({ ...prev, xp: typeof x === 'function' ? x(prev.xp) : x }))}
            moduleId={module.id}
            subLessons={subLessons}
            isAdmin={isAdmin}
            onVictory={() => {
                const isPerfect = user.hearts === initialUserHearts;
                const bonusXp = 300;
                setUser(prev => {
                    const newXp = prev.xp + 200 + (isPerfect ? bonusXp : 0);
                    let newLeaderboard = [...(prev.leaderboard || [])];
                    const userEntry = newLeaderboard.find(e => e.isUser);
                    if (userEntry) {
                        userEntry.xp = newXp;
                        newLeaderboard.sort((a, b) => b.xp - a.xp);
                        newLeaderboard = newLeaderboard.map((e, i) => ({ ...e, rank: i + 1 }));
                    }
                    return {
                        ...prev,
                        xp: newXp,
                        achievements: {
                            ...(prev.achievements || {}),
                            masterExamAces: isPerfect ? ((prev.achievements?.masterExamAces || 0) + 1) : (prev.achievements?.masterExamAces || 0)
                        },
                        leaderboard: newLeaderboard
                    };
                });
                setHasDefeatedBoss(true);
                setMode("victory_lap");
                setMissionSuccess(true);
            }}
        />;
    }

    if (mode === 'victory_lap') {
        return (
            <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                <div className="bg-slate-900 border border-emerald-500/30 p-12 rounded-[3rem] shadow-2xl max-w-lg w-full">
                    <div className="w-40 h-40 bg-emerald-500 rounded-full flex items-center justify-center mb-8 mx-auto animate-bounce"><CheckCircle size={80} className="text-white" /></div>
                    <h1 className="text-5xl font-black text-white mb-4 tracking-tight">Level Conquered!</h1>
                    <button onClick={onComplete} className="w-full bg-white text-emerald-700 px-8 py-5 rounded-2xl font-black text-xl uppercase tracking-widest flex items-center justify-center gap-3">Continue Journey <ArrowLeft className="rotate-180" /></button>
                </div>
            </div>
        );
    }

    if (module.type === 'phase_master') {
        const masterDetails = subLessons[0] || {};
        return (
            <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col items-center justify-center p-8 text-center animate-fade-in overflow-y-auto">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-500"></div>

                <div className="max-w-xl w-full">
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-yellow-400 blur-3xl opacity-20 animate-pulse"></div>
                        <Trophy size={100} className="text-yellow-400 mx-auto relative z-10" />
                    </div>

                    <h1 className="text-5xl font-black text-white mb-4 tracking-tight leading-none uppercase italic">
                        Phase Master Challenge
                    </h1>
                    <h2 className="text-2xl font-bold text-emerald-400 mb-6">{masterDetails.title}</h2>

                    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[3rem] text-left mb-10 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <Target size={20} className="text-red-500" />
                            <span className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">The Objective</span>
                        </div>
                        <p className="text-slate-300 text-lg leading-relaxed mb-6">
                            {masterDetails.educationalTip || "This is the final barrier of this phase. Pass the ultimate test to unlock the next chapter of your journey as a developer."}
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                                <div className="text-[10px] font-bold text-slate-600 uppercase mb-1">XP Reward</div>
                                <div className="text-xl font-black text-yellow-500">+500 XP</div>
                            </div>
                            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                                <div className="text-[10px] font-bold text-slate-600 uppercase mb-1">Status</div>
                                <div className="text-xl font-black text-emerald-500 uppercase">UNLOCKED</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <button
                            onClick={() => setMode("boss_fight")}
                            className="bg-white text-slate-950 px-12 py-5 rounded-[1.5rem] font-black text-xl uppercase tracking-widest shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                            Begin Graduation <Play size={24} fill="currentColor" />
                        </button>
                        <button onClick={onBack} className="text-slate-500 hover:text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                            <MapIcon size={14} /> Back to Map
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (mode === 'boss_intro') {
        return (
            <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                <Skull size={64} className="text-red-500 mb-4 animate-pulse" />
                <h1 className="text-3xl font-black text-white mb-2">Boss Fight</h1>
                <p className="text-slate-400 mb-8">Prove your mastery.</p>
                <button onClick={() => setMode("boss_fight")} className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest shadow-xl">Enter Arena</button>
                <button onClick={onBack} className="mt-6 text-slate-500 hover:text-white flex items-center gap-2 font-bold uppercase tracking-widest text-xs"><MapIcon size={14} /> Back to Map</button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[500] bg-slate-950 flex flex-col font-sans animate-fade-in">
            {missionSuccess && hasDefeatedBoss && <VictoryOverlay />}
            {/* HEADER LAYER (Background separation) */}
            <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-950 via-slate-950/90 to-transparent z-[55] pointer-events-none" />

            {/* FLOATING HEADER CONTROLS */}
            <div className="fixed top-6 left-0 right-0 z-[60] flex items-center justify-center px-6 pointer-events-none">
                <div className="flex items-center gap-3 pointer-events-auto">
                    <button
                        onClick={onBack}
                        className="p-3 bg-slate-900/80 backdrop-blur-xl border border-slate-800 text-slate-400 hover:text-white rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-2xl"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 px-4 py-2 rounded-2xl flex items-center gap-4 shadow-2xl">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none">
                                Topic {currentStep + 1}/{subLessons.length}
                            </span>
                            <span className="text-xs font-bold text-white tracking-tight truncate max-w-[150px]">
                                {activeSubLesson?.title || "Mission"}
                            </span>
                        </div>

                        <div className="h-8 w-px bg-slate-800" />

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 text-red-500 font-black text-xs">
                                <Heart size={14} fill="currentColor" /> {hearts}
                            </div>
                            <div className="flex items-center gap-1.5 text-yellow-500 font-black text-xs">
                                <Zap size={14} fill="currentColor" /> {xp}
                            </div>
                        </div>
                    </div>

                    {isAdmin && (
                        <button
                            onClick={() => setMode("boss_intro")}
                            className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-500/20 transition-all shadow-lg"
                        >
                            Skip to Boss
                        </button>
                    )}
                </div>
            </div>
            {/* Message Stream Area - SCROLLABLE */}
            <div className="flex-1 min-h-0 overflow-y-auto px-4 md:px-8 pb-4 md:pb-8 pt-36 md:pt-40 space-y-6 custom-scrollbar">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up items-end gap-3`}>
                        {/* AI Avatar on Left */}
                        {msg.role !== 'user' && (
                            <div className={`w-7 h-7 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg mb-1 ${msg.persona === 'RIVAL' ? 'bg-red-500 shadow-red-500/20' : 'bg-emerald-500 shadow-emerald-500/20'}`}>
                                <Sparkles size={14} md:size={16} className="text-white" />
                            </div>
                        )}

                        <div className={`group relative max-w-[80%] md:max-w-[75%] p-3.5 md:p-6 rounded-2xl md:rounded-[2rem] transition-all duration-500 shadow-xl ${msg.role === 'user'
                            ? 'bg-emerald-600 text-white rounded-br-none'
                            : 'bg-[#1a1c21] border border-slate-800 text-slate-300 rounded-bl-none'
                            }`}>
                            {msg.role === 'ai' && (
                                <div className="text-[10px] text-slate-500 font-black mb-2 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <span>{msg.persona || persona}</span>
                                </div>
                            )}

                            <div className="text-[13px] md:text-[16px] leading-relaxed">
                                {formatMessage(msg.content)}
                            </div>

                            {msg.role === 'ai' && msg.example && !msg.showExample && (
                                <button onClick={() => setMessages(prev => prev.map((m, idx) => idx === i ? { ...m, showExample: true } : m))} className="mt-4 flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500/20 transition-all">
                                    <Lightbulb size={12} /> Give Example
                                </button>
                            )}
                            {msg.role === 'ai' && msg.example && msg.showExample && (
                                <div className="mt-4 animate-fade-in">
                                    <div className="bg-slate-950 rounded-2xl border border-slate-800/50 overflow-hidden shadow-2xl font-mono">
                                        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/50 border-b border-slate-800/50">
                                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                                <Code size={10} className="text-emerald-500" /> Python Example
                                            </span>
                                        </div>
                                        <pre className="p-4 text-[12px] overflow-x-auto bg-slate-950/50 text-emerald-400">
                                            <code dangerouslySetInnerHTML={{ __html: Prism.highlight(msg.example, Prism.languages.python, 'python') }} />
                                        </pre>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Avatar on Right */}
                        {msg.role === 'user' && (
                            <div className="w-7 h-7 md:w-10 md:h-10 rounded-xl bg-emerald-700/50 flex items-center justify-center shrink-0 mb-1 border border-emerald-500/30">
                                <div className="text-[9px] md:text-[10px] font-black text-white">AS</div>
                            </div>
                        )}
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start px-2">
                        <div className="bg-slate-800/50 text-slate-500 text-[10px] font-black px-4 py-2 rounded-full animate-pulse uppercase tracking-[0.2em] border border-slate-700/50">
                            Neural Processing...
                        </div>
                    </div>
                )}
                {/* Spacer to push content above the floating dock */}
                <div className="h-64 md:h-80 shrink-0 pointer-events-none" />
                <div ref={chatEndRef} />
            </div>

            {/* FLOATING INPUT DOCK (STABILIZED) */}
            <div className="fixed bottom-20 md:bottom-28 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 md:px-6 z-[200]">
                {quickChips.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar justify-center">
                        {quickChips.map((chip, idx) => (
                            <button key={idx} onClick={() => handleQuickReply(chip)} className="whitespace-nowrap px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 text-[9px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest hover:border-emerald-500/50 transition-all shadow-xl">
                                {chip}
                            </button>
                        ))}
                    </div>
                )}

                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-emerald-500/10 rounded-[2rem] md:rounded-[2.5rem] blur opacity-0 group-focus-within:opacity-100 transition-all duration-700" />
                    <div className={`relative bg-slate-900/95 backdrop-blur-3xl border border-slate-800 p-1.5 md:p-2 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl flex flex-col transition-all duration-300 focus-within:border-emerald-500/30`}>
                        {showPlayground ? (
                            <div className="flex flex-col gap-4 p-4 max-h-[70vh] overflow-hidden">
                                <div className="flex justify-between items-center mb-2 px-2">
                                    <div className="flex gap-2">
                                        <button onClick={handleRunCode} disabled={runStatus === "running"} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all">
                                            {runStatus === "running" ? <RefreshCw size={12} className="animate-spin" /> : <Play size={12} fill="currentColor" />} Run
                                        </button>
                                        <button onClick={handleGetHint} disabled={hintLoading} className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-700 flex items-center gap-2 transition-all">
                                            <Lightbulb size={12} /> Hint
                                        </button>
                                    </div>
                                    <button onClick={() => setShowPlayground(false)} className="text-slate-500 hover:text-white transition-colors">
                                        <X size={18} />
                                    </button>
                                </div>
                                <div className="flex flex-col md:flex-row gap-4 flex-1 min-h-[250px] overflow-hidden">
                                    <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden relative font-mono">
                                        <Editor value={code} onValueChange={c => setCode(c)} highlight={c => Prism.highlight(c, Prism.languages.python, 'python')} padding={20} onKeyDown={handleEditorKeyDown} style={{ fontFamily: 'monospace', fontSize: 13, minHeight: '100%', backgroundColor: 'transparent' }} />
                                    </div>
                                    <div className="w-full md:w-1/3 bg-slate-950/80 rounded-2xl border border-slate-800 p-4 font-mono text-[11px] overflow-y-auto">
                                        <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-3">Console</div>
                                        <div className={runStatus === 'error' ? 'text-red-400' : 'text-emerald-400'}>{output || "Ready."}</div>
                                    </div>
                                </div>
                                {hint && <div className="bg-emerald-950/30 border border-emerald-500/20 p-3 rounded-xl text-[11px] text-emerald-400 animate-fade-in flex gap-3"><Lightbulb size={14} className="shrink-0 mt-0.5" />{hint}</div>}
                                {(missionSuccess || isAdmin) && (
                                    <button onClick={handleNextLevel} className="w-full bg-white text-emerald-600 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                                        Continue Journey <ArrowLeft size={16} className="rotate-180 inline ml-1" />
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 px-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type a message to your mentor..."
                                    className="flex-1 bg-transparent border-none focus:ring-0 text-[14px] md:text-[15px] text-white px-4 py-3 md:py-4 outline-none placeholder-slate-600"
                                />
                                <button
                                    onClick={() => handleSendMessage()}
                                    disabled={!input.trim() || loading}
                                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all ${input.trim() ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' : 'bg-slate-800 text-slate-600 opacity-50'}`}
                                >
                                    <Send size={18} md:size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}