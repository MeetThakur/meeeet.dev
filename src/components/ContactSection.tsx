"use client";

import { resumeData } from "../data/resumeData";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-32 px-4 pb-40 max-w-3xl mx-auto relative flex justify-center">
      
      {/* Premium Letter Graphic */}
      <div className="relative w-full max-w-lg bg-paper-light dark:bg-[#1a1a1a] p-10 md:p-14 shadow-lg border border-black/5 dark:border-white/5 transform rotate-1 mt-10 hover:rotate-0 transition-transform duration-500">
        
        {/* Subtle top tape */}
        <div className="masking-tape"></div>

        {/* Realistic Stamp */}
        <div className="absolute top-6 right-6 w-16 h-20 border-2 border-dotted border-red-500/60 dark:border-neon-pink/40 opacity-80 flex flex-col items-center justify-center p-1 rotate-[4deg]">
          <span className="font-sketch text-xs uppercase tracking-[0.2em] text-red-500/80 dark:text-neon-pink/60">POST</span>
          <span className="text-2xl mt-1 opacity-70">✉</span>
          <div className="absolute inset-0 bg-red-500/5 mix-blend-multiply dark:mix-blend-screen"></div>
        </div>

        <h2 className="font-sans font-black text-5xl md:text-7xl mb-8 leading-none tracking-tighter text-ink-dark dark:text-ink-light">
          Let's talk.
        </h2>
        
        <p className="font-sans text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-sm">
          If you are looking for a developer who builds things with care, or just want to say hi, my inbox is open.
        </p>

        <div className="space-y-6 font-sans text-xl font-medium">
          <a 
            href={`mailto:${resumeData.email}`}
            className="group flex items-center gap-4 text-ink-dark dark:text-ink-light hover:text-slate-500 dark:hover:text-slate-300 transition-colors"
          >
            <span className="font-sketch text-3xl text-slate-300 dark:text-slate-600 group-hover:text-highlighter-blue transition-colors">@</span> 
            {resumeData.email}
          </a>
          
          <a 
            href={resumeData.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 text-ink-dark dark:text-ink-light hover:text-slate-500 dark:hover:text-slate-300 transition-colors"
          >
            <span className="font-sketch text-3xl text-slate-300 dark:text-slate-600 group-hover:text-highlighter-blue transition-colors">in</span> 
            LinkedIn
          </a>
          
          <a 
            href={resumeData.github}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 text-ink-dark dark:text-ink-light hover:text-slate-500 dark:hover:text-slate-300 transition-colors"
          >
            <span className="font-sketch text-3xl text-slate-300 dark:text-slate-600 group-hover:text-highlighter-blue transition-colors">/</span> 
            GitHub
          </a>
        </div>

        <div className="mt-16 pt-8 border-t border-dashed border-slate-200 dark:border-slate-800 text-right">
          <span className="font-handwritten text-4xl text-ink-dark dark:text-ink-light opacity-90 transform -rotate-2 inline-block">
            {resumeData.name}
          </span>
        </div>
      </div>
    </section>
  );
};
