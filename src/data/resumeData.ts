export const resumeData = {
  name: "Meet Thakur",
  role: "Software Developer",
  location: "Greater Noida, India",
  phone: "9760060211",
  email: "meet11india@gmail.com",
  linkedin: "https://linkedin.com/in/MeetThakur",
  github: "https://github.com/MeetThakur",
  leetcode: "https://leetcode.com/u/MeetThakur",
  chesscom: "https://www.chess.com/member/Meet-11",
  duolingo: "https://www.duolingo.com/profile/Meet11_",
  summary:
    "Computer Science undergraduate (CGPA 9.12/10) currently interning at Eightfold AI, building a Salesforce backup-and-restore pipeline on Databricks. Ships full-stack products solo — from a chat analytics tool used by 2,000+ people to a mobile app and an AI advisory platform. Codeforces Expert, presented research at two national conferences.",
  education: [
    {
      institution: "Noida Institute of Engineering and Technology",
      location: "Greater Noida",
      duration: "2023–2027",
      degree: "Bachelor of Technology — Computer Science and Business Systems",
      score: "Current CGPA: 9.12 / 10",
      details:
        "Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, OOP",
    },
    {
      institution: "Wisdom Public School",
      location: "Aligarh",
      duration: "2021–2023",
      degree: "Class 12th (CBSE)",
      score: "Percentage: 89.8%",
    },
    {
      institution: "Wisdom Public School",
      location: "Aligarh",
      duration: "2019–2021",
      degree: "Class 10th (CBSE)",
      score: "Percentage: 81.83%",
    },
  ],
  experience: [
    {
      company: "Eightfold AI",
      role: "Engineering Intern",
      duration: "Aug 2026 – Present",
      location: "Remote",
      description:
        "Independently designing and building an in-house Salesforce backup-and-restore pipeline on Databricks, replacing a licensed proprietary vendor tool. Reverse-engineered the vendor's restore behavior to reach feature parity, extended it with configurable object/field mappings, and added retry logic for Salesforce API limits and partial failures.",
      techStack: ["Python", "Databricks", "Salesforce APIs", "ETL"],
      isCurrent: true,
    },
    {
      company: "Self-employed",
      role: "Freelance Web Developer",
      duration: "Sep 2025",
      location: "Remote",
      description:
        "Shipped a responsive production website end-to-end for a paying client — build, domain setup, and deployment pipeline — with no post-launch defects. Cut asset payload and improved load times; wrote handoff docs so the client could manage content independently.",
      techStack: ["Next.js", "Vercel"],
      isCurrent: false,
    },
  ],
  projects: [
    {
      title: "ConvoMetrics",
      subtitle: "Chat Analytics & Data Pipeline Tool",
      techStack: ["Python", "Pandas", "Streamlit", "Plotly", "NLTK"],
      github: "https://github.com/MeetThakur/ConvoMetrics",
      description:
        "Parses exported Telegram (JSON) and WhatsApp (TXT) chats into cleaned Pandas DataFrames, computing message counts, hourly activity heatmaps, and per-user emoji breakdowns. Applies NLTK stopword filtering to surface meaningful word trends. Earned 59 stars and 11 forks organically — serves 2,000+ users as a live public app.",
      color: "pink",
    },
    {
      title: "Krono",
      subtitle: "Cross-Platform Competitive Programming Tracker",
      techStack: ["React Native", "Expo", "TypeScript", "Zustand", "SQLite"],
      github: "https://github.com/MeetThakur/Krono",
      description:
        "Aggregates live contest schedules and profiles from Codeforces, LeetCode, AtCoder, and CodeChef APIs with timezone-adjusted views. Designed the SQLite schema for local persistence of profiles, rivals, and contest history. Shipped a release APK with a rivals leaderboard, background rating sync, and push reminders across 6 released versions.",
      color: "yellow",
    },
    {
      title: "KhetSetu",
      subtitle: "AI-Powered Agricultural Advisory Platform",
      techStack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Gemini API"],
      github: "https://github.com/MeetThakur/Khetsetu",
      description:
        "Built the full stack solo (frontend, REST API, database schema, deployment) to give Indian farmers advisory guidance through natural-language queries. Integrated the Gemini 2.5 Flash API for context-aware, actionable answers. Deployed the React frontend on Vercel and the Node.js/Express backend on Render.",
      color: "blue",
    },
  ],
  certifications: [
    "Network Security — Cisco Networking Academy",
    "Algorithmic Thinking (Part 1 & Part 2) — Coursera",
  ],
  skills: [
    {
      category: "Languages",
      items: ["Python", "C", "C++", "SQL", "TypeScript", "JavaScript"],
      color: "green",
    },
    {
      category: "Web & Mobile",
      items: [
        "React",
        "Node.js",
        "Express",
        "PostgreSQL",
        "React Native",
        "Expo",
        "REST APIs",
        "Streamlit",
      ],
      color: "blue",
    },
    {
      category: "Data & Tools",
      items: [
        "Pandas",
        "Databricks",
        "ETL Pipelines",
        "Plotly",
        "Matplotlib",
        "Git",
        "Salesforce APIs",
      ],
      color: "yellow",
    },
    {
      category: "Core CS",
      items: ["Data Structures & Algorithms", "OOP", "Problem Solving"],
      color: "pink",
    },
  ],
  coCurricular: [
    "Presented research papers at SNU (Greater Noida) and PSIT (Kanpur)",
    "Participated in Smart India Hackathon (SIH) 2024 and 2025",
    "Knight on LeetCode (top 4%), Expert on Codeforces, 4-star on CodeChef",
  ],
};
