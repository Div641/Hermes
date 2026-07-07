import React from 'react';

export default function HowItWorks() {
  return (
    <section className="w-full py-20 px-6 sm:px-12 bg-slate-50/50 dark:bg-black/10">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-3">
          <span className="text-xs font-bold text-blue-500 dark:text-blue-400 uppercase tracking-widest">
            Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-light uppercase tracking-[4px] sm:tracking-[6px] text-slate-900 dark:text-white">
            How it works?
          </h2>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pt-6 max-w-xl mx-auto text-left">
          {/* Vertical Connecting Line */}
          <div className="absolute left-[27px] top-6 bottom-6 w-[2px] bg-slate-200 dark:bg-blue-500/25"></div>

          {/* Step 1 */}
          <div className="relative flex gap-6 pb-12 group">
            {/* Step Icon Container */}
            <div className="relative z-10 w-14 h-14 rounded-2xl bg-white dark:bg-[#0a0f26] border border-slate-200 dark:border-sky-400/20 flex items-center justify-center shadow-md flex-shrink-0 group-hover:border-sky-400 transition-colors">
              <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            {/* Step Details */}
            <div className="pt-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Authenticate Securely</h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Register or log in using protected credentials. Secure JSON Web Tokens (JWT) are stored in secure browser cookies.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative flex gap-6 pb-12 group">
            {/* Step Icon Container */}
            <div className="relative z-10 w-14 h-14 rounded-2xl bg-white dark:bg-[#0a0f26] border border-slate-200 dark:border-amber-400/20 flex items-center justify-center shadow-md flex-shrink-0 group-hover:border-amber-400 transition-colors">
              <svg className="w-6 h-6 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            {/* Step Details */}
            <div className="pt-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Spawn Your Workspace</h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Access your chat workspace instantly. Sidebar panels fetch past chats categorized by date block with instant query filters.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative flex gap-6 group">
            {/* Step Icon Container */}
            <div className="relative z-10 w-14 h-14 rounded-2xl bg-white dark:bg-[#0a0f26] border border-slate-200 dark:border-teal-400/20 flex items-center justify-center shadow-md flex-shrink-0 group-hover:border-teal-400 transition-colors">
              <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            {/* Step Details */}
            <div className="pt-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Converse and Render</h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Send messages and receive replies processed by Gemini API, rendered with syntax-highlighted code blocks.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
