"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { resumeData } from "../data/resumeData";
import { BrandIcon, type Brand } from "./Icons";
import { useClock } from "./ui/motion";

const socials: { name: string; href: string; icon: Brand }[] = [
  { name: "GitHub", href: resumeData.github, icon: "github" },
  { name: "LinkedIn", href: resumeData.linkedin, icon: "linkedin" },
  { name: "LeetCode", href: resumeData.leetcode, icon: "leetcode" },
  { name: "Codeforces", href: resumeData.codeforces, icon: "codeforces" },
  { name: "CodeChef", href: resumeData.codechef, icon: "codechef" },
  { name: "Chess.com", href: resumeData.chesscom, icon: "chess" },
  { name: "Duolingo", href: resumeData.duolingo, icon: "duolingo" },
];

const links = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Work", href: "#projects" },
  { name: "Toolkit", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export const Footer = () => {
  const ref = useRef<HTMLElement>(null);
  const time = useClock("Asia/Kolkata");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const wordY = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);

  return (
    <footer ref={ref} className="relative border-t border-line overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10 pt-16 md:pt-20 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2">
          <p className="text-2xl md:text-3xl font-medium tracking-tight max-w-sm">
            Thanks for scrolling <span className="font-serif italic font-normal">all the way</span> down.
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            {resumeData.location} · <span className="tabular-nums text-fg">{time ?? "--:--:--"}</span> IST
          </p>
        </div>

        <nav aria-label="Footer">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted mb-4">Sitemap</div>
          <ul className="space-y-2">
            {links.map((l) => (
              <li key={l.name}>
                <a href={l.href} className="link-draw text-fg-soft hover:text-fg transition-colors">
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted mb-4">Elsewhere</div>
          <ul className="space-y-2">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-fg-soft hover:text-fg transition-colors"
                >
                  <BrandIcon name={s.icon} className="w-3.5 h-3.5" />
                  <span className="link-draw">{s.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-10 mt-16 flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted">
        <span>© {new Date().getFullYear()} {resumeData.name}. All rights reserved.</span>
        <span>Designed &amp; built from scratch with Next.js and Framer Motion.</span>
      </div>

      {/* Oversized wordmark rising into view */}
      <motion.div
        style={{ y: wordY }}
        aria-hidden="true"
        className="mt-6 select-none whitespace-nowrap text-center font-semibold tracking-[-0.06em] leading-[0.8] text-outline text-[16.5vw]"
      >
        Meet Thakur
      </motion.div>
    </footer>
  );
};
