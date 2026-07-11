/* ═══════════════════════════════════════════════════════════════
   ★ SOUL RESET PROGRAM — THIS IS THE ONLY FILE YOU EDIT ★

   HOW TO ADD A NEW VIDEO (30 seconds):
   1. Copy this line:
        { title: "Your video name", link: "https://www.youtube.com/watch?v=XXXX" },
   2. Paste it inside the "lessons" list of the module below.
   3. Save / commit. Done — the thumbnail appears on the website
      automatically, and clicking it opens the video on YouTube.

   • Both link styles work:
       https://www.youtube.com/watch?v=XXXX   ✓
       https://youtu.be/XXXX                  ✓
   • No link yet? Use  link: ""  → it will show as "Coming soon".
   • To add a practice/meditation under a lesson, put it inside
     that lesson's "exercises" list (see Lesson 3 below).
   • To add Module B videos later: replace its lessons: [] with
     real lesson lines, and delete the comingSoon: true line.
   ═══════════════════════════════════════════════════════════════ */

const SETTINGS = {
  // Access code your paid clients must type to open the course.
  // Change it anytime. Make it "" (empty) to remove the lock fully.
  // Note: not case-sensitive, so "soul2026" and "SOUL2026" both work.
  passcode: "SOUL2026",

  courseName: "Soul Reset Program",
  teacher: "Mokia Praga",
  tagline: "A quiet space to watch, practice, and slowly return to yourself.",

  youtube: "https://www.youtube.com/@Mokia_praga",
  instagram: "https://www.instagram.com/mokia_praga/",
};

const COURSE = [
  {
    module: "A",
    title: "Consciousness Awakening",
    lessons: [
      {
        title: "Why You Get Attached",
        link: "https://www.youtube.com/watch?v=HiN4BBR0Tuk",
      },
      {
        title: "How the Ego Self Destroys Your Life",
        link: "https://www.youtube.com/watch?v=zrL9gN3KjSA",
      },
      {
        title: "Consciousness & Killing the Ego Self",
        link: "https://www.youtube.com/watch?v=JFj0OTWAfrA",
        exercises: [
          {
            title: "Observer State Meditation",
            link: "https://www.youtube.com/watch?v=dZyRFMY8kx8",
          },
          {
            title: "Present Moment Practice",
            link: "https://youtu.be/A2Iko-IBwss?si=RU-XiSVMNBmz5vWC",
          },
        ],
      },
      {
        title: "Detachment",
        link: "https://www.youtube.com/watch?v=Gz9Z2pOZatM",
      },
      {
        title: "Painbody effects",
        link: "https://youtu.be/DfWQPk2xie8?si=-88NaL_AXv5mWpmS",
      },
    ],
  },
  {
    module: "B",
    title: "Module B",
    note: "Unlocking soon — new lessons will appear here automatically.",
    comingSoon: true,
    lessons: [],
  },
];
