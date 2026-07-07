import React, { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Hermes/AI?",
      answer: "Hermes/AI is a real-time conversational workspace built using React, Express, MongoDB, and Socket.IO, designed to connect directly with the Gemini API to fetch responses instantly."
    },
    {
      question: "How do I access my past chats?",
      answer: "All conversations are saved persistently in MongoDB under your logged-in profile. The collapsible left sidebar retrieves your history instantly, segmented by relative time periods (Today, Yesterday, etc.)."
    },
    {
      question: "Is my chat data private?",
      answer: "Yes, all chat documents are bound to your user ID and verified via JSON Web Tokens (JWT) security layers. Users can only view, create, or delete their own sessions."
    },
    {
      question: "What formatting does Hermes support?",
      answer: "Hermes utilizes ReactMarkdown formatting to support lists, bold headings, inline highlights, and custom dark code blocks with scrollbars for programming code."
    },
    {
      question: "Does the app support mobile view?",
      answer: "Absolutely! The entire dashboard UI is designed to be fully responsive. The left sidebar collapses to an icon bar (or collapses completely on mobile view) to fit all screen sizes."
    }
  ];

  return (
    <section className="w-full py-20 px-6 sm:px-12 md:px-24 bg-slate-50/50 dark:bg-black/10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Left Side Heading */}
        <div className="space-y-4">
          <span className="text-xs font-bold text-blue-500 dark:text-blue-400 uppercase tracking-widest">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl font-light uppercase tracking-[4px] sm:tracking-[6px] text-slate-900 dark:text-white leading-tight">
            Frequently <br />
            Asked <br />
            Questions
          </h2>
        </div>

        {/* Right Side Accordion */}
        <div className="md:col-span-2 space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border-b border-slate-200 dark:border-slate-800/80 pb-3"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between py-3 text-left font-semibold text-sm sm:text-base text-slate-850 dark:text-slate-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors cursor-pointer select-none"
              >
                <span>{faq.question}</span>
                <svg 
                  className={`w-4 h-4 text-slate-400 transform transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed pb-2">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
