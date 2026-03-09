import React, { useState } from 'react';
import { Rocket, ShieldAlert, ArrowRight, Lock, Mail, User, CheckCircle2 } from 'lucide-react';

export default function AuthScreen({ onAuthSuccess }) {
    const [isLogin, setIsLogin] = useState(true);

    // Form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Status
    const [error, setError] = useState(null);
    const [msg, setMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMsg(null);
        setLoading(true);

        try {
            const endpoint = isLogin ? "/auth/login" : "/auth/signup";
            const body = isLogin ? { email, password } : { email, name, password };

            const res = await fetch(`http://localhost:8000${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.detail || "Authentication failed");
            } else {
                if (isLogin) {
                    onAuthSuccess(data.user_data, email, data.name, data.is_admin || false);
                } else {
                    // Auto-login after signup
                    const loginRes = await fetch("http://localhost:8000/auth/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password })
                    });
                    const loginData = await loginRes.json();
                    onAuthSuccess(loginData.user_data, email, loginData.name, loginData.is_admin || false);
                }
            }
        } catch (err) {
            setError("Failed to connect to the server.");
        }
        setLoading(false);
    };

    return (
        <div className="flex h-screen w-full items-center justify-center bg-slate-950 font-sans text-slate-300 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full point-events-none"></div>

            <div className="max-w-md w-full p-8 bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-[2.5rem] shadow-2xl relative z-10">
                <div className="flex justify-center mb-8 animate-bounce">
                    <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                        <Rocket size={32} className="text-white" />
                    </div>
                </div>

                <h2 className="text-3xl font-black text-white text-center mb-2">
                    {isLogin ? "Welcome Back" : "Join NexGen"}
                </h2>
                <p className="text-center text-slate-500 mb-8">
                    {isLogin ? "Continue your programming journey." : "Create your profile to save progress."}
                </p>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-sm animate-fade-in">
                        <ShieldAlert size={18} />
                        <span className="font-bold">{error}</span>
                    </div>
                )}

                {msg && (
                    <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-400 text-sm animate-fade-in">
                        <CheckCircle2 size={18} />
                        <span className="font-bold">{msg}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div className="relative animate-fade-in">
                            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
                                required
                                minLength={2}
                            />
                        </div>
                    )}

                    <div className="relative animate-fade-in">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
                            required
                        />
                    </div>

                    <div className="relative animate-fade-in">
                        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
                            required
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !email || !password || (!isLogin && !name)}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-black uppercase tracking-widest py-4 rounded-2xl flex items-center justify-center gap-2 transition-all mt-4"
                    >
                        {loading ? "Processing..." : (isLogin ? "Launch" : "Register")}
                        {!loading && <ArrowRight size={18} />}
                    </button>
                </form>

                <div className="mt-8 text-center animate-fade-in">
                    <button
                        type="button"
                        onClick={() => { setIsLogin(!isLogin); setError(null); }}
                        className="text-slate-500 hover:text-emerald-400 text-sm transition-colors font-bold"
                    >
                        {isLogin ? "Need an account? Sign up" : "Already have an account? Log in"}
                    </button>
                </div>
            </div>
        </div>
    );
}
