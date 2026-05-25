"use client";

import { resumeData } from "../data/resumeData";
import { UnderlineDoodle } from "./DoodleSVGs";
import { motion } from "framer-motion";

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-32 px-4 md:px-20 max-w-4xl mx-auto overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-24 relative inline-block mx-auto left-1/2 -translate-x-1/2 group z-10"
      >
        <h2 className="font-serif font-medium text-5xl md:text-7xl text-ink-dark dark:text-[#EBE5D9] transition-transform group-hover:scale-105 duration-300">
          Skills
        </h2>
        <div className="absolute -bottom-4 w-[110%] -left-[5%] rotate-[-1deg] opacity-70 group-hover:opacity-100 transition-opacity">
          <UnderlineDoodle className="text-black/10 dark:text-white/10 stroke-draw animate-draw" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {resumeData.skills.map((skillGroup, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
            className="group/section relative p-6 md:p-8 rounded-3xl bg-white/50 dark:bg-black/20 border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            {/* Category Title */}
            <div className="mb-6 relative">
              <span className="absolute -top-4 -left-2 font-sketch text-4xl text-slate-400 dark:text-slate-500 opacity-20 group-hover/section:opacity-40 transition-opacity">0{i + 1}</span>
              <h3 className="font-sans font-black text-2xl text-ink-dark dark:text-ink-light tracking-tight pb-2 inline-block relative z-10">
                {skillGroup.category}
                <span className="absolute bottom-0 left-0 w-full h-1 bg-highlighter-pink/30 dark:bg-neon-pink/30 scale-x-0 group-hover/section:scale-x-100 transition-transform origin-left duration-300 rounded-full"></span>
              </h3>
            </div>
            
            {/* Skill Tags Cloud */}
            <div className="flex flex-wrap gap-2 md:gap-3 relative z-10">
              {skillGroup.items.map((item, j) => (
                <span 
                  key={j} 
                  className="px-4 py-2 font-sans font-medium text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-highlighter-yellow dark:hover:border-neon-pink hover:bg-highlighter-yellow/20 dark:hover:bg-neon-pink/10 rounded-xl cursor-default transform transition-all duration-300 hover:scale-105 hover:-rotate-2 hover:shadow-md"
                  style={{ animationDelay: `${j * 50}ms` }}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
