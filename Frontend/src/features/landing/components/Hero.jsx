import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

export default function Hero({ onOpenDocs }) {
  const { user } = useSelector(state => state.auth);

  return (
    <section 
      className="relative w-full py-20 md:py-32 flex items-center justify-center px-6 overflow-hidden bg-cover bg-center min-h-[500px] md:min-h-[600px]"
      style={{ backgroundImage: 'url("/landing.png")' }}
    >
      {/* Dark tint overlay on the background image for contrast */}
      <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/55 z-0 pointer-events-none" />

      {/* Floating Blobs for lighting accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-blue-500/10 dark:bg-blue-600/10 blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-10 right-20 w-80 h-80 rounded-full bg-amber-500/5 dark:bg-amber-500/5 blur-[100px] pointer-events-none z-0"></div>

      {/* Translucent Glassmorphic Content Blob */}
      <div className="relative z-10 max-w-5xl w-full min-h-xxl mx-[150px] p-8 md:p-12 rounded-3xl bg-white/10 dark:bg-black/35 backdrop-blur-[2px] border border-white/20 dark:border-white/10 shadow-2xl flex flex-col items-center space-y-6 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/15 border border-white/20 text-white text-xs font-bold uppercase tracking-wider shadow-sm select-none">
          <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Connecting Intelligence
        </div>

        {/* Heading matching the WELCOME page font styling: light font, wide letter tracking */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-[4px] sm:tracking-[6px] md:tracking-[9px] leading-[1.25] text-white drop-shadow-md">
          Advanced Cognitive Power. <br className="hidden sm:inline" />
          Converse with <span className="font-semibold bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">Hermes</span>.
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-200 dark:text-slate-300 max-w-xl leading-relaxed">
          Hermes:the messenger god of AI chat, delivering intelligent conversations at the speed of thought, integrates advanced language generation models, persistent cloud workspaces, and real-time Socket.IO synchronization inside a state-of-the-art glassmorphic user interface.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto z-20">
          {user ? (
            <Link 
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-500/25 active:scale-95 transition-all text-center cursor-pointer"
            >
              Open Chat Dashboard
            </Link>
          ) : (
            <Link 
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-500/25 active:scale-95 transition-all text-center cursor-pointer"
            >
              Get Started Free
            </Link>
          )}
          
          <button 
            onClick={onOpenDocs}
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold rounded-2xl border border-white/20 hover:bg-white/10 text-white transition-colors text-center cursor-pointer"
          >
            Explore Tech Stack
          </button>
        </div>
      </div>
    </section>
  );
}
