import React, { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import Hero from './components/Hero';
import DualNature from './components/DualNature';
import SelectedWorks from './components/SelectedWorks';
import FashionReels from './components/FashionReels';
import Anavaran from './components/Anavaran';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import AIChat from './components/AIChat';

const App: React.FC = () => {
  
  // Basic smooth scroll behavior for anchor links if needed, 
  // though the sticky scroll handles the main weight.
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <HashRouter>
      <div className="min-h-screen text-white selection:bg-[#FF3B30] selection:text-white overflow-x-hidden">
        <CustomCursor />
        
        <main className="relative z-10 bg-[#030303] shadow-2xl shadow-black mb-[80vh] md:mb-[60vh]">
          <Hero />
          
          <div className="py-20 px-6 md:px-12 w-full max-w-7xl mx-auto text-center">
             <p className="font-['Unbounded'] font-bold text-xl md:text-3xl lg:text-4xl leading-tight text-white uppercase tracking-wide">
               "I AM A VISUAL STORYTELLER OBSESSED WITH THE RHYTHM OF A FRAME. 
               WHETHER I AM BEHIND THE CAMERA OR ON THE TIMELINE, MY GOAL IS THE SAME: 
               TO <span className="text-[#FF3B30]">MAKE YOU FEEL SOMETHING</span> BEFORE YOU REALIZE YOU’RE WATCHING IT."
             </p>
          </div>

          <DualNature />
          <SelectedWorks />
          <FashionReels />
          <Anavaran />
        </main>
        
        <Footer />
        <AIChat />
      </div>
    </HashRouter>
  );
};

export default App;