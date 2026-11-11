/**
 * Portfolio Configuration & Content Data
 * --------------------------------------
 * Populated from Devdutta Nath's resume.
 * Update LinkedIn, GitHub, LeetCode, Codolio, and project URLs with your exact links.
 */
window.PORTFOLIO_DATA = {
  profile: {
    name: "Devdutta Nath",
    role: "B.Tech CSE (AI/ML) Student • Galgotias University (Expected 2028)",
    location: "Greater Noida, Uttar Pradesh",
    avatar: "assets/avatar.webp",
    avatarAlt: "Portrait of Devdutta Nath",
    // Structured segments for the Blur Highlight "About Me" paragraph
    aboutSegments: [
      { text: "I'm a " },
      { text: "B.Tech Computer Science (AI/ML) student", highlight: true },
      { text: " at " },
      { text: "Galgotias University (CGPA: 8.4)", highlight: true },
      { text: " from Greater Noida with strong foundations in " },
      { text: "C++ and Data Structures & Algorithms", highlight: true },
      { text: ". I build AI-powered applications using " },
      { text: "Python, React, OCR, Gemini Vision, and RAG", highlight: true },
      { text: ", have solved " },
      { text: "350+ coding problems", highlight: true },
      { text: " across platforms (300 on LeetCode), and ranked " },
      { text: "Top 34 among 400+ students", highlight: true },
      { text: " at the Smart India Hackathon 2026 internal round." },
    ],
  },

  credentials: [
    {
      id: "linkedin",
      label: "LinkedIn",
      handle: "devdutta-nath",
      url: "https://www.linkedin.com/in/devdutta-nath-0bb241361",
      external: true,
    },
    {
      id: "gmail",
      label: "Gmail",
      handle: "dev1527b@gmail.com",
      url: "mailto:dev1527b@gmail.com",
      external: false,
    },
    {
      id: "github",
      label: "GitHub",
      handle: "@Devdutta-22",
      url: "https://github.com/Devdutta-22",
      external: true,
    },
    {
      id: "leetcode",
      label: "LeetCode",
      handle: "devdutta-2004 • 300",
      url: "https://leetcode.com/u/devdutta-2004/",
      external: true,
    },
    {
      id: "codolio",
      label: "Codolio",
      handle: "dev_xloper • 350+",
      url: "https://codolio.com/profile/dev_xloper",
      external: true,
    },
  ],

  projects: [
    {
      id: "popcode",
      title: "PopCode",
      category: "Android & Systems",
      year: "v1.0.0 • Android 7.0+",
      tagline:
        "Offline, developer-first Android keyboard with radial snippet wheels, context-aware DSA templates, and live variable tracking.",
      description:
        "Built PopCode (com.devkeys.keyboard), a 100% offline native Android InputMethodService in Kotlin with zero network or storage permissions. Solves mobile coding friction by combining radial code wheels, smart indentation and collision-free loop variable resolution, live buffer variable scanning, IDE editing shortcuts, built-in code formatting, and 8 mechanical themes with low-latency SoundPool switch audio.",
      highlights: [
        "Custom Canvas radial code wheels (RadialMenuView) with 9 built-in categories plus user-created custom wheels across C++, Python, JavaScript, and Java.",
        "SmartSnippetResolver preserves indentation, resolves nested loop variable collisions (i → j → k → l), and pairs with VariableCache for live identifier tracking.",
        "IDE-style mobile editing (cursor arrows, move/duplicate line, 4-space Tab, Undo stack, CodeFormatter) and QWERTY-weighted Damerau-Levenshtein autocorrect.",
        "8 mechanical & cyber themes plus SoundPool switch acoustics, 100% offline with zero INTERNET permissions.",
      ],
      techStack: [
        "Kotlin",
        "Android IME",
        "Custom Canvas",
        "SoundPool",
        "ViewBinding",
        "Material Components",
      ],
      accentHue: 215,
      projectUrl: "https://github.com/Devdutta-22",
    },
    {
      id: "nutriscan",
      title: "NutriScan",
      category: "AI & Compliance",
      year: "August 2026",
      tagline:
        "AI-powered product-label compliance platform for Legal Metrology rules.",
      description:
        "Built an AI-powered product-label compliance platform to help consumers identify missing or incorrect declarations required under Legal Metrology (Packaged Commodities) Rules.",
      highlights: [
        "Implemented Tesseract OCR and Gemini Vision for automated label analysis.",
        "Built a RAG pipeline referencing approximately 2,000 government-sourced data points to evaluate compliance.",
        "Deployed the React application on Vercel and ranked Top 34 among 400+ students at the Smart India Hackathon (SIH) 2026 internal round.",
      ],
      techStack: [
        "React",
        "Python",
        "Tesseract OCR",
        "Gemini Vision",
        "RAG",
        "Vercel",
      ],
      accentHue: 155,
      projectUrl: "https://nutrillink.vercel.app/",
    },
    {
      id: "tirthsaathi",
      title: "TirthSaathi",
      category: "Full-Stack",
      year: "February 2026",
      tagline:
        "Pilgrimage crowd-management platform with face-scan identification and ticket booking.",
      description:
        "Built a pilgrimage crowd-management platform to address overcrowding and improve visitor identification and access at temple sites.",
      highlights: [
        "Implemented face-scan based identification and temple ticket booking to support visitor management.",
        "Streamlined temple site access and crowd flow for high-footfall venues.",
        "Developed the React frontend with Python and JavaScript backend logic and deployed the platform live.",
      ],
      techStack: ["React", "Python", "JavaScript"],
      accentHue: 32,
      projectUrl: "https://tirth-saathi-ruddy.vercel.app/",
    },
    {
      id: "astronote",
      title: "AstroNote",
      category: "Full-Stack",
      year: "December 2025",
      tagline:
        "Music-sharing community platform with synchronized live lyrics and streaming.",
      description:
        "Built a music-sharing platform that enables artists to publish, discover, and connect with other artists through a centralized music community.",
      highlights: [
        "Integrated YouTube APIs for music streaming and implemented synchronized live lyrics using the LRC format.",
        "Developed the backend with Java Spring Boot and deployed the frontend on Vercel with a Cloudflare-hosted database.",
        "Tested the platform with 200+ concurrent users.",
      ],
      techStack: [
        "React",
        "Java Spring Boot",
        "YouTube API",
        "LRC",
        "Cloudflare",
        "Vercel",
      ],
      accentHue: 250,
      projectUrl: "https://astronote.live",
    },
  ],
};
