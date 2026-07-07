import React, { useState, useEffect } from 'react';

const techStackNodes = [
  { id: 1, label: "Hermes Root", type: "root" },
  { id: 2, label: "Frontend", type: "branch" },
  { id: 3, label: "Backend", type: "branch" },
  { id: 4, label: "Database", type: "branch" },
  
  // Frontend Leaves
  { id: 5, label: "React 19", type: "leaf", parentId: 2 },
  { id: 6, label: "Redux Toolkit", type: "leaf", parentId: 2 },
  { id: 7, label: "Tailwind CSS", type: "leaf", parentId: 2 },
  { id: 8, label: "Socket.IO Client", type: "leaf", parentId: 2 },
  { id: 9, label: "React Router", type: "leaf", parentId: 2 },
  
  // Backend Leaves
  { id: 10, label: "NodeJS & Express", type: "leaf", parentId: 3 },
  { id: 11, label: "Socket.IO Server", type: "leaf", parentId: 3 },
  { id: 12, label: "Gemini AI API LLM Adapter", type: "leaf", parentId: 3 },
  
  // Database Leaves
  { id: 13, label: "MongoDB & Mongoose", type: "leaf", parentId: 4 }
];

export default function DocDrawer({ isOpen, onClose }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setVisibleCount(0);
      const interval = setInterval(() => {
        setVisibleCount(prev => {
          if (prev >= techStackNodes.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 200); // Renders one node/leaf every 200ms
      return () => clearInterval(interval);
    } else {
      setVisibleCount(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isVisible = (id) => {
    const index = techStackNodes.findIndex(n => n.id === id);
    return index < visibleCount;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-lg h-full bg-white dark:bg-[#080d28]/95 border-l border-slate-200 dark:border-blue-500/20 shadow-2xl p-6 overflow-y-auto flex flex-col transition-transform duration-350 translate-x-0 relative z-10 text-slate-800 dark:text-slate-100">
        
        {/* Header matching Hero typography: light weight, wide letter tracking */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-blue-500/10 mb-6 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-400/20 text-indigo-400 text-[10px] font-bold uppercase tracking-wider">
              Architecture
            </span>
            <h2 className="text-base sm:text-lg font-light uppercase tracking-[3px] text-slate-900 dark:text-white">System Tech Stack</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-150 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-pointer transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Dynamic Tree Area */}
        <div className="flex-1 space-y-6 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500/10">
          <p className="text-xs text-slate-550 dark:text-slate-400 mb-4 leading-relaxed">
            Welcome to the Hermes blueprint. The technology tree below renders sequentially to demonstrate the connection between the user interface, routing servers, data providers, and generative nodes.
          </p>

          <div className="relative pl-4 py-4 flex flex-col items-start select-none">
            
            {/* 1. Root Node (Hermes Core) with soft pastels (sky/indigo/purple) */}
            {isVisible(1) && (
              <div className="flex items-center gap-3 animate-fade-in scale-100 transition-all duration-300 mb-8">
                <div className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-sky-400/80 via-indigo-400/80 to-purple-400/80 text-white font-extrabold text-xs shadow-md border border-white/20 flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  HERMES ROOT
                </div>
              </div>
            )}

            {/* Connecting line to branches (soft pastel indigo) */}
            {isVisible(1) && (
              <div className="absolute left-[35px] top-[50px] bottom-8 w-[2px] bg-slate-200 dark:bg-indigo-500/15 z-0"></div>
            )}

            {/* Branches and Leaves */}
            <div className="w-full pl-12 space-y-8 relative z-10">
              
              {/* Branch 1 - Frontend */}
              <div className="space-y-4 relative">
                {/* Branch line connection */}
                {isVisible(2) && (
                  <div className="absolute -left-[37px] top-4 w-9 h-[2px] bg-slate-200 dark:bg-indigo-500/15"></div>
                )}
                
                {isVisible(2) && (
                  <div className="flex items-center gap-2.5">
                    <div className="px-3.5 py-1.5 rounded-xl bg-sky-400/10 border border-sky-400/20 text-sky-500 dark:text-sky-300 font-bold text-xs shadow-sm">
                      🖥️ Frontend Branch
                    </div>
                  </div>
                )}
                
                {/* Frontend Leaves */}
                <div className="pl-6 border-l border-slate-150 dark:border-indigo-500/10 space-y-3">
                  {[5, 6, 7, 8, 9].map(id => {
                    const leaf = techStackNodes.find(n => n.id === id);
                    return isVisible(id) ? (
                      <div key={id} className="flex items-center gap-2 relative animate-fade-in pl-2">
                        {/* Leaf horizontal connection */}
                        <div className="absolute -left-[24px] top-1/2 -translate-y-1/2 w-5 h-[1px] bg-slate-200 dark:bg-indigo-500/15"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-400"></div>
                        <span className="text-xs text-slate-650 dark:text-slate-300 bg-slate-50/50 dark:bg-black/25 px-2.5 py-1 rounded-lg border border-slate-200/40 dark:border-white/5 font-mono shadow-sm">
                          {leaf.label}
                        </span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>

              {/* Branch 2 - Backend */}
              <div className="space-y-4 relative">
                {/* Branch line connection */}
                {isVisible(3) && (
                  <div className="absolute -left-[37px] top-4 w-9 h-[2px] bg-slate-200 dark:bg-indigo-500/15"></div>
                )}
                
                {isVisible(3) && (
                  <div className="flex items-center gap-2.5">
                    <div className="px-3.5 py-1.5 rounded-xl bg-amber-450/15 border border-amber-400/20 text-amber-600 dark:text-amber-300 font-bold text-xs shadow-sm">
                      ⚙️ Backend Branch
                    </div>
                  </div>
                )}
                
                {/* Backend Leaves */}
                <div className="pl-6 border-l border-slate-150 dark:border-indigo-500/10 space-y-3">
                  {[10, 11, 12].map(id => {
                    const leaf = techStackNodes.find(n => n.id === id);
                    return isVisible(id) ? (
                      <div key={id} className="flex items-center gap-2 relative animate-fade-in pl-2">
                        {/* Leaf horizontal connection */}
                        <div className="absolute -left-[24px] top-1/2 -translate-y-1/2 w-5 h-[1px] bg-slate-200 dark:bg-indigo-500/15"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-300"></div>
                        <span className="text-xs text-slate-655 dark:text-slate-300 bg-slate-50/50 dark:bg-black/25 px-2.5 py-1 rounded-lg border border-slate-200/40 dark:border-white/5 font-mono shadow-sm">
                          {leaf.label}
                        </span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>

              {/* Branch 3 - Database */}
              <div className="space-y-4 relative">
                {/* Branch line connection */}
                {isVisible(4) && (
                  <div className="absolute -left-[37px] top-4 w-9 h-[2px] bg-slate-200 dark:bg-indigo-500/15"></div>
                )}
                
                {isVisible(4) && (
                  <div className="flex items-center gap-2.5">
                    <div className="px-3.5 py-1.5 rounded-xl bg-teal-400/10 border border-teal-400/20 text-teal-600 dark:text-teal-300 font-bold text-xs shadow-sm">
                      💾 Database Branch
                    </div>
                  </div>
                )}
                
                {/* Database Leaves */}
                <div className="pl-6 border-l border-slate-150 dark:border-indigo-500/10 space-y-3">
                  {[13].map(id => {
                    const leaf = techStackNodes.find(n => n.id === id);
                    return isVisible(id) ? (
                      <div key={id} className="flex items-center gap-2 relative animate-fade-in pl-2">
                        {/* Leaf horizontal connection */}
                        <div className="absolute -left-[24px] top-1/2 -translate-y-1/2 w-5 h-[1px] bg-slate-200 dark:bg-indigo-500/15"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                        <span className="text-xs text-slate-655 dark:text-slate-350 bg-slate-50/50 dark:bg-black/25 px-2.5 py-1 rounded-lg border border-slate-200/40 dark:border-white/5 font-mono shadow-sm">
                          {leaf.label}
                        </span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>

            </div>

          </div>
        </div>
        
        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-blue-500/10 mt-6 flex-shrink-0 text-center">
          <p className="text-[11px] text-slate-400">Hermes/AI Architecture Blueprint • Adding Leaves... to your chat</p>
        </div>
      </div>
    </div>
  );
}
