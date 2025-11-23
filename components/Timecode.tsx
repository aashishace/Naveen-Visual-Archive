import React, { useEffect, useState } from 'react';

const Timecode: React.FC = () => {
  const [timecode, setTimecode] = useState("00:00:00:00");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Convert pixels to frames roughly (assuming 24px per frame equivalent)
      const totalFrames = Math.floor(scrollY / 2);
      
      const frames = totalFrames % 24;
      const seconds = Math.floor(totalFrames / 24) % 60;
      const minutes = Math.floor(totalFrames / (24 * 60)) % 60;
      const hours = Math.floor(totalFrames / (24 * 60 * 60));

      const f = frames.toString().padStart(2, '0');
      const s = seconds.toString().padStart(2, '0');
      const m = minutes.toString().padStart(2, '0');
      const h = hours.toString().padStart(2, '0');

      setTimecode(`${h}:${m}:${s}:${f}`);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-8 left-8 z-50 font-mono text-xs tracking-widest text-[#333] pointer-events-none mix-blend-difference">
      <div className="text-[10px] mb-1 text-[#FF3B30] opacity-80">TC SOURCE</div>
      <div className="text-xl md:text-2xl font-bold text-white">{timecode}</div>
    </div>
  );
};

export default Timecode;