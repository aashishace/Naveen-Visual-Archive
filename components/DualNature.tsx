import React, { useState, useRef } from 'react';

const DualNature: React.FC = () => {
  const [splitPos, setSplitPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setSplitPos(x);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-[80vh] w-full overflow-hidden bg-[#030303]"
    >
      {/* LEFT SIDE - CINEMATOGRAPHY (Slow, Raw, Beautiful) */}
      <div className="absolute inset-0 w-full h-full bg-black">
         <iframe
            src="https://player.vimeo.com/video/1139757776?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1"
            className="w-[300%] h-[300%] -ml-[100%] -mt-[100%] object-cover opacity-80 grayscale-[20%]"
            frameBorder="0"
            allow="autoplay; fullscreen"
          ></iframe>
        <div className="absolute top-10 left-10 z-10">
           <h2 className="font-['Unbounded'] text-4xl md:text-6xl text-white tracking-tighter">SHOOT</h2>
           <p className="font-mono text-xs text-white/50 mt-2">ISO 800 • 24FPS • ARRI ALEXA</p>
        </div>
      </div>

      {/* RIGHT SIDE - EDITING (Fast, Technical, UI overlay) */}
      <div 
        className="absolute inset-0 w-full h-full bg-[#050505] border-l border-[#FF3B30]"
        style={{ clipPath: `polygon(${splitPos}% 0, 100% 0, 100% 100%, ${splitPos}% 100%)` }}
      >
         <iframe
            src="https://player.vimeo.com/video/1139757975?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1"
            className="w-[300%] h-[300%] -ml-[100%] -mt-[100%] object-cover opacity-60 saturate-150"
            frameBorder="0"
            allow="autoplay; fullscreen"
          ></iframe>
        
        {/* Editor UI Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_100%]"></div>
        
        <div className="absolute bottom-10 right-10 z-10 text-right">
           <h2 className="font-['Unbounded'] text-4xl md:text-6xl tracking-tighter text-stroke-1 text-transparent">CUT</h2>
           <p className="font-mono text-xs text-white/50 mt-2">TIMELINE • RHYTHM • FLOW</p>
        </div>
      </div>

      {/* The Split Line */}
      <div 
        className="absolute top-0 bottom-0 w-px bg-[#FF3B30] z-20 pointer-events-none shadow-[0_0_15px_#FF3B30]"
        style={{ left: `${splitPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-[#FF3B30] rounded-full flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-1 h-4 bg-white/80"></div>
          <div className="w-1 h-4 bg-white/80 ml-1"></div>
        </div>
      </div>
    </section>
  );
};

export default DualNature;