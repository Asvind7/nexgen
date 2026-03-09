import React, { useEffect, useState } from 'react';

export default function XpReward({ xpChange, onComplete }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (xpChange > 0) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                onComplete();
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [xpChange, onComplete]);

    if (!visible || xpChange <= 0) return null;

    return (
        <div className="fixed top-1/4 left-1/2 -translate-x-1/2 z-[200] pointer-events-none">
            <div className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-slate-950 font-black rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.5)] border-2 border-emerald-400 animate-float-up-fade">
                <span className="text-2xl">+{xpChange}</span>
                <span className="text-sm uppercase tracking-widest">XP Reward</span>
            </div>
        </div>
    );
}
