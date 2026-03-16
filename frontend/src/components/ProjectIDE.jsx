import React, { useState, useRef, useEffect } from 'react';
import { API_URL } from '../config';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-okaidia.css';
import {
    Play, Terminal, Send, Sparkles, RefreshCw, X,
    ChevronDown, Bot, Code, Plus, Trash2, CheckCircle, XCircle,
    Maximize2, Minimize2, ArrowLeft, Home, Map as MapIcon
} from 'lucide-react';
import { handleAutoIndent } from '../utils/editorUtils';

export default function ProjectIDE({ onClose, title = 'Free Lab', initialCode = '', onNavigate }) {
    const [code, setCode] = useState(initialCode || '# Write your Python program here\n\nname = input("Enter your name: ")\nprint(f"Hello, {name}!")\n');
    const [output, setOutput] = useState('');
    const [runStatus, setRunStatus] = useState('idle');
    const [stdinLines, setStdinLines] = useState(['']);
    const [showStdin, setShowStdin] = useState(false);
    const [mobileTab, setMobileTab] = useState('code');
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

    useEffect(() => {
        const handler = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handler);
        return () => document.removeEventListener('fullscreenchange', handler);
    }, []);

    const [messages, setMessages] = useState([
        { role: 'ai', content: "👋 I'm your coding assistant! Ask me anything about your project." }
    ]);
    const [chatInput, setChatInput] = useState('');
    const [chatLoading, setChatLoading] = useState(false);

    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendToAI = async (userMsg, isAutoExplain = false) => {
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setChatLoading(true);
        if (isAutoExplain) setMobileTab('ai');
        try {
            const systemPrompt = `You are a helpful Python coding assistant. The user is working in a free coding lab. Help them with any Python questions clearly and concisely.`;

            const res = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: userMsg,
                    system: systemPrompt,
                    topic: 'Python Programming — Free Lab',
                    level: 'Beginner',
                    history: messages.slice(-6).map(m => ({
                        role: m.role === 'ai' ? 'model' : 'user',
                        content: m.content
                    }))
                })
            });
            const data = await res.json();
            setMessages(prev => [...prev, { role: 'ai', content: data.response || 'Sorry, could not respond.' }]);
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
                <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Bot size={16} className="text-white" />
                </div>
                <div>
                    <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">AI Assistant</div>
                    <div className="text-[11px] text-slate-500">{title}</div>
                </div>
            </div>
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
                        placeholder="Ask your assistant..."
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
                                { id: 'ai', icon: <Bot size={22} />, label: 'Chat' },
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
