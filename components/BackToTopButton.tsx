'use client';

import React, {useState} from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'motion/react';
import {ArrowUp} from 'lucide-react';

export default function BackToTopButton() {
  const {scrollY} = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    // Show floating button only after scrolling past the hero section (~680px)
    if (latest > 680) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  const handleScrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={handleScrollToTop}
          aria-label="Scroll back to top"
          initial={{opacity: 0, y: 20, scale: 0.9}}
          animate={{opacity: 1, y: 0, scale: 1}}
          exit={{opacity: 0, y: 16, scale: 0.92}}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 22,
            mass: 0.8,
          }}
          className="fixed bottom-20 xl:bottom-6 right-4 sm:right-6 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-[#1C1917] text-[#FAF7F2] border border-[#292524] shadow-lg hover:bg-[#292524] hover:ring-2 hover:ring-[#D97706]/60 active:scale-[0.97] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]"
        >
          <ArrowUp className="w-4 h-4 text-[#D97706]" />
          <span className="text-xs font-semibold tracking-tight whitespace-nowrap">
            Back to Top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
