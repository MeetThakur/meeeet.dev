"use client";

import { resumeData } from "../data/resumeData";
import { useEffect, useState } from "react";
import { StarDoodle, ArrowDoodle, CircleDoodle, AsteriskDoodle } from "./DoodleSVGs";

export const HeroSection = () => {
  // Looping Typewriter effect for roles
  const roles = ["Software Developer", "Competitive Programmer", "Problem Solver"];
  const [typedRole, setTypedRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      if (typedRole.length > 0) {
        timeout = setTimeout(() => setTypedRole(currentRole.substring(0, typedRole.length - 1)), 50);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    } else {
      if (typedRole.length < currentRole.length) {
        timeout = setTimeout(() => setTypedRole(currentRole.substring(0, typedRole.length + 1)), 100);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    }

    return () => clearTimeout(timeout);
  }, [typedRole, isDeleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative py-16 md:py-24 px-4 md:px-20 overflow-hidden"
    >
      {/* Subtle Background Doodles — static rotations, no continuous animations */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[10%] opacity-15 dark:opacity-20 animate-float" style={{ animationDelay: '0s' }}>
          <StarDoodle className="w-16 h-16 text-highlighter-pink dark:text-neon-pink rotate-12" />
        </div>
        <div className="absolute top-[20%] right-[15%] opacity-10 dark:opacity-15 animate-float" style={{ animationDelay: '1.5s' }}>
          <CircleDoodle className="w-24 h-24 text-highlighter-blue dark:text-neon-blue -rotate-6" />
        </div>
        <div className="absolute bottom-[25%] left-[15%] opacity-15 dark:opacity-20 animate-float" style={{ animationDelay: '2s' }}>
          <AsteriskDoodle className="w-12 h-12 text-highlighter-orange dark:text-neon-orange rotate-45" />
        </div>
        <div className="absolute bottom-[20%] right-[20%] opacity-10 dark:opacity-15 animate-float" style={{ animationDelay: '0.8s' }}>
          <StarDoodle className="w-20 h-20 text-highlighter-green dark:text-neon-green -rotate-12" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
        
        {/* Playful Scrapbook Greeting */}
        <div className="relative font-sketch text-2xl sm:text-3xl md:text-4xl text-highlighter-pink dark:text-neon-pink transform -rotate-2 mb-2 animate-[slideUp_0.8s_ease-out_0s_both]">
          Hello, I'm
          <ArrowDoodle className="hidden md:block absolute -right-16 -top-4 w-10 h-10 rotate-[70deg] text-highlighter-blue/80 dark:text-neon-blue stroke-draw animate-draw" style={{ animationDelay: '1s' }} />
        </div>
        
        {/* Name - Original Bold Sans typography */}
        <h1 className="font-sans font-black text-5xl sm:text-7xl md:text-8xl tracking-tighter text-ink-dark dark:text-ink-light mb-4 relative drop-shadow-sm animate-[slideUp_0.8s_ease-out_0.2s_both]">
          {resumeData.name}
        </h1>

        {/* Typing Role - With Scrapbook Highlighter */}
        <div className="relative inline-block mb-8 transform rotate-1 group animate-[slideUp_0.8s_ease-out_0.4s_both]">
          <span 
            className="highlight-text font-sketch text-2xl sm:text-3xl md:text-4xl text-black dark:text-white px-3 py-1 transition-transform group-hover:scale-105 inline-block"
            style={{ '--highlight-color': 'var(--color-highlighter-yellow)' } as React.CSSProperties}
          >
            {typedRole}
            <span className="inline-block w-[3px] h-[1em] bg-black/50 dark:bg-white/50 ml-1 animate-pulse align-middle"></span>
          </span>
          <div className="absolute -top-8 -right-8 opacity-0 group-hover:opacity-100 transition-opacity">
             <CircleDoodle className="w-14 h-14 text-highlighter-orange/60 dark:text-neon-orange stroke-draw animate-draw" />
          </div>
        </div>

        {/* Minimal Bio */}
        <p className="font-sans text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mix-blend-multiply dark:mix-blend-screen bg-white/40 dark:bg-black/20 p-6 rounded-2xl border border-black/5 dark:border-white/5 animate-[slideUp_0.8s_ease-out_0.6s_both]">
          Full-stack developer. I design and build clean, functional applications.
        </p>
        
        {/* Action Buttons - Minimal but themed */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 w-full animate-[slideUp_0.8s_ease-out_0.8s_both]">
          
          <a href="#projects" className="group relative px-8 py-3 font-sans font-bold text-lg text-ink-dark dark:text-ink-dark bg-highlighter-green dark:bg-neon-green hover:bg-emerald-400 border-2 border-ink-dark dark:border-ink-dark rounded-full shadow-[4px_4px_0px_rgba(28,28,26,1)] hover:shadow-[2px_2px_0px_rgba(28,28,26,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2">
            View My Work 
            <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
          </a>

          <a href="#contact" className="px-8 py-3 border-2 border-ink-dark dark:border-ink-light text-ink-dark dark:text-ink-light rounded-full font-sans font-bold text-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            Get In Touch
          </a>

          <a href="/resume.pdf" download="Meet_Thakur_Resume.pdf" className="group flex items-center gap-2 px-8 py-3 border-2 border-ink-dark dark:border-ink-light text-ink-dark dark:text-ink-light rounded-full font-sans font-bold text-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Resume
          </a>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </section>
  );
};
