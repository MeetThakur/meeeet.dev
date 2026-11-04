"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Flame, Trophy } from "lucide-react";
import { resumeData } from "../data/resumeData";
import { DEFAULT_STATS, type Stats } from "../data/defaultStats";
import { BrandIcon, type Brand } from "./Icons";
import { CountUp, Reveal, ScrollText, SectionLabel, SplitReveal, ease, useSpotlight } from "./ui/motion";

// Words prefixed with * render in the accent serif
const statement =
  "I'm a CS undergrad who likes turning messy problems into *calm, *reliable software. At Eightfold AI I build LLM-powered systems — ticket routing across 42 engineering teams, a secure Slack HR assistant — and the data pipelines underneath them. Off the clock I ship my own products, and I train on *algorithms because sharp problem solving makes everything else easier.";

const langColors = ["bg-accent", "bg-fg", "bg-muted", "bg-line-strong", "bg-fg-soft"];

const StatCard = ({
  href,
  icon,
  label,
  badge,
  className,
  delay = 0,
  children,
}: {
  href?: string;
  icon: Brand | "trophy";
  label: string;
  badge?: ReactNode;
  className?: string;
  delay?: number;
  children: ReactNode;
}) => {
  const onMove = useSpotlight();
  return (
    <motion.a
      {...(href ? { href, target: "_blank", rel: "noreferrer" } : {})}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease }}
      className={`spotlight group rounded-3xl p-6 md:p-7 flex flex-col ${className ?? ""}`}
    >
      <div className="flex items-center justify-between gap-3 mb-6">
        <span className="flex items-center gap-2.5 text-sm font-medium text-fg-soft">
          {icon === "trophy" ? <Trophy className="w-[18px] h-[18px]" /> : <BrandIcon name={icon} className="w-[18px] h-[18px]" />}
          {label}
        </span>
        <span className="flex items-center gap-2">
          {badge}
          {href && <span className="w-7 h-7 rounded-full border border-line flex items-center justify-center text-muted group-hover:text-accent group-hover:border-accent group-hover:rotate-45 transition-all duration-500">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>}
        </span>
      </div>
      {children}
    </motion.a>
  );
};

const Badge = ({ children }: { children: ReactNode }) => (
  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-accent-soft text-accent">
    {children}
  </span>
);

const Skeleton = () => <span className="inline-block w-10 h-[0.8em] rounded bg-line-strong animate-pulse align-middle" aria-label="Loading" />;

