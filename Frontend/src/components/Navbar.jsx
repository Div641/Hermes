import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

export default function Navbar({ isLanding = false, onOpenDocs }) {
  const { theme, toggleTheme } = useTheme();
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 md:px-12 md:py-6 transition-colors duration-300 bg-transparent relative z-50">
      {/* Logo & Brand */}
      <div className="flex items-center gap-2.5 group">
        <img 
          src="/logo.png" 
          alt="Hermes Logo" 
          className="w-11 h-11 object-contain group-hover:rotate-12 transition-transform duration-300"
        />
        <span className="text-xl md:text-2xl font-black tracking-wider text-slate-900 dark:text-white transition-colors duration-300">
          HERMES<span className="text-amber-500">/</span>AI
        </span>
      </div>

      {/* Center Links (Only on Landing Page) */}
      {isLanding && (
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={onOpenDocs}
            className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors cursor-pointer"
          >
            Documentation
          </button>
          
          <a 
            href="https://github.com/Div641" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors flex items-center gap-1.5"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            <span className="text-sm font-semibold">GitHub</span>
          </a>
        </div>
      )}

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {isLanding && (
          <>
            {user ? (
              <Link 
                to="/dashboard"
                className="px-4 py-2 text-sm font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
              >
                Dashboard
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link 
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-350 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Log In
                </Link>
                <Link 
                  to="/register"
                  className="px-4 py-2 text-sm font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </>
        )}

        {/* Home Option */}
        {!isLanding && (
          <Link
            to="/"
            className="p-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-sm cursor-pointer transition-all duration-300 flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
            title="Back to Landing Page"
          >
            <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Home</span>
          </Link>
        )}

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="relative p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-sm cursor-pointer transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
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
      </div>
    </nav>
  );
}