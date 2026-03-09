import React from 'react';
import { Trophy, Medal, Crown, Target } from 'lucide-react';

const Leaderboard = ({ data }) => {
    return (
        <div className="w-full bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6 px-2">
                <h2 className="text-xl font-black text-white italic uppercase tracking-wider">Top Learners</h2>
                <div className="bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                    Weekly Global
                </div>
            </div>

            <div className="space-y-3">
                {data.map((entry, index) => {
                    const isTop3 = index < 3;
                    const isUser = entry.isUser;

                    return (
                        <div
                            key={entry.name}
                            className={`flex items-center gap-4 p-4 rounded-2xl transition-all border ${isUser
                                    ? 'bg-emerald-600/20 border-emerald-500/50 shadow-lg shadow-emerald-900/20 ring-1 ring-emerald-500/30'
                                    : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                                }`}
                        >
                            {/* Rank Icon / Number */}
                            <div className="w-10 h-10 flex items-center justify-center shrink-0">
                                {index === 0 ? (
                                    <Crown size={24} className="text-yellow-400 drop-shadow-glow-yellow" />
                                ) : index === 1 ? (
                                    <Medal size={24} className="text-slate-300" />
                                ) : index === 2 ? (
                                    <Trophy size={24} className="text-orange-400" />
                                ) : (
                                    <span className="text-sm font-black text-slate-500">#{entry.rank}</span>
                                )}
                            </div>

                            {/* Avatar Mock */}
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-white shadow-inner ${isUser ? 'bg-emerald-500' : 'bg-slate-800 border border-slate-700'
                                }`}>
                                {entry.name[0]}
                            </div>

                            {/* Name & Badge */}
                            <div className="flex-1 min-w-0">
                                <div className={`font-bold truncate ${isUser ? 'text-white' : 'text-slate-300'}`}>
                                    {entry.name} {isUser && <span className="text-[8px] bg-white/20 px-1 rounded ml-1 font-black">YOU</span>}
                                </div>
                                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                                    Level 12 • Pro
                                </div>
                            </div>

                            {/* XP */}
                            <div className="text-right">
                                <div className="flex items-center gap-1 justify-end font-black text-white">
                                    <Target size={14} className="text-emerald-500" />
                                    {entry.xp}
                                </div>
                                <div className="text-[9px] text-slate-500 uppercase font-bold tracking-tighter">XP TOTAL</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Leaderboard;
