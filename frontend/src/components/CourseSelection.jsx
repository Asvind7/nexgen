import React from 'react';
import { Terminal, Database, Globe, Lock, Cpu, ArrowRight, Coffee } from 'lucide-react';

export const COURSES = [
  {
    id: 'python',
    title: 'Python Mastery',
    icon: <Terminal size={32} />,
    color: 'from-emerald-500 to-emerald-700',
    desc: 'Master AI, Data Science & Automation.',
    status: 'active',
    students: '1.2k'
  },
  {
    id: 'web',
    title: 'Full Stack Web',
    icon: <Globe size={32} />,
    color: 'from-blue-500 to-blue-700',
    desc: 'Build modern React & Node.js apps.',
    status: 'locked'
  },
  {
    id: 'java',
    title: 'Java Backend',
    icon: <Coffee size={32} />,
    color: 'from-orange-600 to-red-700',
    desc: 'Build enterprise scalable backends.',
    status: 'locked'
  },
  {
    id: 'cpp',
    title: 'C++ Systems',
    icon: <Cpu size={32} />,
    color: 'from-orange-500 to-orange-700',
    desc: 'High-performance game engine coding.',
    status: 'locked'
  }
];

export default function CourseSelection({ onSelect }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-white tracking-tight mb-4">
          Choose Your <span className="text-emerald-500">Path</span>
        </h1>
        <p className="text-slate-400">Select a technology to begin your adaptive learning journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {COURSES.map((course) => (
          <button
            key={course.id}
            disabled={course.status === 'locked'}
            onClick={() => onSelect(course.id)}
            className={`relative group overflow-hidden rounded-[2rem] p-8 border text-left transition-all duration-300 hover:-translate-y-1 ${course.status === 'active'
              ? 'bg-slate-900 border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-900/40 cursor-pointer'
              : 'bg-slate-950 border-slate-800 opacity-60 cursor-not-allowed grayscale hover:grayscale-0'
              }`}
          >
            {/* Background Glow */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${course.color} blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity`} />

            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${course.color} text-white shadow-lg`}>
                {course.icon}
              </div>
              {course.status === 'locked' ? (
                <Lock className="text-slate-600" size={24} />
              ) : (
                <div className="flex items-center gap-1 text-emerald-400 font-bold text-xs uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full">
                  Available
                </div>
              )}
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">{course.title}</h3>
            <p className="text-slate-400 text-sm mb-6">{course.desc}</p>

            <div className="flex items-center justify-between border-t border-slate-800 pt-6">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                {course.status === 'active' ? `${course.students} Learners` : 'Coming Soon'}
              </span>
              {course.status === 'active' && (
                <div className="w-8 h-8 rounded-full bg-white text-emerald-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight size={16} />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}