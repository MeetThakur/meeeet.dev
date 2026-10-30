"use client";

import { resumeData } from "../data/resumeData";
import { motion } from "framer-motion";

// Static class maps so Tailwind can see every class name
const accents: Record<string, { bar: string; tape: string; chip: string; index: string }> = {
  pink: {
    bar: "bg-pink-400 dark:bg-pink-500/80",
    tape: "!bg-pink-400/40 dark:!bg-pink-500/20",
    chip: "bg-pink-100 text-pink-900 border-pink-200 dark:bg-pink-500/10 dark:text-pink-200 dark:border-pink-500/20",
    index: "text-pink-500/70 dark:text-pink-400/60",
  },
  yellow: {
    bar: "bg-yellow-400 dark:bg-yellow-500/80",
    tape: "!bg-yellow-400/40 dark:!bg-yellow-500/20",
    chip: "bg-yellow-100 text-yellow-900 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-200 dark:border-yellow-500/20",
    index: "text-yellow-600/70 dark:text-yellow-400/60",
  },
  blue: {
    bar: "bg-sky-400 dark:bg-sky-500/80",
    tape: "!bg-sky-400/40 dark:!bg-sky-500/20",
    chip: "bg-sky-100 text-sky-900 border-sky-200 dark:bg-sky-500/10 dark:text-sky-200 dark:border-sky-500/20",
    index: "text-sky-500/70 dark:text-sky-400/60",
  },
};

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-16 md:py-32 px-4 md:px-20 max-w-5xl mx-auto relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-16 relative z-10"
      >
        <h2 className="font-serif font-medium italic text-5xl md:text-7xl mb-4 text-ink-dark dark:text-ink-light">
          Projects.
        </h2>
        <p className="font-sketch text-2xl text-slate-500 dark:text-slate-400">Stuff I&apos;ve built recently</p>
      </motion.div>

      <div className="flex flex-col gap-10 md:gap-14 relative z-10">
        {resumeData.projects.map((project, i) => {
          const accent = accents[project.color] ?? accents.yellow;

          return (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="premium-sticky relative overflow-visible !p-0 bg-white/70 dark:bg-[#1c1c1f] border border-black/5 dark:border-white/10 rounded-md hover:-translate-y-1 hover:shadow-xl"
            >
              <div className={`masking-tape ${accent.tape}`} />
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-md ${accent.bar}`} />

              <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-6 md:gap-10 p-6 pl-8 md:p-10 md:pl-12">
                {/* Left: identity, stack, links */}
                <div className="flex flex-col">
                  <span className={`font-sketch text-3xl leading-none mb-2 ${accent.index}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-sans font-black text-3xl tracking-tight text-ink-dark dark:text-ink-light">
                    {project.title}
                  </h3>
                  <p className="font-sketch text-xl text-slate-600 dark:text-slate-300 mt-1">
                    {project.subtitle}
                  </p>

                  <ul className="flex flex-wrap gap-2 mt-5" aria-label={`${project.title} tech stack`}>
                    {project.techStack.map((tech) => (
                      <li
                        key={tech}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${accent.chip}`}
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink-dark text-white dark:bg-ink-light dark:text-black font-sans font-bold text-sm hover:opacity-90 transition-opacity"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    View on GitHub
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>

                {/* Right: full description, split into readable sentences */}
                <p className="font-sans text-base leading-relaxed text-slate-700 dark:text-slate-300 md:pt-2">
                  {project.description}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};
