"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loading screen after 2.5 seconds to allow animations to play
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-desk-light dark:bg-desk-dark"
        >
          {/* Animated SVG Signature/Logo */}
          <div className="relative flex items-center justify-center w-32 h-32 rounded-full bg-ink-blue/10 dark:bg-neon-pink/10 border border-ink-blue/30 dark:border-neon-pink/30 shadow-sm overflow-hidden mb-8">
            <svg 
              className="w-20 h-20 text-ink-blue dark:text-neon-pink transform -rotate-6"
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M20 80 L35 20 L50 60 L65 20 L80 80"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </svg>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="font-sketch text-2xl text-ink-dark dark:text-ink-light tracking-widest"
          >
            Gathering notes...
          </motion.div>
          
          {/* Loading Bar */}
          <div className="w-48 h-1 mt-6 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-ink-blue dark:bg-neon-pink rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
