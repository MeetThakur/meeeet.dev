"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { resumeData } from "../data/resumeData";
import { ease } from "./ui/motion";

const navLinks = [
  { name: "About", id: "about" },
  { name: "Experience", id: "experience" },
  { name: "Work", id: "projects" },
  { name: "Toolkit", id: "skills" },
  { name: "Contact", id: "contact" },
];

type ViewTransitionDoc = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

export const Navbar = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  // Tuck the bar away while scrolling down, bring it back on any upward scroll
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 400 && y > prev && !mobileOpen);
  });

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["hero", ...navLinks.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      cancelAnimationFrame(id);
      observer.disconnect();
    };
  }, []);

  // Lock page scroll behind the full-screen mobile menu
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Circular reveal from the click point using the View Transitions API, with a plain swap as fallback
  const handleThemeToggle = (e: React.MouseEvent) => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const doc = document as ViewTransitionDoc;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!doc.startViewTransition || reduce) {
      setTheme(next);
      return;
    }

    const { clientX: x, clientY: y } = e;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const transition = doc.startViewTransition(() => {
      document.documentElement.classList.toggle("dark", next === "dark");
      flushSync(() => setTheme(next));
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.5, ease }}
        className="fixed top-0 inset-x-0 z-50"
      >
        <div
          className={`transition-[background-color,border-color,backdrop-filter] duration-500 border-b ${
            scrolled || mobileOpen ? "bg-bg/70 backdrop-blur-xl border-line" : "bg-transparent border-transparent"
          }`}
        >
          <nav className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
            <a href="#hero" className="group flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
              <span className="relative w-8 h-8 rounded-full bg-fg text-bg flex items-center justify-center font-serif italic text-lg leading-none overflow-hidden">
                <span className="transition-transform duration-500 group-hover:-translate-y-8">m</span>
                <span className="absolute translate-y-8 transition-transform duration-500 group-hover:translate-y-0 text-accent">t</span>
              </span>
              <span className="hidden sm:block font-medium tracking-tight">{resumeData.name}</span>
            </a>

            {/* Desktop links with a sliding active pill */}
            <ul className="hidden md:flex items-center gap-1 p-1 rounded-full border border-line bg-elev/50 backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      className={`relative block px-4 py-1.5 text-sm rounded-full transition-colors ${
                        isActive ? "text-bg" : "text-muted hover:text-fg"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-fg"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{link.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <button
                onClick={handleThemeToggle}
                className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-fg hover:border-line-strong transition-colors overflow-hidden"
                aria-label={mounted ? `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode` : "Toggle theme"}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mounted && (
                    <motion.span
                      key={resolvedTheme}
                      initial={{ y: 20, rotate: -90, opacity: 0 }}
                      animate={{ y: 0, rotate: 0, opacity: 1 }}
                      exit={{ y: -20, rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                    >
                      {resolvedTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <a
                href="#contact"
                className="hidden md:inline-flex items-center gap-2 h-9 px-4 rounded-full bg-accent text-white text-sm font-medium hover:brightness-110 transition"
              >
                Let&apos;s talk
              </a>

              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="md:hidden w-9 h-9 rounded-full border border-line flex flex-col items-center justify-center gap-1.5"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                <motion.span animate={mobileOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }} className="block w-4 h-px bg-fg" />
                <motion.span animate={mobileOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }} className="block w-4 h-px bg-fg" />
              </button>
            </div>
          </nav>
        </div>

        {/* Reading progress */}
        <motion.div className="h-px bg-accent origin-left" style={{ scaleX: progress }} />
      </motion.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease }}
            className="fixed inset-0 z-40 bg-bg pt-24 px-6 flex flex-col md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <li key={link.id} className="overflow-hidden border-b border-line">
                  <motion.a
                    href={`#${link.id}`}
                    onClick={() => setMobileOpen(false)}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease }}
                    className="flex items-baseline justify-between py-4"
                  >
                    <span className={`text-4xl font-medium tracking-tight ${activeSection === link.id ? "text-accent" : ""}`}>
                      {link.name}
                    </span>
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.a
              href={`mailto:${resumeData.email}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-auto mb-10 font-mono text-sm text-muted"
            >
              {resumeData.email}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
