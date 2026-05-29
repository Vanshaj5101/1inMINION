'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ExternalLink, ArrowRight } from 'lucide-react'
import PromptBlock from '@/components/PromptBlock'
import { submitContent } from '@/lib/content/submit'

const GOOGLE_FORM_URL = 'GOOGLE_FORM_URL_PLACEHOLDER'

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, ease: 'easeOut' } }

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <motion.main {...fadeUp} className="pt-20 pb-32 max-w-3xl mx-auto px-4 sm:px-6 space-y-16">

      {/* Header — red accents */}
      <section className="space-y-4 pt-8">
        <p className="font-mono text-xs tracking-widest" style={{ color: 'var(--red)' }}>
          // VILLAIN HQ — MISSION SUBMISSION
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold">The Board Is Waiting.</h1>
        <p className="text-lg leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>
          {`Your Minion is trained.
Your mission is planned.
Your intelligence is analyzed.

One final task:
Generate your Sun Heist pitch deck.
Submit to Villain HQ.
Mission complete.`}
        </p>
        <div style={{ borderTop: '1px solid var(--border)' }} />
      </section>

      {/* Status Summary */}
      <section>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'MINION TRAINED',    sub: 'Level 01 complete' },
            { label: 'LAIR BUILT',        sub: 'Level 02 complete' },
            { label: 'SKILL ADDED',       sub: 'Level 03 complete' },
            { label: 'AGENT UNLEASHED',   sub: 'Level 04 complete' },
          ].map(({ label, sub }) => (
            <div key={label} className="p-4 rounded-lg text-center space-y-1" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)' }}>
              <Check size={18} className="mx-auto" style={{ color: 'var(--green)' }} />
              <p className="font-mono font-bold text-xs" style={{ color: 'var(--green)' }}>{label}</p>
              <p className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Step 01 — Generate pitch deck */}
      <section className="space-y-4">
        <p className="section-eyebrow">// STEP 01 — GENERATE YOUR PITCH DECK</p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Run this prompt inside your Project from Level 02. Make sure your Skill from Level 03 is loaded.<br /><br />
          ChatGPT will generate a complete HTML pitch deck. This is your Sun Heist plan — your mission submission.
        </p>
        <PromptBlock
          label="FINAL MISSION PROMPT — THE PITCH DECK"
          promptText={submitContent.finalPrompt}
          variant="final"
        />
      </section>

      {/* Step 02 — Save the file */}
      <section className="space-y-5">
        <p className="section-eyebrow">// STEP 02 — SAVE YOUR PITCH DECK</p>
        {[
          {
            letter: 'A',
            title: 'Copy the HTML',
            content: `When ChatGPT finishes generating the code:
Click anywhere inside ChatGPT's response
Press Ctrl+A (Windows) or Cmd+A (Mac) to select all
Then Ctrl+C or Cmd+C to copy

Tip: Look for the copy button in ChatGPT's response — it's usually a small icon in the top right of the code block. That's the easiest way.`,
          },
          {
            letter: 'B',
            title: 'Save as HTML File',
            content: `Windows:
Open Notepad (search for it in Start menu)
Paste the code (Ctrl+V)
Click File → Save As
Change 'Save as type' to 'All Files'
Name it: YourName_SunHeist.html
Click Save

Mac:
Open TextEdit
Click Format → Make Plain Text
Paste the code (Cmd+V)
Click File → Save
Name it: YourName_SunHeist.html
Click Save`,
          },
          {
            letter: 'C',
            title: 'Open in Browser',
            content: `Find the file on your computer
Double-click it
It should open in Chrome, Safari, or Firefox
That's your pitch deck — your submission`,
          },
        ].map(step => (
          <div key={step.letter} className="rounded-lg p-5" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderLeft: '2px solid var(--yellow)' }}>
            <p className="font-mono text-xs tracking-widest mb-1" style={{ color: 'var(--yellow)' }}>STEP {step.letter}</p>
            <h3 className="font-bold text-base mb-3">{step.title}</h3>
            <p className="text-sm leading-relaxed font-mono whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>{step.content}</p>
          </div>
        ))}
      </section>

      {/* Step 03 — Submit */}
      <section className="space-y-5">
        <p className="section-eyebrow">// STEP 03 — SUBMIT TO VILLAIN HQ</p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Submit your completed pitch deck. The form takes 2 minutes.<br />
          Don't skip the last question — it's the most important one.
        </p>

        {GOOGLE_FORM_URL === 'GOOGLE_FORM_URL_PLACEHOLDER' ? (
          <div className="w-full py-5 rounded-xl text-center font-mono text-sm" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', color: 'var(--red)' }}>
            Form temporarily unavailable — ask your facilitator for the submission link
          </div>
        ) : (
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setSubmitted(true)}
            className="w-full flex items-center justify-center gap-3 py-5 rounded-xl font-mono font-bold tracking-widest text-sm transition-all duration-150"
            style={{
              background: 'var(--yellow)',
              color: 'var(--bg-primary)',
              boxShadow: 'var(--shadow-amber)',
              letterSpacing: '0.1em',
            }}
          >
            🏆 SUBMIT TO VILLAIN HQ
            <ExternalLink size={16} />
          </a>
        )}

        <div className="rounded-lg p-5 space-y-2" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
          <p className="font-mono font-bold text-xs" style={{ color: 'var(--yellow)' }}>THE FORM WILL ASK FOR:</p>
          {['→ Your name and department', '→ Your Minion\'s name', '→ Upload your .html pitch deck file', '→ The ONE workflow you commit to using AI for starting this week'].map((item, i) => (
            <p key={i} className="text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>{item}</p>
          ))}
          <p className="text-xs italic mt-3" style={{ color: 'var(--text-secondary)' }}>
            That last question matters. It's not for us — it's for you. A commitment written down is 3x more likely to happen than one you just think about.
          </p>
        </div>
      </section>

      {/* Completion Card */}
      <motion.section
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
      >
        <div
          className="rounded-xl p-8 sm:p-12 space-y-6"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--yellow)', boxShadow: 'var(--shadow-md)' }}
        >
          <p className="font-mono font-bold text-xs tracking-widest" style={{ color: 'var(--yellow)' }}>🌟 MISSION COMPLETE</p>

          <div className="space-y-2 text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <p>You arrived today with a blank Minion.</p>
            <p style={{ color: 'var(--text-primary)', fontWeight: 600 }}>You leave with a trained AI specialist.</p>
          </div>

          <div className="space-y-2">
            <p className="font-mono font-bold text-xs tracking-widest" style={{ color: 'var(--yellow)' }}>YOUR MINION CAN NOW:</p>
            {submitContent.capabilities.map((c, i) => (
              <p key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <Check size={14} style={{ color: 'var(--green)', marginTop: 3, flexShrink: 0 }} />
                {c}
              </p>
            ))}
          </div>

          <div className="space-y-1 text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            <p>That's not a Minion anymore.</p>
            <p style={{ color: 'var(--yellow)' }}>That's your competitive advantage.</p>
          </div>

          <div className="space-y-1 text-base" style={{ color: 'var(--text-secondary)' }}>
            <p>Use it tomorrow.</p>
            <p>Use it every day.</p>
          </div>

          <p className="text-3xl">🍌 Bello.</p>
        </div>
      </motion.section>

      {/* What's Next */}
      <section className="pb-8">
        <div className="rounded-lg p-6 space-y-3" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
          <p className="font-mono font-bold text-xs tracking-widest" style={{ color: 'var(--text-secondary)' }}>// WHAT'S NEXT</p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Everything you did today is repeatable.<br />
            Create Projects for your real work.<br />
            Build Skills for your recurring tasks.<br />
            Connect the tools you use every day.<br /><br />
            The detailed guide for everything we covered — including Chaining, advanced Skills, and more MCPs — will be shared with you after the session.
          </p>
        </div>
      </section>
    </motion.main>
  )
}
