"use client";

import { resumeData } from "../data/resumeData";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { Magnetic, ease, useClock } from "./ui/motion";

const roles = ["LLM-powered systems", "data pipelines", "full-stack products", "real-time apps"];

const highlights = [
  { value: "2,000+", label: "people use ConvoMetrics" },
  { value: "93%", label: "top-3 accuracy, LLM ticket routing" },
  { value: "Expert", label: "on Codeforces" },
  { value: "9.12", label: "CGPA / 10" },
];

// Each letter rises from below its own mask, staggered across the whole name
const AnimatedWord = ({ word, delay, className }: { word: string; delay: number; className?: string }) => (
  <span className={`inline-flex overflow-hidden pb-[0.1em] -mb-[0.1em] ${className ?? ""}`} aria-hidden="true">
    {word.split("").map((ch, i) => (
      <motion.span
        key={i}
        className="inline-block"
        initial={{ y: "105%", rotate: 8 }}
        animate={{ y: "0%", rotate: 0 }}
        transition={{ duration: 1.1, delay: delay + i * 0.045, ease }}
      >
        {ch}
      </motion.span>
    ))}
  </span>
);

export const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const time = useClock("Asia/Kolkata");
  const reduce = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, []);

  // Glow that drifts toward the pointer
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.4);
  const gx = useSpring(useTransform(mx, (v) => `${v * 100}%`), { stiffness: 40, damping: 20 });
  const gy = useSpring(useTransform(my, (v) => `${v * 100}%`), { stiffness: 40, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  // Content gently recedes as the hero scrolls away
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <section
      id="hero"
      ref={ref}
      onMouseMove={onMove}
      className="relative min-h-[100svh] flex flex-col overflow-hidden"
    >
      {/* Backdrop: grid + cursor-following glow */}
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden="true" />
      <motion.div
        aria-hidden="true"
        className="absolute w-[60vmax] h-[60vmax] rounded-full pointer-events-none blur-3xl opacity-40 dark:opacity-30"
        style={{
          left: gx,
          top: gy,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, var(--accent) 0%, transparent 60%)",
        }}
      />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="relative z-10 flex-1 flex flex-col max-w-7xl w-full mx-auto px-5 md:px-10 pt-28 md:pt-32 pb-10"
      >
        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.18em] text-muted"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-elev/60 backdrop-blur px-3 py-1.5 normal-case tracking-normal text-sm font-sans text-fg-soft">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-emerald-500 animate-[ping-soft_2s_ease-out_infinite]" />
              <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
            </span>
            Engineering Intern @ Eightfold AI
          </span>
          <span className="hidden sm:inline">
            {resumeData.location} — <span className="tabular-nums text-fg">{time ?? "--:--:--"}</span> IST
          </span>
        </motion.div>

        {/* Name */}
        <div className="flex-1 flex flex-col justify-center py-12">
          <h1 className="font-sans font-semibold tracking-[-0.055em] leading-[0.85] text-[clamp(4.5rem,21vw,15rem)]">
            <span className="sr-only">{resumeData.name}</span>
            <span className="block">
              <AnimatedWord word="Meet" delay={0.3} />
            </span>
            <span className="block md:pl-[12vw]">
              <AnimatedWord word="Thakur" delay={0.5} className="font-serif italic font-normal tracking-[-0.03em]" />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15, delay: 1.1 }}
                className="inline-block font-serif text-accent"
                aria-hidden="true"
              >
                .
              </motion.span>
            </span>
          </h1>

          <div className="mt-10 md:mt-14 grid md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1, ease }}
              className="max-w-xl text-xl md:text-2xl leading-snug text-fg-soft tracking-tight"
            >
              Software engineer who ships{" "}
              <span className="relative inline-flex h-[1.3em] items-end overflow-hidden align-bottom">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={roles[roleIndex]}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.6, ease }}
                    className="font-serif italic text-[1.2em] leading-none text-fg whitespace-nowrap"
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <br />
              — from tools used by thousands to production AI at Eightfold.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.15, ease }}
              className="flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 h-12 pl-6 pr-2 rounded-full bg-fg text-bg font-medium"
                >
                  View my work
                  <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="/resume.pdf"
                  download="Meet_Thakur_Resume.pdf"
                  className="group inline-flex items-center gap-2 h-12 px-6 rounded-full border border-line-strong font-medium hover:bg-fg hover:text-bg transition-colors duration-300"
                >
                  <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                  Resume
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </div>

        {/* Highlights strip */}
        <motion.ul
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.08, delayChildren: 1.3 }}
          className="grid grid-cols-2 md:grid-cols-4 border-t border-line"
        >
          {highlights.map((h) => (
            <motion.li
              key={h.label}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }}
              className="pt-5 pr-4 pb-1"
            >
              <div className="text-2xl md:text-3xl font-semibold tracking-tight">{h.value}</div>
              <div className="text-sm text-muted mt-1">{h.label}</div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

    </section>
  );
};
