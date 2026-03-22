"use client";

import { resumeData } from "../data/resumeData";
import { UnderlineDoodle } from "./DoodleSVGs";

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-32 px-4 md:px-20 max-w-4xl mx-auto">
      <div className="text-center mb-24 relative inline-block mx-auto left-1/2 -translate-x-1/2 group">
        <h2 className="font-serif font-medium text-5xl md:text-7xl text-ink-dark dark:text-[#EBE5D9] transition-transform group-hover:scale-105 duration-300">
          Skills
        </h2>
        <div className="absolute -bottom-4 w-[110%] -left-[5%] rotate-[-1deg] opacity-70 group-hover:opacity-100 transition-opacity">
          <UnderlineDoodle className="text-black/10 dark:text-white/10 stroke-draw animate-draw" />
        </div>
      </div>

      <div className="flex flex-col gap-20">
        {resumeData.skills.map((skillGroup, i) => (
          <div 
            key={i} 
            className="flex flex-col md:flex-row gap-8 md:gap-16 items-start group/section"
          >
            {/* Left Col: Category Title */}
            <div className="w-full md:w-1/3 flex-shrink-0 relative">
              <span className="absolute -left-6 top-1 font-sketch text-lg text-slate-400 dark:text-slate-500 opacity-50 group-hover/section:opacity-100 transition-opacity">0{i + 1}</span>
              <h3 className="font-sans font-black text-2xl md:text-3xl text-ink-dark dark:text-ink-light tracking-tight border-b-2 border-transparent group-hover/section:border-highlighter-pink/30 dark:group-hover/section:border-neon-pink/30 pb-2 inline-block transition-colors">
                {skillGroup.category}
              </h3>
            </div>
            
            {/* Right Col: Skill Tags Cloud */}
            <div className="w-full md:w-2/3 flex flex-wrap gap-3 relative z-10">
              {skillGroup.items.map((item, j) => (
                <span 
                  key={j} 
                  className="px-5 py-2.5 font-sans font-medium text-sm text-slate-700 dark:text-slate-300 bg-black/5 dark:bg-white/5 hover:bg-highlighter-yellow/30 dark:hover:bg-neon-pink/20 border border-black/5 dark:border-white/10 rounded-full cursor-default transform transition-all duration-300 hover:scale-105 hover:-rotate-2 hover:shadow-md"
                  style={{ animationDelay: `${j * 50}ms` }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
