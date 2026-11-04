"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight, ChartNoAxesColumn, Gamepad2, Sprout, Timer, type LucideIcon } from "lucide-react";
import { resumeData } from "../data/resumeData";
import { BrandIcon } from "./Icons";
import { SectionLabel, SplitReveal } from "./ui/motion";

type Project = (typeof resumeData.projects)[number];

const glyphs: Record<string, LucideIcon> = {
  ConvoMetrics: ChartNoAxesColumn,
  Krono: Timer,
  Playdeck: Gamepad2,
  KhetSetu: Sprout,
};

const hues: Record<string, string> = {
  pink: "#ff4d8d",
  yellow: "#ffb000",
  blue: "#3b82f6",
  green: "#10b981",
};

// Abstract cover art per project: a slow-turning colour field with a tilt that follows the pointer
const ProjectVisual = ({ project, index }: { project: Project; index: number }) => {
  const hue = hues[project.color] ?? "#ff6a33";
  const Glyph = glyphs[project.title] ?? ChartNoAxesColumn;
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 20 });
  const sry = useSpring(ry, { stiffness: 150, damping: 20 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
  };

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      className="relative h-full min-h-[280px] [perspective:1000px]"
    >
      <motion.div
        style={{ rotateX: srx, rotateY: sry }}
        className="relative h-full rounded-[1.5rem] overflow-hidden bg-[#0c0c0b] border border-white/5"
      >
        <motion.div
          aria-hidden="true"
          className="absolute -inset-1/2 opacity-70 blur-3xl"
          style={{
            background: `conic-gradient(from 0deg, ${hue}, transparent 30%, ${hue}88 55%, transparent 75%, ${hue})`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 24 + index * 6, repeat: Infinity, ease: "linear" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse at center, #000 20%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-28 h-28 md:w-36 md:h-36 rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.6 }}
          >
            <Glyph className="w-12 h-12 md:w-16 md:h-16 text-white" strokeWidth={1.5} />
          </motion.div>
        </div>
        <ul className="absolute left-5 right-5 bottom-5 flex flex-wrap gap-2">
          {project.metrics.map((m) => (
            <li key={m} className="px-3 py-1.5 rounded-full text-xs font-medium text-white bg-white/10 backdrop-blur-md border border-white/10">
              {m}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

const ProjectCard = ({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) => {
  const reduce = useReducedMotion();
  // Earlier cards shrink back slightly as later ones slide over them
  const targetScale = 1 - (total - 1 - index) * 0.04;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div
      className="md:[@media(min-height:760px)]:sticky md:[@media(min-height:760px)]:h-[85vh] md:flex md:items-start md:mb-8"
      style={{ top: `calc(6rem + ${index * 1.75}rem)` }}
    >
      <motion.article
        style={reduce ? undefined : { scale }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="group w-full origin-top rounded-[2rem] bg-elev border border-line p-3 md:p-4 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]"
      >
        <div className="grid md:grid-cols-[1.05fr_1fr] gap-6 md:gap-10">
          <div className="flex flex-col p-4 md:p-8">
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.18em] text-muted">
              <span>
                <span className="text-accent">{String(index + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
              </span>
              <span>{project.techStack[0]}</span>
            </div>

            <h3 className="mt-8 text-5xl md:text-6xl font-semibold tracking-[-0.04em]">{project.title}</h3>
            <p className="mt-2 text-xl font-serif italic text-fg-soft">{project.subtitle}</p>

            <p className="mt-6 text-fg-soft leading-relaxed">{project.description}</p>

            <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.title} tech stack`}>
              {project.techStack.map((tech) => (
                <li key={tech} className="px-3 py-1 rounded-full border border-line text-xs text-fg-soft">
                  {tech}
                </li>
              ))}
            </ul>

            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="mt-8 md:mt-auto md:pt-8 self-start inline-flex items-center gap-3 font-medium group/link"
            >
              <span className="w-10 h-10 rounded-full bg-fg text-bg flex items-center justify-center">
                <BrandIcon name="github" className="w-4 h-4" />
              </span>
              <span className="link-draw">View source</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          </div>

          <ProjectVisual project={project} index={index} />
        </div>
      </motion.article>
    </div>
  );
};

export const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const total = resumeData.projects.length;

  return (
    <section id="projects" className="relative py-28 md:py-40 px-5 md:px-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-20">
        <div>
          <SectionLabel index="03">Selected work</SectionLabel>
          <h2 className="mt-10 text-5xl md:text-7xl font-semibold tracking-[-0.04em] leading-[0.95]">
            <SplitReveal text="Things I've" />
            <br />
            <SplitReveal text="built & shipped" delay={0.1} className="font-serif italic font-normal tracking-tight" />
          </h2>
        </div>
        <p className="max-w-sm text-fg-soft leading-relaxed">
          Each one designed, built and deployed end to end — from schema to UI to release.
        </p>
      </div>

      <div ref={containerRef} className="flex flex-col gap-8 md:gap-0">
        {resumeData.projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} total={total} progress={scrollYProgress} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <a
          href={resumeData.github}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 h-12 px-6 rounded-full border border-line-strong font-medium hover:bg-fg hover:text-bg transition-colors duration-300"
        >
          More on GitHub
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
        </a>
      </div>
    </section>
  );
};
