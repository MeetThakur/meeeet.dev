"use client";

import { useEffect, useState } from "react";
import { resumeData } from "../data/resumeData";
import { motion } from "framer-motion";

export const AboutSection = () => {
  const [gitHubStats, setGitHubStats] = useState({
    stars: 52,
    repos: 24,
    followers: 15,
    languages: [
      { name: "TypeScript", percentage: 40 },
      { name: "JavaScript", percentage: 30 },
      { name: "Python", percentage: 20 },
      { name: "C++", percentage: 10 },
    ],
    loading: true,
  });

  const [chessStats, setChessStats] = useState({
    rating: 775,
    highestTactics: 1397,
    winRate: 60,
    loading: true,
  });

  const [duoLingoStats, setDuoLingoStats] = useState({
    streak: 316,
    xp: 16559,
    language: "Spanish",
    loading: true,
  });

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const userRes = await fetch("https://api.github.com/users/MeetThakur");
        if (!userRes.ok) throw new Error("Failed to fetch user profile");
        const userData = await userRes.json();

        const reposRes = await fetch("https://api.github.com/users/MeetThakur/repos?per_page=100");
        if (!reposRes.ok) throw new Error("Failed to fetch repos");
        const reposData = await reposRes.json();

        const totalStars = reposData.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0);

        const languagesMap: { [key: string]: number } = {};
        let totalReposWithLanguage = 0;
        reposData.forEach((repo: any) => {
          if (repo.language) {
            languagesMap[repo.language] = (languagesMap[repo.language] || 0) + 1;
            totalReposWithLanguage++;
          }
        });

        const sortedLangs = Object.entries(languagesMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 4);

        const languagesList = sortedLangs.map(([name, count]) => ({
          name,
          percentage: totalReposWithLanguage > 0 ? Math.round((count / totalReposWithLanguage) * 100) : 0,
        }));

        setGitHubStats({
          stars: totalStars || 52,
          repos: userData.public_repos || 24,
          followers: userData.followers || 15,
          languages: languagesList.length > 0 ? languagesList : [
            { name: "TypeScript", percentage: 40 },
            { name: "JavaScript", percentage: 30 },
            { name: "Python", percentage: 20 },
            { name: "C++", percentage: 10 },
          ],
          loading: false,
        });
      } catch (err) {
        console.error("Error fetching GitHub stats:", err);
        setGitHubStats(prev => ({ ...prev, loading: false }));
      }
    };

    const fetchChessStats = async () => {
      try {
        const res = await fetch("https://api.chess.com/pub/player/meet-11/stats");
        if (!res.ok) throw new Error("Failed to fetch Chess.com stats");
        const data = await res.json();
        
        const rapidRating = data.chess_rapid?.last?.rating || 775;
        const highestTactics = data.tactics?.highest?.rating || 1397;
        const record = data.chess_rapid?.record || { win: 125, loss: 74, draw: 8 };
        const totalGames = record.win + record.loss + record.draw;
        const winRate = totalGames > 0 ? Math.round((record.win / totalGames) * 100) : 60;

        setChessStats({
          rating: rapidRating,
          highestTactics,
          winRate,
          loading: false,
        });
      } catch (err) {
        console.error("Error fetching Chess.com stats:", err);
        setChessStats(prev => ({ ...prev, loading: false }));
      }
    };

    const fetchDuoLingoStats = async () => {
      try {
        const res = await fetch("https://www.duolingo.com/2017-06-30/users?username=Meet11_");
        if (!res.ok) throw new Error("Failed to fetch Duolingo stats");
        const data = await res.json();
        
        if (data.users && data.users.length > 0) {
          const user = data.users[0];
          const streak = user.streak || 316;
          const totalXp = user.totalXp || 16559;
          const language = user.courses?.[0]?.title || "Spanish";

          setDuoLingoStats({
            streak,
            xp: totalXp,
            language,
            loading: false,
          });
        } else {
          setDuoLingoStats(prev => ({ ...prev, loading: false }));
        }
      } catch (err) {
        console.error("Error fetching Duolingo stats:", err);
        setDuoLingoStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchGitHubStats();
    fetchChessStats();
    fetchDuoLingoStats();
  }, []);

  return (
    <section id="about" className="py-32 px-4 md:px-20 max-w-6xl mx-auto relative overflow-hidden">
      
      <div className="flex flex-col items-center relative z-10">
        
        {/* Bio Text & Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-3xl relative"
        >
          <h2 className="font-serif font-medium italic text-5xl md:text-7xl mb-8 tracking-tight text-ink-dark dark:text-ink-light">
            About Me.
          </h2>
          
          <div className="relative">
            {/* Hand-drawn quote marker */}
            <span className="absolute -left-8 -top-4 font-sketch text-6xl text-highlighter-pink/50">"</span>
            
            <div className="font-sans text-xl md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed font-light space-y-6">
              <p>
                I'm Meet, a developer who loves building applications for the web and mobile. I focus on writing clean code and creating intuitive, easy-to-use interfaces.
              </p>
              <p>
                I enjoy working on practical projects that solve real problems. Whether I'm building tools from scratch, participating in hackathons, or exploring new technologies, I'm always looking for ways to learn and grow.
              </p>
              <p>
                I also have a strong background in problem-solving. Regular participation in <span className="font-sketch text-3xl mx-1 text-ink-dark dark:text-ink-light">competitive programming</span> helps me stay sharp and think critically about the code I write.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
            {/* Custom LeetCode Card */}
            <motion.div
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative p-6 bg-amber-50/80 dark:bg-amber-950/10 border-2 border-amber-500/20 rounded-2xl shadow-md backdrop-blur-xs flex flex-col justify-between min-h-[220px]"
            >
              {/* Card Tape Detail */}
              <div className="absolute -top-3 left-1/4 -translate-x-1/2 w-16 h-6 bg-highlighter-yellow/30 dark:bg-yellow-500/10 rotate-[-4deg] clip-path-polygon(0% 10%, 100% 0%, 95% 90%, 5% 100%) pointer-events-none" style={{ clipPath: "polygon(0% 15%, 100% 0%, 95% 85%, 3% 100%)" }} />

              <a href={resumeData.leetcode} target="_blank" rel="noreferrer" className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {/* LeetCode Icon Logo */}
                      <svg className="w-6 h-6 text-amber-500 fill-current" viewBox="0 0 24 24">
                        <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.75 9.75a1.375 1.375 0 0 0 0 1.943l1.156 1.157a1.375 1.375 0 0 0 1.943 0L14.75 4.382a1.375 1.375 0 0 0 0-1.943L13.628.562A1.36 1.36 0 0 0 12.83 0zm4.188 5.625a1.37 1.37 0 0 0-.973.402L8.532 14.195a1.375 1.375 0 0 0 0 1.943l1.156 1.156a1.375 1.375 0 0 0 1.943 0l8.167-8.168a1.375 1.375 0 0 0 0-1.943l-1.156-1.156a1.375 1.375 0 0 0-.973-.402zm-6.188 6a1.37 1.37 0 0 0-.973.402L2.35 20.195a1.375 1.375 0 0 0 0 1.943l1.156 1.156a1.375 1.375 0 0 0 1.943 0l8.167-8.168a1.375 1.375 0 0 0 0-1.943l-1.156-1.156a1.375 1.375 0 0 0-.973-.402z" />
                      </svg>
                      <span className="font-sketch text-2xl text-slate-800 dark:text-slate-200">LeetCode Profile</span>
                    </div>
                    {/* Knight Badge */}
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                      ⚔️ Knight
                    </span>
                  </div>

                  <div className="flex gap-4 items-center">
                    {/* SVG Circular Progress */}
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <svg className="w-full h-full transform -rotate-95" viewBox="0 0 36 36">
                        <path
                          className="text-slate-200 dark:text-slate-800"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <motion.path
                          className="text-amber-500"
                          strokeWidth="3.5"
                          strokeDasharray="68, 100"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-lg font-bold leading-none text-slate-800 dark:text-slate-100">812</span>
                        <span className="text-[9px] text-slate-500 dark:text-slate-400">Solved</span>
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="flex-1 space-y-1.5 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" /> Easy
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">245</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-500" /> Medium
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">470</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-rose-500" /> Hard
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">97</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-amber-500/10 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                  <span>Rating: <strong className="text-slate-800 dark:text-slate-200">1920+</strong></span>
                  <span className="flex items-center gap-0.5 text-amber-600 dark:text-amber-400 font-medium">
                    Solve Problems <span className="text-[10px]">↗</span>
                  </span>
                </div>
              </a>
            </motion.div>

            {/* Custom GitHub Card */}
            <motion.div
              whileHover={{ scale: 1.03, rotate: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative p-6 bg-blue-50/80 dark:bg-blue-950/10 border-2 border-blue-500/20 rounded-2xl shadow-md backdrop-blur-xs flex flex-col justify-between min-h-[220px]"
            >
              {/* Card Tape Detail */}
              <div className="absolute -top-3 left-3/4 -translate-x-1/2 w-16 h-6 bg-highlighter-blue/30 dark:bg-blue-500/10 rotate-[3deg] clip-path-polygon(0% 10%, 100% 0%, 95% 90%, 5% 100%) pointer-events-none" style={{ clipPath: "polygon(0% 15%, 100% 0%, 95% 85%, 3% 100%)" }} />

              <a href={resumeData.github} target="_blank" rel="noreferrer" className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {/* GitHub Icon Logo */}
                      <svg className="w-6 h-6 text-blue-500 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span className="font-sketch text-2xl text-slate-800 dark:text-slate-200">GitHub Activity</span>
                    </div>
                    {/* Stars count */}
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30">
                      ⭐ {gitHubStats.loading ? "..." : `${gitHubStats.stars} Stars`}
                    </span>
                  </div>

                  {/* Top Languages Segmented Bar & Grid */}
                  <div className="mb-4">
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-1.5 uppercase tracking-wider font-semibold">Top Languages</p>
                    
                    {/* Segmented Horizontal Bar — animated on scroll */}
                    <div className="h-2 w-full rounded-full flex overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3">
                      {gitHubStats.languages.map((lang, idx) => {
                        const colors = [
                          "bg-blue-500",      // TS
                          "bg-yellow-500",    // JS
                          "bg-sky-400",       // Python
                          "bg-rose-500",      // C++
                          "bg-emerald-500",   // Fallback
                        ];
                        const colorClass = colors[idx % colors.length];
                        return (
                          <motion.div 
                            key={lang.name} 
                            className={colorClass}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${lang.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
                            title={`${lang.name}: ${lang.percentage}%`}
                          />
                        );
                      })}
                    </div>

                    {/* Grid list of languages with color dots */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {gitHubStats.languages.map((lang, idx) => {
                        const colors = [
                          "bg-blue-500",
                          "bg-yellow-500",
                          "bg-sky-400",
                          "bg-rose-500",
                          "bg-emerald-500",
                        ];
                        const dotColorClass = colors[idx % colors.length];
                        return (
                          <div key={lang.name} className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                            <span className={`w-2 h-2 rounded-full ${dotColorClass}`} />
                            <span className="font-medium text-slate-700 dark:text-slate-300">{lang.name}</span>
                            <span className="text-[10px] text-slate-400">({lang.percentage}%)</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-blue-500/10 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex gap-4">
                    <span>Repos: <strong className="text-slate-800 dark:text-slate-200">{gitHubStats.loading ? "..." : gitHubStats.repos}</strong></span>
                    <span>Followers: <strong className="text-slate-800 dark:text-slate-200">{gitHubStats.loading ? "..." : gitHubStats.followers}</strong></span>
                  </div>
                  <span className="flex items-center gap-0.5 text-blue-600 dark:text-blue-400 font-medium">
                    View Activity <span className="text-[10px]">↗</span>
                  </span>
                </div>
              </a>
            </motion.div>

            {/* Custom Chess.com Card */}
            <motion.div
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative p-6 bg-emerald-50/80 dark:bg-emerald-950/10 border-2 border-emerald-500/20 rounded-2xl shadow-md backdrop-blur-xs flex flex-col justify-between min-h-[220px]"
            >
              {/* Card Tape Detail */}
              <div className="absolute -top-3 left-1/4 -translate-x-1/2 w-16 h-6 bg-highlighter-green/30 dark:bg-emerald-500/10 rotate-[-2deg] clip-path-polygon(0% 10%, 100% 0%, 95% 90%, 5% 100%) pointer-events-none" style={{ clipPath: "polygon(0% 15%, 100% 0%, 95% 85%, 3% 100%)" }} />

              <a href={resumeData.chesscom} target="_blank" rel="noreferrer" className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {/* Chess.com Icon Logo */}
                      <svg className="w-6 h-6 text-emerald-500 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2C10.34 2 9 3.34 9 5c0 1.25.77 2.32 1.85 2.78C10.31 8.8 10 9.87 10 11c0 1.76 1.15 3.26 2.75 3.82C11.53 15.65 10 17.65 10 20v2h4v-2c0-2.35-1.53-4.35-2.75-5.18C12.85 14.26 14 12.76 14 11c0-1.13-.31-2.2-.85-3.22C14.23 7.32 15 6.25 15 5c0-1.66-1.34-3-3-3zM12 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 6c1.1 0 2 1.34 2 3s-.9 3-2 3-2-1.34-2-3 .9-3 2-3z" />
                      </svg>
                      <span className="font-sketch text-2xl text-slate-800 dark:text-slate-200">Chess.com Profile</span>
                    </div>
                    {/* Player Badge */}
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                      ♟️ Player
                    </span>
                  </div>

                  <div className="flex gap-4 items-center">
                    {/* SVG Circular Progress showing Tactics rating ratio */}
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <svg className="w-full h-full transform -rotate-95" viewBox="0 0 36 36">
                        <path
                          className="text-slate-200 dark:text-slate-800"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <motion.path
                          className="text-emerald-500"
                          strokeWidth="3.5"
                          strokeDasharray={`${(chessStats.highestTactics / 2000) * 100}, 100`}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-sm font-bold leading-none text-slate-800 dark:text-slate-100">{chessStats.loading ? "..." : chessStats.highestTactics}</span>
                        <span className="text-[9px] text-slate-500 dark:text-slate-400">Tactics</span>
                      </div>
                    </div>

                    {/* Breakdown of Ratings/Win-rate */}
                    <div className="flex-1 space-y-1.5 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">Rapid Rating</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{chessStats.loading ? "..." : chessStats.rating}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">Win Rate</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{chessStats.loading ? "..." : `${chessStats.winRate}%`}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">Games Played</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{chessStats.loading ? "..." : "207"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-500/10 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                  <span>Username: <strong className="text-slate-800 dark:text-slate-200">Meet-11</strong></span>
                  <span className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 font-medium">
                    Play Chess <span className="text-[10px]">↗</span>
                  </span>
                </div>
              </a>
            </motion.div>

            {/* Custom Duolingo Card */}
            <motion.div
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative p-6 bg-lime-50/80 dark:bg-lime-950/10 border-2 border-lime-500/20 rounded-2xl shadow-md backdrop-blur-xs flex flex-col justify-between min-h-[220px]"
            >
              {/* Card Tape Detail */}
              <div className="absolute -top-3 left-1/4 -translate-x-1/2 w-16 h-6 bg-highlighter-green/30 dark:bg-lime-500/10 rotate-[-2deg] clip-path-polygon(0% 10%, 100% 0%, 95% 90%, 5% 100%) pointer-events-none" style={{ clipPath: "polygon(0% 15%, 100% 0%, 95% 85%, 3% 100%)" }} />

              <a href={resumeData.duolingo} target="_blank" rel="noreferrer" className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {/* Duolingo Owl SVG Logo */}
                      <svg className="w-6 h-6 text-lime-600 fill-current" viewBox="0 0 24 24">
                        <path d="M14.484 18.213c1.142 1.033 2.657 1.662 4.316 1.662l.294-.001c1.985-.038 3.749-.976 4.905-2.422v1.98c0 2.522-2.043 4.568-4.567 4.568H4.569C2.045 23.998.002 21.954.002 19.43v-1.92c1.181 1.443 2.976 2.365 4.985 2.365l.35-.001c1.61-.027 3.076-.646 4.191-1.648.555.764 1.456 1.26 2.473 1.26 1.023 0 1.928-.502 2.483-1.273zm-5.349-.996c-.989 1.022-2.375 1.658-3.909 1.658h-.239c-2.229 0-4.146-1.343-4.987-3.262v-7.16c.281-.64.68-1.216 1.169-1.699-.035-.731.132-1.469.511-2.128.256-.44.867-.504 1.21-.124l.766.851c.007-.003.014-.003.021-.005-.098-.78.037-1.587.419-2.308.24-.45.757-.53 1.114-.164 0 0 3.939 3.979 4.035 4.084 1.542 1.348 4.066 1.287 5.686-.18.002-.003.007-.005.009-.007.042-.042 3.855-3.9 3.855-3.9.3361-.3451.8619-.3101 1.113.164.385.724.518 1.535.417 2.32.002.001.003.001.004.002l.007.002c.001 0 .002 0 .003.001l.776-.86c.342-.38.954-.316 1.207.124.387.673.553 1.427.509 2.173.496.501.897 1.099 1.169 1.762v6.941c-.816 1.978-2.761 3.373-5.032 3.373H18.8c-1.547 0-2.945-.648-3.936-1.686a.8386.8386 0 0 0-.009-.067c.313-.017.528-.162.688-.33.152-.16.299-.397.299-.776 0 0-.022-.312-.024-.324.693.767 1.696 1.249 2.811 1.249 2.092 0 3.787-1.696 3.787-3.787v-2.243c0-2.092-1.697-3.787-3.787-3.787-2.093 0-3.787 1.695-3.787 3.787v2.243c0 .266.027.526.079.776-.712-.784-1.744-1.278-2.842-1.278-1.239 0-2.339.523-3.064 1.355.063-.274.097-.56.097-.853v-2.243c0-2.092-1.697-3.787-3.788-3.787-2.09 0-3.787 1.695-3.787 3.787v2.243c0 2.093 1.697 3.787 3.787 3.787 1.151 0 2.182-.513 2.876-1.322-.008.035-.039.395-.039.395 0 .378.147.616.298.775.16.168.374.312.688.331a.7783.7783 0 0 0-.012.097zm.997.073c.729.131 1.733.305 1.792.305h.157c.059 0 1.789-.303 1.789-.303-.327.705-1.041 1.194-1.869 1.194-.829 0-1.543-.49-1.869-1.196zm-.971-1.379c.246-1.313 1.462-2.259 2.918-2.259 1.324 0 2.521.97 2.763 2.259v.105c0 .082-.029.115-.103.106l-2.658.473h-.157l-2.66-.476c-.075.01-.103-.023-.103-.105Zm8.023-6.392c.255-.14.549-.22.861-.22.992 0 1.798.804 1.798 1.798v1.919c0 .991-.804 1.797-1.798 1.797-.991 0-1.797-.803-1.797-1.797v-1.542c.034.003.068.005.103.005.64 0 1.16-.518 1.16-1.156 0-.312-.125-.596-.327-.804zM5.162 9.461c.227-.104.48-.162.746-.162.991 0 1.798.804 1.798 1.798v1.919c0 .991-.804 1.797-1.798 1.797-.991 0-1.797-.803-1.797-1.797v-1.571c.089.022.182.034.278.034.641 0 1.16-.518 1.16-1.156 0-.342-.149-.65-.387-.862ZM.002 6.554V4.568C.002 2.044 2.045 0 4.569 0h14.865c2.522 0 4.565 2.044 4.565 4.568v2.041a5.1847 5.1847 0 0 0-.164-.197 4.8592 4.8592 0 0 0-.646-2.284c-.433-.754-1.315-1.037-2.07-.786a4.785 4.785 0 0 0-.327-.774h-.001c-.287-.54-.758-.835-1.248-.908-.493-.073-1.033.072-1.464.515l-3.82 3.864c-1.226 1.11-3.127 1.199-4.313.205-.103-.109-4.025-4.071-4.025-4.071-.427-.438-.966-.584-1.46-.51-.489.073-.961.367-1.248.907v.002c-.133.25-.241.508-.327.771-.753-.252-1.635.029-2.071.782 0 0-.001.001-.001.002-.4.694-.613 1.459-.645 2.23-.057.065-.113.13-.167.197z" />
                      </svg>
                      <span className="font-sketch text-2xl text-slate-800 dark:text-slate-200">Duolingo Profile</span>
                    </div>
                    {/* Polyglot Badge */}
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-lime-500/10 text-lime-600 dark:text-lime-400 border border-lime-500/30">
                      🦉 Polyglot
                    </span>
                  </div>

                  <div className="flex gap-4 items-center">
                    {/* SVG Circular Progress showing Streak progress (316 out of 365) */}
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <svg className="w-full h-full transform -rotate-95" viewBox="0 0 36 36">
                        <path
                          className="text-slate-200 dark:text-slate-800"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <motion.path
                          className="text-lime-500"
                          strokeWidth="3.5"
                          strokeDasharray={`${(duoLingoStats.streak / 365) * 100}, 100`}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-sm font-bold leading-none text-slate-800 dark:text-slate-100">{duoLingoStats.loading ? "..." : duoLingoStats.streak}</span>
                        <span className="text-[9px] text-slate-500 dark:text-slate-400">Streak</span>
                      </div>
                    </div>

                    {/* Breakdown of Ratings/Win-rate */}
                    <div className="flex-1 space-y-1.5 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">Total XP</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{duoLingoStats.loading ? "..." : duoLingoStats.xp.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">Learning</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{duoLingoStats.loading ? "..." : duoLingoStats.language}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">Active Since</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Jan 2021</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-lime-500/10 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                  <span>Username: <strong className="text-slate-800 dark:text-slate-200">Meet11_</strong></span>
                  <span className="flex items-center gap-0.5 text-lime-600 dark:text-lime-400 font-medium">
                    Learn Language <span className="text-[10px]">↗</span>
                  </span>
                </div>
              </a>
            </motion.div>
          </div>

        </motion.div>

      </div>

    </section>
  );
};

