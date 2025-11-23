import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Cpu, MessageCircle } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'System Online. Connected to Naveen\'s Neural Interface. How can I assist?', timestamp: Date.now() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Haptic feedback
    if (navigator.vibrate) navigator.vibrate(10);

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(input, messages);
    
    const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const triggerHaptic = () => {
    if (navigator.vibrate) navigator.vibrate(10);
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4 items-end">
        
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/917052326636"
          target="_blank"
          rel="noopener noreferrer"
          onClick={triggerHaptic}
          className="flex items-center justify-center w-12 h-12 bg-[#111] border border-white/10 rounded-full text-white/80 hover:text-[#25D366] hover:border-[#25D366] transition-all shadow-lg group"
          data-cursor="hover"
          title="Chat on WhatsApp"
        >
          <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
        </a>

        {/* Toggle Button */}
        <button
          onClick={() => { setIsOpen(true); triggerHaptic(); }}
          className="flex items-center gap-2 px-4 py-3 bg-[#111] border border-white/10 text-white/80 hover:text-[#FF3B30] hover:border-[#FF3B30] transition-all group font-mono text-xs"
          data-cursor="hover"
        >
          <Cpu size={16} className="group-hover:animate-pulse" />
          <span>AI COMM</span>
        </button>
      </div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-24 right-8 z-50 w-80 md:w-96 h-[500px] bg-[#050505] border border-white/20 shadow-2xl flex flex-col font-mono text-sm overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0a0a0a]">
              <div className="flex items-center gap-2 text-[#FF3B30]">
                <div className="w-2 h-2 bg-[#FF3B30] rounded-full animate-pulse"></div>
                <span className="tracking-widest font-bold">NAVEEN.AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white" data-cursor="hover">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-800">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 ${msg.role === 'user' ? 'bg-white/10 text-white' : 'bg-[#111] text-[#aaa] border border-white/5'}`}>
                    <p className="text-xs opacity-50 mb-1">{msg.role === 'user' ? 'USER' : 'SYSTEM'}</p>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                   <div className="p-3 bg-[#111] border border-white/5 text-[#FF3B30] animate-pulse">
                     Processing...
                   </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-[#0a0a0a] flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Enter command..."
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/20 font-mono"
              />
              <button onClick={handleSend} className="text-white/50 hover:text-[#FF3B30]" data-cursor="hover">
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;