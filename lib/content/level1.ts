export const level1 = {
  header: {
    eyebrow: '// LEVEL 01 — PROMPT ENGINEERING',
    title: 'Speak Like Gru.\nNot Like a Minion.',
    subtitle: 'Your Minion just arrived.\nThey understand nothing.\nGive them a chaotic order — watch chaos.\nNow speak like a mastermind.\nWatch them transform.',
    duration: '⏱ 20 MINUTES',
  },

  badPrompt: `help me with my work stuff and make it better`,

  goodPrompt: `You are a senior strategic advisor with expertise in organizational productivity.

Context: I work at a company where teams struggle to complete projects on time despite good intentions.

Task: Give me 3 specific, actionable interventions that have worked in similar organizations.

Format: Numbered list. Each intervention gets: name, one sentence explanation, one concrete example.

Constraints: Each intervention must be implementable in under 2 weeks with no additional budget.`,

  ingredients: [
    {
      number: '01',
      name: 'ROLE',
      explanation: 'Who is Claude in this conversation?',
      example: '"You are a behavioral scientist"',
    },
    {
      number: '02',
      name: 'CONTEXT',
      explanation: 'What does Claude need to know about your world?',
      example: '"Our team of 8 is struggling with Q3 deadline pressure"',
    },
    {
      number: '03',
      name: 'TASK',
      explanation: 'What exactly do you need done?',
      example: '"Give me 3 specific actions we can take this week"',
    },
    {
      number: '04',
      name: 'FORMAT',
      explanation: 'How should the answer look?',
      example: '"Numbered list. Each item: name + one example + estimated time"',
    },
    {
      number: '05',
      name: 'CONSTRAINTS',
      explanation: 'What rules must the answer follow?',
      example: '"No cost. Implementable in under 48 hours. No new tools."',
    },
  ],

  layers: [
    {
      id: 'L0',
      label: 'LAYER 00 — RAW ASK',
      status: 'START HERE',
      explanation: 'Type whatever comes to mind naturally.\nNo structure. No framework. Just instinct.\nThis is your baseline. Remember it.',
      prompt: `help me plan the sun heist`,
      tip: '💡 RUN THIS FIRST\nPaste it in Claude. Save the output.\nYou\'ll compare it to your Layer 05 version at the end. The difference is the lesson.',
    },
    {
      id: 'L1',
      label: 'LAYER 01 — ADD SPECIFICITY',
      explanation: 'Replace vague words with precise ones.\nAdd a number. Name the exact subject.\nClaude responds proportionally to how specific you are.',
      prompt: `Give me 5 specific strategies for approaching the sun for a heist mission without being detected.`,
      whatChanged: 'Added a number (5), added specific context (heist mission), added constraint (without being detected)',
    },
    {
      id: 'L2',
      label: 'LAYER 02 — ROLE AND PERSONA',
      explanation: 'Tell Claude WHO it should be.\nThe role changes how Claude thinks — not just what it says.\nTry different roles and see the difference.',
      pairActivity: true,
      promptA: `You are a aerospace engineer with expertise in extreme environment navigation.

Give me 5 specific strategies for approaching the sun for a heist mission without being detected.`,
      promptB: `You are a master spy and infiltration specialist with 20 years of covert operations experience.

Give me 5 specific strategies for approaching the sun for a heist mission without being detected.`,
      labelA: 'PERSON A — ROLE',
      labelB: 'PERSON B — ROLE',
      whatChanged: 'Added a role — same task, completely different expertise and perspective',
    },
    {
      id: 'L3',
      label: 'LAYER 03 — ADD CONTEXT',
      explanation: 'Tell Claude what it needs to know about YOUR situation.\nWithout context Claude answers for a fictional average world.\nWith context Claude answers for YOU.',
      prompt: `You are a master spy and infiltration specialist with 20 years of covert operations experience.

Context: We are 1inMINION — a reformed villain organization. We have one shrink ray that needs to reach within 1 million km of the sun. Our team is 12 Minions with varying specializations. We have failed 2 previous missions: one vessel melted, one Minion got distracted by solar flares.

Give me 5 specific strategies for approaching the sun undetected, learning from our past failures.`,
      whatChanged: 'Added specific context about who we are, what we have, and what has failed before',
    },
    {
      id: 'L4',
      label: 'LAYER 04 — ADD FORMAT',
      explanation: 'Tell Claude HOW the answer should look.\nFormat determines whether you can actually USE the output.\nA great answer in the wrong format is still unusable.',
      prompt: `You are a master spy and infiltration specialist with 20 years of covert operations experience.

Context: We are 1inMINION — a reformed villain organization. We have one shrink ray that needs to reach within 1 million km of the sun. Our team is 12 Minions with varying specializations. We have failed 2 previous missions: one vessel melted, one Minion got distracted by solar flares.

Give me 5 specific strategies for approaching the sun undetected, learning from our past failures.

Format: A table with 4 columns:
Strategy | Why it works | Risk | Minion role required`,
      whatChanged: 'Added a specific output format — the exact structure of the answer',
    },
    {
      id: 'L5',
      label: 'LAYER 05 — ADD CONSTRAINTS',
      status: 'FINAL LAYER',
      explanation: 'Add explicit rules.\nWhat to include. What to avoid.\nWhat to prioritize. What format to use.\nConstraints produce precision.\nThis is where outputs become professional.',
      prompt: `You are a master spy and infiltration specialist with 20 years of covert operations experience.

Context: We are 1inMINION — a reformed villain organization. We have one shrink ray that needs to reach within 1 million km of the sun. Our team is 12 Minions with varying specializations. We have failed 2 previous missions: one vessel melted, one Minion got distracted by solar flares.

Give me 5 specific strategies for approaching the sun undetected, learning from our past failures.

Format: A table with 4 columns:
Strategy | Why it works | Risk | Minion role required

Constraints:
- Every strategy must be executable in under 48 hours
- Do not suggest any approach Vector has already tried
- Each risk must include a specific mitigation
- Write for a non-technical Minion crew who need clear simple instructions`,
      whatChanged: 'Added explicit rules — what to include, what to avoid, how to write it',
    },
  ],

  advancedPrompts: {
    optionA: `Here is an example of a great strategy entry:
[your example here]
Now give me 5 more at this quality level.`,
    optionB: `Before giving me strategies, think through: what caused our 2 previous failures, what environmental factors we haven't considered, and what our Minions are actually capable of.
Then give me your 5 strategies.`,
    optionC: `Review your 5 strategies. Identify the weakest one. Explain why it's weak.
Replace it with a stronger alternative.`,
  },

  missionCheckItems: [
    "I ran the bad prompt and saw the generic output",
    "I added all 5 layers to my mission prompt",
    "I compared Person A and Person B role outputs",
    "My final prompt has: Role + Context + Task + Format + Constraints",
    "I compared my Layer 00 and Layer 05 outputs",
    "I'm ready to build my Minion's lair",
  ],
}
