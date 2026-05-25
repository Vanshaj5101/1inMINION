'use client'

import { useState, useCallback } from 'react'
import { Download, CheckSquare, Square } from 'lucide-react'
import { motion } from 'framer-motion'
import PromptBlock from '../PromptBlock'
import StepCard from '../StepCard'
import MissionCheck from '../MissionCheck'
import LevelBriefingModal from '../LevelBriefingModal'
import LevelBriefingSection from '../LevelBriefingSection'
import TableOfContents from '../TableOfContents'
import briefingData from '@/content/levels/level3/level_03_briefing.json'
import stepsData from '@/content/levels/level3/level_03_steps.json'
import resourcesData from '@/content/levels/level3/level_03_resources.json'

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, ease: 'easeOut' } }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const res: Record<string, any> = Object.fromEntries(resourcesData.resources.map(r => [r.id, r]))

export default function Level3Page() {
  const [showBriefing, setShowBriefing] = useState(true)
  const handleEnter = () => setShowBriefing(false)

  // checked[0]: card 01 — ran without skill
  // checked[1]: card 02 — uploaded skill
  // checked[2]: card 03 — ran with skill
  // checked[3]: saw the difference
  // checked[4]: minion asked questions
  const [checked, setChecked] = useState<boolean[]>(() => new Array(4).fill(false))
  const toggleCheck = useCallback((i: number) => {
    setChecked(prev => { const next = [...prev]; next[i] = !next[i]; return next })
  }, [])

  const tocSections = [
    { id: 'overview',      label: 'Overview' },
    { id: 'steps',         label: 'Setup - 3 Steps' },
    { id: 'reveal',        label: 'The Difference' },
    { id: 'mission-check', label: 'Mission Check' },
  ]

  const cards = stepsData.cards
  const noSkillCard   = cards[0]
  const addSkillCard  = cards[1]
  const withSkillCard = cards[2]

  const noSkillPrompt: string   = res['prompt-no-skill'].content
  const withSkillPrompt: string = res['prompt-with-skill'].content
  const skillFile               = res['skill-file'] as { filename: string; description: string }

  const { reveal } = briefingData

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

        {/* Steps */}
        <section id="steps" className="space-y-6">
          <p className="section-eyebrow">// SETUP - 3 STEPS</p>

          {/* Card 01: Run Without Skill */}
          <StepCard
            stepNumber={noSkillCard.card}
            title={noSkillCard.title}
            description={noSkillCard.description}
            checked={checked[0]}
            onCheck={() => toggleCheck(0)}
          >
            <PromptBlock
              label="PITCH PROMPT - RUN WITHOUT SKILL"
              promptText={noSkillPrompt}
              variant="test"
            />
            <div className="p-4 rounded-lg flex items-start gap-3" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}>
              <span className="text-base flex-shrink-0">👀</span>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                Claude builds immediately. No questions. It guesses what to include, how to structure it, what tone to use. Save the output - you will compare it in Step 3.
              </p>
            </div>
          </StepCard>

          {/* Card 02: Add the Skill */}
          <StepCard
            stepNumber={addSkillCard.card}
            title={addSkillCard.title}
            description={addSkillCard.description}
            checked={checked[1]}
            onCheck={() => toggleCheck(1)}
          >
            {/* Action sub-steps */}
            <div className="space-y-2">
              {(addSkillCard.steps ?? []).map((step, i) => (
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

            {/* Download */}
            <a
              href="/files/pitch_skill.md"
              download={skillFile.filename}
              className="flex items-center gap-4 p-5 rounded-xl transition-all duration-150"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--yellow)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,215,0,0.1)' }}>
                <Download size={22} style={{ color: 'var(--yellow)' }} />
              </div>
              <div className="flex-1">
                <p className="font-mono font-bold text-sm" style={{ color: 'var(--yellow)' }}>{skillFile.filename}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                  {skillFile.description}
                </p>
              </div>
              <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--yellow)', color: 'var(--text-primary)' }}>
                DOWNLOAD
              </span>
            </a>
          </StepCard>

          {/* Card 03: Run Same Prompt Again */}
          <StepCard
            stepNumber={withSkillCard.card}
            title={withSkillCard.title}
            description={withSkillCard.description}
            checked={checked[2]}
            onCheck={() => toggleCheck(2)}
          >
            <PromptBlock
              label="SAME PROMPT - RUN AGAIN WITH SKILL LOADED"
              promptText={withSkillPrompt}
              variant="core"
            />
            <div className="p-4 rounded-lg flex items-start gap-3" style={{ background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.25)' }}>
              <span className="text-base flex-shrink-0">✅</span>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                Claude now asks you 4 questions before touching the deck. It waits for your answers. The output it builds is shaped by what YOU said matters - not what Claude guessed.
              </p>
            </div>
          </StepCard>
        </section>

        {/* The Difference */}
        <section id="reveal" className="space-y-5" style={{ borderTop: '2px solid var(--yellow)', paddingTop: 24 }}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="section-eyebrow">// THE DIFFERENCE</p>
              <h2 className="text-3xl sm:text-4xl font-bold mt-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                Before vs After.
              </h2>
              <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                Compare both outputs side by side. Notice what changed.
              </p>
            </div>
            <button
              onClick={() => toggleCheck(3)}
              className="flex-shrink-0 flex items-center gap-1.5 transition-all duration-150 mt-1"
              style={{ color: checked[3] ? 'var(--green)' : 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 11, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              {checked[3] ? <CheckSquare size={18} /> : <Square size={18} />}
              <span className="hidden sm:inline">{checked[3] ? 'Done' : 'Mark done'}</span>
            </button>
          </div>

          <div className="comparison-grid">
            <div className="rounded-xl p-5 space-y-3" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
              <p className="font-mono font-bold text-xs tracking-widest" style={{ color: 'var(--text-secondary)' }}>
                {reveal.without.label}
              </p>
              <ul className="space-y-2">
                {reveal.without.points.map((pt, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}>
                    <span style={{ color: '#D1D5DB' }}>✗</span> {pt}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl p-5 space-y-3" style={{ background: 'rgba(255,215,0,0.06)', border: '2px solid var(--yellow)' }}>
              <p className="font-mono font-bold text-xs tracking-widest" style={{ color: 'var(--yellow)' }}>
                {reveal.with.label}
              </p>
              <ul className="space-y-2">
                {reveal.with.points.map((pt, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm font-bold" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}>
                    <span style={{ color: 'var(--yellow)' }}>✓</span> {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-xl p-6 text-center space-y-3" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
            <p className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
              {reveal.insight}
            </p>
            <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}>
              {reveal.reuse}
            </p>
          </div>
        </section>

        <div id="mission-check">
          <MissionCheck
            items={briefingData.mission_check}
            nextLevel="/level/4"
            nextLabel="ADVANCE TO LEVEL 04: GO ROGUE"
            levelNumber={3}
            checked={checked}
            onToggle={toggleCheck}
          />
        </div>
      </motion.main>
    </>
  )
}
