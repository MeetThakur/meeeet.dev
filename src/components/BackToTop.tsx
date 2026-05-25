"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-0 right-4 md:right-8 z-40"
        >
          <button
            onClick={scrollToTop}
            className="group relative pb-8 pt-4 px-3 bg-[#e84118] hover:bg-[#c23616] transition-colors shadow-lg cursor-pointer flex flex-col items-center justify-center border-x-2 border-black/10 dark:border-white/10"
            aria-label="Back to top"
            style={{ 
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)" 
            }}
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] opacity-30 mix-blend-overlay"></div>
            <ArrowUp className="w-5 h-5 text-white/90 group-hover:-translate-y-1 transition-transform relative z-10" />
            <span className="font-sketch text-xs text-white/90 mt-1 relative z-10 [writing-mode:vertical-rl] rotate-180 tracking-widest">
              TOP
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
