import React from 'react';
import { Play, Lock, CheckCircle, Star, Crown, ChevronDown, Terminal, Trophy } from 'lucide-react';

export default function JourneyMap({ syllabus, onModuleClick }) {
  const activeNodeRef = React.useRef(null);

  // Auto-scroll to active node on mount
  React.useEffect(() => {
    const scrollToActive = () => {
      if (activeNodeRef.current) {
        console.log("Scrolling to active node:", activeNodeRef.current);
        // Try multiple times to handle dynamic layout shifts/animations
        activeNodeRef.current.scrollIntoView({ behavior: 'auto', block: 'center' });

        // Smooth scroll a bit later once things settle
        setTimeout(() => {
          activeNodeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    };

    scrollToActive();
    // Also scroll when syllabus data arrives
  }, [syllabus]);

  // Safety Check: Syllabus must exist and have modules
  if (!syllabus || !syllabus.modules || !Array.isArray(syllabus.modules)) {
    console.error("JourneyMap Error: Invalid Syllabus Data", syllabus);
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center animate-fade-in">
        <div className="text-red-500 font-bold mb-2">MAP DATA ERROR</div>
        <div className="text-xs text-slate-600 font-mono">
          {syllabus ? "Modules missing in syllabus object." : "Syllabus object is null."}
        </div>
        <button onClick={() => window.location.reload()} className="mt-4 text-xs bg-slate-800 px-3 py-1 rounded text-white hover:bg-slate-700">
          Reload System
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto pb-32 animate-fade-in custom-scrollbar">
      <div className="max-w-2xl mx-auto py-8 px-4">

        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 mb-3 shadow-lg">
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {syllabus.level} Saga
            </span>
          </div>
          <h2 className="text-4xl font-black text-white mb-2 tracking-tight">{syllabus.title}</h2>
          <p className="text-slate-400 text-sm">{syllabus.description}</p>
        </div>

        {/* SAGA MAP CONTAINER */}
        <div className="relative flex flex-col items-center">

          {/* GLOBAL CONNECTING LINE (Background) */}
          <div className="absolute top-0 bottom-0 w-2 bg-slate-800/50 rounded-full -z-10" />

          {(() => {
            let refAssigned = false;
            return syllabus.modules.map((region, regionIdx) => (
              <div key={region.id} className="w-full mb-32 relative">

                {/* REGION LABEL */}
                <div className="absolute -left-12 top-0 -rotate-90 origin-top-right text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] pointer-events-none">
                  {region.title}
                </div>

                <div className="flex flex-col items-center gap-24">
                  {region.levels.map((level, levelIdx) => {
                    const isActive = level.status === 'active';
                    const isCompleted = level.status === 'completed';
                    const isLocked = level.status === 'locked';
                    const isMaster = level.type === 'master';
                    const isProject = level.type === 'project';
                    const isPhaseMaster = level.type === 'phase_master';

                    // Winding Path Logic (More expansive Zig-Zag offsets to avoid overlap)
                    const offsetClass = isPhaseMaster ? 'translate-x-0 scale-125 z-20' :
                      levelIdx % 2 === 0 ? '-translate-x-20' : 'translate-x-20';

                    // Assign ref ONLY to the FIRST active node found
                    let currentRef = null;
                    if (isActive && !refAssigned) {
                      currentRef = activeNodeRef;
                      refAssigned = true;
                    }

                    return (
                      <div
                        key={level.id}
                        ref={currentRef}
                        className={`relative flex flex-col items-center group transition-all duration-500 ${offsetClass} animate-scale-in`}
                        style={{ animationDelay: `${((regionIdx * 4) + levelIdx) * 150}ms` }}
                        onClick={() => {
                          if (!isLocked) {
                            onModuleClick(level);
                          }
                        }}
                      >
                        {/* NODE ICON */}
                        <div className={`
                          relative z-10 flex items-center justify-center transition-all duration-300 shadow-2xl
                          ${isMaster
                            ? 'w-24 h-24 rounded-2xl rotate-45 border-4'
                            : 'w-20 h-20 rounded-full border-4'}
                          ${isActive
                            ? 'border-emerald-400 bg-slate-900 scale-110 shadow-[0_0_30px_rgba(52,211,153,0.3)] cursor-pointer hover:scale-125 animate-breathing'
                            : isCompleted
                              ? 'border-emerald-600 bg-emerald-900/20 text-emerald-500 cursor-pointer hover:scale-110'
                              : 'border-slate-800 bg-slate-900 text-slate-700 cursor-not-allowed grayscale'
                          }
                      `}>
                          {/* Interactive Background Glow for Active Node */}
                          {isActive && (
                            <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full scale-150 animate-map-glow -z-10" />
                          )}

                          <div className={isMaster ? '-rotate-45' : ''}>
                            {isMaster ? (
                              <Crown size={32} className={isActive ? "text-yellow-400 animate-pulse" : "text-slate-600"} fill={isActive ? "currentColor" : "none"} />
                            ) : isPhaseMaster ? (
                              <Trophy size={40} className={isActive ? "text-yellow-400 animate-bounce" : "text-slate-600"} />
                            ) : isProject ? (
                              <Terminal size={32} className={isActive ? "text-blue-400" : "text-slate-600"} />
                            ) : isCompleted ? (
                              <CheckCircle size={32} />
                            ) : isActive ? (
                              <Play size={32} fill="currentColor" className="ml-1" />
                            ) : (
                              <Lock size={24} />
                            )}
                          </div>

                          {/* STARS (For completed levels) */}
                          {isCompleted && (
                            <div className="absolute -top-2 flex gap-1">
                              <Star size={12} className="text-yellow-500 fill-yellow-500" />
                              <Star size={12} className="text-yellow-500 fill-yellow-500" />
                              <Star size={12} className="text-yellow-500 fill-yellow-500" />
                            </div>
                          )}
                        </div>

                        {/* LABEL */}
                        <div className={`mt-4 absolute top-full w-48 text-center transition-opacity duration-300 ${isActive || isCompleted ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>
                          <div className={`text-xs font-bold ${isMaster ? 'text-yellow-500' : isPhaseMaster ? 'text-yellow-400' : 'text-emerald-400'} uppercase tracking-wider mb-1`}>
                            {isMaster ? "Milestone Exam" : isPhaseMaster ? "Phase Master" : isProject ? "Major Project" : `Level ${regionIdx + 1}.${levelIdx + 1}`}
                          </div>
                          <div className="font-bold text-white text-sm bg-slate-900/80 backdrop-blur px-3 py-1 rounded-lg border border-slate-800 inline-block">
                            {level.title}
                          </div>
                        </div>

                        {/* CONNECTING DOTS */}
                        {!(regionIdx === syllabus.modules.length - 1 && levelIdx === region.levels.length - 1) && (
                          <div className="absolute -bottom-24 w-1 h-20 bg-slate-800/50 -z-10" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Region Separator */}
                {regionIdx < syllabus.modules.length - 1 && (
                  <div className="flex justify-center my-24">
                    <ChevronDown className="text-slate-700 animate-bounce" size={32} />
                  </div>
                )}
              </div>
            ));
          })()}

          {/* END OF ROAD */}
          <div className="flex flex-col items-center gap-4 mt-8 opacity-50">
            <div className="w-16 h-1 bg-slate-800 rounded-full" />
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-slate-600">To Be Continued...</span>
          </div>

        </div>
      </div>
    </div>
  );
}