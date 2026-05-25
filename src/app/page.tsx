"use client";

import { useEffect, useRef } from "react";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { SkillsSection } from "../components/SkillsSection";
import { ContactSection } from "../components/ContactSection";
import { CursorTrail } from "../components/CursorTrail";

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouch) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Direct DOM manipulation instead of setState — zero React re-renders
    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hovering =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        !!target.closest("a") ||
        !!target.closest("button") ||
        target.classList.contains("sticky-note");

      if (hovering !== isHoveringRef.current) {
        isHoveringRef.current = hovering;
        cursor.style.transform = `translate(-50%, -50%) scale(${hovering ? 1.5 : 1})`;
        // Toggle child visibility
        const dot = cursor.querySelector('[data-cursor="dot"]') as HTMLElement;
        const ring = cursor.querySelector('[data-cursor="ring"]') as HTMLElement;
        if (dot && ring) {
          dot.style.display = hovering ? "none" : "block";
          ring.style.display = hovering ? "block" : "none";
        }
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div className="w-full min-h-screen py-0 md:py-8 px-0 md:px-6 lg:px-12">
      
      {/* Centered Notebook Page */}
      <div className="relative w-full max-w-6xl mx-auto notebook-paper-sheet shadow-2xl md:rounded-2xl border-x-0 md:border border-black/5 dark:border-white/5 overflow-hidden min-h-screen md:min-h-[calc(100vh-4rem)]">
        
        {/* Notebook Binding Graphic */}
        <div className="notebook-binding hidden md:block" />

        {/* Notebook red margin line */}
        <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-red-400/30 dark:bg-red-500/20 hidden md:block" />
        
        {/* Custom Marker Cursor — GPU-accelerated, no React re-renders */}
        <div 
          ref={cursorRef}
          className="hidden md:block fixed pointer-events-none z-[100] will-change-transform"
          style={{ 
            left: '-100px', 
            top: '-100px',
            transform: 'translate(-50%, -50%) scale(1)',
            transition: 'transform 0.15s ease-out'
          }}
        >
          <div data-cursor="dot" className="w-5 h-5 rounded-full bg-highlighter-yellow/60 dark:bg-neon-pink/40 shadow-sm transform rotate-45" />
          <div data-cursor="ring" className="w-8 h-8 rounded-full border-2 border-dashed border-red-500/50 animate-[spin_4s_linear_infinite]" style={{ display: 'none' }} />
        </div>
        
        <CursorTrail />

        <Navbar />
        
        <main className="pl-4 pr-4 md:pl-20 md:pr-12 pt-16 flex flex-col gap-12 sm:gap-24 relative z-10 pb-20">
          <HeroSection />
          
          <div className="w-full flex justify-center py-8">
            <div className="w-3/4 max-w-lg h-px bg-gradient-to-r from-transparent via-black/20 dark:via-white/20 to-transparent" />
          </div>

          <AboutSection />
          <ProjectsSection />
          
          <div className="w-full flex justify-center my-12 relative h-10">
            {/* Wavy divider drawn with SVG */}
            <svg className="absolute w-full h-full text-black/10 dark:text-white/10" preserveAspectRatio="none" viewBox="0 0 1000 40">
              <path d="M0,20 Q100,40 200,20 T400,20 T600,20 T800,20 T1000,20" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>

          <SkillsSection />
          <ContactSection />
        </main>
      </div>
    </div>
  );
}
