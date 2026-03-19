import React, { useState } from 'react';
import { Zap, Sparkles, Award, ArrowRight, BookOpen, Clock, Heart, BrainCircuit, BarChart3, Lock, Trophy, Target, Activity } from 'lucide-react';
import MLDashboard from './MLDashboard';
import Leaderboard from './Leaderboard';

export default function HomeScreen({ user, onStartModule, onOpenSidebar, onResume, onSwitchCourse, onLogout, currentSyllabus, isAdmin, onUpdateUser }) {
    const [showMLDashboard, setShowMLDashboard] = useState(false);

    // Derive a clean display name - strip email domain if name looks like an email
    const displayName = user.name?.includes('@') ? user.name.split('@')[0] : (user.name || 'Learner');
    
    // Calculate overall progress
    const calculateProgress = () => {
        const syllabus = currentSyllabus || user.currentSyllabus;
        if (!syllabus || !syllabus.modules) return 0;
        let totalLevels = 0;
        let completedLevels = 0;
        syllabus.modules.forEach(module => {
            module.levels.forEach(level => {
                totalLevels++;
                if (level.status === 'completed') completedLevels++;
            });
        });
        return Math.round((completedLevels / totalLevels) * 100) || 0;
    };

    const progress = calculateProgress();
    const syllabus = currentSyllabus || user.currentSyllabus;

    return (
        <div className="w-full h-full overflow-y-auto pb-32 animate-fade-in custom-scrollbar">
            <div className="max-w-2xl mx-auto py-8 px-4 space-y-8">
                {/* Header / Profile Section */}
                <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[3rem] backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                        <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl flex items-center justify-center shadow-xl shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                            <span className="text-4xl font-black text-white">{displayName[0]?.toUpperCase()}</span>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Welcome Back, {displayName}</h1>
                            <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
                                <div className="bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-2">
                                    <Award size={14} className="text-emerald-400" />
                                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{user.level}</span>
                                </div>
                                <div className="bg-orange-500/10 border border-orange-500/30 px-3 py-1 rounded-full flex items-center gap-2">
                                    <Zap size={14} className="text-orange-400" />
                                    <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">{user.streak || 0} Day Streak</span>
                                </div>
                                <button
                                    onClick={onLogout}
                                    className="bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full flex items-center gap-2 hover:bg-red-500/20 transition-colors"
                                >
                                    <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Logout</span>
                                </button>
                            </div>
                        </div>

                        <div className="bg-slate-950/50 border border-slate-800 p-6 rounded-2xl text-center min-w-[140px]">
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total XP</div>
                            <div className="text-3xl font-black text-white flex items-center justify-center gap-2">
                                <Sparkles className="text-emerald-500" size={24} />
                                {user.xp}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ML INSIGHTS BUTTON - ADDED FOR PRESENTATION - ADMIN ONLY */}
                {isAdmin && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* ML DASHBOARD BUTTON */}
                            <div className="bg-emerald-600/10 border border-emerald-500/20 p-6 rounded-3xl flex items-center justify-between group hover:bg-emerald-600/20 transition-all">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                                        <BarChart3 className="text-emerald-500" size={18} /> ML Insights
                                    </h3>
                                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Admin Metrics</p>
                                </div>
                                <button
                                    onClick={() => setShowMLDashboard(true)}
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-black py-2.5 px-5 rounded-xl transition-all shadow-lg text-[10px] uppercase tracking-widest"
                                >
                                    Analyze
                                </button>
                            </div>

                            {/* MANUAL OVERRIDES */}
                            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
                                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <Target size={14} className="text-yellow-500" /> Admin Overrides
                                </h3>
                                
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[9px] text-slate-500 font-black uppercase mb-1 block">Override Level</label>
                                        <select 
                                            value={user.level}
                                            onChange={(e) => onUpdateUser({ level: e.target.value })}
                                            className="w-full bg-slate-950 border border-slate-800 text-white text-xs p-2 rounded-lg outline-none focus:border-emerald-500"
                                        >
                                            <option value="Beginner">Beginner</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Advanced">Advanced</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[9px] text-slate-500 font-black uppercase mb-1 block">Select Mentor</label>
                                        <select 
                                            value={user.mentor || "Classic"}
                                            onChange={(e) => onUpdateUser({ mentor: e.target.value })}
                                            className="w-full bg-slate-950 border border-slate-800 text-white text-xs p-2 rounded-lg outline-none focus:border-emerald-500"
                                        >
                                            <option value="Classic">Classic Auto</option>
                                            <option value="Professional">System Architect</option>
                                            <option value="Playful">Bratty Rival</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {showMLDashboard && <MLDashboard onClose={() => setShowMLDashboard(false)} />}
                    </>
                )}

                {/* Current Course Progress */}
                <div className="space-y-4">
                    <div className="flex justify-between items-end px-2">
                        <h2 className="text-xl font-black text-white italic uppercase tracking-wider">Active Mission</h2>
                        <span className="text-xs font-bold text-emerald-400">{progress}% Completed</span>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-[2.5rem] backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700">
                                    <BookOpen className="text-emerald-500" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold">{syllabus?.title || "Python Mastery"}</h3>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Curated for {user.level}</p>
                                </div>
                            </div>
                            <button
                                onClick={onResume}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-900/40"
                            >
                                Resume <ArrowRight size={16} />
                            </button>
                        </div>

                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-1000"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Badges & Achievements (Static for now) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h2 className="text-xl font-black text-white italic uppercase tracking-wider px-2">Achievements</h2>
                        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-[2.5rem] flex gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-14 h-14 bg-slate-850 rounded-2xl border border-slate-800 flex items-center justify-center group/badge cursor-help relative">
                                    <Heart size={24} className="text-slate-700 group-hover/badge:text-yellow-500 transition-colors" />
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-800 text-[10px] text-white px-2 py-1 rounded opacity-0 group-hover/badge:opacity-100 transition-opacity whitespace-nowrap">
                                        Locked Achievement
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-black text-white italic uppercase tracking-wider px-2">Stats</h2>
                        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-[2.5rem] grid grid-cols-2 gap-4 text-center">
                            <div className="p-2">
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Focus Score</div>
                                <div className="text-2xl font-black text-white">92%</div>
                            </div>
                            <div className="p-2 border-l border-slate-800">
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Accuracy</div>
                                <div className="text-2xl font-black text-pink-500">88%</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Leaderboard Section */}
                <div className="mt-8">
                    <Leaderboard data={user.leaderboard || []} />
                </div>
            </div>
        </div>
    );
}
