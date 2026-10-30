"use client";

import { resumeData } from "../data/resumeData";
import { UnderlineDoodle } from "./DoodleSVGs";
import { motion } from "framer-motion";

// Static class maps so Tailwind can see every class name
const accents: Record<string, { dot: string; chip: string; rule: string }> = {
  green: {
    dot: "bg-emerald-500",
    chip: "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200",
    rule: "bg-emerald-400/60",
  },
  blue: {
    dot: "bg-sky-500",
    chip: "border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-200",
    rule: "bg-sky-400/60",
  },
  yellow: {
    dot: "bg-amber-500",
    chip: "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200",
    rule: "bg-amber-400/60",
  },
  pink: {
    dot: "bg-pink-500",
    chip: "border-pink-200 bg-pink-50 text-pink-900 dark:border-pink-500/20 dark:bg-pink-500/10 dark:text-pink-200",
    rule: "bg-pink-400/60",
  },
};

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-16 md:py-32 px-4 md:px-20 max-w-5xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 relative inline-block mx-auto left-1/2 -translate-x-1/2 z-10"
      >
        <h2 className="font-serif font-medium text-5xl md:text-7xl text-ink-dark dark:text-[#EBE5D9]">
          Skills
        </h2>
        <div className="absolute -bottom-4 w-[110%] -left-[5%] rotate-[-1deg] opacity-70">
          <UnderlineDoodle className="text-black/10 dark:text-white/10 stroke-draw animate-draw" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {resumeData.skills.map((group, i) => {
          const accent = accents[group.color] ?? accents.blue;

          return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (i % 2) * 0.1, ease: "easeOut" }}
              className="rounded-2xl p-6 md:p-7 bg-white/70 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-1">
                <span className={`w-2.5 h-2.5 rounded-full ${accent.dot}`} aria-hidden="true" />
                <h3 className="font-sans font-extrabold text-xl tracking-tight text-ink-dark dark:text-ink-light">
                  {group.category}
                </h3>
                <span className="ml-auto font-sketch text-lg text-slate-400 dark:text-slate-500">
                  {group.items.length}
                </span>
              </div>
              <div className={`h-0.5 w-12 rounded-full mb-5 ${accent.rule}`} />

              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg border ${accent.chip}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
