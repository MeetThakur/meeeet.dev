"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Flame, Trophy } from "lucide-react";
import { resumeData } from "../data/resumeData";
import { DEFAULT_STATS, type Stats } from "../data/defaultStats";
import { BrandIcon, type Brand } from "./Icons";
import { CountUp, SectionLabel, SplitReveal, ease, useSpotlight } from "./ui/motion";

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
  // Cards without their own link render as a div so they can hold links inside
  const Card = href ? motion.a : motion.div;
  return (
    <Card
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
    </Card>
  );
};

const Badge = ({ children }: { children: ReactNode }) => (
  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-accent-soft text-accent">
    {children}
  </span>
);

const Skeleton = () => <span className="inline-block w-10 h-[0.8em] rounded bg-line-strong animate-pulse align-middle" aria-label="Loading" />;

// Codeforces rating bands, used to show progress toward the next title
const cfTiers = [
  { min: 0, name: "Newbie" },
  { min: 1200, name: "Pupil" },
  { min: 1400, name: "Specialist" },
  { min: 1600, name: "Expert" },
  { min: 1900, name: "Candidate Master" },
  { min: 2100, name: "Master" },
  { min: 2300, name: "International Master" },
  { min: 2400, name: "Grandmaster" },
];

const CompetitiveCard = ({ cf, lc, loading }: { cf: Stats["codeforces"]; lc: Stats["leetcode"]; loading: boolean }) => {
  const onMove = useSpotlight();
  const tierIndex = cfTiers.findLastIndex((t) => cf.rating >= t.min);
  const tier = cfTiers[Math.max(tierIndex, 0)];
  const next = cfTiers[tierIndex + 1];
  const progress = next ? (cf.rating - tier.min) / (next.min - tier.min) : 1;

  const ranks: { platform: string; icon: Brand; title: string; detail: string; href: string }[] = [
    { platform: "Codeforces", icon: "codeforces", title: tier.name, detail: `Max ${cf.maxRating}`, href: resumeData.codeforces },
    { platform: "LeetCode", icon: "leetcode", title: lc.badge, detail: `Top 4% · ${lc.rating}`, href: resumeData.leetcode },
    { platform: "CodeChef", icon: "codechef", title: "4★", detail: "Rated contests", href: resumeData.codechef },
  ];

  return (
    <motion.div
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease }}
      className="spotlight md:col-span-12 rounded-3xl overflow-hidden"
    >
      {/* Accent wash + oversized watermark */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_120%_at_0%_0%,var(--accent-soft),transparent_60%)]"
      />
      <span
        aria-hidden="true"
        className="absolute -right-6 -bottom-16 -z-10 font-serif italic text-[14rem] md:text-[20rem] leading-none text-accent/[0.06] select-none"
      >
        {"</>"}
      </span>

      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 p-7 md:p-10">
        {/* Headline rating */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2.5 text-sm font-medium text-fg-soft">
            <Trophy className="w-[18px] h-[18px] text-accent" />
            Competitive programming
          </div>

          <a href={resumeData.codeforces} target="_blank" rel="noreferrer" className="group/cf mt-8 block">
            <div className="flex items-end gap-4 flex-wrap">
              <span className="text-8xl md:text-9xl font-semibold tracking-tighter tabular-nums leading-[0.85]">
                <CountUp value={cf.rating} />
              </span>
              <span className="pb-2">
                <span className="block font-serif italic text-3xl md:text-4xl text-accent leading-none">{tier.name}</span>
                <span className="mt-1.5 inline-flex items-center gap-1 text-sm text-muted group-hover/cf:text-fg transition-colors">
                  Codeforces rating
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/cf:translate-x-0.5 group-hover/cf:-translate-y-0.5" />
                </span>
              </span>
            </div>
          </a>

          {next && (
            <div className="mt-auto pt-10">
              <div className="flex justify-between text-xs font-mono uppercase tracking-[0.15em] text-muted mb-2">
                <span>{tier.name} · {tier.min}</span>
                <span className="text-fg">
                  {loading ? "…" : `${next.min - cf.rating} to ${next.name}`}
                </span>
              </div>
              <div className="h-2 rounded-full bg-line overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(progress, 1) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.3, ease }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Per-platform ranks */}
        <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
          {ranks.map((r, i) => (
            <motion.li
              key={r.platform}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease }}
            >
              <a
                href={r.href}
                target="_blank"
                rel="noreferrer"
                className="group/rank flex items-center gap-4 rounded-2xl border border-line bg-bg/50 backdrop-blur px-5 py-4 hover:border-accent transition-colors"
              >
                <span className="w-10 h-10 rounded-xl bg-fg text-bg flex items-center justify-center shrink-0">
                  <BrandIcon name={r.icon} className="w-[18px] h-[18px]" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-xs text-muted">{r.platform}</span>
                  <span className="block font-serif italic text-2xl leading-tight truncate">{r.title}</span>
                </span>
                <span className="hidden sm:block lg:block text-right text-xs text-muted tabular-nums">{r.detail}</span>
                <ArrowUpRight className="w-4 h-4 text-muted shrink-0 transition-all duration-300 group-hover/rank:text-accent group-hover/rank:rotate-45" />
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export const StatsSection = () => {
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
          codeforces: { ...DEFAULT_STATS.codeforces, ...data.codeforces },
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
    <section id="stats" className="relative py-28 md:py-40 px-5 md:px-10 max-w-7xl mx-auto">
      <div className="flex items-center justify-between gap-6">
        <SectionLabel index="03">By the numbers</SectionLabel>
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <span className={`w-1.5 h-1.5 rounded-full ${stats.loading ? "bg-amber-500 animate-pulse" : "bg-emerald-500"}`} />
          {stats.loading ? "Syncing" : "Live"}
        </span>
      </div>

      <h2 className="mt-10 mb-16 md:mb-20 text-5xl md:text-7xl font-semibold tracking-[-0.04em] leading-[0.95]">
        <SplitReveal text="Measured," />
        <br />
        <SplitReveal text="not claimed" delay={0.1} className="font-serif italic font-normal tracking-tight" />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Competitive programming — featured, full width */}
        <CompetitiveCard cf={stats.codeforces} lc={lc} loading={stats.loading} />

        {/* LeetCode */}
        <StatCard
          href={resumeData.leetcode}
          icon="leetcode"
          label="LeetCode"
          badge={<Badge>{lc.badge}</Badge>}
          className="md:col-span-6"
        >
          <div className="grid grid-cols-[auto_1fr] gap-6 sm:gap-8 items-end">
            <div>
              <div className="text-5xl md:text-6xl font-semibold tracking-tighter tabular-nums leading-none">
                <CountUp value={lc.solved} />
              </div>
              <div className="text-xs text-muted mt-2">problems solved</div>
              <div className="text-xs text-muted mt-3">
                Rating <span className="text-fg font-medium tabular-nums"><CountUp value={lc.rating} /></span>
              </div>
            </div>
            <div className="space-y-2.5">
              {difficulty.map((d, i) => (
                <div key={d.name}>
                  <div className="flex justify-between text-xs mb-1">
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
          </div>
        </StatCard>

        {/* GitHub */}
        <StatCard
          href={resumeData.github}
          icon="github"
          label="GitHub"
          delay={0.08}
          className="md:col-span-6"
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

        {/* Chess */}
        <StatCard href={resumeData.chesscom} icon="chess" label="Chess.com" delay={0.05} className="md:col-span-6">
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
        <StatCard href={resumeData.duolingo} icon="duolingo" label="Duolingo" delay={0.1} className="md:col-span-6">
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
