'use client'

import { useState, useCallback } from 'react'
import { ExternalLink, Download, Copy, Check, CheckSquare, Square } from 'lucide-react'
import { motion } from 'framer-motion'
import PromptBlock from '../PromptBlock'
import StepCard from '../StepCard'
import MissionCheck from '../MissionCheck'
import LevelBriefingModal from '../LevelBriefingModal'
import LevelBriefingSection from '../LevelBriefingSection'
import TableOfContents from '../TableOfContents'
import briefingData from '@/content/levels/level2/level_02_briefing.json'
import stepsData from '@/content/levels/level2/level_02_steps.json'
import resourcesData from '@/content/levels/level2/level_02_resources.json'

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, ease: 'easeOut' } }

// Resource lookup by id
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const res: Record<string, any> = Object.fromEntries(resourcesData.resources.map(r => [r.id, r]))

export default function Level2Page() {
  const [showBriefing, setShowBriefing] = useState(true)
  const handleEnter = () => setShowBriefing(false)

  // Shared checklist state — indices map to missionCheckItems in level2.ts
  // 0: created project  1: added instructions  2: uploaded data
  // 3-7: Q1-Q5          8: special tool
  const [checked, setChecked] = useState<boolean[]>(() => new Array(10).fill(false))
  const toggleCheck = useCallback((i: number) => {
    setChecked(prev => { const next = [...prev]; next[i] = !next[i]; return next })
  }, [])

  const [copiedId, setCopiedId] = useState<string | null>(null)
  const copyValue = useCallback((id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }, [])

  const projectInstructions: string = res['project-instructions'].content
  const missionData = res['mission-data'] as { filename: string; description: string }
  const meetMinionPrompt: string    = res['prompt-meet-minion'].content
  const testMemoryPrompt: string    = res['prompt-test-memory'].content
  const questions: Array<{ number: string; title: string; prompt: string }> = res['mission-questions'].questions
  const missionInstruction: string  = res['mission-questions'].instruction
  const specialToolContent: string  = res['prompt-special-tool'].content
  const specialToolLabel: string    = res['prompt-special-tool'].label
  const specialToolInstruction: string = res['prompt-special-tool'].instruction

  const tocSections = [
    { id: 'overview',      label: 'Overview' },
    { id: 'setup',         label: 'Setup — 5 Steps' },
    { id: 'questions',     label: '5 Mission Questions' },
    { id: 'special-tool',  label: 'The Final Question' },
    { id: 'mission-check', label: 'Mission Check' },
  ]

  // Cards from restructured steps JSON
  const cards = stepsData.cards
  const actionCard    = cards[0]   // card 01 — action sub-steps
  const copyCard      = cards[1]   // card 02 — add instructions
  const downloadCard  = cards[2]   // card 03 — upload data
  const combinedCard  = cards[3]   // card 04 — meet & test (merged)

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

        {/* Setup Steps */}
        <section id="setup" className="space-y-6">
          <p className="section-eyebrow">// SETUP - 5 STEPS</p>

          {/* Card 01: Create Your Project (action sub-steps) */}
          <StepCard stepNumber={actionCard.card} title={actionCard.title} checked={checked[0]} onCheck={() => toggleCheck(0)}>
            <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex">
              Open Claude <ExternalLink size={13} />
            </a>
            <div className="space-y-2">
              {(actionCard.steps ?? []).map((step, i) => (
                <div key={step.id} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}>
                  <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold text-xs mt-0.5" style={{ background: 'var(--yellow)', color: 'var(--text-primary)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-xs mb-0.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{step.short_title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>{step.description}</p>
                    {'copy_value' in step && step.copy_value && (
                      <div className="flex items-center gap-2 mt-2 pl-0">
                        <code className="flex-1 text-xs px-3 py-1.5 rounded-md font-mono" style={{ background: 'var(--bg-code)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                          {step.copy_value}
                        </code>
                        <button
                          onClick={() => copyValue(step.id, step.copy_value as string)}
                          className="flex-shrink-0 flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-mono font-bold transition-all duration-150"
                          style={{
                            background: copiedId === step.id ? 'rgba(5,150,105,0.1)' : 'var(--yellow)',
                            color: copiedId === step.id ? 'var(--green)' : 'var(--text-primary)',
                            border: copiedId === step.id ? '1px solid var(--green)' : 'none',
                          }}
                        >
                          {copiedId === step.id ? <><Check size={11} /> COPIED</> : <><Copy size={11} /> COPY</>}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </StepCard>

          {/* Card 02: Add Instructions */}
          <StepCard stepNumber={copyCard.card} title={copyCard.title} description={copyCard.description} checked={checked[1]} onCheck={() => toggleCheck(1)}>
            <PromptBlock
              label="PROJECT INSTRUCTIONS - PASTE INTO CLAUDE PROJECT"
              promptText={projectInstructions}
              variant="core"
              substituteMinion={true}
            />
            <div className="p-3 rounded-lg flex items-start gap-2" style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)' }}>
              <span>💡</span>
              <p className="text-xs" style={{ color: 'var(--blue)', fontFamily: 'var(--font-body)' }}>
                This is your Minion&apos;s permanent memory. Every new chat inside this Project starts with these instructions already loaded - no re-explaining needed.
              </p>
            </div>
          </StepCard>

          {/* Card 03: Upload Mission Data */}
          <StepCard stepNumber={downloadCard.card} title={downloadCard.title} description={downloadCard.description} checked={checked[2]} onCheck={() => toggleCheck(2)}>
            <a
              href="/files/minion_mission_data.csv"
              download={missionData.filename}
              className="flex items-center gap-4 p-5 rounded-xl transition-all duration-150"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--yellow)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,215,0,0.1)' }}>
                <Download size={22} style={{ color: 'var(--yellow)' }} />
              </div>
              <div className="flex-1">
                <p className="font-mono font-bold text-sm" style={{ color: 'var(--yellow)' }}>{missionData.filename}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                  {missionData.description}
                </p>
              </div>
              <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--yellow)', color: 'var(--text-primary)' }}>
                DOWNLOAD
              </span>
            </a>
            <div className="p-3 rounded-lg" style={{ background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.2)' }}>
              <p className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--yellow)' }}>⚠ Stay inside your Project </span>
                when you upload - not a regular chat. Your project name should be visible in the sidebar.
              </p>
            </div>
          </StepCard>

          {/* Card 04: Meet & Test Your Minion (combined) */}
          <StepCard
            stepNumber={combinedCard.card}
            title={combinedCard.title}
            description={combinedCard.description}
            checked={checked[3]}
            onCheck={() => toggleCheck(3)}
          >
            <div className="space-y-2">
              <p className="font-mono text-xs font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>PROMPT 1</p>
              <PromptBlock label="PROMPT - MEET YOUR MINION" promptText={meetMinionPrompt} variant="core" substituteMinion={true} />
            </div>
            <div className="space-y-2">
              <p className="font-mono text-xs font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>PROMPT 2</p>
              <PromptBlock label="PROMPT - TEST THE MEMORY" promptText={testMemoryPrompt} variant="core" />
            </div>
          </StepCard>
        </section>

        {/* 5 Mission Questions */}
        <section id="questions" className="space-y-8">
          <div>
            <p className="section-eyebrow">// NOW PUT IT TO WORK</p>
            <h2 className="text-3xl sm:text-4xl font-bold mt-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              Ask Your Minion 5 Questions.
            </h2>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
              {missionInstruction}
            </p>
          </div>

          <div className="space-y-6">
            {questions.map(({ number, title, prompt }, qi) => {
              const checkIdx = 4 + qi  // Q1→4, Q2→5, ... Q5→8
              return (
                <div key={number} className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm" style={{ background: 'var(--yellow)', color: 'var(--text-primary)' }}>
                        {number}
                      </span>
                      <h3 className="font-bold text-xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
                        {title}
                      </h3>
                    </div>
                    <button onClick={() => toggleCheck(checkIdx)} className="flex items-center gap-1.5 flex-shrink-0 transition-all duration-150" style={{ color: checked[checkIdx] ? 'var(--green)' : 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
                      {checked[checkIdx] ? <CheckSquare size={16} /> : <Square size={16} />}
                      <span className="hidden sm:inline">{checked[checkIdx] ? 'Done' : 'Mark done'}</span>
                    </button>
                  </div>
                  <PromptBlock
                    label={`${number} - ${title.toUpperCase()}`}
                    promptText={prompt}
                    variant="core"
                  />
                </div>
              )
            })}
          </div>
        </section>

        {/* Special Tool */}
        <section id="special-tool" className="space-y-5" style={{ borderTop: '2px solid var(--yellow)', paddingTop: 24 }}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="section-eyebrow">// THE FINAL QUESTION</p>
              <h2 className="text-3xl sm:text-4xl font-bold mt-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                {specialToolLabel}
              </h2>
              <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                {specialToolInstruction}
              </p>
            </div>
            <button onClick={() => toggleCheck(9)} className="flex-shrink-0 flex items-center gap-1.5 transition-all duration-150 mt-1" style={{ color: checked[9] ? 'var(--green)' : 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 11, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              {checked[9] ? <CheckSquare size={18} /> : <Square size={18} />}
              <span className="hidden sm:inline">{checked[9] ? 'Done' : 'Mark done'}</span>
            </button>
          </div>

          <PromptBlock
            label="SPECIAL TOOL - ASK AFTER Q5"
            promptText={specialToolContent}
            variant="final"
          />
        </section>

        <div id="mission-check">
          <MissionCheck
            items={briefingData.mission_check}
            nextLevel="/level/3"
            nextLabel="ADVANCE TO LEVEL 03: POWER UP"
            levelNumber={2}
            checked={checked}
            onToggle={toggleCheck}
          />
        </div>
      </motion.main>
    </>
  )
}
