"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { UnderlineDoodle } from "./DoodleSVGs";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Theme animation state
  const [isAnimatingTheme, setIsAnimatingTheme] = useState(false);
  const [clickCoords, setClickCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "skills", "contact"];
      let current = "hero";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleThemeToggle = (e: React.MouseEvent) => {
    if (isAnimatingTheme) return;
    
    setClickCoords({ x: e.clientX, y: e.clientY });
    setIsAnimatingTheme(true);

    const nextTheme = theme === "dark" ? "light" : "dark";

    setTimeout(() => {
      setTheme(nextTheme);
    }, 400);

    setTimeout(() => {
      setIsAnimatingTheme(false);
    }, 800);
  };

  const navLinks = [
    { name: "Me", href: "#hero", id: "hero" },
    { name: "About", href: "#about", id: "about" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isAnimatingTheme && (
          <motion.div
            initial={{ 
              clipPath: `circle(0px at ${clickCoords.x}px ${clickCoords.y}px)`,
              backgroundColor: theme === "dark" ? "var(--color-desk-light)" : "var(--color-desk-dark)"
            }}
            animate={{ 
              clipPath: `circle(150vw at ${clickCoords.x}px ${clickCoords.y}px)` 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[60] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <nav className="fixed top-0 inset-x-0 z-50 flex justify-center py-4 pointer-events-none">
        <div className="flex items-center gap-1.5 md:gap-4 bg-white/70 dark:bg-black/70 backdrop-blur-md px-3.5 md:px-6 py-2 rounded-full border border-black/10 dark:border-white/10 shadow-sm pointer-events-auto transition-colors">
          
          {/* Stylized M Logo */}
          <div className="flex items-center justify-center w-7 h-7 md:w-9 md:h-9 rounded-full bg-ink-blue/10 dark:bg-neon-pink/10 border border-ink-blue/30 dark:border-neon-pink/30 shadow-sm">
            <span className="font-sketch font-bold text-lg md:text-xl text-ink-blue dark:text-neon-pink transform -rotate-6 ml-0.5 mt-0.5">M</span>
          </div>
          
          <div className="h-4 w-[1px] bg-black/20 dark:bg-white/20 mx-0.5 md:mx-1 hidden md:block" />
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1.5 md:gap-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative font-sketch text-sm sm:text-base md:text-lg px-2 py-1 transition-all ${
                    isActive 
                      ? "text-ink-blue dark:text-neon-pink scale-110" 
                      : "text-ink-dark dark:text-ink-light hover:text-ink-blue dark:hover:text-neon-blue hover:-translate-y-0.5"
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 w-full h-full pointer-events-none opacity-60">
                      <UnderlineDoodle className="w-full h-full text-highlighter-yellow dark:text-neon-yellow" />
                    </div>
                  )}
                </a>
              );
            })}
          </div>

          <div className="h-4 w-[1px] bg-black/20 dark:bg-white/20 mx-0.5 md:mx-1 hidden md:block" />

          {/* Theme Toggle */}
          <button
            onClick={handleThemeToggle}
            className="p-1 md:p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors relative z-[70]"
            aria-label="Toggle Dark Mode"
          >
            {mounted ? (
              theme === "dark" ? (
                <Sun className="w-5 h-5 text-neon-yellow" />
              ) : (
                <Moon className="w-5 h-5 text-ink-blue" />
              )
            ) : (
              <div className="w-5 h-5" />
            )}
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-ink-dark dark:text-ink-light" />
            ) : (
              <Menu className="w-5 h-5 text-ink-dark dark:text-ink-light" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-16 inset-x-0 z-50 flex justify-center pointer-events-none px-4"
          >
            <div className="bg-white/90 dark:bg-black/90 backdrop-blur-lg rounded-2xl border border-black/10 dark:border-white/10 shadow-lg py-4 px-6 flex flex-col gap-1 pointer-events-auto w-full max-w-xs">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={handleNavClick}
                    className={`font-sketch text-xl py-2.5 px-3 rounded-xl transition-all ${
                      isActive
                        ? "text-ink-blue dark:text-neon-pink bg-ink-blue/5 dark:bg-neon-pink/5"
                        : "text-ink-dark dark:text-ink-light hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
