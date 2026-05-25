// All level content — names, descriptions, timing, icons
// Edit this file to update level information

export const levels = [
  {
    number: "01",
    codename: "TALK LIKE GRU",
    concept: "Prompt Engineering",
    description:
      "Your Minion just arrived. They understand nothing. " +
      "Learn to give precise, structured orders that actually work.",
    duration: "20 min",
    emoji: "🗣️",
    color: "yellow",
  },
  {
    number: "02",
    codename: "BUILD THE LAIR",
    concept: "Projects + Context",
    description:
      "Give your Minion a permanent base. Load the mission intelligence. " +
      "Your Minion should never need briefing again.",
    duration: "15 min",
    emoji: "🏰",
    color: "purple",
  },
  {
    number: "03",
    codename: "POWER UP",
    concept: "Skills",
    description:
      "Train your Minion in one specialist capability. " +
      "Same prompt — completely different output. Watch the transformation.",
    duration: "15 min",
    emoji: "⚡",
    color: "blue",
  },
  {
    number: "04",
    codename: "GO ROGUE",
    concept: "Agents + MCPs",
    description:
      "Give your Minion a goal and step back. " +
      "Watch them plan, execute, and act in the real world.",
    duration: "10 min",
    emoji: "🤖",
    color: "orange",
  },
] as const

export const totalTime = {
  label: "Total mission time",
  value: "~60 minutes",
  note: "Plus Q&A and Show and Tell at the end",
}
