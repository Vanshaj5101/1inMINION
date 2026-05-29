'use client'

import { useState, useCallback } from 'react'
import { Download, Copy, Check, CheckSquare, Square } from 'lucide-react'
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

  // checked[0]: steps 01–08 — GPT built
  // checked[1]: step 09 — ran with GPT
  const [checked, setChecked] = useState<boolean[]>(() => new Array(2).fill(false))
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

  const tocSections = [
    { id: 'overview',      label: 'Overview' },
    { id: 'build',         label: 'Build Your Custom GPT' },
    { id: 'run',           label: 'Run Your Custom GPT' },
    { id: 'mission-check', label: 'Mission Check' },
  ]

  const gptName: string        = res['gpt-name'].content
  const gptDescription: string = res['gpt-description'].content
  const gptInstructions        = res['gpt-instructions'] as { filename: string; description: string }
  const withGptPrompt: string  = res['prompt-with-gpt'].content
  const withGptInstruction: string = res['prompt-with-gpt'].instruction
  const withGptNote: string    = res['prompt-with-gpt'].note

  // Steps 01–08 (build the GPT)
  const buildSteps = stepsData.steps.filter(s => s.id !== 'step-09')

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

        {/* Build Your Custom GPT */}
        <section id="build" className="space-y-6">
          <p className="section-eyebrow">// BUILD YOUR CUSTOM GPT</p>
          <StepCard
            stepNumber="01"
            title="Create Your 1inMINION Project Manager"
            description="Follow these steps to build and configure your Custom GPT."
            checked={checked[0]}
            onCheck={() => toggleCheck(0)}
          >
            <div className="space-y-2">
              {buildSteps.map((step, i) => (
                <div key={step.id} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}>
                  <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold text-xs mt-0.5" style={{ background: 'var(--yellow)', color: 'var(--text-primary)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div>
                      <p className="font-bold text-xs mb-0.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{step.short_title}</p>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>{step.description}</p>
                    </div>

                    {/* Copy — GPT Name */}
                    {step.id === 'step-04' && (
                      <div className="flex items-center gap-2">
                        <code className="flex-1 text-xs px-3 py-1.5 rounded-md font-mono" style={{ background: 'var(--bg-code)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                          {gptName}
                        </code>
                        <button
                          onClick={() => copyValue('gpt-name', gptName)}
                          className="flex-shrink-0 flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-mono font-bold transition-all duration-150"
                          style={{
                            background: copiedId === 'gpt-name' ? 'rgba(5,150,105,0.1)' : 'var(--yellow)',
                            color: copiedId === 'gpt-name' ? 'var(--green)' : 'var(--text-primary)',
                            border: copiedId === 'gpt-name' ? '1px solid var(--green)' : 'none',
                          }}
                        >
                          {copiedId === 'gpt-name' ? <><Check size={11} /> COPIED</> : <><Copy size={11} /> COPY</>}
                        </button>
                      </div>
                    )}

                    {/* Copy — GPT Description */}
                    {step.id === 'step-05' && (
                      <div className="flex items-center gap-2">
                        <code className="flex-1 text-xs px-3 py-1.5 rounded-md font-mono" style={{ background: 'var(--bg-code)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                          {gptDescription}
                        </code>
                        <button
                          onClick={() => copyValue('gpt-description', gptDescription)}
                          className="flex-shrink-0 flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-mono font-bold transition-all duration-150"
                          style={{
                            background: copiedId === 'gpt-description' ? 'rgba(5,150,105,0.1)' : 'var(--yellow)',
                            color: copiedId === 'gpt-description' ? 'var(--green)' : 'var(--text-primary)',
                            border: copiedId === 'gpt-description' ? '1px solid var(--green)' : 'none',
                          }}
                        >
                          {copiedId === 'gpt-description' ? <><Check size={11} /> COPIED</> : <><Copy size={11} /> COPY</>}
                        </button>
                      </div>
                    )}

                    {/* Download — Instructions file */}
                    {step.id === 'step-06' && (
                      <a
                        href="/files/custom_gpt_project_manager.txt"
                        download={gptInstructions.filename}
                        className="flex items-center gap-3 p-4 rounded-xl transition-all duration-150"
                        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', textDecoration: 'none' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--yellow)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,215,0,0.1)' }}>
                          <Download size={20} style={{ color: 'var(--yellow)' }} />
                        </div>
                        <div className="flex-1">
                          <p className="font-mono font-bold text-sm" style={{ color: 'var(--yellow-text)' }}>{gptInstructions.filename}</p>
                          <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>{gptInstructions.description}</p>
                        </div>
                        <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--yellow)', color: 'var(--text-primary)' }}>
                          DOWNLOAD
                        </span>
                      </a>
                    )}

                    {/* Capabilities screenshot */}
                    {step.id === 'step-07' && (
                      <div className="space-y-2">
                        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)', maxWidth: 360 }}>
                          <img src="/chatgpt_capabilities.png" alt="All capabilities checked in GPT builder" style={{ width: '100%', display: 'block' }} />
                        </div>
                        <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>Make sure all 5 capabilities are checked.</p>
                      </div>
                    )}

                    {/* Configured interface screenshot */}
                    {step.id === 'step-07' && (
                      <div className="space-y-2 pt-1">
                        <p className="text-xs font-mono font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>YOUR CONFIGURE SCREEN SHOULD LOOK LIKE THIS</p>
                        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                          <img src="/chatgpt_gpt_configure.png" alt="GPT Configure screen with name, description, and instructions filled in" style={{ width: '100%', display: 'block' }} />
                        </div>
                      </div>
                    )}

                    {/* GPT saved screenshot */}
                    {step.id === 'step-08' && (
                      <div className="space-y-2">
                        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                          <img src="/chatgpt_gpt_saved.png" alt="GPT Updated dialog with View GPT button" style={{ width: '100%', display: 'block' }} />
                        </div>
                        <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>Click View GPT to open your new Custom GPT.</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </StepCard>
        </section>

        {/* Run Your Custom GPT */}
        <section id="run" className="space-y-6">
          <p className="section-eyebrow">// RUN YOUR CUSTOM GPT</p>
          <StepCard
            stepNumber="02"
            title="Run Your Custom GPT"
            checked={checked[1]}
            onCheck={() => toggleCheck(1)}
          >
            {/* Upload reminder — highlighted */}
            <div
              className="flex items-start gap-3 p-4 rounded-xl"
              style={{
                background: 'var(--yellow)',
                boxShadow: '0 0 0 3px rgba(242,155,28,0.25)',
              }}
            >
              <span className="text-xl flex-shrink-0">📎</span>
              <p className="text-sm font-bold leading-relaxed" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
                Upload your mission debrief .txt file from Level 2 into the chat first — then send this prompt.
              </p>
            </div>

            <div className="space-y-2">
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                <img src="/level3_run_custom_gpt.png" alt="1inMINION Project Manager with mission debrief file attached and prompt ready to send" style={{ width: '100%', display: 'block' }} />
              </div>
              <p className="text-xs font-mono text-center" style={{ color: 'var(--text-muted)' }}>
                Attach your mission_debrief.txt, then send the prompt below.
              </p>
            </div>

            <PromptBlock
              label="PROMPT — PASTE INTO YOUR CUSTOM GPT"
              promptText={withGptPrompt}
              variant="core"
            />
            <div className="p-4 rounded-lg flex items-start gap-3" style={{ background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.25)' }}>
              <span className="text-base flex-shrink-0">✅</span>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                {withGptNote}
              </p>
            </div>
          </StepCard>
        </section>

        <div id="mission-check">
          {/* Level 04 temporarily hidden — restore when ready:
          <MissionCheck
            items={briefingData.mission_check}
            nextLevel="/level/4"
            nextLabel="ADVANCE TO LEVEL 04: GO ROGUE"
            levelNumber={3}
            checked={checked}
            onToggle={toggleCheck}
          /> */}
          <MissionCheck
            items={briefingData.mission_check}
            nextLevel="/"
            nextLabel="MISSION COMPLETE — RETURN TO BASE"
            levelNumber={3}
            isFinale={true}
            checked={checked}
            onToggle={toggleCheck}
          />
        </div>

      </motion.main>
    </>
  )
}
