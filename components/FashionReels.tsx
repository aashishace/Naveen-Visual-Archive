import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import { REELS } from '../constants';

const FashionReels: React.FC = () => {
  const [selectedReel, setSelectedReel] = useState<typeof REELS[0] | null>(null);

  return (
    <>
      <section className="py-32 relative z-10">
        <div className="px-8 md:px-32 mb-16">
          <h2 className="font-['Unbounded'] text-4xl md:text-6xl text-white uppercase">
            Fashion <span className="text-[#FF3B30]">&</span> Ad
          </h2>
          <p className="font-mono text-white/50 mt-4 max-w-xl">
            Short form narratives and commercial spots.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 px-8 md:px-32 overflow-x-auto pb-10 snap-x scrollbar-hide">
          {REELS.map((reel) => (
            <div 
              key={reel.id} 
              className="relative w-full md:w-[300px] aspect-[9/16] flex-shrink-0 bg-[#111] border border-white/10 group overflow-hidden snap-center cursor-pointer"
              onClick={() => setSelectedReel(reel)}
              data-cursor="watch"
            >
              <iframe
                src={`https://player.vimeo.com/video/${reel.vimeoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`}
                className="absolute inset-0 w-[300%] h-[300%] -ml-[100%] -mt-[100%] object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                frameBorder="0"
                allow="autoplay; fullscreen"
              ></iframe>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              {/* Play Icon Hint */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm z-20">
                <Play fill="white" className="text-white ml-1" size={20} />
              </div>

              <div className="absolute bottom-6 left-6 z-20">
                <h3 className="font-['Unbounded'] text-xl text-white">{reel.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reel Lightbox */}
      <AnimatePresence>
        {selectedReel && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedReel(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-[#FF3B30] transition-colors z-[110]"
              onClick={() => setSelectedReel(null)}
              data-cursor="hover"
            >
              <X size={32} />
            </button>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="h-[80vh] aspect-[9/16] bg-black shadow-2xl border border-white/10 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                className="w-full h-full"
                src={`https://player.vimeo.com/video/${selectedReel.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
                title={selectedReel.title}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FashionReels;
