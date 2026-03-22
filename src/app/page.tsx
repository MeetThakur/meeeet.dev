"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "../components/ThemeProvider";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { SkillsSection } from "../components/SkillsSection";
import { ContactSection } from "../components/ContactSection";
import { CursorTrail } from "../components/CursorTrail";

export default function Home() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouch) return;

    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") ||
        target.classList.contains("sticky-note")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {/* Notebook Binding Graphic */}
      <div className="notebook-binding hidden md:block" />
      
      {/* Main Content Area - padded left on desktop for binding */}
      <div className="md:ml-10 min-h-screen relative overflow-hidden">
        
        {/* Custom Marker Cursor */}
        <div 
          className={`hidden md:block fixed pointer-events-none z-[100] transition-transform duration-100 ease-out`}
          style={{ 
            left: `${cursorPos.x}px`, 
            top: `${cursorPos.y}px`,
            transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`
          }}
        >
          {isHovering ? (
            <div className="w-8 h-8 rounded-full border-2 border-dashed border-red-500/50 animate-[spin_4s_linear_infinite]" />
          ) : (
            <div className="w-5 h-5 rounded-full bg-highlighter-yellow/60 dark:bg-neon-pink/40 backdrop-blur-[1px] shadow-sm transform rotate-45" />
          )}
        </div>
        
        <CursorTrail />

        <Navbar />
        
        <main className="flex flex-col gap-12 sm:gap-24 relative z-10 pb-20">
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
    </ThemeProvider>
  );
}
