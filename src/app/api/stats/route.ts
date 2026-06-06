import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache the whole API route response for 1 hour

export async function GET() {
  const stats = {
    github: {
      stars: 52,
      repos: 24,
      followers: 15,
      languages: [
        { name: "TypeScript", percentage: 40 },
        { name: "JavaScript", percentage: 30 },
        { name: "Python", percentage: 20 },
        { name: "C++", percentage: 10 },
      ],
    },
    chess: {
      rating: 775,
      highestTactics: 1397,
      winRate: 60,
    },
    duolingo: {
      streak: 316,
      xp: 16559,
      language: "Spanish",
    },
  };

  // 1. Fetch GitHub Stats
  try {
    const userRes = await fetch("https://api.github.com/users/MeetThakur", {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent": "Portfolio-API",
      },
    });
    if (userRes.ok) {
      const userData = await userRes.json();
      stats.github.repos = userData.public_repos || stats.github.repos;
      stats.github.followers = userData.followers || stats.github.followers;
    }

    const reposRes = await fetch("https://api.github.com/users/MeetThakur/repos?per_page=100", {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent": "Portfolio-API",
      },
    });
    if (reposRes.ok) {
      const reposData = await reposRes.json();
      const totalStars = reposData.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0);
      stats.github.stars = totalStars || stats.github.stars;

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

      if (languagesList.length > 0) {
        stats.github.languages = languagesList;
      }
    }
  } catch (err) {
    console.error("Error fetching GitHub stats in API route:", err);
  }

  // 2. Fetch Chess.com Stats
  try {
    const chessRes = await fetch("https://api.chess.com/pub/player/meet-11/stats", {
      next: { revalidate: 3600 },
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
      };
    }
  } catch (err) {
    console.error("Error fetching Chess.com stats in API route:", err);
  }

  // 3. Fetch Duolingo Stats
  try {
    const duoRes = await fetch("https://www.duolingo.com/2017-06-30/users?username=Meet11_", {
      next: { revalidate: 3600 },
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

  return NextResponse.json(stats);
}
