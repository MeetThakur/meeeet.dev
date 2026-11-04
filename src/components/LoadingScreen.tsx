"use client";

import { useEffect, useState } from "react";
import { animate, motion, AnimatePresence } from "framer-motion";
import { ease } from "./ui/motion";

export const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Play the full intro once per session; skip it almost instantly on later loads
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
      sessionStorage.setItem("intro-seen", "1");
    } catch {
      // Storage can be unavailable (private mode); fall back to showing the intro
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      const t = setTimeout(() => setIsLoading(false), 0);
      return () => clearTimeout(t);
    }

    const controls = animate(0, 100, {
      duration: 1.4,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(() => setIsLoading(false), 200),
    });
    return () => controls.stop();
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease }}
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-fg text-bg p-6 md:p-10"
          aria-hidden="true"
        >
          <div className="flex justify-between font-mono text-xs uppercase tracking-[0.2em] opacity-60">
            <span>Meet Thakur</span>
            <span>Portfolio — 2026</span>
          </div>

          <div className="overflow-hidden">
            <div className="font-serif italic text-4xl md:text-7xl leading-[1.1] pb-2 animate-[rise_0.9s_cubic-bezier(0.22,1,0.36,1)_0.1s_both]">
              Building things that matter.
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div className="h-px flex-1 mr-8 bg-bg/20 overflow-hidden self-center">
              <div className="h-full bg-accent origin-left" style={{ transform: `scaleX(${count / 100})` }} />
            </div>
            <span className="font-sans font-semibold tabular-nums text-7xl md:text-[10rem] leading-none tracking-tighter">
              {count}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
