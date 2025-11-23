
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import Player from '@vimeo/player';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isMuted, setIsMuted] = useState(true);
  const isMutedRef = useRef(true); // Ref to keep track of muted state for observer

  // Sync ref with state
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // Haptic feedback helper
  const triggerHaptic = () => {
    if (navigator.vibrate) navigator.vibrate(10);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize Vimeo Player and handle Intersection Observer
  useEffect(() => {
    if (!iframeRef.current) return;

    // Initialize player
    const player = new Player(iframeRef.current);
    playerRef.current = player;

    // Set initial volume (lower side as requested)
    player.setVolume(0.3).catch(console.error);

    // Intersection Observer to pause/play based on visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Only play audio if user has unmuted, otherwise just play video
            player.play().catch(console.error);
            if (!isMutedRef.current) {
              player.setVolume(0.3).catch(console.error);
            }
          } else {
            // Pause or mute when out of view
            player.setVolume(0).catch(console.error);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of hero is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      player.unload().catch(console.error);
    };
  }, []);

  // Handle Mute Toggle
  useEffect(() => {
    if (!playerRef.current) return;
    
    if (isMuted) {
      playerRef.current.setVolume(0).catch(console.error);
    } else {
      playerRef.current.setVolume(0.3).catch(console.error); // 30% volume
    }
  }, [isMuted]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full overflow-hidden bg-[#030303] flex items-center justify-center"
    >
      {/* Header - Fixed to top */}
      <div className="absolute top-0 left-0 w-full p-6 md:p-10 z-50 flex items-center justify-between mix-blend-exclusion">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={triggerHaptic}>
          <div className="relative w-12 h-12 md:w-14 md:h-14 overflow-hidden rounded-full border border-white/20 group-hover:border-[#FF3B30] transition-colors duration-300">
            <img 
              src="/naveen_portfolio.jpg" 
              alt="Naveen" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="font-['Manrope'] font-bold text-xl md:text-2xl text-white tracking-wide leading-none group-hover:text-[#FF3B30] transition-colors">NAVEEN</h1>
            <span className="font-mono text-[10px] md:text-xs text-white/50 tracking-[0.2em] mt-1">DOP & EDITOR</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
           {/* Sound Toggle */}
           <button 
             onClick={() => { setIsMuted(!isMuted); triggerHaptic(); }}
             className="hidden md:flex items-center gap-2 font-mono text-xs text-white/40 hover:text-[#FF3B30] transition-colors uppercase"
             data-cursor="hover"
           >
             {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
             <span>{isMuted ? 'SOUND OFF' : 'SOUND ON'}</span>
           </button>

           <div className="hidden md:flex items-center gap-2 font-mono text-xs text-white/40">
              <div className="w-2 h-2 bg-[#FF3B30] rounded-full animate-pulse"></div>
              <span>REC 00:00:04:12</span>
           </div>
        </div>
      </div>

      {/* Background Video - Vimeo Loop */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <iframe 
          ref={iframeRef}
          src="https://player.vimeo.com/video/1139757776?autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0" 
          className="w-full h-full object-cover opacity-40 grayscale-50 scale-150"
          frameBorder="0" 
          allow="autoplay; fullscreen" 
          allowFullScreen
          style={{ pointerEvents: 'none' }}
        ></iframe>
        
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[#030303] via-transparent to-[#030303] opacity-80"></div>
        <div className="absolute inset-0 bg-linear-to-r from-[#030303] via-transparent to-[#030303] opacity-80"></div>
      </div>

      {/* Interactive Light Overlay - Subtle Flashlight */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none opacity-50"
        style={{
          background: `radial-gradient(circle 400px at ${mousePos.x}% ${mousePos.y}%, rgba(255,59,48,0.05) 0%, rgba(0,0,0,0) 100%)`
        }}
      />

      {/* Main Tagline - Simple & Clean */}
      <div className="relative z-20 text-center select-none mix-blend-screen">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="font-['Unbounded'] text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
            SCULPTING <span className="text-stroke-1 text-transparent">LIGHT</span>
            <br />
            CUTTING <span className="text-stroke-1 text-transparent">TIME</span>
          </h2>
        </motion.div>
        
        <motion.div 
          className="mt-8 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <span className="w-12 h-[1px] bg-[#FF3B30]"></span>
          <p className="font-mono text-xs md:text-sm text-white/60 tracking-widest uppercase">
            Visual Portfolio
          </p>
          <span className="w-12 h-[1px] bg-[#FF3B30]"></span>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#FF3B30] to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};

export default Hero;
