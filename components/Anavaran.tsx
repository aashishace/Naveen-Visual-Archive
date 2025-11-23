import React from 'react';
import { motion } from 'framer-motion';

const Anavaran: React.FC = () => {
  return (
    <section className="relative py-32 w-full bg-[#030303] flex flex-col items-center justify-center overflow-hidden">
      
      <div className="relative z-10 text-center group" data-cursor="hover">
        <p className="font-mono text-sm text-white/40 mb-4">PRODUCING INDEPENDENT NARRATIVES AT</p>
        
        <motion.h2 
          className="font-['Unbounded'] text-4xl md:text-6xl text-white font-black tracking-tighter cursor-pointer transition-colors duration-300 group-hover:text-[#FF3B30]"
        >
          ANAVARAN
          <span className="block text-stroke-1 text-transparent group-hover:text-white transition-colors duration-300">FILMS</span>
        </motion.h2>

        <div className="mt-8 w-16 h-[1px] bg-white/20 mx-auto group-hover:w-32 transition-all duration-500"></div>
      </div>

      {/* Subtle Background Logo/Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-10 transition-opacity duration-700">
         <div className="w-[500px] h-[500px] rounded-full blur-[100px] bg-[#FF3B30]"></div>
      </div>
    </section>
  );
};

export default Anavaran;