export const AboutSection = () => {
  const [stats, setStats] = useState<Stats & { loading: boolean }>({
    ...DEFAULT_STATS,
    loading: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        if (!res.ok) throw new Error("Failed to fetch consolidated stats");
        const data: Partial<Stats> = await res.json();
        setStats({
          github: { ...DEFAULT_STATS.github, ...data.github },
          leetcode: { ...DEFAULT_STATS.leetcode, ...data.leetcode },
          chess: { ...DEFAULT_STATS.chess, ...data.chess },
          duolingo: { ...DEFAULT_STATS.duolingo, ...data.duolingo },
          loading: false,
        });
      } catch (err) {
        console.error("Error fetching consolidated stats:", err);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  const lc = stats.leetcode;
  const difficulty = [
    { name: "Easy", value: lc.easy, color: "bg-emerald-500" },
    { name: "Medium", value: lc.medium, color: "bg-amber-500" },
    { name: "Hard", value: lc.hard, color: "bg-rose-500" },
  ];
  const maxDifficulty = Math.max(...difficulty.map((d) => d.value), 1);

  return (
    <section id="about" className="relative py-28 md:py-40 px-5 md:px-10 max-w-7xl mx-auto">
      <SectionLabel index="01">About</SectionLabel>

      <div className="mt-10 grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
          <SplitReveal text="A little" />
          <br />
          <SplitReveal text="about me" delay={0.12} className="font-serif italic font-normal" />
        </h2>
        <ScrollText
          text={statement}
          className="text-2xl md:text-[2.1rem] leading-[1.3] tracking-tight font-medium"
        />
      </div>

      {/* Live stats bento */}
      <div className="mt-24 md:mt-32 flex items-end justify-between gap-6 mb-8">
        <Reveal>
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
            By the <span className="font-serif italic font-normal">numbers</span>
          </h3>
        </Reveal>
        <Reveal delay={0.1}>
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            <span className={`w-1.5 h-1.5 rounded-full ${stats.loading ? "bg-amber-500 animate-pulse" : "bg-emerald-500"}`} />
            {stats.loading ? "Syncing" : "Live"}
          </span>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {/* LeetCode — the hero tile */}
        <StatCard
          href={resumeData.leetcode}
          icon="leetcode"
          label="LeetCode"
          badge={<Badge>{lc.badge}</Badge>}
          className="md:col-span-3 md:row-span-2 justify-between"
        >
          <div>
            <div className="flex items-baseline gap-3">
              <span className="text-7xl md:text-8xl font-semibold tracking-tighter tabular-nums">
                <CountUp value={lc.solved} />
              </span>
              <span className="text-muted">problems solved</span>
            </div>
            <div className="mt-2 text-muted text-sm">
              Contest rating <span className="text-fg font-medium tabular-nums"><CountUp value={lc.rating} /></span>
            </div>
          </div>

          <div className="mt-10 space-y-4">
            {difficulty.map((d, i) => (
              <div key={d.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-fg-soft">{d.name}</span>
                  <span className="tabular-nums font-medium"><CountUp value={d.value} /></span>
                </div>
                <div className="h-1.5 rounded-full bg-line overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${d.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(d.value / maxDifficulty) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 + i * 0.12, ease }}
                  />
                </div>
              </div>
            ))}
          </div>
        </StatCard>

        {/* GitHub */}
        <StatCard
          href={resumeData.github}
          icon="github"
          label="GitHub"
          delay={0.08}
          className="md:col-span-3"
        >
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Stars", value: stats.github.stars },
              { label: "Repos", value: stats.github.repos },
              { label: "Followers", value: stats.github.followers },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-semibold tracking-tight tabular-nums">
                  {stats.loading ? <Skeleton /> : <CountUp value={s.value} />}
                </div>
                <div className="text-xs text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <div className="h-1.5 w-full rounded-full flex overflow-hidden bg-line gap-0.5">
              {stats.github.languages.map((lang, idx) => (
                <motion.div
                  key={lang.name}
                  className={langColors[idx % langColors.length]}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: idx * 0.12, ease }}
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
              {stats.github.languages.map((lang, idx) => (
                <span key={lang.name} className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${langColors[idx % langColors.length]}`} />
                  {lang.name} <span className="tabular-nums">{lang.percentage}%</span>
                </span>
              ))}
            </div>
          </div>
        </StatCard>

        {/* Competitive programming ranks */}
        <StatCard
          icon="trophy"
          label="Competitive programming"
          delay={0.12}
          className="md:col-span-3"
        >
          <ul className="grid grid-cols-3 gap-4">
            {[
              { title: "Expert", sub: "Codeforces" },
              { title: "Knight", sub: "LeetCode · top 4%" },
              { title: "4★", sub: "CodeChef" },
            ].map((r) => (
              <li key={r.sub}>
                <div className="text-2xl md:text-3xl font-serif italic">{r.title}</div>
                <div className="text-xs text-muted mt-1">{r.sub}</div>
              </li>
            ))}
          </ul>
        </StatCard>

        {/* Chess */}
        <StatCard href={resumeData.chesscom} icon="chess" label="Chess.com" delay={0.05} className="md:col-span-3">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Rapid", value: stats.chess.rating },
              { label: "Peak tactics", value: stats.chess.highestTactics },
              { label: "Games", value: stats.chess.totalGames },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-semibold tracking-tight tabular-nums">
                  {stats.loading ? <Skeleton /> : <CountUp value={s.value} />}
                </div>
                <div className="text-xs text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 text-sm text-muted">
            Win rate <span className="text-fg font-medium tabular-nums">{stats.loading ? <Skeleton /> : `${stats.chess.winRate}%`}</span>
          </div>
        </StatCard>

        {/* Duolingo */}
        <StatCard href={resumeData.duolingo} icon="duolingo" label="Duolingo" delay={0.1} className="md:col-span-3">
          <div className="flex items-center gap-5">
            <motion.div
              className="w-14 h-14 rounded-2xl bg-accent-soft text-accent flex items-center justify-center"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Flame className="w-7 h-7" />
            </motion.div>
            <div>
              <div className="text-4xl font-semibold tracking-tight tabular-nums">
                {stats.loading ? <Skeleton /> : <CountUp value={stats.duolingo.streak} />}
                <span className="text-lg text-muted font-normal ml-2">day streak</span>
              </div>
              <div className="text-sm text-muted mt-1">
                Learning {stats.duolingo.language} ·{" "}
                <span className="tabular-nums">{stats.loading ? <Skeleton /> : <CountUp value={stats.duolingo.xp} />}</span> XP
              </div>
            </div>
          </div>
        </StatCard>
      </div>
    </section>
  );
};
