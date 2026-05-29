'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import PromptBlock from '../PromptBlock'
import StepCard from '../StepCard'
import MissionCheck from '../MissionCheck'
import LevelBriefingModal from '../LevelBriefingModal'
import LevelBriefingSection from '../LevelBriefingSection'
import TableOfContents from '../TableOfContents'
import briefingData from '@/content/levels/level4/level_04_briefing.json'
import stepsData from '@/content/levels/level4/level_04_steps.json'
import resourcesData from '@/content/levels/level4/level_04_resources.json'

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, ease: 'easeOut' } }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const res: Record<string, any> = Object.fromEntries(resourcesData.resources.map(r => [r.id, r]))

export default function Level4Page() {
  const [showBriefing, setShowBriefing] = useState(true)
  const handleEnter = () => setShowBriefing(false)

  // checked[0]: card 01 — connected calendar
  // checked[1]: card 02 — tested calendar (both prompts)
  // checked[2]: card 03 — sent invite
  const [checked, setChecked] = useState<boolean[]>(() => new Array(3).fill(false))
  const toggleCheck = useCallback((i: number) => {
    setChecked(prev => { const next = [...prev]; next[i] = !next[i]; return next })
  }, [])

  const tocSections = [
    { id: 'overview',      label: 'Overview' },
    { id: 'steps',         label: 'Setup - 3 Steps' },
    { id: 'mission-check', label: 'Mission Check' },
  ]

  const cards = stepsData.cards
  const connectCard  = cards[0]
  const testCard     = cards[1]
  const bookCard     = cards[2]

  const checkSchedulePrompt: string = res['prompt-check-schedule'].content
  const findSlotPrompt: string      = res['prompt-find-slot'].content
  const sendInvitePrompt: string    = res['prompt-send-invite'].content

  const placeholders = [
    { tag: '[PARTNER EMAIL]',        hint: "Someone real - they'll get an actual invite" },
    { tag: '[your answer from Q1-Q5]', hint: 'Your findings from the mission data in Level 2' },
    { tag: '[your special tool]',    hint: 'The tool your Minion invented in Level 2' },
    { tag: '[Your name]',            hint: 'You, Chief Strategist, 1inMINION' },
  ]

  return (
    <>
      {showBriefing && (
        <LevelBriefingModal data={briefingData} onEnter={handleEnter} />
      )}

      <TableOfContents sections={tocSections} />

      <motion.main {...fadeUp} className="pt-20 pb-32 max-w-3xl mx-auto px-4 sm:px-6 space-y-16">

        {/* Header */}
        <section id="overview" className="space-y-4 pt-8">
          <p className="section-eyebrow">{briefingData.level.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            {briefingData.level.title}
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', lineHeight: 1.7, textAlign: 'justify' }}>
            {briefingData.level.subdescription}
          </p>
          <span className="pill-badge">⏱ {briefingData.level.duration.toUpperCase()}</span>
          <LevelBriefingSection data={briefingData} />
          <div style={{ borderTop: '1px solid var(--border)' }} />
        </section>

        {/* What are MCPs */}
        {/* <section id="mcps">
          <div className="rounded-xl p-6 space-y-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderLeft: '3px solid var(--yellow)' }}>
            <p className="font-mono font-bold text-xs tracking-widest" style={{ color: 'var(--yellow-text)' }}>// WHAT ARE MCPs?</p>
            <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', lineHeight: 1.75 }}>
              {briefingData.what_are_mcps}
            </p>
          </div>
        </section> */}

        {/* Steps */}
        <section id="steps" className="space-y-6">
          <p className="section-eyebrow">// SETUP - 3 STEPS</p>

          {/* Card 01: Connect Google Calendar */}
          <StepCard
            stepNumber={connectCard.card}
            title={connectCard.title}
            description={connectCard.description}
            checked={checked[0]}
            onCheck={() => toggleCheck(0)}
          >
            <div className="space-y-2">
              {(connectCard.steps ?? []).map((step, i) => (
                <div key={step.id} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}>
                  <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold text-xs mt-0.5" style={{ background: 'var(--yellow)', color: 'var(--text-primary)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-bold text-xs mb-0.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{step.short_title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="p-3 rounded-lg flex items-center gap-2" style={{ background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.25)' }}>
              <span>✅</span>
              <p className="text-xs font-mono font-bold" style={{ color: 'var(--green)' }}>
                Once connected - you&apos;re ready. Come back here.
              </p>
            </div> */}
          </StepCard>

          {/* Card 02: See What Your Minion Knows (2 prompts) */}
          <StepCard
            stepNumber={testCard.card}
            title={testCard.title}
            description={testCard.description}
            checked={checked[1]}
            onCheck={() => toggleCheck(1)}
          >
            <div className="space-y-2">
              <p className="font-mono text-xs font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>PROMPT 1</p>
              <PromptBlock label="CALENDAR PROMPT 1 - CHECK SCHEDULE" promptText={checkSchedulePrompt} variant="test" />
            </div>
            <div className="space-y-2">
              <p className="font-mono text-xs font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>PROMPT 2</p>
              <PromptBlock label="CALENDAR PROMPT 2 - FIND FREE SLOT" promptText={findSlotPrompt} variant="test" />
            </div>
            <div className="rounded-xl p-5 space-y-2 text-center" style={{ background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.25)' }}>
              <p className="text-base font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
                Your Minion just read your real calendar.
              </p>
              <p className="text-xs" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}>
                Not a sample. Not a demo. Your actual schedule. Now let&apos;s do something with it.
              </p>
            </div>
          </StepCard>

          {/* Card 03: Book the Heist Meeting */}
          <StepCard
            stepNumber={bookCard.card}
            title={bookCard.title}
            description={bookCard.description}
            checked={checked[2]}
            onCheck={() => toggleCheck(2)}
          >
            {/* Placeholder guide */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {placeholders.map(({ tag, hint }) => (
                <div key={tag} className="p-3 rounded-lg flex items-start gap-2" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}>
                  <code className="text-xs font-mono font-bold flex-shrink-0" style={{ color: 'var(--yellow-text)' }}>{tag}</code>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>{hint}</p>
                </div>
              ))}
            </div>

            <PromptBlock
              label="BOOKING PROMPT - FILL IN PLACEHOLDERS THEN COPY"
              promptText={sendInvitePrompt}
              variant="final"
            />

            <div className="rounded-xl p-5 space-y-2" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
              <p className="font-bold text-base" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
                One prompt. ChatGPT found the slot, booked the meeting, and sent the invite.
              </p>
              <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}>
                You didn&apos;t open your calendar. You didn&apos;t type a single event. You didn&apos;t write the agenda. That is an agent acting in the real world.
              </p>
            </div>
          </StepCard>
        </section>

        <div id="mission-check">
          <MissionCheck
            items={briefingData.mission_check}
            nextLevel="/submit"
            nextLabel="SUBMIT YOUR SUN HEIST PLAN TO VILLAIN HQ"
            levelNumber={4}
            isFinale
            checked={checked}
            onToggle={toggleCheck}
          />
        </div>
      </motion.main>
    </>
  )
}
