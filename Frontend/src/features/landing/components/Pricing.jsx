import React from 'react';
import { Link } from 'react-router';

export default function Pricing() {
  return (
    <section className="w-full py-20 px-6 sm:px-12 md:px-24">
      <div className="max-w-5xl mx-auto text-center space-y-12">
        <div className="space-y-3">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
            Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl font-light uppercase tracking-[4px] sm:tracking-[6px] text-slate-900 dark:text-white">
            Flexible Plans for Everyone
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Choose the plan that best suits your cognitive and operational needs.
          </p>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-6">
          
          {/* Plan 1 - Starter */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0c0f2b]/40 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between text-left transition-all hover:scale-[1.02] duration-300">
            <div>
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Starter</span>
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-3xl font-black text-slate-900 dark:text-white">$0</span>
                <span className="text-xs text-slate-450 dark:text-slate-500">/ forever</span>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-550 leading-relaxed mb-6">For personal experimentation and individual users.</p>
              
              <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-350 border-t border-slate-200/50 dark:border-slate-800/50 pt-4 mb-8">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Up to 100 queries/day
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Standard Gemini model access
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  7-day chat persistence
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Basic markdown rendering
                </li>
              </ul>
            </div>
            <Link 
              to="/register"
              className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/60 text-slate-800 dark:text-white font-semibold text-center text-xs transition-colors cursor-pointer"
            >
              Get Started
            </Link>
          </div>

          {/* Plan 2 - Pro (Recommended Glow Card) */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-gradient-to-b dark:from-[#0d123b] dark:to-[#070b24] border-2 border-indigo-400/40 shadow-xl flex flex-col justify-between text-left transition-all hover:scale-[1.02] duration-300 relative overflow-hidden">
            <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-400/25 text-indigo-400 text-[10px] font-bold uppercase tracking-wider">
              Popular
            </div>
            
            <div>
              <span className="text-xs font-bold text-indigo-550 dark:text-indigo-400 uppercase tracking-wider block mb-1">Pro</span>
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-3xl font-black text-slate-900 dark:text-white">Internship</span>
                <span className="text-xs text-slate-450 dark:text-slate-500">/3 month</span>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-555 leading-relaxed mb-6">For power users and professional content creators.</p>
              
              <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300 border-t border-indigo-500/20 pt-4 mb-8">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Unlimited queries/day
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Priority Gemini 1.5 Pro access
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Lifetime chat persistence
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Advanced markdown & formatting
                </li>
              </ul>
            </div>
            <Link 
              to="/register"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-center text-xs shadow-md shadow-blue-500/25 transition-all cursor-pointer"
            >
              Start with Pro
            </Link>
          </div>

          {/* Plan 3 - Enterprise */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0c0f2b]/40 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between text-left transition-all hover:scale-[1.02] duration-300">
            <div>
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Enterprise</span>
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-3xl font-black text-slate-900 dark:text-white">Full Fleged SDE Job</span>
                <span className="text-xs text-slate-455 dark:text-slate-500">/year</span>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-550 leading-relaxed mb-6">For multi-user teams and operational scale-ups.</p>
              
              <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-355 border-t border-slate-200/50 dark:border-slate-800/50 pt-4 mb-8">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Dedicated API adapters & speed limits
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Fine-tuning model configurations
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Team collaboration workspaces
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  SLA agreement & dedicated support
                </li>
              </ul>
            </div>
            <Link 
              to="/register"
              className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/60 text-slate-800 dark:text-white font-semibold text-center text-xs transition-colors cursor-pointer"
            >
              Contact Sales
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
