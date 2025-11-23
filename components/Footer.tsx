import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-[80vh] md:h-[60vh] bg-[#050505] flex flex-col justify-between p-8 md:p-20 z-0 border-t border-white/10">
      
      {/* Call Sheet Header */}
      <div className="flex justify-between items-start border-b border-white/20 pb-8">
        <div>
          <h2 className="font-['Unbounded'] text-4xl text-white">CALL SHEET</h2>
          <p className="font-mono text-[#FF3B30] mt-2">PRODUCTION: PORTFOLIO_V1</p>
        </div>
        <div className="font-mono text-right text-white/50 text-xs hidden md:block">
          <p>DATE: {new Date().toLocaleDateString()}</p>
          <p>LOC: MUMBAI / GLOBAL</p>
          <p>CALL TIME: 08:00 AM</p>
        </div>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 flex-1 items-center">
        
        <div className="space-y-8">
          <div>
            <label className="block font-mono text-xs text-white/40 mb-2">DIRECT CONTACT</label>
            <a href="mailto:prajapatinaveen8@gmail.com" className="text-2xl md:text-4xl text-white font-['Manrope'] hover:text-[#FF3B30] transition-colors" data-cursor="hover">
              prajapatinaveen8@gmail.com
            </a>
            <a href="tel:+917052326636" className="block mt-2 text-xl md:text-2xl text-white/80 font-['Manrope'] hover:text-[#FF3B30] transition-colors" data-cursor="hover">
              +91 70523 26636
            </a>
          </div>
          
          <div className="flex gap-8">
            <div>
              <label className="block font-mono text-xs text-white/40 mb-2">SOCIAL</label>
              <div className="flex flex-col gap-2 font-mono text-white">
                <a href="https://www.instagram.com/prajapatinaveen8/" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF3B30]" data-cursor="hover">INSTAGRAM</a>
                <a href="#" className="hover:text-[#FF3B30]" data-cursor="hover">VIMEO</a>
                <a href="#" className="hover:text-[#FF3B30]" data-cursor="hover">LINKEDIN</a>
              </div>
            </div>
            <div>
              <label className="block font-mono text-xs text-white/40 mb-2">STATUS</label>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-mono text-white text-sm">AVAILABLE WORLDWIDE</span>
              </div>
            </div>
          </div>
          
          <div>
             <label className="block font-mono text-xs text-white/40 mb-2">SPECIALIZATION</label>
             <p className="font-mono text-white text-sm max-w-md leading-relaxed">
               Specializing in Luxury Wedding Narratives & High-End Post-Production.
             </p>
          </div>
        </div>

        <div className="text-right hidden md:block">
           <p className="font-['Unbounded'] text-[10vw] text-white/5 leading-none select-none">
             WRAP
           </p>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/10 pt-8 flex justify-between text-xs font-mono text-white/30">
        <p>© {new Date().getFullYear()} ANAVARAN FILMS</p>
        <p>DESIGN: INVISIBLE CUT</p>
      </div>
    </footer>
  );
};

export default Footer;