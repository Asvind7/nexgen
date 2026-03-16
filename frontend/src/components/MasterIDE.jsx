import React, { useState, useRef, useEffect } from 'react';
import { API_URL } from '../config';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-okaidia.css';
import {
    Play, Terminal, Send, Sparkles, RefreshCw, X,
    ChevronDown, Bot, Code, Plus, Trash2, CheckCircle, XCircle,
    Maximize2, Minimize2, ArrowLeft, Home, Map as MapIcon, Target, Lightbulb, Trophy
} from 'lucide-react';
import { handleAutoIndent } from '../utils/editorUtils';

export default function MasterIDE({ onClose, title = 'Master Project', initialCode = '', onNavigate, task = null, onVictory = null }) {
    const [code, setCode] = useState(initialCode || '# Write your Python program here\n\n');
    const [output, setOutput] = useState('');
    const [runStatus, setRunStatus] = useState('idle');
    const [stdinLines, setStdinLines] = useState(['']);
    const [showStdin, setShowStdin] = useState(false);
    const [mobileTab, setMobileTab] = useState('ai');
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => { });
            setIsFullscreen(true);
        } else {
            document.exitFullscreen().catch(() => { });
            setIsFullscreen(false);
        }
    };

    // Sync state if user presses Escape to exit fullscreen
    useEffect(() => {
        const handler = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handler);
        return () => document.removeEventListener('fullscreenchange', handler);
    }, []);

    const [messages, setMessages] = useState([
        {
            role: 'ai',
            content: "👋 I'm your Project Mentor. I'll help guide you through this challenge with hints and conceptual nudges, but I won't give you the code directly. What's your plan for this project?"
        }
    ]);
    const [chatInput, setChatInput] = useState('');
    const [chatLoading, setChatLoading] = useState(false);

    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // ── Core AI sender (always in Guided/Socratic mode) ──
    const sendToAI = async (userMsg, isAutoExplain = false) => {
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setChatLoading(true);
        if (isAutoExplain) setMobileTab('ai'); // switch to chat tab on mobile
        try {
            const systemPrompt = `You are a Socratic coding mentor for a SPECIAL Python master challenge.

Challenge: "${task?.question || title}"
${task?.requiredConcepts?.length ? `Required concepts: ${task.requiredConcepts.join(', ')}` : ''}

STRICT ADHERENCE TO THESE RULES IS MANDATORY:
1. ZERO CODE POLICY: Do NOT provide any Python code snippets, blocks, or examples. Even for "concepts", do not write code.
2. NO CODE FORMATTING: Do not use backticks (\`) to format Python keywords or functions. Talk about them as plain text (e.g., say "the input function" instead of "\`input()\`").
3. IGNORE HISTORY: Even if there is code in the earlier parts of this chat, you MUST stop providing code immediately.
4. If the user asks for code or an example, REJECT the request and ask a guiding question to help them figure out the logic themselves.
5. Describe logic with metaphors or plain English steps (e.g., "First, get a value from the user and store it in a box").
6. Conceptual Debugging: If they have an error, describe the logical mistake. Never tell them what key to press or word to type.`;

            const res = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: userMsg,
                    system: systemPrompt,
                    topic: task?.question || title,
                    level: 'Beginner',
                    history: messages.slice(-6).map(m => ({
                        role: m.role === 'ai' ? 'model' : 'user',
                        content: m.content
                    }))
                })
            });
            const data = await res.json();
            let aiResponse = data.response || 'Sorry, could not respond.';

            // Fail-safe: Strip any markdown code blocks that might have leaked through
            aiResponse = aiResponse.replace(/```[\s\S]*?```/g, '*(Code block removed to keep the challenge Socratic)*');

            setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
        } catch {
            setMessages(prev => [...prev, { role: 'ai', content: '⚠️ Connection lost. Please try again.' }]);
        }
        setChatLoading(false);
    };

    const handleRun = async () => {
        setRunStatus('running');
        setOutput('▶ Running...');
        setMobileTab('output');
        const stdin = stdinLines.filter(l => l.trim()).join('\n');
        try {
            const res = await fetch(`${API_URL}/execute`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, stdin })
            });
            const data = await res.json();
            if (data.error) {
                setRunStatus('error');
                setOutput(`❌ Error\n\n${data.error}`);
                // Auto-explain the error
                await sendToAI(
                    `I ran this Python code:\n\`\`\`python\n${code}\n\`\`\`\n\nAnd got this error:\n\`\`\`\n${data.error}\n\`\`\`\n\nExplain what went wrong and how to fix it.`,
                    true
                );
            } else {
                setRunStatus('success');
                setOutput(data.output || '(No output)');
            }
        } catch {
            setRunStatus('error');
            setOutput('❌ Could not reach backend. Is the server running?');
        }
    };

    const handleSendChat = async () => {
        if (!chatInput.trim() || chatLoading) return;
        const userMsg = chatInput.trim();
        setChatInput('');
        await sendToAI(userMsg);
    };

    const addStdinLine = () => setStdinLines(prev => [...prev, '']);
    const updateStdinLine = (i, val) => setStdinLines(prev => prev.map((l, idx) => idx === i ? val : l));
    const removeStdinLine = (i) => setStdinLines(prev => prev.filter((_, idx) => idx !== i));

    const statusColor = { idle: 'text-slate-500', running: 'text-yellow-400 animate-pulse', success: 'text-emerald-400', error: 'text-red-400' };
    const statusLabel = { idle: 'Ready', running: 'Running...', success: 'Success', error: 'Error' };

    const renderMessage = (text) => {
        const parts = text.split(/(```[\s\S]*?```)/g);
        return parts.map((part, idx) => {
            const fenceMatch = part.match(/^```(\w*)\n?([\s\S]*?)```$/);
            if (fenceMatch) {
                const lang = fenceMatch[1] || 'python';
                const codeText = fenceMatch[2].trimEnd();
                const grammar = Prism.languages[lang] || Prism.languages.python;
                const highlighted = Prism.highlight(codeText, grammar, lang);
                return (
                    <div key={idx} className="my-2 rounded-xl overflow-hidden border border-white/10">
                        <div className="flex items-center gap-2 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-slate-500" style={{ background: '#161b22' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                            {lang || 'python'}
                        </div>
                        <pre className="overflow-x-auto px-4 py-3 text-[12px] leading-relaxed font-mono" style={{ background: '#0d1117', margin: 0 }}>
                            <code dangerouslySetInnerHTML={{ __html: highlighted }} />
                        </pre>
                    </div>
                );
            }
            const inlineParts = part.split(/(`[^`]+`)/g);
            return (
                <span key={idx}>
                    {inlineParts.map((chunk, j) =>
                        chunk.startsWith('`') && chunk.endsWith('`')
                            ? <code key={j} className="px-1.5 py-0.5 rounded bg-slate-700/70 text-emerald-300 font-mono text-[11px]">{chunk.slice(1, -1)}</code>
                            : <span key={j} className="whitespace-pre-wrap">{chunk}</span>
                    )}
                </span>
            );
        });
    };


    const editorJSX = (
        <div className="h-full flex flex-col" style={{ background: '#0d1117' }}>
            <div className="flex items-center gap-1 px-3 py-1.5 border-b border-white/5 shrink-0" style={{ background: '#161b22' }}>
                <div className="flex items-center gap-2 px-3 py-1 rounded-t-lg text-[11px] font-mono font-semibold text-emerald-300 border-t border-l border-r border-emerald-500/30" style={{ background: '#0d1117' }}>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                    main.py
                </div>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar" style={{ background: '#0d1117' }}>
                <style>{`
                    .ide-editor .token.keyword { color: #ff7b72; font-weight: 600; }
                    .ide-editor .token.string  { color: #a5d6ff; }
                    .ide-editor .token.number  { color: #79c0ff; }
                    .ide-editor .token.comment { color: #8b949e; font-style: italic; }
                    .ide-editor .token.function{ color: #d2a8ff; }
                    .ide-editor .token.builtin { color: #ffa657; }
                    .ide-editor .token.operator{ color: #ff7b72; }
                    .ide-editor .token.boolean  { color: #79c0ff; }
                    .ide-editor .token.class-name { color: #ffa657; }
                    .ide-editor textarea { caret-color: #58a6ff !important; height: 100% !important; }
                    .ide-editor textarea:focus { outline: none; }
                    .ide-editor > div { min-height: 100%; }
                `}</style>
                <Editor
                    className="ide-editor"
                    value={code}
                    onValueChange={setCode}
                    highlight={c => Prism.highlight(c, Prism.languages.python, 'python')}
                    padding={20}
                    onKeyDown={e => handleAutoIndent(e, code, setCode)}
                    style={{
                        fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", monospace',
                        fontSize: 14,
                        lineHeight: 1.8,
                        minHeight: '100%',
                        background: 'transparent',
                        color: '#e6edf3',
                    }}
                />
            </div>
        </div>
    );

    const outputJSX = (
        <div className="flex flex-col h-full bg-slate-900 overflow-hidden">
            <div className="flex lg:hidden items-center gap-2 px-4 py-2 border-b border-slate-800 shrink-0">
                <button
                    onClick={() => setMobileTab('code')}
                    className="flex items-center gap-1.5 text-[11px] font-black text-slate-400 hover:text-white uppercase tracking-widest transition-colors"
                >
                    <X size={14} /> Close Output
                </button>
            </div>
            <div className="hidden lg:block shrink-0">
                <button
                    onClick={() => setShowStdin(p => !p)}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-colors border-b border-slate-800"
                >
                    <Terminal size={12} className="text-yellow-400" />
                    Test Inputs (stdin)
                    <span className="ml-auto text-slate-600 normal-case">
                        {stdinLines.filter(l => l.trim()).length} value{stdinLines.filter(l => l.trim()).length !== 1 ? 's' : ''}
                    </span>
                    <ChevronDown size={12} className={`transition-transform ${showStdin ? 'rotate-180' : ''}`} />
                </button>
                {showStdin && (
                    <div className="px-4 py-3 space-y-2 border-b border-slate-800 animate-fade-in">
                        <p className="text-[10px] text-slate-500">
                            Values fed to <code className="text-yellow-400">input()</code> in order.
                        </p>
                        {stdinLines.map((line, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-slate-600 w-4 text-right shrink-0">{i + 1}</span>
                                <input
                                    type="text"
                                    value={line}
                                    onChange={e => updateStdinLine(i, e.target.value)}
                                    placeholder={`Input value ${i + 1}`}
                                    className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-[12px] text-white font-mono outline-none focus:border-yellow-500/50 transition-colors"
                                />
                                <button onClick={() => removeStdinLine(i)} className="text-slate-600 hover:text-red-400 transition-colors">
                                    <Trash2 size={13} />
                                </button>
                            </div>
                        ))}
                        <button onClick={addStdinLine} className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-black uppercase tracking-widest">
                            <Plus size={12} /> Add Input
                        </button>
                    </div>
                )}
            </div>
            <div className="flex-1 overflow-y-auto px-4 pt-3 pb-4 custom-scrollbar">
                <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <Terminal size={10} /> Console Output
                </div>
                <pre className={`text-[13px] font-mono whitespace-pre-wrap leading-relaxed ${runStatus === 'error' ? 'text-red-400' : runStatus === 'success' ? 'text-emerald-300' : 'text-slate-400'}`}>
                    {output || 'Press ▶ Run to execute your code...'}
                </pre>
            </div>
        </div>
    );

    const chatJSX = (
        <div className="flex flex-col h-full bg-slate-950">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800 bg-slate-900/60 shrink-0">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg bg-indigo-500 shadow-indigo-500/20">
                    <Trophy size={16} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-indigo-400">
                        Project Mentor
                        <span className="bg-indigo-500/20 text-[8px] px-1.5 py-0.5 rounded border border-indigo-500/30">MASTER MODE</span>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">{title}</div>
                </div>
            </div>
            {task && (
                <div className="shrink-0 mx-3 mt-3 mb-1 p-3 rounded-2xl bg-slate-900 border border-emerald-500/20">
                    <div className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                        <Target size={10} /> Challenge
                    </div>
                    <p className="text-[12px] text-slate-300 leading-relaxed">{task.question}</p>
                    {task.hint && (
                        <div className="mt-2 text-[11px] text-slate-500 flex items-start gap-1">
                            <Lightbulb size={10} className="text-yellow-500 shrink-0 mt-0.5" />
                            <span>{task.hint}</span>
                        </div>
                    )}
                    {task.requiredConcepts?.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                            {task.requiredConcepts.map((c, i) => (
                                <span key={i} className="text-[9px] bg-slate-800 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">{c}</span>
                            ))}
                        </div>
                    )}
                </div>
            )}
            {onVictory && runStatus === 'success' && (
                <div className="shrink-0 px-3 py-2">
                    <button
                        onClick={onVictory}
                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-[11px] uppercase tracking-widest transition-all shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 animate-fade-in"
                    >
                        <CheckCircle size={14} /> Complete Challenge
                    </button>
                </div>
            )}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2 animate-fade-in`}>
                        {msg.role === 'ai' && (
                            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                                <Sparkles size={12} className="text-white" />
                            </div>
                        )}
                        <div className={`max-w-[90%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed ${msg.role === 'user'
                            ? 'bg-emerald-600 text-white rounded-br-sm whitespace-pre-wrap'
                            : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-sm'
                            }`}>
                            {msg.role === 'ai' ? renderMessage(msg.content) : msg.content}
                        </div>
                    </div>
                ))}
                {chatLoading && (
                    <div className="flex justify-start gap-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-600/50 flex items-center justify-center shrink-0">
                            <Sparkles size={12} className="text-white/50" />
                        </div>
                        <div className="bg-slate-800 border border-slate-700 px-4 py-3 rounded-2xl rounded-bl-sm text-[11px] text-slate-500 font-black uppercase tracking-widest animate-pulse">
                            Thinking...
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>
            <div className="p-3 border-t border-slate-800 bg-slate-900/40 shrink-0">
                <div className="flex gap-2 items-end bg-slate-800 rounded-2xl border border-slate-700 p-2 focus-within:border-emerald-500/50 transition-colors">
                    <textarea
                        rows={1}
                        value={chatInput}
                        onChange={e => setChatInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendChat(); } }}
                        placeholder="Ask your mentor..."
                        className="flex-1 bg-transparent text-[13px] text-white outline-none resize-none placeholder-slate-500 py-1 px-2"
                        style={{ maxHeight: 100 }}
                    />
                    <button
                        onClick={handleSendChat}
                        disabled={!chatInput.trim() || chatLoading}
                        className="w-9 h-9 rounded-xl bg-emerald-600 disabled:bg-slate-700 flex items-center justify-center shrink-0 transition-colors"
                    >
                        <Send size={15} className="text-white" />
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div
            className="fixed inset-0 bg-slate-950 flex flex-col font-sans animate-fade-in"
            style={{ zIndex: 700, height: '100dvh' }}
        >
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl shrink-0">
                <div className="hidden lg:flex gap-1.5 shrink-0">
                    <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" title="Close" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                </div>
                <button
                    onClick={onClose}
                    className="lg:hidden p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-red-400 hover:border-red-500/40 transition-all active:scale-95"
                    title="Close IDE"
                >
                    <ArrowLeft size={16} />
                </button>
                <div className="flex items-center gap-1.5 ml-1 min-w-0">
                    <Code size={13} className="text-emerald-400 shrink-0" />
                    <span className="text-[12px] font-black text-white truncate">{title}</span>
                    <span className="text-[10px] text-slate-600 font-mono hidden sm:inline shrink-0">main.py</span>
                </div>
                <div className="flex items-center gap-2 ml-auto shrink-0">
                    <div className={`hidden sm:flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${statusColor[runStatus]}`}>
                        {runStatus === 'success' && <CheckCircle size={11} />}
                        {runStatus === 'error' && <XCircle size={11} />}
                        {runStatus === 'running' && <RefreshCw size={11} className="animate-spin" />}
                        {runStatus === 'idle' && <Terminal size={11} />}
                        <span>{statusLabel[runStatus]}</span>
                    </div>
                    <button
                        onClick={toggleFullscreen}
                        className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all active:scale-95"
                        title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                    >
                        {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                    </button>
                    <button
                        onClick={handleRun}
                        disabled={runStatus === 'running'}
                        className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 rounded-xl text-white text-[11px] font-black uppercase tracking-widest transition-all"
                    >
                        {runStatus === 'running' ? <RefreshCw size={12} className="animate-spin" /> : <Play size={12} fill="currentColor" />}
                        Run
                    </button>
                </div>
            </div>

            <div className="hidden lg:flex flex-1 flex-col overflow-hidden">
                <div className="flex flex-1 overflow-hidden min-h-0">
                    <div className="flex-1 min-w-0 flex flex-col overflow-hidden border-r border-slate-800">
                        <div className="flex-1 overflow-hidden min-h-0">
                            {editorJSX}
                        </div>
                        <div className="h-[220px] shrink-0 border-t border-slate-800">
                            {outputJSX}
                        </div>
                    </div>
                    <div className="w-[380px] shrink-0 flex flex-col border-l border-slate-800">
                        {chatJSX}
                    </div>
                </div>
            </div>

            <div className="flex lg:hidden flex-1 flex-col overflow-hidden">
                <div className="flex-1 overflow-hidden min-h-0">
                    {mobileTab === 'code' && editorJSX}
                    {mobileTab === 'output' && outputJSX}
                    {mobileTab === 'ai' && chatJSX}
                </div>
                <nav className="shrink-0 bg-slate-900/95 backdrop-blur-2xl border-t border-emerald-500/20 ring-1 ring-white/5 relative"
                    style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
                    <div className="absolute inset-0 bg-emerald-500/5 -z-10 pointer-events-none" />
                    <div className="flex items-center justify-between p-2">
                        <div className="flex items-center gap-1 flex-1">
                            {[
                                { id: 'code', icon: <Code size={22} />, label: 'Code' },
                                {
                                    id: 'output', icon: <Terminal size={22} />, label: 'Output',
                                    badge: runStatus === 'error' ? '!' : runStatus === 'success' ? '✓' : null,
                                    badgeColor: runStatus === 'error' ? 'bg-red-500' : 'bg-emerald-500'
                                },
                                { id: 'ai', icon: <Trophy size={22} />, label: 'Mentor' },
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setMobileTab(tab.id)}
                                    className={`flex-1 flex flex-col items-center justify-center py-2 gap-1 transition-all rounded-2xl relative group ${mobileTab === tab.id
                                        ? 'text-emerald-400 bg-emerald-500/10'
                                        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                                        }`}
                                >
                                    <div className="relative">
                                        {tab.icon}
                                        {tab.badge && (
                                            <span className={`absolute -top-1 -right-1 w-4 h-4 ${tab.badgeColor} rounded-full text-[8px] font-black text-white flex items-center justify-center`}>
                                                {tab.badge}
                                            </span>
                                        )}
                                    </div>
                                    {mobileTab === tab.id && (
                                        <div className="absolute -bottom-1 w-1 h-1 bg-emerald-400 rounded-full shadow-[0_0_8px_#10b981]" />
                                    )}
                                </button>
                            ))}
                        </div>
                        <div className="w-px h-8 bg-slate-800 mx-2" />
                        <button
                            onClick={onClose}
                            className="p-2 md:p-3 bg-red-600/80 hover:bg-red-500 text-white rounded-2xl transition-all active:scale-95 shadow-lg"
                            title="Close IDE"
                        >
                            <X size={22} />
                        </button>
                    </div>
                </nav>
            </div>
        </div>
    );
}
