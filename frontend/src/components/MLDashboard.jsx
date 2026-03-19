import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Activity, X, RefreshCcw } from 'lucide-react';
import { API_URL } from '../config';

export default function MLDashboard({ onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/dashboard`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error("Dashboard failed", e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[600] flex items-center justify-center">
      <div className="text-center">
        <RefreshCcw className="w-12 h-12 text-emerald-500 animate-spin mx-auto mb-4" />
        <p className="text-emerald-500 font-black tracking-widest uppercase">Fetching ML Insights...</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[600] overflow-y-auto custom-scrollbar p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
              <BarChart3 className="text-emerald-500" size={32} /> NexGen ML Dashboard
            </h1>
            <p className="text-slate-400">Real-time learning behavior analysis & model performance</p>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/50 transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard icon={<Users />} label="Total Learners" value={data?.stats?.total_learners} color="text-blue-400" />
          <StatCard icon={<Activity />} label="Avg Accuracy" value={`${Math.round(data?.stats?.avg_accuracy)}%`} color="text-emerald-400" />
          <StatCard icon={<TrendingUp />} label="Avg Score" value={data?.stats?.avg_score?.toFixed(1)} color="text-yellow-400" />
          <StatCard icon={<BarChart3 />} label="Model Status" value="Online 🧠" color="text-purple-400" />
        </div>

        {/* Graphs Grid */}
        <h2 className="text-2xl font-bold text-white mb-6">Visual Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(data?.graphs || {}).sort().map(([name, b64]) => (
            <div key={name} className="bg-slate-900/50 border border-white/5 rounded-3xl p-6 hover:border-emerald-500/30 transition-all group">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 group-hover:text-emerald-500 transition-colors">
                {name.replace(/_/g, ' ').replace('.png', '').slice(2)}
              </p>
              <img src={b64} alt={name} className="w-full rounded-xl shadow-2xl" />
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl text-center">
            <p className="text-emerald-400 font-bold mb-2">Presentation Tip 💡</p>
            <p className="text-slate-300 text-sm">
                "We integrated a **Random Forest Classifier** to predict learner levels based on accuracy, score, and time. 
                This dashboard shows how the model separates different learner categories to personalize their curriculum."
            </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-slate-900/50 border border-white/5 p-6 rounded-3xl shadow-xl">
      <div className={`${color} mb-4 opacity-50`}>{React.cloneElement(icon, { size: 20 })}</div>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-3xl font-black ${color}`}>{value}</p>
    </div>
  );
}
