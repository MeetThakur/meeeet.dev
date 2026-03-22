"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, PenTool } from "lucide-react";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const navLinks = [
    { name: "Me", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-center py-4 pointer-events-none">
      <div className="flex items-center gap-2 md:gap-4 bg-white/70 dark:bg-black/70 backdrop-blur-md px-6 py-2 rounded-full border border-black/10 dark:border-white/10 shadow-sm pointer-events-auto transition-colors">
        <PenTool className="w-5 h-5 text-ink-blue dark:text-neon-pink stroke-[1.5]" />
        <div className="h-4 w-[1px] bg-black/20 dark:bg-white/20 mx-1" />
        
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="font-sketch text-lg px-2 py-1 hover:text-ink-blue dark:hover:text-neon-blue hover:-translate-y-0.5 transition-transform"
          >
            {link.name}
          </a>
        ))}

        <div className="h-4 w-[1px] bg-black/20 dark:bg-white/20 mx-1" />

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
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
      </div>
    </nav>
  );
};
