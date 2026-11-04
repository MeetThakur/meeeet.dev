"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Shared easing — a long, soft "expo out" used for every reveal on the site
export const ease = [0.22, 1, 0.36, 1] as const;

/* Fades and lifts its children into place the first time they scroll into view */
export const Reveal = ({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, delay, ease }}
    className={className}
  >
    {children}
  </motion.div>
);

/* Slides each word up from behind a mask, one after another */
export const SplitReveal = ({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  inView = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  inView?: boolean;
}) => {
  const words = text.split(" ");
  const trigger = inView
    ? { whileInView: "show", viewport: { once: true, margin: "-60px" } }
    : { animate: "show" };

  return (
    <motion.span
      className={className}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]" aria-hidden="true">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%", transition: { duration: 0.9, ease } },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

/* Counts from 0 up to `value` once visible; re-animates if the value later changes (live stats) */
export const CountUp = ({
  value,
  duration = 1.6,
  format = (n: number) => Math.round(n).toLocaleString(),
}: {
  value: number;
  duration?: number;
  format?: (n: number) => string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const from = useRef(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;
    if (reduce) {
      node.textContent = format(value);
      return;
    }
    const controls = animate(from.current, value, {
      duration,
      ease,
      onUpdate: (v) => {
        node.textContent = format(v);
      },
    });
    from.current = value;
    return () => controls.stop();
    // `format` is intentionally excluded: callers pass inline functions
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, duration, reduce]);

  return <span ref={ref}>{format(0)}</span>;
};

/* Pulls its child toward the cursor while hovered, then springs back */
export const Magnetic = ({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className ?? "inline-block"}
    >
      {children}
    </motion.div>
  );
};

/* Tracks the cursor inside a `.spotlight` card so its border glow follows the pointer */
export const useSpotlight = () => (e: React.MouseEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
};

/* Paragraph whose words brighten one by one as it scrolls through the viewport */
export const ScrollText = ({ text, className }: { text: string; className?: string }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <ScrollWord key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </ScrollWord>
      ))}
    </p>
  );
};

const ScrollWord = ({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const reduce = useReducedMotion();
  const accent = children.startsWith("*");
  const word = accent ? children.slice(1) : children;

  return (
    <motion.span
      style={{ opacity: reduce ? 1 : opacity }}
      className={accent ? "font-serif italic text-accent" : undefined}
    >
      {word}{" "}
    </motion.span>
  );
};

/* Live clock for a fixed IANA time zone, rendered only after mount to avoid hydration drift */
export const useClock = (timeZone: string) => {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone]);
  return now;
};

/* Small mono section label, e.g. "01 — About" */
export const SectionLabel = ({ index, children }: { index: string; children: ReactNode }) => (
  <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
    <span className="text-accent">{index}</span>
    <span className="h-px w-10 bg-line-strong" />
    <span>{children}</span>
  </div>
);
