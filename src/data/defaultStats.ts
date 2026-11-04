// Fallback values shown while live stats load, or if the stats API fails.
export const DEFAULT_STATS = {
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
  leetcode: {
    solved: 883,
    easy: 320,
    medium: 487,
    hard: 76,
    totalQuestions: 3800,
    rating: 1902,
    badge: "Knight",
  },
  codeforces: {
    rating: 1850,
    maxRating: 1858,
    rank: "expert",
  },
  chess: {
    rating: 775,
    highestTactics: 1413,
    winRate: 60,
    totalGames: 372,
  },
  duolingo: {
    streak: 316,
    xp: 16559,
    language: "Spanish",
  },
};

export type Stats = typeof DEFAULT_STATS;
