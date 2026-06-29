import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex justify-between items-center z-50">
            {/* Top Left: Hermes Brand Title */}
            <div className="flex items-center space-x-2">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-wider uppercase text-gray-900 dark:text-white transition-colors drop-shadow-sm select-none">
                    Hermes
                </span>
            </div>

            {/* Top Right: Theme Toggle Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Theme Menu"
                    className="p-2.5 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 shadow-md hover:bg-white dark:hover:bg-gray-800 transition-all active:scale-95 flex items-center justify-center"
                >
                    {theme === 'dark' ? (
                        /* Moon Icon */
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    ) : (
                        /* Sun Icon */
                        <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    )}
                </button>

                {/* Dropdown Options */}
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                        <button
                            onClick={() => {
                                setTheme('light');
                                setIsOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm font-medium flex items-center space-x-2.5 transition-colors ${
                                theme === 'light'
                                    ? 'bg-blue-50 dark:bg-gray-700/60 text-[#091B63] dark:text-blue-400'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/40'
                            }`}
                        >
                            <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span>Light</span>
                        </button>

                        <button
                            onClick={() => {
                                setTheme('dark');
                                setIsOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm font-medium flex items-center space-x-2.5 transition-colors ${
                                theme === 'dark'
                                    ? 'bg-blue-50 dark:bg-gray-700/60 text-[#091B63] dark:text-blue-400'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/40'
                            }`}
                        >
                            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                            <span>Dark</span>
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
