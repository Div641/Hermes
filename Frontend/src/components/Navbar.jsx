import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 md:px-12 md:py-6 transition-colors duration-300 bg-transparent">
      {/* Logo */}
      <div className="flex items-center">
        <span className="text-xl md:text-2xl font-black tracking-wider text-slate-900 dark:text-white transition-colors duration-300">
          HERMES/AI
        </span>
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="relative p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-sm cursor-pointer transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? (
          // Moon Icon (Dark Mode active, click to change to light)
          <svg
            className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        ) : (
          // Sun Icon (Light Mode active, click to change to dark)
          <svg
            className="w-5 h-5 text-amber-500 group-hover:text-amber-600 transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        )}
      </button>
    </nav>
  );
}