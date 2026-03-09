import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Award, BrainCircuit, Clock } from 'lucide-react';

import { QUESTIONS as EXTERNAL_QUESTIONS } from '../data/questions';

// Map external questions to include the 'focus' property needed for analysis
const QUESTIONS = EXTERNAL_QUESTIONS.map(q => ({
  ...q,
  focus: q.difficulty // Use difficulty as a fallback for focus area
}));

export default function DiagnosticQuiz({ onComplete }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const [startTime, setStartTime] = useState(Date.now());
  const [performanceLog, setPerformanceLog] = useState([]);

  useEffect(() => {
    setStartTime(Date.now());
  }, [currentQ]);

  const handleAnswer = (index) => {
    const timeTaken = (Date.now() - startTime) / 1000;
    const isCorrect = index === QUESTIONS[currentQ].answer;

    setSelectedOption(index);
    setPerformanceLog(prev => [...prev, {
      id: QUESTIONS[currentQ].id,
      isCorrect,
      timeTaken,
      focus: QUESTIONS[currentQ].focus
    }]);

    if (isCorrect) setScore(s => s + 1);

    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ(c => c + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 800);
  };

  const analyzeAndComplete = () => {
    // 1. Determine Level
    let level = "Beginner";
    if (score >= 8) level = "Advanced"; // <--- MATCHES CURRICULUM ENGINE
    else if (score >= 5) level = "Intermediate";

    // 2. Calculate Stats
    const totalTime = performanceLog.reduce((acc, curr) => acc + curr.timeTaken, 0);
    const avgTime = performanceLog.length > 0 ? totalTime / performanceLog.length : 0;

    // 3. Find Weak Areas
    const focusAreas = performanceLog
      .filter(p => !p.isCorrect)
      .map(p => p.focus); // e.g., ["Math", "Algorithms"]

    const earnedXp = score * 100;

    onComplete(level, earnedXp, [...new Set(focusAreas)], avgTime);
  };

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fade-in text-white">
        <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 text-emerald-400 shadow-lg shadow-emerald-500/20">
          <Award size={48} />
        </div>
        <h2 className="text-3xl font-bold mb-2">Analysis Complete!</h2>
        <p className="text-slate-400 mb-6">We have calculated your optimal learning path.</p>

        <div className="flex gap-4 justify-center my-6">
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <p className="text-[10px] uppercase text-slate-500 font-bold">Accuracy</p>
            <p className="text-xl font-bold text-emerald-400">{Math.round((score / QUESTIONS.length) * 100)}%</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <p className="text-[10px] uppercase text-slate-500 font-bold">Avg Speed</p>
            <p className="text-xl font-bold text-yellow-400">
              {(performanceLog.reduce((a, b) => a + b.timeTaken, 0) / QUESTIONS.length).toFixed(1)}s
            </p>
          </div>
        </div>

        {/* RECOMMENDATION TEXT */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl mb-6 max-w-md">
          <p className="text-emerald-400 font-bold mb-1">Recommendation:</p>
          <p className="text-sm text-slate-300">
            You scored <strong className="text-white">{score} points</strong>. We have unlocked
            <strong className="text-white"> {score >= 8 ? "Advanced (Phase 3)" : score >= 5 ? "Intermediate (Phase 2)" : "Beginner (Phase 1)"}</strong> modules for you.
          </p>
        </div>

        <button
          onClick={analyzeAndComplete}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-12 rounded-2xl transition-all shadow-lg shadow-emerald-900/40 active:scale-95"
        >
          Generate Personalized Path
        </button>
      </div>
    );
  }

  const question = QUESTIONS[currentQ];

  return (
    <div className="max-w-2xl mx-auto h-full flex flex-col justify-center p-4">
      {/* Header Stats */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
            <BrainCircuit size={16} /> Diagnostic Mode
          </span>
          <span className="text-slate-500 text-xs font-mono">Q{currentQ + 1}/{QUESTIONS.length}</span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]"
            style={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-relaxed">
        {question.text}
      </h2>

      {/* Options */}
      <div className="space-y-4">
        {question.options.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = idx === question.answer;

          let btnClass = "bg-slate-900/50 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800 text-slate-300";
          if (isSelected) {
            btnClass = isCorrect
              ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-900/20"
              : "bg-red-500/20 border-red-500 text-red-400";
          }

          return (
            <button
              key={idx}
              disabled={selectedOption !== null}
              onClick={() => handleAnswer(idx)}
              className={`w-full text-left p-6 rounded-2xl border-2 transition-all font-medium flex justify-between items-center group ${btnClass}`}
            >
              <span className="text-sm md:text-base">{opt}</span>
              {isSelected && (isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />)}
            </button>
          );
        })}
      </div>
    </div>
  );
}