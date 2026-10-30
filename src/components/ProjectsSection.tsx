"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { resumeData } from "../data/resumeData";
import { motion, AnimatePresence } from "framer-motion";

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<typeof resumeData.projects[0] | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  // Portal target only exists in the browser; false on the server and during hydration
  const canPortal = useSyncExternalStore(() => () => {}, () => true, () => false);

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", onKeyDown);

    const trigger = lastTriggerRef.current;
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [selectedProject]);

  const openProject = (project: typeof resumeData.projects[0], trigger: HTMLElement) => {
    lastTriggerRef.current = trigger;
    setSelectedProject(project);
  };

  const stickyColors = [
    { 
      border: "border-l-4 border-yellow-400 dark:border-yellow-500/80", 
      tape: "!bg-yellow-400/40 dark:!bg-yellow-500/20",
      bg: "from-yellow-50/80 to-yellow-100/30 dark:from-[#222225] dark:to-[#222225]"
    },
    { 
      border: "border-l-4 border-pink-400 dark:border-pink-500/80", 
      tape: "!bg-pink-400/40 dark:!bg-pink-500/20",
      bg: "from-pink-50/80 to-pink-100/30 dark:from-[#222225] dark:to-[#222225]"
    },
    { 
      border: "border-l-4 border-sky-400 dark:border-sky-500/80", 
      tape: "!bg-sky-400/40 dark:!bg-sky-500/20",
      bg: "from-sky-50/80 to-sky-100/30 dark:from-[#222225] dark:to-[#222225]"
    },
    { 
      border: "border-l-4 border-emerald-400 dark:border-emerald-500/80", 
      tape: "!bg-emerald-400/40 dark:!bg-emerald-500/20",
      bg: "from-emerald-50/80 to-emerald-100/30 dark:from-[#222225] dark:to-[#222225]"
    },
    { 
      border: "border-l-4 border-orange-400 dark:border-orange-500/80", 
      tape: "!bg-orange-400/40 dark:!bg-orange-500/20",
      bg: "from-orange-50/80 to-orange-100/30 dark:from-[#222225] dark:to-[#222225]"
    },
  ];

  return (
    <section id="projects" className="py-16 md:py-32 px-4 md:px-20 max-w-7xl mx-auto relative overflow-hidden">
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

      {/* Grid of Colorful Premium Sticky Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 md:gap-x-12 md:gap-y-16 relative z-10">
        {resumeData.projects.map((project, i) => {
          const rotations = ["rotate-[-2deg]", "rotate-[1deg]", "rotate-[-1deg]", "rotate-[2deg]"];
          const rotClass = rotations[i % rotations.length];
          const colorClass = stickyColors[i % stickyColors.length];
          
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-label={`${project.title}: view details`}
              onClick={(e) => openProject(project, e.currentTarget)}
              onKeyDown={(e) => {
                if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  openProject(project, e.currentTarget);
                }
              }}
              className={`premium-sticky flex flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink-blue dark:focus-visible:outline-neon-pink cursor-pointer ${rotClass} ${colorClass.border} bg-gradient-to-br ${colorClass.bg} hover:scale-[1.02] hover:z-30 hover:shadow-xl transition-all duration-300 z-20 group`}
            >
              {/* Washi Tape */}
              <div className={`masking-tape ${colorClass.tape}`}></div>

              <div className="font-sans font-black text-2xl mb-1 tracking-tight mt-2 text-ink-dark dark:text-ink-light">{project.title}</div>
              <div className="font-sketch text-lg text-slate-600 dark:text-slate-300 mb-4 border-b border-black/10 dark:border-white/10 pb-2">
                {project.subtitle}
              </div>
              
              <p className="font-sans text-sm leading-relaxed mb-5 font-medium text-slate-700 dark:text-slate-200 line-clamp-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6 pointer-events-none">
                {project.techStack.map((tech, j) => (
                  <span 
                    key={j} 
                    className="text-xs font-bold px-2 py-1 bg-black/10 dark:bg-black/30 rounded-sm text-ink-dark dark:text-ink-light"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-end gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-xs font-bold text-ink-dark dark:text-ink-light transition-all hover:scale-105"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
                </a>
                <span className="font-sketch text-xl text-ink-dark dark:text-ink-light group-hover:underline decoration-wavy">
                  Details ↗
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Deep Dive Modal — portalled so it stacks above the navbar */}
      {canPortal && createPortal(
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, rotate: -2 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.9, y: 50, rotate: 2 }}
              transition={{ type: "spring", bounce: 0.3 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-paper-light dark:bg-paper-dark p-8 md:p-12 shadow-2xl border border-black/10 dark:border-white/10 max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              {/* Close Button */}
              <button 
                ref={closeButtonRef}
                aria-label="Close project details"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-ink-dark dark:text-ink-light font-sketch text-2xl"
              >
                ✕
              </button>

              <h3 id="project-dialog-title" className="font-serif font-black italic text-3xl md:text-5xl mb-2 text-ink-dark dark:text-ink-light">
                {selectedProject.title}
              </h3>
              <p className="font-sketch text-xl text-slate-500 mb-6 border-b border-black/10 dark:border-white/10 pb-4">
                {selectedProject.subtitle}
              </p>

              <div className="font-sans text-base leading-relaxed text-slate-700 dark:text-slate-300 space-y-4 mb-8">
                {selectedProject.description.split('\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="mb-8">
                <h4 className="font-sketch text-2xl mb-3 text-ink-dark dark:text-ink-light">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, j) => (
                    <span 
                      key={j} 
                      className="text-sm font-bold px-3 py-1.5 bg-white/50 dark:bg-black/30 border border-black/5 dark:border-white/5 rounded-md text-ink-dark dark:text-ink-light shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <a 
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-ink-dark dark:bg-ink-light text-white dark:text-black rounded-lg font-sans font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  View on GitHub ↗
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </section>
  );
};
