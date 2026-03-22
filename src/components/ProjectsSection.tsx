"use client";

import { resumeData } from "../data/resumeData";

export const ProjectsSection = () => {
  // Define vibrant pastel color palettes for light and dark modes
  const stickyColors = [
    { light: "from-[#ffffaa]/80 to-[#ffff88]", dark: "dark:from-[#4a4a1a] dark:to-[#3a3a10]" }, // Yellow
    { light: "from-[#ffcce6]/80 to-[#ff99cc]", dark: "dark:from-[#4a1a3a] dark:to-[#3a102a]" }, // Pink
    { light: "from-[#ccf2ff]/80 to-[#99e6ff]", dark: "dark:from-[#1a3a4a] dark:to-[#102a3a]" }, // Blue
    { light: "from-[#d9ffcc]/80 to-[#b3ff99]", dark: "dark:from-[#1a4a1a] dark:to-[#103a10]" }, // Green
    { light: "from-[#ffebb3]/80 to-[#ffd666]", dark: "dark:from-[#4a3a1a] dark:to-[#3a2010]" }, // Orange
  ];

  return (
    <section id="projects" className="py-32 px-4 md:px-20 max-w-7xl mx-auto relative">
      <div className="flex flex-col items-center mb-16 relative z-10">
        <h2 className="font-sans font-black text-5xl md:text-7xl mb-4 text-ink-dark dark:text-ink-light">
          Projects.
        </h2>
        <p className="font-sketch text-2xl text-slate-500 dark:text-slate-400">Stuff I've built recently</p>
      </div>

      {/* Grid of Colorful Premium Sticky Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-12 md:gap-y-16">
        {resumeData.projects.map((project, i) => {
          const rotations = ["rotate-[-2deg]", "rotate-[1deg]", "rotate-[-1deg]", "rotate-[2deg]"];
          const rotClass = rotations[i % rotations.length];
          const colorClass = stickyColors[i % stickyColors.length];
          
          return (
            <div
              key={i}
              className={`premium-sticky ${rotClass} bg-gradient-to-br ${colorClass.light} ${colorClass.dark} hover:scale-105 hover:z-30 hover:shadow-2xl transition-all duration-300 z-20 group`}
              style={{ background: 'none' }} // Override the generic CSS gradient
            >
              {/* Realistic Masking Tape */}
              <div className="masking-tape !bg-white/40 dark:!bg-white/10"></div>

              <div className="font-sans font-black text-2xl mb-1 tracking-tight mt-2 text-ink-dark dark:text-ink-light">{project.title}</div>
              <div className="font-sketch text-lg text-slate-600 dark:text-slate-300 mb-4 border-b border-black/10 dark:border-white/10 pb-2">
                {project.subtitle}
              </div>
              
              <p className="font-sans text-sm leading-relaxed mb-6 font-medium text-slate-700 dark:text-slate-200 h-24 overflow-y-auto pr-2 custom-scrollbar">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
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
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="font-sketch text-xl text-ink-dark dark:text-ink-light hover:text-black dark:hover:text-white transition-colors uppercase tracking-wider group-hover:underline decoration-wavy"
                >
                  View Code ↗
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
