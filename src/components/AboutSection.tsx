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

    fetchGitHubStats();
    fetchChessStats();
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

            {/* Custom Matiks Card */}
            <motion.div
              whileHover={{ scale: 1.03, rotate: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative p-6 bg-purple-50/80 dark:bg-purple-950/10 border-2 border-purple-500/20 rounded-2xl shadow-md backdrop-blur-xs flex flex-col justify-between min-h-[220px]"
            >
              {/* Card Tape Detail */}
              <div className="absolute -top-3 left-3/4 -translate-x-1/2 w-16 h-6 bg-highlighter-pink/30 dark:bg-purple-500/10 rotate-[3deg] clip-path-polygon(0% 10%, 100% 0%, 95% 90%, 5% 100%) pointer-events-none" style={{ clipPath: "polygon(0% 15%, 100% 0%, 95% 85%, 3% 100%)" }} />

              <a href={resumeData.matiks} target="_blank" rel="noreferrer" className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {/* Matiks Logo */}
                      <svg className="w-6 h-6 text-purple-500 fill-current font-sans font-bold" viewBox="0 0 24 24">
                        <text x="12" y="19" textAnchor="middle" fontSize="20" fill="currentColor">M</text>
                      </svg>
                      <span className="font-sketch text-2xl text-slate-800 dark:text-slate-200">Matiks Profile</span>
                    </div>
                    {/* Brain Badge */}
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-emerald-400 border border-purple-500/30">
                      🧠 Brain Games
                    </span>
                  </div>

                  {/* Factual description of Matiks and the profile */}
                  <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                    <p className="leading-relaxed">
                      Active member on the brain training platform, participating in live head-to-head mental math match-ups and cognitive challenges.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="px-2.5 py-1 bg-purple-500/5 dark:bg-purple-500/10 rounded-md border border-purple-500/10 text-xs font-semibold text-purple-600 dark:text-purple-400">⚡ Speed Arithmetic</span>
                      <span className="px-2.5 py-1 bg-purple-500/5 dark:bg-purple-500/10 rounded-md border border-purple-500/10 text-xs font-semibold text-purple-600 dark:text-purple-400">🧩 Logic Puzzles</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-purple-500/10 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                  <span>Username: <strong className="text-slate-800 dark:text-slate-200">meet11</strong></span>
                  <span className="flex items-center gap-0.5 text-purple-600 dark:text-purple-400 font-medium">
                    Train Brain <span className="text-[10px]">↗</span>
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

