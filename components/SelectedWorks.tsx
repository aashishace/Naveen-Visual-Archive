
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { X, Play } from 'lucide-react';

const ProjectCard: React.FC<{ project: Project; onClick: (p: Project) => void }> = ({ project, onClick }) => {
  return (
    <div 
      className="group relative h-[60vh] w-[40vh] md:w-[40vw] md:h-[70vh] flex-shrink-0 bg-[#0a0a0a] overflow-hidden border border-white/5 cursor-none"
      data-cursor="watch"
      onClick={() => onClick(project)}
    >
      {/* Video Loop - Vimeo Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <iframe
          src={`https://player.vimeo.com/video/${project.vimeoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`}
          className="w-[300%] h-[300%] -ml-[100%] -mt-[100%] object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
          frameBorder="0"
          allow="autoplay; fullscreen"
        ></iframe>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
      
      {/* Play Icon Hint */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
        <Play fill="white" className="text-white ml-1" size={24} />
      </div>

      {/* Text Info */}
      <div className="absolute bottom-6 left-6 z-20">
        <div className="overflow-hidden">
          <h3 
            className="text-3xl md:text-4xl font-['Unbounded'] font-bold text-white uppercase group-hover:animate-pulse"
            data-text={project.title}
          >
            {project.title}
          </h3>
        </div>
        <div className="flex items-center gap-3 mt-2 font-mono text-xs text-[#FF3B30]">
          <span>{project.role}</span>
          <span className="w-1 h-1 rounded-full bg-white/30"></span>
          <span>{project.year}</span>
        </div>
      </div>

      {/* Glitch Decoration on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none mix-blend-color-dodge bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
};

const SelectedWorks: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <>
      <section ref={targetRef} className="relative h-[300vh] bg-[#030303]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          
          {/* Header Label */}
          <div className="absolute top-10 left-10 z-20">
            <h2 className="text-xs font-mono text-white/40 border-b border-[#FF3B30] pb-1 inline-block tracking-widest">
              SELECTED ARCHIVE
            </h2>
          </div>

          <motion.div style={{ x }} className="flex gap-4 md:gap-10 pl-10 md:pl-32 pr-32">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
            ))}
            
            {/* End Spacer */}
            <div className="w-[50vw] flex items-center justify-center">
               <span className="font-['Unbounded'] text-6xl text-white/5 text-stroke-1">END OF REEL</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedProject(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-[#FF3B30] transition-colors"
              onClick={() => setSelectedProject(null)}
              data-cursor="hover"
            >
              <X size={32} />
            </button>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-6xl aspect-video bg-black shadow-2xl border border-white/10 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                className="w-full h-full"
                src={`https://player.vimeo.com/video/${selectedProject.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
                title={selectedProject.title}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
            
            <div className="absolute bottom-8 left-8 text-white pointer-events-none">
              <h3 className="font-['Unbounded'] text-2xl">{selectedProject.title}</h3>
              <p className="font-mono text-[#FF3B30] text-sm">{selectedProject.role} // {selectedProject.year}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SelectedWorks;
