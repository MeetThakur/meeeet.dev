"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { resumeData } from "../data/resumeData";
import { Reveal, SectionLabel, SplitReveal, ease } from "./ui/motion";

export const ExperienceSection = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.75", "end 0.6"] });
  const line = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section id="experience" className="relative py-28 md:py-40 px-5 md:px-10 max-w-7xl mx-auto">
      <SectionLabel index="02">Experience</SectionLabel>

      <h2 className="mt-10 text-5xl md:text-7xl font-semibold tracking-[-0.04em] leading-[0.95]">
        <SplitReveal text="Where I've" />
        <br />
        <SplitReveal text="been building" delay={0.1} className="font-serif italic font-normal tracking-tight" />
      </h2>

      {/* Roles, with a progress line that draws as you scroll */}
      <div ref={listRef} className="relative mt-16 md:mt-24">
        <div className="absolute left-0 md:left-[calc(25%-1px)] top-0 bottom-0 w-px bg-line" aria-hidden="true" />
        <motion.div
          className="absolute left-0 md:left-[calc(25%-1px)] top-0 bottom-0 w-px bg-accent origin-top"
          style={{ scaleY: line }}
          aria-hidden="true"
        />

        {resumeData.experience.map((exp, i) => (
          <motion.article
            key={exp.company}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: i * 0.05, ease }}
            className="group relative grid md:grid-cols-4 gap-4 md:gap-12 pl-8 md:pl-0 pb-16 last:pb-0"
          >
            {/* Node on the line */}
            <span
              className={`absolute left-0 md:left-1/4 top-2 -translate-x-1/2 w-3 h-3 rounded-full border-2 ${
                exp.isCurrent ? "bg-accent border-accent" : "bg-bg border-line-strong group-hover:border-accent"
              } transition-colors`}
              aria-hidden="true"
            >
              {exp.isCurrent && <span className="absolute inset-0 rounded-full bg-accent animate-[ping-soft_2s_ease-out_infinite]" />}
            </span>

            <div className="md:pr-12 md:text-right">
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{exp.duration}</div>
              <div className="text-sm text-muted mt-1">{exp.location}</div>
            </div>

            <div className="md:col-span-3 md:pl-4">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{exp.role}</h3>
                {exp.isCurrent && (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-accent-soft text-accent">
                    Now
                  </span>
                )}
              </div>
              <div className="mt-1 text-lg font-serif italic text-fg-soft">{exp.company}</div>
              <ul className="mt-5 max-w-2xl space-y-3">
                {exp.highlights.map((point) => (
                  <li key={point} className="flex gap-3 text-fg-soft leading-relaxed">
                    <span className="mt-[0.7em] w-1 h-1 rounded-full bg-muted shrink-0" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              <ul className="mt-5 flex flex-wrap gap-2">
                {exp.techStack.map((tech) => (
                  <li key={tech} className="px-3 py-1 rounded-full border border-line text-xs text-fg-soft">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Education + recognition */}
      <div className="mt-24 md:mt-32 grid md:grid-cols-2 gap-4">
        <Reveal className="rounded-3xl border border-line p-7 md:p-9">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted mb-6">Education</div>
          <ul className="divide-y divide-line">
            {resumeData.education.map((ed) => (
              <li key={ed.degree} className="py-4 first:pt-0 last:pb-0 flex justify-between gap-6">
                <div>
                  <div className="font-medium">{ed.degree}</div>
                  <div className="text-sm text-muted mt-0.5">{ed.institution}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm tabular-nums">{ed.duration}</div>
                  <div className="text-xs text-accent mt-0.5">{ed.score.replace(/^.*?:\s*/, "")}</div>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="rounded-3xl border border-line p-7 md:p-9">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted mb-6">Recognition</div>
          <ul className="space-y-4">
            {[...resumeData.coCurricular, ...resumeData.certifications].map((item) => (
              <li key={item} className="flex gap-4 text-fg-soft leading-relaxed">
                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};
