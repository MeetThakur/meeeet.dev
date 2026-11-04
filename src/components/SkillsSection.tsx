"use client";

import { motion } from "framer-motion";
import { resumeData } from "../data/resumeData";
import { SectionLabel, SplitReveal, ease } from "./ui/motion";

export const SkillsSection = () => {
  return (
    <section id="skills" className="relative py-28 md:py-40 px-5 md:px-10 max-w-7xl mx-auto">
      <SectionLabel index="05">Toolkit</SectionLabel>

      <h2 className="mt-10 text-5xl md:text-7xl font-semibold tracking-[-0.04em] leading-[0.95]">
        <SplitReveal text="What I" />
        <br />
        <SplitReveal text="work with" delay={0.1} className="font-serif italic font-normal tracking-tight" />
      </h2>

      {/* Editorial rows: a wash of accent sweeps in behind each row on hover */}
      <ul className="mt-16 md:mt-24 border-t border-line">
        {resumeData.skills.map((group, i) => (
          <motion.li
            key={group.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: i * 0.06, ease }}
            className="group relative border-b border-line overflow-hidden"
          >
            <span
              className="absolute inset-0 bg-accent-soft origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              aria-hidden="true"
            />
            <div className="relative grid md:grid-cols-[auto_1fr_2fr] gap-4 md:gap-10 items-baseline py-8 md:py-10 md:px-4">
              <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-3xl md:text-4xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-2">
                {group.category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item, j) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + j * 0.03, ease }}
                    className="px-3.5 py-1.5 rounded-full border border-line bg-bg/60 text-sm text-fg-soft hover:text-fg hover:border-accent transition-colors"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
};
