"use client";

import { useState } from "react";
import { resumeData } from "../data/resumeData";
import { motion, AnimatePresence } from "framer-motion";

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<typeof resumeData.projects[0] | null>(null);

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
    <section id="projects" className="py-32 px-4 md:px-20 max-w-7xl mx-auto relative overflow-hidden">
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
        <p className="font-sketch text-2xl text-slate-500 dark:text-slate-400">Stuff I've built recently</p>
      </motion.div>

      {/* Grid of Colorful Premium Sticky Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-12 md:gap-y-16 relative z-10">
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
              transition={{ duration: 0.5, delay: i * 0.1, type: "spring", bounce: 0.4 }}
              onClick={() => setSelectedProject(project)}
              className={`premium-sticky cursor-pointer ${rotClass} ${colorClass.border} bg-gradient-to-br ${colorClass.bg} hover:scale-105 hover:z-30 hover:shadow-2xl transition-all duration-300 z-20 group`}
            >
              {/* Washi Tape */}
              <div className={`masking-tape ${colorClass.tape}`}></div>

              <div className="font-sans font-black text-2xl mb-1 tracking-tight mt-2 text-ink-dark dark:text-ink-light">{project.title}</div>
              <div className="font-sketch text-lg text-slate-600 dark:text-slate-300 mb-4 border-b border-black/10 dark:border-white/10 pb-2">
                {project.subtitle}
              </div>
              
              <p className="font-sans text-sm leading-relaxed mb-6 font-medium text-slate-700 dark:text-slate-200 h-24 overflow-hidden relative">
                {project.description}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/80 dark:from-black/80 to-transparent"></div>
              </p>

              <div className="flex flex-wrap gap-2 mb-8 pointer-events-none">
                {project.techStack.map((tech, j) => (
                  <span 
                    key={j} 
                    className="text-xs font-bold px-2 py-1 bg-black/10 dark:bg-black/30 rounded-sm text-ink-dark dark:text-ink-light backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="absolute bottom-4 right-6">
                <span className="font-sketch text-xl text-ink-dark dark:text-ink-light hover:text-black dark:hover:text-white transition-colors uppercase tracking-wider group-hover:underline decoration-wavy">
                  View Details ↗
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Deep Dive Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, rotate: -2 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.9, y: 50, rotate: 2 }}
              transition={{ type: "spring", bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-paper-light dark:bg-paper-dark p-8 md:p-12 shadow-2xl border border-black/10 dark:border-white/10 max-h-[90vh] overflow-y-auto custom-scrollbar"
              style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E\")"
              }}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-ink-dark dark:text-ink-light font-sketch text-2xl"
              >
                ✕
              </button>

              <h3 className="font-serif font-black italic text-3xl md:text-5xl mb-2 text-ink-dark dark:text-ink-light">
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
      </AnimatePresence>
    </section>
  );
};
