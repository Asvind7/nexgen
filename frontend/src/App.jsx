import React, { useState, useEffect } from 'react';
import { initGemma } from './services/GemmaService';
import DiagnosticQuiz from './components/DiagnosticQuiz';
import CourseSelection from './components/CourseSelection';
import JourneyMap from './components/JourneyMap';
import ModuleScreen from './components/ModuleScreen';
import PlaygroundOverlay from './components/PlaygroundOverlay'; // <--- NEW IMPORT
import HomeScreen from './components/HomeScreen';
import ChatScreen from './components/ChatScreen';
import TutorScreen from './components/TutorScreen';
import AuthScreen from './components/AuthScreen';
import AppNavigation from './components/AppNavigation';
import { generateSyllabus } from './services/CurriculumEngine';
import XpReward from './components/XpReward';
import { API_URL } from './config';
import { Zap, Target, BookOpen, Sparkles, ChevronLeft, BrainCircuit, Code2, Heart, LayoutDashboard, Map as MapIcon, MessageSquare, Menu } from 'lucide-react'; // <--- Added Heart, Menu

export default function App() {
  // --- STATE MANAGEMENT ---
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('nexgen_username');
  });
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem('nexgen_username');
  });
  const [isReady, setIsReady] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(() => {
    const saved = localStorage.getItem('nexgen_selectedCourse');
    return saved ? JSON.parse(saved) : null;
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeModule, setActiveModule] = useState(null);
  const [showFreeLab, setShowFreeLab] = useState(false);
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('nexgen_isAdmin') === 'true';
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('nexgen_user');
    const defaultUser = {
      name: 'Asvind',
      level: 'Unranked',
      xp: 0,
      hearts: 3,
      completedModules: [], // <--- PERSISTENT COMPLETION
      lastHeartLossTime: null,
      streak: 1,
      focusAreas: [],
      achievements: {
        perfectClears: 0,
        masterExamAces: 0,
        speedRunner: 0,
        streakMaster: 1
      },
      leaderboard: [
        { name: "Asvind", xp: 0, rank: 1, isUser: true },
        { name: "Sarah K.", xp: 1250, rank: 2 },
        { name: "John Doe", xp: 980, rank: 3 },
        { name: "Dev_AI", xp: 850, rank: 4 },
        { name: "PythonPro", xp: 720, rank: 5 }
      ],
      mentor: "Classic" // [Classic, Pro, Fun]
    };

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...defaultUser,
          ...parsed,
          completedModules: parsed.completedModules || [],
          achievements: { ...defaultUser.achievements, ...(parsed.achievements || {}) }
        };
      } catch (e) {
        return defaultUser;
      }
    }
    return defaultUser;
  });

  // --- DERIVED SYLLABUS (Fresh on every change) ---
  const currentSyllabus = React.useMemo(() => {
    if (user.level === 'Unranked' || !selectedCourse) return null;
    return generateSyllabus(user.level, user.xp, 0, isAdmin, user.completedModules);
  }, [user.level, user.xp, isAdmin, user.completedModules, selectedCourse]);

  useEffect(() => {
    localStorage.setItem('nexgen_selectedCourse', JSON.stringify(selectedCourse));
  }, [selectedCourse]);

  // Persist User State locally and to Backend
  useEffect(() => {
    localStorage.setItem('nexgen_user', JSON.stringify(user));

    // Sync to backend if authenticated
    if (isAuthenticated && userId) {
      fetch(`${API_URL}/auth/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userId, user_data: user })
      }).catch(err => console.error("Sync failed:", err));
    }
  }, [user, isAuthenticated, userId]);

  const [xpChange, setXpChange] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'map', 'chat'

  const handleAuthSuccess = (userData, username, displayName, isAdminFlag) => {
    localStorage.setItem('nexgen_username', username);
    setUserId(username);
    setIsAuthenticated(true);
    if (isAdminFlag) {
      setIsAdmin(true);
      localStorage.setItem('nexgen_isAdmin', 'true');
    } else {
      setIsAdmin(false);
      localStorage.setItem('nexgen_isAdmin', 'false');
    }
    const nameToShow = displayName || username;
    if (userData && Object.keys(userData).length > 0) {
      setUser(prev => ({ ...prev, ...userData, name: nameToShow }));
    } else {
      setUser(prev => ({ ...prev, name: nameToShow }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('nexgen_username');
    localStorage.removeItem('nexgen_user');
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.setItem('nexgen_isAdmin', 'false');
    setUserId(null);
    setSelectedCourse(null);
    setUser(prev => ({ ...prev, name: '', level: 'Unranked', xp: 0, streak: 0, hearts: 5 }));
  };

  // 1. INITIALIZE BACKEND (ON LOAD)
  useEffect(() => {
    async function startEngines() {
      await initGemma();
      setIsReady(true);
      
      // Fetch Leaderboard
      try {
        const response = await fetch(`${API_URL}/leaderboard`);
        if (response.ok) {
          const lbData = await response.json();
          setUser(prev => ({ ...prev, leaderboard: lbData }));
        }
      } catch (e) {
        console.error("Failed to fetch leaderboard:", e);
      }
    }
    startEngines();
  }, []);

  // XP REWARD ANIMATION TRIGGER
  useEffect(() => {
    const handleXpUpdate = () => {
      const storedXp = parseFloat(localStorage.getItem('nexgen_last_xp') || '0');
      if (user.xp > storedXp) {
        setXpChange(user.xp - storedXp);
      }
      localStorage.setItem('nexgen_last_xp', user.xp.toString());
    };
    handleXpUpdate();
  }, [user.xp]);
  // HEART RECOVERY TIMER (1 heart every 15 mins)
  const [recoveryCountdown, setRecoveryCountdown] = useState("");

  useEffect(() => {
    const recoveryInterval = setInterval(() => {
      if (user.hearts < 3 && user.lastHeartLossTime) {
        const now = Date.now();
        const diffMs = now - user.lastHeartLossTime;
        const totalWaitMs = 15 * 60 * 1000;

        if (diffMs >= totalWaitMs) {
          console.log("System: Heart Recovered ❤️");
          setUser(prev => ({
            ...prev,
            hearts: Math.min(3, prev.hearts + 1),
            lastHeartLossTime: prev.hearts + 1 < 3 ? now : null
          }));
          setRecoveryCountdown("");
        } else {
          const remainingMs = totalWaitMs - diffMs;
          const mins = Math.floor(remainingMs / 60000);
          const secs = Math.floor((remainingMs % 60000) / 1000);
          setRecoveryCountdown(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
        }
      } else {
        setRecoveryCountdown("");
      }
    }, 1000); // Check every second for countdown sync

    return () => clearInterval(recoveryInterval);
  }, [user.hearts, user.lastHeartLossTime]);



  // 2. HANDLE QUIZ COMPLETION
  const [pendingResult, setPendingResult] = useState(null);

  const handleQuizComplete = (assessedLevel, earnedXp, focusAreas, avgTime) => {
    // Save result but don't generate syllabus yet
    setPendingResult({ assessedLevel, earnedXp, focusAreas, avgTime });
    setIsGenerating(false);
  };

  const confirmLevelSelection = (forcedLevel) => {
    const { earnedXp, focusAreas, avgTime } = pendingResult;
    setIsGenerating(true);

    // Simulate AI Analysis Delay
    setTimeout(() => {
      setUser(prev => ({
        ...prev,
        level: forcedLevel,
        xp: prev.xp + earnedXp,
        focusAreas: focusAreas
      }));

      setPendingResult(null); // Clear selection screen
      setIsGenerating(false);
    }, 2000);
  };

  // --- ADMIN AUTO-LEVELING ---
  // Moved to useEffect to avoid re-render loops
  useEffect(() => {
    if (isAuthenticated && isAdmin && user.level === 'Unranked' && !pendingResult && !isGenerating) {
      setPendingResult({ assessedLevel: 'Advanced', earnedXp: 0, focusAreas: [], avgTime: 0 });
    }
  }, [isAuthenticated, isAdmin, user.level, pendingResult, isGenerating]);

  // --- SCENARIO -1: AUTHENTICATION ---
  if (!isAuthenticated) return <AuthScreen onAuthSuccess={handleAuthSuccess} />;

  // --- SCENARIO 0: SYSTEM LOADING ---
  if (!isReady) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-emerald-500 font-bold tracking-widest animate-pulse">CONNECTING TO NEURAL ENGINE...</div>;

  return (
    <div className="h-screen bg-slate-950 text-white font-sans flex flex-col selection:bg-emerald-500/30 relative overflow-hidden">

      {/* 1. MODULE SCREEN OVERLAY (Persistent Mounting) */}
      {activeModule && (
        <div className="fixed inset-0 z-[500] bg-slate-950">
          <ModuleScreen
            module={activeModule}
            isAdmin={isAdmin}
            user={user}
            setUser={setUser}
            onBack={() => setActiveModule(null)}
            onComplete={() => {
              console.log("Module Completed:", activeModule.id);
              setUser(prev => {
                const isFirstTime = !prev.completedModules.includes(activeModule.id);
                const updatedModules = isFirstTime 
                  ? [...prev.completedModules, activeModule.id] 
                  : prev.completedModules;
                
                // --- DYNAMIC LEVEL RE-EVALUATION (Learning Science Algorithm) ---
                // Every 3 modules, we check if the user is ready to level up or down
                let newLevel = prev.level;
                if (updatedModules.length % 3 === 0 && isFirstTime) {
                  const recentPerf = 85; 
                  if (recentPerf > 80 && newLevel === 'Beginner') newLevel = 'Intermediate';
                  else if (recentPerf > 90 && newLevel === 'Intermediate') newLevel = 'Advanced';
                  // REMOVED: Level-down logic to keep learning positive
                  
                  if (newLevel !== prev.level) {
                     console.log(`🚀 DYNAMIC LEVEL ADJUSTMENT: ${prev.level} -> ${newLevel}`);
                  }
                }

                return {
                  ...prev,
                  completedModules: updatedModules,
                  level: newLevel
                };
              });
              setActiveModule(null);
            }}
          />
        </div>
      )}

      {/* 2. COURSE SELECTION — shown immediately after login if no course chosen */}
      {!selectedCourse && (
        <div className="flex-1 overflow-auto">
          <CourseSelection onSelect={(id) => setSelectedCourse(id)} />
        </div>
      )}

      {/* 3. MAIN DASHBOARD / MAP AREA (Persistent Mounting) */}
      {selectedCourse && (
        <div className="flex-1 flex flex-col relative">

          {/* GLOBAL: Back Button */}
          {!isGenerating && user.level === 'Unranked' && (
            <div className="absolute top-6 left-6 z-50">
              <button onClick={() => setSelectedCourse(null)} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 hover:text-white transition-colors">
                <ChevronLeft size={20} />
              </button>
            </div>
          )}


          {/* GLOBAL: Playground Overlay (Free Lab) */}
          {showFreeLab && <PlaygroundOverlay onClose={() => setShowFreeLab(false)} />}

          {/* --- SCENARIO 3: AI LOADING SCREEN --- */}
          {isGenerating ? (
            <div className="flex-1 flex flex-col items-center justify-center animate-fade-in p-6 text-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 rounded-full animate-pulse"></div>
                <BrainCircuit size={80} className="text-emerald-500 relative z-10 animate-bounce" />
              </div>
              <h2 className="text-3xl font-black text-white mb-2">Analyzing Neural Patterns...</h2>
              <p className="text-slate-500">Constructing your personalized {user.level} curriculum</p>
              <div className="mt-8 w-64 h-1 bg-slate-900 rounded-full overflow-hidden relative">
                <div className="absolute inset-0 bg-emerald-500 animate-[loading-bar_1.5s_infinite_linear]"></div>
              </div>
            </div>
          ) : pendingResult ? (
            /* --- SCENARIO 4.5: LEVEL SELECTION SCREEN --- */
            <div className="flex-1 flex flex-col items-center justify-center p-6 animate-fade-in">
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] max-w-2xl w-full text-center shadow-2xl">
                <Sparkles size={48} className="text-emerald-400 mx-auto mb-4 animate-bounce" />
                <h2 className="text-3xl font-black text-white mb-2">Assessment Complete!</h2>
                <p className="text-slate-400 mb-8">
                  We assessed your skill level as <strong className="text-emerald-400">{pendingResult.assessedLevel}</strong>.
                  <br />You can start here or choose a lower difficulty.
                </p>
                <div className="grid gap-4">
                  <button onClick={() => confirmLevelSelection('Beginner')} className="p-4 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 hover:border-emerald-500 transition-all flex items-center justify-between group text-left">
                    <div>
                      <div className="font-bold text-white group-hover:text-emerald-400">Beginner (Phase 1)</div>
                      <div className="text-xs text-slate-500">Start from scratch. Best for strong foundations.</div>
                    </div>
                    {pendingResult.assessedLevel === 'Beginner' && <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">Recommended</span>}
                  </button>
                  {(pendingResult.assessedLevel === 'Intermediate' || pendingResult.assessedLevel === 'Advanced') && (
                    <button onClick={() => confirmLevelSelection('Intermediate')} className="p-4 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 hover:border-yellow-500 transition-all flex items-center justify-between group text-left">
                      <div>
                        <div className="font-bold text-white group-hover:text-yellow-400">Intermediate (Phase 2)</div>
                        <div className="text-xs text-slate-500">Fast-track to Data Structures & Algorithms.</div>
                      </div>
                      {pendingResult.assessedLevel === 'Intermediate' && <span className="text-xs font-bold bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">Recommended</span>}
                    </button>
                  )}
                  {pendingResult.assessedLevel === 'Advanced' && (
                    <button onClick={() => confirmLevelSelection('Advanced')} className="p-4 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 hover:border-red-500 transition-all flex items-center justify-between group text-left">
                      <div>
                        <div className="font-bold text-white group-hover:text-red-400">Advanced (Phase 3)</div>
                        <div className="text-xs text-slate-500">Jump straight into Complexity & Optimization.</div>
                      </div>
                      {pendingResult.assessedLevel === 'Advanced' && <span className="text-xs font-bold bg-red-500/20 text-red-400 px-2 py-1 rounded">Recommended</span>}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : user.level === 'Unranked' ? (
            <DiagnosticQuiz 
              onComplete={handleQuizComplete} 
              userName={user.name} 
              userEmail={userId} 
            />
          ) : (
            <>
              {!activeModule && (
                <header className="fixed top-0 left-0 right-0 pt-4 md:pt-6 px-4 z-[500] animate-fade-in pointer-events-none">
                  <div className="max-w-3xl mx-auto bg-slate-900/90 backdrop-blur-2xl border border-slate-800 p-3 md:p-4 rounded-2xl md:rounded-[2.5rem] flex justify-between items-center shadow-2xl pointer-events-auto">
                    <div className="flex items-center gap-2 ml-2 md:gap-6 md:ml-8">
                      {/* Hamburger for Global Sidebar (e.g. Tutor History) */}
                      <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-400 hover:text-white active:scale-95 transition-all shadow-lg lg:hidden"
                      >
                        <Menu size={18} />
                      </button>

                      {activeTab === 'chat' && (
                        <div className="flex flex-col border-l border-slate-800 pl-4 hidden sm:flex">
                          <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest leading-none">Mastery Session</span>
                          <span className="text-xs font-black text-white uppercase tracking-tighter">Python Fundamentals</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">
                        <Zap className="text-orange-500 fill-orange-500" size={14} /> <span className="hidden xs:inline">{user.streak} Day Streak</span><span className="xs:hidden">{user.streak}D</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">
                        <Target className="text-emerald-500" size={14} /> {user.xp} XP
                      </div>
                      <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-red-500 uppercase tracking-wider relative group">
                        <Heart className="text-red-500 fill-red-500" size={14} /> {user.hearts}
                        {user.hearts < 3 && recoveryCountdown && (
                          <div className="ml-1 md:ml-2 text-[10px] text-slate-500 font-mono">
                            {recoveryCountdown}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4 mr-2">
                      {isAdmin && (
                        <span
                          className="px-2 py-1 bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-black uppercase tracking-widest rounded-lg"
                        >
                          Admin
                        </span>
                      )}
                      <div
                        className="bg-slate-800 px-3 md:px-4 py-1.5 md:py-2 rounded-xl md:rounded-2xl border border-slate-700 shadow-inner hover:border-emerald-500/50 transition-colors"
                      >
                        <span className="font-black text-[10px] text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                          <BrainCircuit size={12} /> <span className="hidden sm:inline">{user.name || user.level}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </header>
              )}

              <main className="fixed inset-0 z-10 w-full overflow-hidden flex flex-col pt-24 md:pt-32">
                {activeTab === 'home' && (
                  <HomeScreen
                    user={user}
                    currentSyllabus={currentSyllabus}
                    onResume={() => setActiveTab('map')}
                    onSwitchCourse={(id) => {
                      setSelectedCourse(id);
                      setActiveTab('map');
                    }}
                    isAdmin={isAdmin}
                    onUpdateUser={(updated) => setUser(prev => ({ ...prev, ...updated }))}
                    onLogout={handleLogout}
                  />
                )}

                {activeTab === 'map' && (
                  <>
                    <JourneyMap
                      syllabus={currentSyllabus}
                      onModuleClick={(module) => setActiveModule(module)}
                    />
                  </>
                )}

                {activeTab === 'chat' && (
                  <TutorScreen
                    level={user.level}
                    userName={user.name}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                  />
                )}
              </main>

              <AppNavigation
                activeTab={activeTab}
                onTabChange={(tab) => {
                  setActiveTab(tab);
                  setActiveModule(null);
                  setShowFreeLab(false);
                }}
                onOpenLab={() => setShowFreeLab(true)}
                hideWhenMobile={showFreeLab}
              />
            </>
          )}

          <XpReward xpChange={xpChange} onComplete={() => setXpChange(0)} />
        </div>
      )}
    </div>
  );
}
