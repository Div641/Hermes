import React from 'react';
import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="relative w-full py-16 px-6 sm:px-12 md:px-24 border-t border-slate-200 dark:border-slate-900 bg-white/60 dark:bg-black/45 text-slate-800 dark:text-slate-200 overflow-hidden">
      {/* Blurred background image underlay scale-compensated to prevent bleed */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 dark:opacity-35 blur-[1px] scale-[1.02] pointer-events-none z-0"
        style={{ backgroundImage: 'url("/footer.png")' }}
      />
      {/* Tint mask for readability */}
      <div className="absolute inset-0 bg-white/40 dark:bg-black/60 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-8">
        
        {/* Left column logo */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <img 
              src="/logo.png" 
              alt="Hermes Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-lg font-black tracking-wider text-slate-900 dark:text-white">
              HERMES<span className="text-amber-500">/</span>AI
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
            Accelerating conversational intelligence in a beautiful, real-time glassmorphic experience.
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-550 pt-2">
            © {new Date().getFullYear()} Hermes Inc. All rights reserved.
          </p>
        </div>

        {/* Column 2 - Company */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Company</h4>
          <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
            <li><a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Press Kit</a></li>
          </ul>
        </div>

        {/* Column 3 - Resources */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Resources</h4>
          <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
            <li><a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Documentation</a></li>
            <li><a href="https://github.com/Div641" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">GitHub Repository</a></li>
          </ul>
        </div>

        {/* Column 4 - Legal */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Legal</h4>
          <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
            <li><a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Cookie Settings</a></li>
          </ul>
        </div>

        {/* Column 5 - Contact */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Contact</h4>
          <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
            <li><a href="https://x.com/divyanka06sri" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">X / Twitter</a></li>
            <li><a href="https://www.linkedin.com/in/divyanka-sri" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">LinkedIn</a></li>
            <li><a href="https://github.com/Div641" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">GitHub</a></li>
          </ul>
        </div>

      </div>
    </footer>
  );
}
