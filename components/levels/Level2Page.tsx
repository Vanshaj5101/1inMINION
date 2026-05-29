'use client'

import { useState, useCallback } from 'react'
import { ExternalLink, Download, Copy, Check, CheckSquare, Square, FileText } from 'lucide-react'
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
  const [checked, setChecked] = useState<boolean[]>(() => new Array(11).fill(false))
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
  const questions: Array<{ number: string; title: string; prompt?: string; selfGuided?: boolean }> = res['mission-questions'].questions
  const missionInstruction: string  = res['mission-questions'].instruction
  const specialToolContent: string  = res['prompt-special-tool'].content
  const specialToolLabel: string    = res['prompt-special-tool'].label
  const specialToolInstruction: string = res['prompt-special-tool'].instruction
  const debriefContent: string      = res['prompt-create-txt'].content
  const debriefInstruction: string  = res['prompt-create-txt'].instruction
  const debriefNote: string         = res['prompt-create-txt'].note

  const tocSections = [
    { id: 'overview',      label: 'Overview' },
    { id: 'setup',         label: 'Setup — 5 Steps' },
    { id: 'questions',     label: '5 Mission Questions' },
    { id: 'special-tool',  label: 'The Final Question' },
    { id: 'debrief',       label: 'Mission Debrief' },
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
            <a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex">
              Open ChatGPT <ExternalLink size={13} />
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
                    {'copy_value' in step && typeof step.copy_value === 'string' && step.copy_value && (
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

            {/* Create project modal screenshot */}
            <div className="space-y-2">
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                <img
                  src="/chatgpt_create_project.png"
                  alt="ChatGPT Create project modal with project name field"
                  style={{ width: '100%', display: 'block' }}
                />
              </div>
              <p className="text-xs font-mono text-center" style={{ color: 'var(--text-muted)' }}>
                Name it after your Minion and click Create project.
              </p>
            </div>

            {/* Project created screenshot */}
            <div className="space-y-2">
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                <img
                  src="/chatgpt_project_created.png"
                  alt="ChatGPT project interface showing Chats and Sources tabs"
                  style={{ width: '100%', display: 'block' }}
                />
              </div>
              <p className="text-xs font-mono text-center" style={{ color: 'var(--text-muted)' }}>
                Your screen should look like this after creating the project.
              </p>
            </div>
          </StepCard>

          {/* Card 02: Add Instructions */}
          <StepCard stepNumber={copyCard.card} title={copyCard.title} description={copyCard.description} checked={checked[1]} onCheck={() => toggleCheck(1)}>
            {(copyCard.steps ?? []).length > 0 && (
              <div className="space-y-2">
                {(copyCard.steps ?? []).map((step, i) => (
                  <div key={step.id} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}>
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold text-xs mt-0.5" style={{ background: 'var(--yellow)', color: 'var(--text-primary)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-xs mb-0.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{step.short_title}</p>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <PromptBlock
              label="PROJECT INSTRUCTIONS — PASTE INTO PROJECT SETTINGS"
              promptText={projectInstructions}
              variant="core"
              substituteMinion={true}
            />
            {/* Project settings screenshot */}
            <div className="space-y-2">
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                <img
                  src="/chatgpt_project_settings.png"
                  alt="ChatGPT Project settings modal showing Instructions field"
                  style={{ width: '100%', display: 'block' }}
                />
              </div>
              <p className="text-xs font-mono text-center" style={{ color: 'var(--text-muted)' }}>
                Paste the instructions here, then click Save.
              </p>
            </div>
            <div className="p-3 rounded-lg flex items-start gap-2" style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)' }}>
              <span>💡</span>
              <p className="text-xs" style={{ color: 'var(--blue)', fontFamily: 'var(--font-body)' }}>
                This is your Minion&apos;s permanent memory. Every new chat inside this Project starts with these instructions already loaded — no re-explaining needed.
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
                <p className="font-mono font-bold text-sm" style={{ color: 'var(--yellow-text)' }}>{missionData.filename}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                  {missionData.description}
                </p>
              </div>
              <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--yellow)', color: 'var(--text-primary)' }}>
                DOWNLOAD
              </span>
            </a>
            {/* Sources tab empty screenshot */}
            <div className="space-y-2">
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                <img
                  src="/chatgpt_sources_empty.png"
                  alt="ChatGPT Sources tab showing Add sources button"
                  style={{ width: '100%', display: 'block' }}
                />
              </div>
              <p className="text-xs font-mono text-center" style={{ color: 'var(--text-muted)' }}>
                Click Sources, then Add sources to upload the file.
              </p>
            </div>

            <div className="p-3 rounded-lg" style={{ background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.2)' }}>
              <p className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--yellow-text)' }}>⚠ Stay inside your Project </span>
                when you upload — not a regular chat. Your project name should be visible at the top.
              </p>
            </div>

            {/* Sources with data screenshot */}
            <div className="space-y-2">
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                <img
                  src="/chatgpt_sources_with_data.png"
                  alt="ChatGPT Sources tab showing minion_mission_data.csv uploaded"
                  style={{ width: '100%', display: 'block' }}
                />
              </div>
              <p className="text-xs font-mono text-center" style={{ color: 'var(--text-muted)' }}>
                Your screen should look like this once the file is uploaded.
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
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>{combinedCard.prompts?.[0]?.description}</p>
              <PromptBlock label="PROMPT - MEET YOUR MINION" promptText={meetMinionPrompt} variant="core" substituteMinion={true} />
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                <img src="/chatgpt_prompt1_sent.png" alt="ChatGPT project with first prompt typed in" style={{ width: '100%', display: 'block' }} />
              </div>
            </div>

            {/* Between prompts — new chat instruction */}
            <div className="flex items-start gap-3 p-4 rounded-lg" style={{ background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.2)' }}>
              <span className="text-base flex-shrink-0">💬</span>
              <div className="space-y-3 flex-1">
                <p className="text-sm font-bold" style={{ color: 'var(--yellow-text)', fontFamily: 'var(--font-body)' }}>
                  Click the project name at the top left corner of the screen to go back to the project homescreen.
                </p>
                <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                  <img src="/chatgpt_project_header.png" alt="ChatGPT project name header at top left" style={{ width: '100%', display: 'block' }} />
                </div>
                <p className="text-sm font-bold" style={{ color: 'var(--yellow-text)', fontFamily: 'var(--font-body)' }}>
                  From the project homescreen, type Prompt 2 in the chat input to start a new chat.
                </p>
                <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                  <img src="/chatgpt_prompt2_ready.png" alt="ChatGPT project homescreen with Prompt 2 typed in" style={{ width: '100%', display: 'block' }} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-mono text-xs font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>PROMPT 2</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>{combinedCard.prompts?.[1]?.description}</p>
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

          <div className="space-y-4">
            {questions.map(({ number, title, prompt, selfGuided }, qi) => {
              const checkIdx = 4 + qi
              const isDone = checked[checkIdx]
              return (
                <div
                  key={number}
                  className="rounded-lg p-5 flex flex-col gap-4 transition-all duration-300"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: `1px solid ${isDone ? 'var(--green)' : 'var(--border)'}`,
                    borderLeft: `2px solid ${isDone ? 'var(--green)' : 'var(--yellow)'}`,
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm" style={{ background: isDone ? 'var(--green)' : 'var(--yellow)', color: isDone ? 'white' : 'var(--text-primary)' }}>
                        {number}
                      </span>
                      <h3 className="font-bold text-xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
                        {title}
                      </h3>
                    </div>
                    <button onClick={() => toggleCheck(checkIdx)} className="flex items-center gap-1.5 flex-shrink-0 transition-all duration-150" style={{ color: isDone ? 'var(--green)' : 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 11, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                      {isDone ? <CheckSquare size={18} /> : <Square size={18} />}
                      <span className="hidden sm:inline">{isDone ? 'Done' : 'Mark done'}</span>
                    </button>
                  </div>
                  {selfGuided ? (
                    <div className="flex items-start gap-3 p-4 rounded-lg" style={{ background: 'rgba(242,155,28,0.06)', border: '1px dashed rgba(242,155,28,0.4)' }}>
                      <span className="text-base flex-shrink-0">🧠</span>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                        <span className="font-bold" style={{ color: 'var(--yellow-text)' }}>Your turn. </span>
                        Ask your Minion this question yourself — in your own words. There&apos;s no right way to phrase it. Try it, see what comes back, and adjust from there.
                      </p>
                    </div>
                  ) : (
                    <PromptBlock
                      label={`${number} - ${title.toUpperCase()}`}
                      promptText={prompt!}
                      variant="core"
                    />
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Special Tool */}
        <section id="special-tool" style={{ borderTop: '2px solid var(--yellow)', paddingTop: 24 }}>
          <p className="section-eyebrow mb-4">// THE FINAL QUESTION</p>
          <div
            className="rounded-lg p-5 flex flex-col gap-4 transition-all duration-300"
            style={{
              background: 'var(--bg-secondary)',
              border: `1px solid ${checked[9] ? 'var(--green)' : 'var(--border)'}`,
              borderLeft: `2px solid ${checked[9] ? 'var(--green)' : 'var(--yellow)'}`,
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
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
          </div>
        </section>

        {/* Mission Debrief — highlighted activity */}
        <section id="debrief">
          <div
            className="rounded-xl overflow-hidden"
            style={{
              border: '2px solid var(--yellow)',
              boxShadow: '0 0 0 4px rgba(242,155,28,0.12), 0 8px 32px rgba(242,155,28,0.18)',
              animation: 'shadowPulse 2.2s ease-in-out infinite',
            }}
          >
            {/* Header stripe */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ background: 'var(--yellow)' }}
            >
              <div className="flex items-center gap-3">
                <FileText size={20} style={{ color: 'var(--text-primary)', flexShrink: 0 }} />
                <div>
                  <p className="font-mono font-bold text-xs tracking-widest" style={{ color: 'rgba(0,0,0,0.5)', letterSpacing: '0.16em' }}>
                    // DO THIS BEFORE YOU LEAVE
                  </p>
                  <p className="font-bold text-lg leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
                    Create Your Mission Debrief File
                  </p>
                </div>
              </div>
              <button
                onClick={() => toggleCheck(10)}
                className="flex-shrink-0 flex items-center gap-1.5 transition-all duration-150"
                style={{ color: checked[10] ? 'var(--green)' : 'rgba(0,0,0,0.45)', fontFamily: 'var(--font-mono)', fontSize: 11, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                {checked[10] ? <CheckSquare size={20} /> : <Square size={20} />}
                <span className="hidden sm:inline font-bold">{checked[10] ? 'Done' : 'Mark done'}</span>
              </button>
            </div>

            {/* Body */}
            <div
              className="px-5 py-5 flex flex-col gap-4"
              style={{ background: 'var(--bg-warm)' }}
            >
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                {debriefInstruction}
              </p>

              <PromptBlock
                label="MISSION DEBRIEF — COMPILE EVERYTHING"
                promptText={debriefContent}
                variant="final"
              />

              {/* Note — standout box */}
              <div
                className="flex items-start gap-3 p-4 rounded-lg"
                style={{ background: 'rgba(242,155,28,0.12)', border: '1.5px solid rgba(242,155,28,0.5)' }}
              >
                <span className="text-lg flex-shrink-0">💾</span>
                <p className="text-sm font-bold leading-relaxed" style={{ color: 'var(--yellow-text)', fontFamily: 'var(--font-body)' }}>
                  {debriefNote}
                </p>
              </div>
            </div>
          </div>
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
