"use client";

import { resumeData } from "../data/resumeData";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-black/5 dark:border-white/5 py-10 px-4 md:px-20">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Branding */}
        <div className="flex flex-col items-center sm:items-start gap-1">
          <span className="font-sketch text-xl text-ink-dark dark:text-ink-light">
            Meet Thakur
          </span>
          <span className="font-sans text-xs text-slate-400 dark:text-slate-500">
            © {currentYear} — Built with care.
          </span>
        </div>

        {/* Center: Quick Links */}
        <nav className="flex items-center gap-5 font-sketch text-sm text-slate-500 dark:text-slate-400">
          <a href="#hero" className="hover:text-ink-dark dark:hover:text-ink-light transition-colors">Home</a>
          <a href="#about" className="hover:text-ink-dark dark:hover:text-ink-light transition-colors">About</a>
          <a href="#projects" className="hover:text-ink-dark dark:hover:text-ink-light transition-colors">Projects</a>
          <a href="#contact" className="hover:text-ink-dark dark:hover:text-ink-light transition-colors">Contact</a>
        </nav>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <a href={resumeData.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-slate-400 hover:text-ink-dark dark:hover:text-ink-light transition-colors">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href={resumeData.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-ink-dark dark:hover:text-ink-light transition-colors">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href={resumeData.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode" className="text-slate-400 hover:text-ink-dark dark:hover:text-ink-light transition-colors">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.75 9.75a1.375 1.375 0 0 0 0 1.943l1.156 1.157a1.375 1.375 0 0 0 1.943 0L14.75 4.382a1.375 1.375 0 0 0 0-1.943L13.628.562A1.36 1.36 0 0 0 12.83 0zm4.188 5.625a1.37 1.37 0 0 0-.973.402L8.532 14.195a1.375 1.375 0 0 0 0 1.943l1.156 1.156a1.375 1.375 0 0 0 1.943 0l8.167-8.168a1.375 1.375 0 0 0 0-1.943l-1.156-1.156a1.375 1.375 0 0 0-.973-.402zm-6.188 6a1.37 1.37 0 0 0-.973.402L2.35 20.195a1.375 1.375 0 0 0 0 1.943l1.156 1.156a1.375 1.375 0 0 0 1.943 0l8.167-8.168a1.375 1.375 0 0 0 0-1.943l-1.156-1.156a1.375 1.375 0 0 0-.973-.402z"/></svg>
          </a>
          <a href={resumeData.chesscom} target="_blank" rel="noreferrer" aria-label="Chess.com" className="text-slate-400 hover:text-ink-dark dark:hover:text-ink-light transition-colors">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2C10.34 2 9 3.34 9 5c0 1.25.77 2.32 1.85 2.78C10.31 8.8 10 9.87 10 11c0 1.76 1.15 3.26 2.75 3.82C11.53 15.65 10 17.65 10 20v2h4v-2c0-2.35-1.53-4.35-2.75-5.18C12.85 14.26 14 12.76 14 11c0-1.13-.31-2.2-.85-3.22C14.23 7.32 15 6.25 15 5c0-1.66-1.34-3-3-3zM12 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 6c1.1 0 2 1.34 2 3s-.9 3-2 3-2-1.34-2-3 .9-3 2-3z"/></svg>
          </a>
          <a href={resumeData.matiks} target="_blank" rel="noreferrer" aria-label="Matiks" className="text-slate-400 hover:text-ink-dark dark:hover:text-ink-light transition-colors">
            <svg className="w-5 h-5 fill-current font-sans font-bold" viewBox="0 0 24 24"><text x="12" y="19" textAnchor="middle" fontSize="20" fill="currentColor">M</text></svg>
          </a>
          <a href={`mailto:${resumeData.email}`} aria-label="Email" className="text-slate-400 hover:text-ink-dark dark:hover:text-ink-light transition-colors">
            <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
};
