export const level1 = {
  header: {
    eyebrow: '// LEVEL 01 — PROMPT ENGINEERING',
    title: 'Talk to\nYour Minion.',
    subtitle: 'Your Minion just arrived.\nThey are eager, willing, and understand absolutely nothing.\nThe quality of their response depends entirely on the quality of your order.\nLearn to give precise, structured prompts — and watch your Minion transform.',
    duration: '⏱ 20 MINUTES',
  },

  badPrompt: `Help me plan the sun heist.`,

  goodPrompt: `You are a villain mission strategist with expertise in high-risk space operations.

Context: GRU previously attempted to steal the moon and failed. The team is now planning a more ambitious mission to steal the sun using a shrink ray. The mission must be undetected and completed within 48 hours.

Task: Identify the 3 most critical factors that will determine whether this mission succeeds or fails.

Format: A numbered list. Each factor gets a name, one sentence explanation, and one specific risk to watch out for.

Constraints: Be specific and direct. Do not suggest anything that requires more than the equipment already available. Avoid generic advice.`,

  ingredients: [
    {
      number: '01',
      name: 'ROLE',
      explanation: 'Who is Claude in this conversation?',
      example: '"You are a villain mission strategist with expertise in high-risk space operations."',
    },
    {
      number: '02',
      name: 'CONTEXT',
      explanation: 'What does Claude need to know about your world?',
      example: '"GRU previously attempted to steal the moon and failed. The team is now planning a more ambitious mission to steal the sun using a shrink ray."',
    },
    {
      number: '03',
      name: 'TASK',
      explanation: 'What exactly do you need done?',
      example: '"Identify the 3 most critical factors that will determine whether this mission succeeds or fails."',
    },
    {
      number: '04',
      name: 'FORMAT',
      explanation: 'How should the answer look?',
      example: '"A numbered list. Each factor gets a name, one sentence explanation, and one specific risk to watch out for."',
    },
    {
      number: '05',
      name: 'CONSTRAINTS',
      explanation: 'What rules must the answer follow?',
      example: '"Be specific and direct. Do not suggest anything that requires more than the equipment already available. Avoid generic advice."',
    },
  ],

  layers: [
    {
      id: 'L0',
      label: 'BASELINE — NO STRUCTURE',
      status: 'START HERE',
      explanation: 'Type whatever comes to mind naturally.\nNo structure. No framework. Just instinct.\nThis is your baseline. Remember it.',
      prompt: `Help me plan the sun heist.`,
      tip: '💡 RUN THIS FIRST\nPaste it in Claude. Save the output.\nYou\'ll compare it to your final version at the end. The difference is the lesson.',
    },
    {
      id: 'L1',
      label: 'LAYER 01 — ADD A ROLE',
      explanation: 'A role tells your Minion who they are in this conversation. It changes how they think, not just what they say. A mission strategist answers very differently from a financial analyst.',
      prompt: `You are a villain mission strategist with expertise in high-risk space operations.

Help me plan the sun heist.`,
      whatChanged: 'Added a role — same task, completely different expertise and perspective',
    },
    {
      id: 'L2',
      label: 'LAYER 02 — ADD CONTEXT',
      explanation: 'Context gives your Minion the background they need. Without it, they answer for a generic world. With it, they answer for yours.',
      prompt: `You are a villain mission strategist with expertise in high-risk space operations.

Context: GRU previously attempted to steal the moon and failed. The team is now planning a more ambitious mission to steal the sun using a shrink ray. The mission must be undetected and completed within 48 hours.

Help me plan the sun heist.`,
      whatChanged: 'Added context — Claude now knows the history, the goal, and the time constraint',
    },
    {
      id: 'L3',
      label: 'LAYER 03 — ADD A TASK',
      explanation: 'The task is what you actually want. Be as specific as possible. Vague tasks produce vague results every single time.',
      prompt: `You are a villain mission strategist with expertise in high-risk space operations.

Context: GRU previously attempted to steal the moon and failed. The team is now planning a more ambitious mission to steal the sun using a shrink ray. The mission must be undetected and completed within 48 hours.

Task: Identify the 3 most critical factors that will determine whether this mission succeeds or fails.`,
      whatChanged: 'Replaced the vague ask with a specific, scoped task — 3 factors, not "everything"',
    },
    {
      id: 'L4',
      label: 'LAYER 04 — ADD FORMAT',
      explanation: 'Format tells your Minion how the output should look. A great answer in the wrong format is still unusable. Design the output before you ask the question.',
      prompt: `You are a villain mission strategist with expertise in high-risk space operations.

Context: GRU previously attempted to steal the moon and failed. The team is now planning a more ambitious mission to steal the sun using a shrink ray. The mission must be undetected and completed within 48 hours.

Task: Identify the 3 most critical factors that will determine whether this mission succeeds or fails.

Format: A numbered list. Each factor gets a name, one sentence explanation, and one specific risk to watch out for.`,
      whatChanged: 'Added a specific output structure — Claude now knows exactly how to present the answer',
    },
    {
      id: 'L5',
      label: 'LAYER 05 — ADD CONSTRAINTS',
      status: 'FINAL LAYER',
      explanation: 'Constraints set the rules. They tell your Minion what to avoid, what to prioritize, and what limits to respect. Boundaries produce precision.',
      prompt: `You are a villain mission strategist with expertise in high-risk space operations.

Context: GRU previously attempted to steal the moon and failed. The team is now planning a more ambitious mission to steal the sun using a shrink ray. The mission must be undetected and completed within 48 hours.

Task: Identify the 3 most critical factors that will determine whether this mission succeeds or fails.

Format: A numbered list. Each factor gets a name, one sentence explanation, and one specific risk to watch out for.

Constraints: Be specific and direct. Do not suggest anything that requires more than the equipment already available. Avoid generic advice.`,
      whatChanged: 'Added explicit rules — what to include, what to avoid, how to write it',
    },
  ],

  advancedPrompts: {
    optionA: `Here is an example of a strong mission factor:

Factor 1 — Timing. The approach window must align with low solar activity. Risk: missing the window by even 2 hours doubles detection probability.

Now give me 2 more factors at this quality level.`,
    optionB: `Before giving me the critical factors, think through what caused the moon heist to fail and what environmental challenges a solar mission faces. Then give me your 3 factors.`,
    optionC: `After writing your 3 factors, review them against these criteria: are they specific, are they data-driven, and would a villain actually act on them. Improve the weakest one before responding.`,
  },

  missionCheckItems: [
    "I ran the vague prompt and saw a generic output",
    "I ran the structured prompt and saw the difference",
    "I built my own prompt with all 5 layers: role, context, task, format, and constraints",
    "I compared my vague and structured outputs side by side",
    "I can explain why the structured prompt produced a better result",
  ],
}
