import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CustomCursorProps {
  text?: string;
  variant?: 'default' | 'hover' | 'watch';
}

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'watch'>('default');
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Check for hover targets
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="watch"]')) {
        setCursorVariant('watch');
        setCursorText('WATCH');
      } else if (target.closest('a') || target.closest('button') || target.closest('[data-cursor="hover"]')) {
        setCursorVariant('hover');
        setCursorText('');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', mouseMove);
    return () => window.removeEventListener('mousemove', mouseMove);
  }, []);

  const variants = {
    default: {
      height: 12,
      width: 12,
      backgroundColor: "#FF3B30",
      mixBlendMode: "exclusion" as any,
    },
    hover: {
      height: 40,
      width: 40,
      backgroundColor: "transparent",
      border: "1px solid #FF3B30",
      mixBlendMode: "normal" as any,
    },
    watch: {
      height: 80,
      width: 80,
      backgroundColor: "#FF3B30",
      mixBlendMode: "normal" as any,
      color: "#000"
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center rounded-full font-bold font-mono text-[10px]"
      variants={variants}
      animate={cursorVariant}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      style={{
        x: mousePosition.x - (cursorVariant === 'watch' ? 40 : cursorVariant === 'hover' ? 20 : 6),
        y: mousePosition.y - (cursorVariant === 'watch' ? 40 : cursorVariant === 'hover' ? 20 : 6)
      }}
    >
      {cursorText}
    </motion.div>
  );
};

export default CustomCursor;