import React from 'react';
import { Home, Map as MapIcon, MessageSquare, Code2 } from 'lucide-react';

const AppNavigation = ({ activeTab, onTabChange, onOpenLab, hideWhenMobile = false }) => {
    const tabs = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'map', icon: MapIcon, label: 'Map' },
        { id: 'chat', icon: MessageSquare, label: 'Chat' },
    ];

    return (
        <nav className={`fixed bottom-0 left-0 right-0 md:bottom-8 md:left-1/2 md:-translate-x-1/2 z-[800] w-full md:w-[90%] md:max-w-md animate-fade-in-up ${hideWhenMobile ? 'hidden md:block' : ''
            }`}>
            <div className="bg-slate-900/95 backdrop-blur-2xl border-t md:border border-emerald-500/20 p-2 md:rounded-[2rem] flex items-center justify-between shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative ring-1 ring-white/5">
                {/* Visual Accent */}
                <div className="absolute inset-0 bg-emerald-500/5 rounded-[2rem] -z-10 pointer-events-none"></div>

                <div className="flex items-center gap-1 flex-1">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={`flex-1 flex flex-col items-center justify-center py-2 gap-1 transition-all rounded-2xl relative group
                                    ${isActive ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}
                                `}
                            >
                                <Icon size={22} className={isActive ? 'animate-bounce' : ''} />
                                {isActive && (
                                    <div className="absolute -bottom-1 w-1 h-1 bg-emerald-400 rounded-full shadow-[0_0_8px_#10b981]"></div>
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="w-px h-8 bg-slate-800 mx-2"></div>

                <button
                    onClick={onOpenLab}
                    className="p-2 md:p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-900/40 group relative"
                >
                    <Code2 size={24} />
                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-800 text-white text-[10px] uppercase font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
                        Open Lab
                    </div>
                </button>
            </div>
        </nav>
    );
};

export default AppNavigation;
