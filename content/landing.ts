// All text content for the landing page
// Edit this file to update any text — no need to touch components

export const landingContent = {

  pageTitle: "1inMINION: Heist to the Sun",

  hero: {
    eyebrow: "1inMINION PRESENTS",
    title: "HEIST TO THE\nSUN",
    oneliner: "we missed the MOON but the SUN has nowhere to hide.",
    ctaButton: "BEGIN THE HEIST",
  },

  story: {
    sectionLabel: "THE BACKSTORY",
    heading: "The Moon Heist Failed.",
    subheading: "But GRU is not done!",
    paragraphs: [
      "GRU had the shrink ray. He had the Minions. He had the plan. Then Vector happened. Mission failed. Moon still in the sky.",
      "So GRU did what every great villain does. He aimed bigger. This time we are not stealing the moon.",
      "This time we steal the SUN.",
    ],
    missionBox: {
      label: "YOUR MISSION",
      heading: "Train Your Minion.",
      description:
        "You will build and train your own AI Minion, powered by ChatGPT, to become a data-driven strategist. " +
        "Together you will analyze 374 previous mission records, find what works, and build a complete mission plan for Operation: Steal the Sun.",
      highlight:
        "Every skill you build with your Minion today is a skill you take back to your real work tomorrow.",
    },
    ctaButton: "TRAIN THE MINION",
  },

  levelsSection: {
    sectionLabel: "THE TRAINING PROGRAM",
    // heading: "4 Levels. One Mission.",          // Level 04 temporarily hidden
    heading: "3 Levels. One Mission.",
    // subheading: "Each level gives your Minion a new capability. Complete all 4 and your Minion is ready for the heist.",
    subheading:
      "Each level gives your Minion a new capability. " +
      "Complete all 3 and your Minion is ready for the heist.",
  },

} as const
