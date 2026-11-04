import { NextResponse } from "next/server";
import { DEFAULT_STATS, type Stats } from "../../../data/defaultStats";
import { resumeData } from "../../../data/resumeData";

// Compute at request time so a build never bakes in fallback numbers; the upstream
// fetches below are cached for 1 hour, and the CDN header caches the response too.
export const dynamic = "force-dynamic";

const FETCH_TIMEOUT_MS = 5000;

export async function GET() {
  const stats: Stats = structuredClone(DEFAULT_STATS);

  const githubHeaders: Record<string, string> = { "User-Agent": "Portfolio-API" };
  if (process.env.GITHUB_TOKEN) {
    githubHeaders.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  // 1. Fetch GitHub Stats
  try {
    const userRes = await fetch("https://api.github.com/users/MeetThakur", {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: githubHeaders,
    });
    if (userRes.ok) {
      const userData = await userRes.json();
      stats.github.repos = userData.public_repos || stats.github.repos;
      stats.github.followers = userData.followers || stats.github.followers;
    }

    const reposRes = await fetch("https://api.github.com/users/MeetThakur/repos?per_page=100", {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: githubHeaders,
    });
    if (reposRes.ok) {
      const reposData = await reposRes.json();
      const totalStars = reposData.reduce((acc: number, repo: { stargazers_count?: number }) => acc + (repo.stargazers_count || 0), 0);
      stats.github.stars = totalStars || stats.github.stars;

      const languagesMap: { [key: string]: number } = {};
      let totalReposWithLanguage = 0;
      reposData.forEach((repo: { language?: string }) => {
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

      if (languagesList.length > 0) {
        stats.github.languages = languagesList;
      }
    }
  } catch (err) {
    console.error("Error fetching GitHub stats in API route:", err);
  }

  // 2. Fetch LeetCode Stats (public GraphQL endpoint)
  try {
    const lcRes = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "Portfolio-API",
      },
      body: JSON.stringify({
        query: `query stats($u: String!) {
          allQuestionsCount { difficulty count }
          matchedUser(username: $u) { submitStatsGlobal { acSubmissionNum { difficulty count } } }
          userContestRanking(username: $u) { rating badge { name } }
        }`,
        variables: { u: resumeData.leetcodeUsername },
      }),
    });
    if (lcRes.ok) {
      const { data } = await lcRes.json();
      const solved: { difficulty: string; count: number }[] =
        data?.matchedUser?.submitStatsGlobal?.acSubmissionNum ?? [];
      const countFor = (d: string) => solved.find((x) => x.difficulty === d)?.count;
      const all = countFor("All");
      // Skip when the user isn't found so the fallback numbers stay in place
      if (all !== undefined) {
        const total = data.allQuestionsCount?.find((x: { difficulty: string }) => x.difficulty === "All")?.count;
        stats.leetcode = {
          solved: all,
          easy: countFor("Easy") ?? 0,
          medium: countFor("Medium") ?? 0,
          hard: countFor("Hard") ?? 0,
          totalQuestions: total || stats.leetcode.totalQuestions,
          rating: data.userContestRanking?.rating
            ? Math.round(data.userContestRanking.rating)
            : stats.leetcode.rating,
          badge: data.userContestRanking?.badge?.name || stats.leetcode.badge,
        };
      } else {
        console.warn(`LeetCode user "${resumeData.leetcodeUsername}" not found; using fallback stats`);
      }
    }
  } catch (err) {
    console.error("Error fetching LeetCode stats in API route:", err);
  }

  // 3. Fetch Codeforces rating (public API)
  try {
    const cfRes = await fetch(`https://codeforces.com/api/user.info?handles=${resumeData.codeforcesHandle}`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (cfRes.ok) {
      const data = await cfRes.json();
      const user = data.status === "OK" ? data.result?.[0] : undefined;
      if (user?.rating) {
        stats.codeforces = {
          rating: user.rating,
          maxRating: user.maxRating || user.rating,
          rank: user.rank || stats.codeforces.rank,
        };
      }
    }
  } catch (err) {
    console.error("Error fetching Codeforces stats in API route:", err);
  }

  // 4. Fetch Chess.com Stats
  try {
    const chessRes = await fetch("https://api.chess.com/pub/player/meet-11/stats", {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (chessRes.ok) {
      const data = await chessRes.json();
      const rapidRating = data.chess_rapid?.last?.rating || stats.chess.rating;
      const highestTactics = data.tactics?.highest?.rating || stats.chess.highestTactics;
      const record = data.chess_rapid?.record || { win: 125, loss: 74, draw: 8 };
      const totalGames = record.win + record.loss + record.draw;
      const winRate = totalGames > 0 ? Math.round((record.win / totalGames) * 100) : stats.chess.winRate;

      stats.chess = {
        rating: rapidRating,
        highestTactics,
        winRate,
        totalGames,
      };
    }
  } catch (err) {
    console.error("Error fetching Chess.com stats in API route:", err);
  }

  // 5. Fetch Duolingo Stats
  try {
    const duoRes = await fetch("https://www.duolingo.com/2017-06-30/users?username=Meet11_", {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (duoRes.ok) {
      const data = await duoRes.json();
      if (data.users && data.users.length > 0) {
        const user = data.users[0];
        const streak = user.streak || stats.duolingo.streak;
        const totalXp = user.totalXp || stats.duolingo.xp;
        const language = user.courses?.[0]?.title || stats.duolingo.language;

        stats.duolingo = {
          streak,
          xp: totalXp,
          language,
        };
      }
    }
  } catch (err) {
    console.error("Error fetching Duolingo stats in API route:", err);
  }

  return NextResponse.json(stats, {
    headers: { "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400" },
  });
}
