import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import DocDrawer from './components/DocDrawer';

export default function Landing() {
  const [isDocOpen, setIsDocOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-black dark:via-[#04050c] dark:to-[#0a0e28] text-slate-900 dark:text-slate-100 transition-colors duration-500 overflow-x-hidden relative">
      {/* Dynamic Navigation Header */}
      <Navbar isLanding={true} onOpenDocs={() => setIsDocOpen(true)} />

      {/* Main Landing Flow */}
      <main className="w-full flex flex-col items-center">
        {/* Hero Area */}
        <Hero onOpenDocs={() => setIsDocOpen(true)} />

        {/* Feature Cards Grid */}
        <Features />

        {/* How It Works Horizontal/Vertical Timeline */}
        <HowItWorks />

        {/* Pricing Plan Panels */}
        <Pricing />

        {/* Frequently Asked Accordion Questions */}
        <FAQ />
      </main>

      {/* Full Layout Footer */}
      <Footer />

      {/* Slide-out Documentation panel */}
      <DocDrawer isOpen={isDocOpen} onClose={() => setIsDocOpen(false)} />
    </div>
  );
}
