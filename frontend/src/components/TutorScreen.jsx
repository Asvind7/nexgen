import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Copy, Check, MoreVertical, Menu, X as CloseIcon, Search, Plus, MessageSquare, ArrowUp, Zap, ArrowLeft, Heart, Play, Shield, CheckCircle, MapIcon, RefreshCw, Lightbulb, Target, HelpCircle, Trophy, Code2, Trash2 } from 'lucide-react';
import { askGemma } from '../services/GemmaService';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// --- MAIN TUTOR SCREEN ---
export default function TutorScreen({
  level = "Beginner",
  topic = "General Python",
  userName = "Learner",
  isSidebarOpen,
  setIsSidebarOpen
}) {
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('nexgen_tutor_sessions');
    if (saved) return JSON.parse(saved);
    return [{
      id: 1,
      title: `Python Fundamentals`,
      messages: [{
        role: 'ai',
        content: "Hello! I'm your NexGen Python Tutor. How can I help you master Python today?",
        timestamp: new Date().toLocaleTimeString()
      }]
    }];
  });
  const [currentSessionId, setCurrentSessionId] = useState(() => {
    const saved = localStorage.getItem('nexgen_tutor_currentSessionId');
    return saved ? parseInt(saved) : (sessions[0]?.id || 1);
  });

  // Persist Sessions
  useEffect(() => {
    localStorage.setItem('nexgen_tutor_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('nexgen_tutor_currentSessionId', currentSessionId.toString());
  }, [currentSessionId]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const currentSession = sessions.find(s => s.id === currentSessionId) || sessions[0] || { messages: [] };

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentSession.messages, loading]);

  const createNewSession = () => {
    const newId = Date.now();
    const newSession = {
      id: newId,
      title: `New Chat ${sessions.length + 1}`,
      messages: [{
        role: 'ai',
        content: "Hello! This is a new session. How can I help you with Python now?",
        timestamp: new Date().toLocaleTimeString()
      }]
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newId);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  const deleteSession = (sessionId, e) => {
    e.stopPropagation(); // Don't switch to session when deleting

    setSessions(prev => {
      const filtered = prev.filter(s => s.id !== sessionId);

      if (sessionId === currentSessionId) {
        if (filtered.length > 0) {
          setCurrentSessionId(filtered[0].id);
        } else {
          const newId = Date.now();
          const newSession = {
            id: newId,
            title: `Fresh Start`,
            messages: [{
              role: 'ai',
              content: "All previous sessions cleared. How can I help you start fresh with Python?",
              timestamp: new Date().toLocaleTimeString()
            }]
          };
          setCurrentSessionId(newId);
          return [newSession];
        }
      }
      return filtered;
    });
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input, timestamp: new Date().toLocaleTimeString() };
    setSessions(prev => prev.map(s => s.id === currentSessionId ? { ...s, messages: [...s.messages, userMsg] } : s));
    setLoading(true);
    setInput("");

    try {
      const aiRes = await askGemma(input, level, currentSession.messages, topic);
      setSessions(prev => prev.map(s => s.id === currentSessionId ? {
        ...s, messages: [...s.messages, { role: 'ai', content: aiRes, timestamp: new Date().toLocaleTimeString() }]
      } : s));
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 min-h-0 flex w-full bg-slate-950 text-slate-300 relative font-sans">

      {/* MOBILE SIDEBAR OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 1. SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-[450] w-64 bg-slate-900 border-r border-white/5 flex flex-col transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        pt-24 md:pt-32
      `}>
        <div className="p-4 border-b border-white/5 space-y-4">
          <button
            onClick={createNewSession}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
          >
            <Plus size={18} /> New Session
          </button>

          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={14} />
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 pl-9 pr-4 text-xs outline-none focus:border-emerald-500/50 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
          <div className="space-y-1">
            {sessions.map(s => (
              <div
                key={s.id}
                onClick={() => {
                  setCurrentSessionId(s.id);
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={`group/item flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${currentSessionId === s.id
                  ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                  : 'hover:bg-white/5 text-slate-400'
                  }`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <MessageSquare size={16} className={currentSessionId === s.id ? 'text-emerald-400' : 'text-slate-500'} />
                  <span className="text-xs font-medium truncate">{s.title}</span>
                </div>
                <button
                  onClick={(e) => deleteSession(s.id, e)}
                  className="opacity-0 group-hover/item:opacity-100 p-1.5 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-all"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className={`flex-1 min-h-0 flex flex-col bg-slate-950 relative overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'lg:pl-64' : ''}`}>

        {/* CHAT WINDOW (The only scrollable part) */}
        <div
          ref={scrollRef}
          className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-4 relative"
        >
          {/* Constrain width and add massive bottom padding so last msg clears the input bar */}
          <div className="max-w-3xl mx-auto pt-4 pb-48 space-y-8">
            {currentSession.messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 md:gap-4 animate-fade-in-up ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role !== 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 self-end mb-1 backdrop-blur-sm shadow-lg shadow-emerald-500/5">
                    <Sparkles size={14} className="text-emerald-400" />
                  </div>
                )}
                <div className={`max-w-[85%] p-4 md:p-6 rounded-2xl md:rounded-[2rem] text-sm md:text-base leading-relaxed ${msg.role === 'user'
                  ? 'bg-emerald-600 text-white rounded-br-none shadow-lg shadow-emerald-900/20'
                  : 'bg-[#12141a] border border-white/5 text-slate-300 rounded-bl-none shadow-xl'
                  }`}>
                  <div className="prose prose-invert prose-sm md:prose-base max-w-none">
                    <ReactMarkdown
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || '');
                          return !inline && match ? (
                            <SyntaxHighlighter
                              {...props}
                              style={atomDark}
                              language={match[1]}
                              PreTag="div"
                              className="rounded-xl my-4 text-xs md:text-sm !bg-slate-900 border border-slate-700 shadow-xl"
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          ) : (
                            <code {...props} className={"bg-black/30 px-1.5 py-0.5 rounded tracking-wide " + className}>
                              {children}
                            </code>
                          );
                        }
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-center py-4">
                <div className="px-4 py-2 bg-slate-900 border border-emerald-500/30 rounded-full text-emerald-500 text-[10px] font-black animate-pulse tracking-widest uppercase">
                  AI IS ANALYZING LOGIC...
                </div>
              </div>
            )}
            <div className="h-20" /> {/* Extra bottom padding to clear dock */}
          </div>
        </div>

        {/* 3. FLOATING INPUT DOCK (Guaranteed visibility via fixed) */}
        <div className="fixed bottom-20 md:bottom-28 left-0 right-0 z-[400] px-4 pointer-events-none flex justify-center">
          <div className="w-full max-w-3xl pointer-events-auto">
            <div className="bg-[#1a1c23]/95 backdrop-blur-2xl border border-white/10 p-2 rounded-full flex items-center gap-2 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] focus-within:border-emerald-500/50 transition-all">
              <input
                autoFocus
                className="flex-1 bg-transparent px-6 py-3 text-sm md:text-[15px] outline-none placeholder-slate-600 text-white"
                placeholder="Ask your Python mentor..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${input.trim() ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 hover:scale-105' : 'bg-slate-800 text-slate-600'
                  }`}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
