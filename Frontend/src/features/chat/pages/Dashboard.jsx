import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../auth/hook/useAuth';
import { useChat } from '../hooks/useChat';
import ReactMarkdown from 'react-markdown';

// Helper function to format timestamp
const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const Dashboard = () => {
    const auth = useAuth();
    const { user } = useSelector(state => state.auth);

    // Display values
    const displayName = user?.username || "Creator";

    // Consume our new custom hook for Redux-integrated chat state & logic
    const {
        chats,
        activeChatId,
        messages,
        isSending,
        isMockMode,
        loadChats,
        loadChatMessages,
        handleNewChat: newChat,
        handleSendMessage: sendMessage,
        handleDeleteChat: deleteChat,
        initializeSocketConnection
    } = useChat();

    // Local input and UI states
    const [searchQuery, setSearchQuery] = useState("");
    const [inputMessage, setInputMessage] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    
    // UI Layout States
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [showAllChats, setShowAllChats] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    // Refs
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    // Image Upload Handlers
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    const clearSelectedImage = () => {
        setSelectedImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Initialize sockets and load past chats on mount
    useEffect(() => {
        initializeSocketConnection();
        loadChats();
    }, []);

    // Scroll to bottom whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Handle initiating a new chat
    const handleNewChat = () => {
        newChat();
        setInputMessage("");
    };

    // Handle sending a message
    const handleSendMessage = async (e) => {
        if (e) e.preventDefault();
        if ((!inputMessage.trim() && !selectedImage) || isSending) return;

        const userMsgText = inputMessage;
        const userMsgImage = selectedImage;

        setInputMessage("");
        setSelectedImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

        await sendMessage({ message: userMsgText, image: userMsgImage });
    };

    // Handle deleting a chat
    const handleDeleteChat = async (e, chatId) => {
        e.stopPropagation(); // Stop from clicking the chat
        await deleteChat(chatId);
    };

    // Group chats by date helper
    const groupChatsByDate = (chatsList) => {
        const today = [];
        const yesterday = [];
        const threeDaysAgo = [];
        const sevenDaysAgo = [];
        const last30Days = [];

        const now = new Date();
        
        chatsList.forEach(chat => {
            const chatDate = new Date(chat.updatedAt || chat.createdAt);
            const diffTime = Math.abs(now - chatDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            const isToday = now.toDateString() === chatDate.toDateString();
            
            const tempYesterday = new Date(now);
            tempYesterday.setDate(now.getDate() - 1);
            const isYesterday = tempYesterday.toDateString() === chatDate.toDateString();

            if (isToday) {
                today.push(chat);
            } else if (isYesterday) {
                yesterday.push(chat);
            } else if (diffDays <= 3) {
                threeDaysAgo.push(chat);
            } else if (diffDays <= 7) {
                sevenDaysAgo.push(chat);
            } else {
                last30Days.push(chat);
            }
        });

        return {
            "Today": today,
            "Yesterday": yesterday,
            "3 days ago": threeDaysAgo,
            "7 days ago": sevenDaysAgo,
            "Last 30 days": last30Days
        };
    };

    const filteredChats = chats.filter(chat => 
        chat.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Show only the 4 most recent chats overall if showAllChats is false.
    // Otherwise, show all filtered chats.
    const chatsToShow = showAllChats
        ? filteredChats
        : [...filteredChats].sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)).slice(0, 4);

    const groupedChats = groupChatsByDate(chatsToShow);

    return (
        <div 
            className="h-screen w-screen bg-gradient-to-b from-black via-[#04050c] to-[#0a0e28] flex overflow-hidden font-sans select-none text-slate-100 relative"
        >
            {/* Global SVG Gradients Definition */}
            <svg className="absolute w-0 h-0" width="0" height="0">
                <defs>
                    <linearGradient id="sparkle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4facfe" />
                        <stop offset="50%" stopColor="#00f2fe" />
                        <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                    <linearGradient id="gold-rim-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fef08a" />
                        <stop offset="50%" stopColor="#ca8a04" />
                        <stop offset="100%" stopColor="#854d0e" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Background Glow Blobs for depth */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
            <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

            {/* Sidebar */}
            <aside 
                className={`h-full relative z-10 flex flex-col transition-all duration-500 ease-in-out bg-[#0b1026]/40 border-r border-yellow-500/20 backdrop-blur-xl ${
                    isSidebarExpanded ? 'w-80' : 'w-20'
                }`}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between px-5 py-6">
                    <div className="flex items-center gap-3">
                        <img 
                            src="/logo.png" 
                            className="w-10 h-10 object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                            alt="Hermes Logo"
                        />
                        {isSidebarExpanded && (
                            <span 
                                className="text-xl font-black tracking-wider bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent cursor-pointer"
                                onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                            >
                                HERMES
                            </span>
                        )}
                    </div>
                    {isSidebarExpanded && (
                        <button 
                            onClick={handleNewChat}
                            className="p-2 rounded-xl border border-[#2b3a80]/50 hover:bg-[#121b47]/40 active:scale-95 transition-all text-blue-400 hover:text-blue-300 cursor-pointer shadow-md"
                            title="New Conversation"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Chats History toggle button */}
                {isSidebarExpanded && (
                    <div className="px-4 mb-3 flex-shrink-0">
                        <button 
                            type="button"
                            onClick={() => setShowAllChats(!showAllChats)}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border transition-all duration-300 cursor-pointer text-xs font-bold tracking-wide select-none ${
                                showAllChats 
                                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 font-bold' 
                                    : 'bg-[#131b40]/20 border-[#2b3a80]/20 text-slate-400 hover:bg-[#121b47]/40 hover:text-white'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                                <span>CHATS</span>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                                showAllChats ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                            }`}>
                                {showAllChats ? 'Collapse' : 'Show All'}
                            </span>
                        </button>
                    </div>
                )}

                {/* Search Bar */}
                {isSidebarExpanded && (
                    <div className="px-4 mb-4">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <input 
                                type="text"
                                placeholder="Search conversations"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#0a0f26]/60 border border-[#1e295d]/30 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500/50 text-white placeholder-slate-500 transition-colors"
                            />
                        </div>
                    </div>
                )}

                {/* Past Chats Section */}
                <div className="flex-1 overflow-y-auto px-3 space-y-4 py-2 scrollbar-thin scrollbar-thumb-blue-500/10">
                    {isSidebarExpanded ? (
                        Object.keys(groupedChats).map(groupName => {
                            const groupItems = groupedChats[groupName];
                            if (groupItems.length === 0) return null;
                            
                            return (
                                <div key={groupName} className="space-y-1">
                                    <h3 className="text-xs font-semibold text-slate-400/80 px-2 tracking-wider uppercase mb-2">
                                        {groupName}
                                    </h3>
                                    {groupItems.map(chatItem => (
                                        <div 
                                            key={chatItem._id}
                                            onClick={() => loadChatMessages(chatItem._id)}
                                            className={`group relative flex items-center justify-between px-3 py-3 rounded-xl cursor-pointer transition-all duration-200 border-y border-r border-transparent border-l-2 ${
                                                activeChatId === chatItem._id 
                                                    ? 'bg-[#182354]/60 border-l-amber-500/80 shadow-md text-white' 
                                                    : 'hover:bg-[#121b47]/30 border-l-transparent text-slate-300 hover:text-white'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3 overflow-hidden pr-8">
                                                <svg className="w-4 h-4 flex-shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                </svg>
                                                <span className="text-sm truncate select-none">
                                                    {chatItem.title}
                                                </span>
                                            </div>
                                            
                                            {/* Chat deletion button */}
                                            <button 
                                                onClick={(e) => handleDeleteChat(e, chatItem._id)}
                                                className="absolute right-3 opacity-0 group-hover:opacity-100 hover:text-red-400 p-1 rounded transition-opacity"
                                                title="Delete Chat"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            );
                        })
                    ) : (
                        // Collapsed Sidebar - Icons Only
                        <div className="flex flex-col items-center gap-4 py-4">
                            <button 
                                onClick={handleNewChat}
                                className="p-3 rounded-full bg-[#1b2559]/50 border border-[#2b3a80]/30 hover:bg-[#121b47]/70 text-blue-400 active:scale-95 transition-all cursor-pointer shadow-md"
                                title="New Conversation"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                            <div className="w-8 h-[1px] bg-[#1e295d]/30"></div>
                            {chatsToShow.map(chatItem => (
                                <button 
                                    key={chatItem._id}
                                    onClick={() => loadChatMessages(chatItem._id)}
                                    className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                                        activeChatId === chatItem._id 
                                            ? 'bg-[#182354]/60 border-[#2b3c80]/50 text-blue-400' 
                                            : 'hover:bg-[#121b47]/30 border-transparent text-slate-400 hover:text-white'
                                    }`}
                                    title={chatItem.title}
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sidebar Bottom - Hermes Pro Card */}
                {isSidebarExpanded && (
                    <div className="p-4 border-t border-[#1e295d]/30">
                        <div className="bg-gradient-to-br from-[#928520]/80 to-[#1c2966]/80 border border-[#2e4094]/30 rounded-2xl p-4 shadow-lg flex flex-col relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                            
                            <div className="flex items-center gap-2 mb-1.5 text-blue-200 font-bold text-sm">
                                <span className="text-base text-yellow-300">𝄞</span>
                                Upgrade to Hermes Pro
                            </div>
                            <p className="text-[11px] text-slate-250 leading-relaxed mb-4">
                                Unlock unlimited messages, advanced models and more.
                            </p>
                            <div className="flex justify-between items-center">
                                <button className="text-xs font-semibold text-white hover:underline cursor-pointer">
                                    Upgrade coming soon
                                </button>
                                <button className="p-1.5 rounded-full bg-yellow-400 hover:bg-blue-500 text-white shadow transition-all cursor-pointer">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </aside>

            {/* Main Chat Panel */}
            <main className="flex-1 h-full flex flex-col relative z-10 overflow-hidden bg-transparent">
                
                {/* Chat Top Bar */}
                <header className="h-20 border-b border-[#1e295d]/10 bg-black/10 backdrop-blur-sm flex items-center justify-between px-6 sm:px-8">
                    <div className="flex items-center gap-3">
                        <span className="text-base sm:text-lg font-bold text-white tracking-wide">
                            {activeChatId 
                                ? chats.find(c => c._id === activeChatId)?.title || "Hermes AI" 
                                : "Hermes/AI"}
                        </span>
                        {isMockMode && (
                            <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] uppercase font-bold tracking-wider">
                                Demo Mode
                            </span>
                        )}
                    </div>

                    {/* Profile Avatar Button & Dropdown */}
                    <div className="relative flex items-center gap-3">
                        <button 
                            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                            className="w-10 h-10 rounded-full border border-amber-400 p-[2px] bg-gradient-to-tr from-blue-600 to-amber-600 shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
                            aria-label="User menu"
                        >
                            <div className="w-full h-full rounded-full bg-[#0a0f29] flex items-center justify-center font-bold text-sm text-slate-200">
                                {displayName.substring(0, 1).toUpperCase()}
                            </div>
                        </button>

                        {isProfileMenuOpen && (
                            <div className="absolute right-0 top-12 mt-2 w-48 rounded-2xl bg-[#0b102b]/95 border border-[#1d2a6b]/50 backdrop-blur-xl shadow-2xl p-2 z-50 animate-fade-in">
                                <div className="px-4 py-2 text-xs text-slate-400 border-b border-[#1e295d]/20 mb-1 select-none">
                                    Logged in as <strong className="text-slate-200 block truncate">{displayName}</strong>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsProfileMenuOpen(false);
                                        auth.handleLogout();
                                    }}
                                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all text-left cursor-pointer"
                                >
                                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                {/* Message Box or Hello Screen */}
                <section className="flex-1 overflow-y-auto px-6 py-6 space-y-6 flex flex-col scrollbar-thin scrollbar-thumb-blue-500/10">
                    
                    {(!activeChatId && messages.length === 0) ? (
                        // Welcome Screen (Your move, Divyanka!)
                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 my-auto">
                            
                             {/* Centre Colorful Circle Icon with Softer Wavy Curves */}
                             <div className="relative flex items-center justify-center mb-4">
                                 <svg className="w-24 h-24 hover:scale-105 transition-transform duration-500 relative" viewBox="0 0 100 100" fill="none">
                                     <defs>
                                         <clipPath id="circle-clip">
                                             <circle cx="50" cy="50" r="37" />
                                         </clipPath>
                                     </defs>
                                     
                                     {/* Soft underlay glow */}
                                     <circle cx="50" cy="50" r="44" fill="url(#sparkle-grad)" opacity="0.18" className="blur-sm" />
                                     
                                     {/* Main sphere with gold gradient rim */}
                                     <circle cx="50" cy="50" r="38" fill="url(#sparkle-grad)" stroke="url(#gold-rim-grad)" strokeWidth="2.2" />
                                     
                                     {/* Soft organic wavy lines clipped inside the sphere */}
                                     <g clipPath="url(#circle-clip)" className="opacity-60">
                                         {/* Wave 1 */}
                                         <path d="M10,50 C30,38 40,62 60,50 C80,38 90,50 100,50" stroke="white" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" className="animate-pulse" />
                                         {/* Wave 2 */}
                                         <path d="M10,55 C25,66 45,44 60,55 C75,66 85,55 100,55" stroke="#fef08a" strokeWidth="0.8" opacity="0.5" strokeLinecap="round" />
                                         {/* Wave 3 */}
                                         <path d="M10,45 C20,33 40,57 60,45 C80,33 90,45 100,45" stroke="#38bdf8" strokeWidth="1.0" opacity="0.5" strokeLinecap="round" />
                                     </g>
                                 </svg>
                             </div>

                            <div className="space-y-2">
                                <h2 className="text-3xl sm:text-4xl font-medium tracking-normal text-white select-none">
                                    𝄞 Let's Muse, {displayName}!
                                </h2>
                            </div>

                            {/* Suggestion Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-2xl w-full pt-6 px-4">
                                <div 
                                    onClick={() => setInputMessage("Suggest some UI improvements")}
                                    className="p-4 rounded-2xl bg-[#131314]/30 border border-slate-800/30 hover:bg-[#131314]/75 hover:border-amber-500/30 transition-all duration-300 cursor-pointer text-left group"
                                >
                                    <div className="font-bold text-sm text-slate-200 group-hover:text-amber-400 transition-colors">
                                        Suggest UI improvements
                                    </div>
                                    <p className="text-xs text-slate-400/80 mt-1 leading-relaxed">
                                        Learn best practices for designing a clean, modern aesthetic.
                                    </p>
                                </div>
                                <div 
                                    onClick={() => setInputMessage("Explain this code")}
                                    className="p-4 rounded-2xl bg-[#131314]/30 border border-slate-800/30 hover:bg-[#131314]/75 hover:border-amber-500/30 transition-all duration-300 cursor-pointer text-left group"
                                >
                                    <div className="font-bold text-sm text-slate-200 group-hover:text-amber-400 transition-colors">
                                        Explain code
                                    </div>
                                    <p className="text-xs text-slate-400/80 mt-1 leading-relaxed">
                                        Paste a script block to get an optimized breakdown of its logic.
                                    </p>
                                </div>
                            </div>

                        </div>
                    ) : (
                        // Chat Stream (User on Right, AI on Left)
                        <div className="space-y-6 flex flex-col justify-end">
                            {messages.map((msg) => (
                                <div 
                                    key={msg._id}
                                    className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {msg.role === 'user' ? (
                                        // User message (Right)
                                        <div className="max-w-[70%] bg-gradient-to-r from-[#18225c] to-[#25368a] text-white rounded-2xl rounded-tr-none px-4 py-3.5 border border-[#3b4fa8]/40 shadow-lg flex flex-col relative select-text">
                                            {msg.image && (
                                                <img 
                                                    src={msg.image} 
                                                    alt="Attached content" 
                                                    className="max-h-48 rounded-lg mb-2 object-cover border border-[#3b4fa8]/20 shadow-md"
                                                />
                                            )}
                                            {msg.content && (
                                                <p className="text-sm leading-relaxed break-words">
                                                    {msg.content}
                                                </p>
                                            )}
                                            <div className="flex items-center gap-1.5 justify-end mt-1.5 text-[10px] text-blue-300/80 select-none">
                                                <span>{formatTime(msg.createdAt)}</span>
                                                <svg className="w-3.5 h-3.5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    ) : (
                                        // AI message (Left)
                                        <div className="max-w-[75%] flex gap-3.5 items-start">
                                            {/* AI Avatar Circle */}
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-sky-400 p-[1.5px] shadow-[0_0_15px_rgba(59,130,246,0.4)] flex-shrink-0 flex items-center justify-center mt-0.5">
                                                <div className="w-full h-full rounded-full bg-[#0a0f29] flex items-center justify-center overflow-hidden">
                                                    <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none">
                                                        <circle cx="12" cy="12" r="9" fill="url(#sparkle-grad)" />
                                                    </svg>
                                                </div>
                                            </div>
                                            
                                            {/* AI Message Bubble */}
                                            <div className="bg-[#0e1638]/40 text-slate-100 rounded-2xl rounded-tl-none px-4 py-3.5 border border-[#2b3a80]/20 shadow-md flex flex-col select-text">
                                                <div className="text-sm leading-relaxed whitespace-pre-wrap break-words prose prose-slate prose-invert max-w-none">
                                                    <ReactMarkdown
                                                        components={{
                                                            p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                                                            ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                                                            ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                                                            li: ({node, ...props}) => <li className="text-sm" {...props} />,
                                                            strong: ({node, ...props}) => <strong className="font-semibold text-white" {...props} />,
                                                            code: ({node, className, children, ...props}) => {
                                                            const isInline = !className || !className.startsWith('language-');
                                                            return isInline ? (
                                                                <code className="..." {...props}>{children}</code>
                                                            ) : (
                                                                <pre className="..."><code className={className} {...props}>{children}</code></pre>
                                                            );
                                                        }
                                                        }}
                                                    >
                                                        {msg.content}
                                                    </ReactMarkdown>
                                                </div>
                                                <span className="text-[10px] text-slate-400/80 mt-2 select-none self-start">
                                                    {formatTime(msg.createdAt)}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {isSending && (
                                <div className="flex gap-3.5 items-start">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-sky-400 p-[1.5px] flex-shrink-0 animate-spin">
                                        <div className="w-full h-full rounded-full bg-[#0a0f29] flex items-center justify-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-sky-300/40"></div>
                                        </div>
                                    </div>
                                    <div className="bg-[#0e1638]/40 rounded-2xl rounded-tl-none px-4 py-3.5 border border-[#2b3a80]/20 shadow-md flex items-center gap-1.5">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            )}

                            {/* Scroll spacer */}
                            <div ref={messagesEndRef} />
                        </div>
                    )}

                </section>
                <footer className="p-6 bg-transparent flex flex-col gap-3">
                    {selectedImage && (
                        <div className="max-w-3xl w-full mx-auto bg-[#1e1e21]/90 border border-[#2b3a80]/30 rounded-2xl p-3 flex items-center gap-3 relative shadow-lg">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-700">
                                <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                                <button 
                                    type="button"
                                    onClick={clearSelectedImage}
                                    className="absolute top-0.5 right-0.5 bg-red-600 hover:bg-red-500 text-white rounded-full p-0.5 shadow cursor-pointer flex items-center justify-center"
                                >
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <span className="text-xs text-[#c4c7c5]">Image attached. Ready to send.</span>
                        </div>
                    )}

                    <form 
                        onSubmit={handleSendMessage}
                        className="max-w-3xl w-full mx-auto bg-[#131314]/90 border border-transparent rounded-full px-6 py-3.5 flex items-center gap-4 shadow-2xl relative"
                    >
                        {/* Hidden File Input */}
                        <input 
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            className="hidden"
                        />

                        {/* Plus Add Button */}
                        <button 
                            type="button" 
                            onClick={triggerFileSelect}
                            className="text-[#c4c7c5] hover:text-white p-1 rounded-full active:scale-90 transition-all cursor-pointer flex-shrink-0"
                            title="Attach Image"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                            </svg>
                        </button>
 
                        {/* Input Area */}
                        <input 
                            type="text" 
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Ask Hermes..."
                            className="flex-1 bg-transparent border-none text-white text-base placeholder-[#c4c7c5] focus:outline-none py-1 select-text"
                            disabled={isSending}
                        />
 
                        {/* Voice Input or Send Button */}
                        {(inputMessage.trim() || selectedImage) ? (
                            <button 
                                type="submit" 
                                disabled={isSending}
                                className="p-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow active:scale-95 transition-all cursor-pointer flex items-center justify-center flex-shrink-0"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                            </button>
                        ) : (
                            <button 
                                type="button" 
                                className="text-[#c4c7c5] hover:text-white p-1 rounded-full active:scale-90 transition-all cursor-pointer flex-shrink-0"
                                title="Voice Input"
                            >
                                <div className="w-6.5 h-6.5 rounded-full bg-black flex items-center justify-center">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                        <path d="M12 19V5M6 11l6-6 6 6" />
                                    </svg>
                                </div>
                            </button>
                        )}
                    </form>
                </footer>

            </main>
        </div>
    );
};

export default Dashboard;