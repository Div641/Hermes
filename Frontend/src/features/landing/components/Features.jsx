import React from 'react';

export default function Features() {
  return (
    <section className="w-full py-16 md:py-24 border-y border-slate-200/50 dark:border-slate-800/30 px-6 sm:px-12 md:px-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Side Heading */}
        <div className="space-y-4">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
            Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-light uppercase tracking-[4px] sm:tracking-[6px] text-slate-900 dark:text-white leading-tight">
            Cognitive amplification, <br />
            streaming instantly.
          </h2>
        </div>

        {/* Right Side Paragraph */}
        <div className="space-y-6 text-slate-600 dark:text-slate-350 leading-relaxed text-sm sm:text-base">
          <p>
            Hermes delivers lightning-fast responses using direct Gemini API adapters. Conversational states are stored persistently in MongoDB databases, allowing you to resume threads, search titles, or purge chat logs seamlessly.
          </p>
          <p>
            Equipped with persistent websocket engines, the client environment listens for background updates, providing real-time alerts and state sync across components.
          </p>
        </div>
      </div>

      {/* Mini Feature Grid Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16">
        {/* Card 1 */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#131314]/30 border border-slate-200/60 dark:border-slate-850 hover:border-blue-500/20 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-sky-400/10 text-sky-400 flex items-center justify-center mb-4">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-2">Instant Streaming</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            API adapters call generative models instantly, updating state indicators instantly.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#131314]/30 border border-slate-200/60 dark:border-slate-850 hover:border-blue-500/20 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-amber-450/15 text-amber-300 flex items-center justify-center mb-4">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-2">Searchable History</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Past chats are categorized by relative date blocks and filtered in real-time.
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#131314]/30 border border-slate-200/60 dark:border-slate-850 hover:border-blue-500/20 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-violet-400/10 text-violet-400 flex items-center justify-center mb-4">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.344l2-2a2 2 0 012.828 0l2.828 2.828a2 2 0 010 2.828l-2 2" />
            </svg>
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-2">Adaptive Theme</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Transition seamlessly between white paper templates and rich indigo gradients.
          </p>
        </div>
      </div>
    </section>
  );
}
