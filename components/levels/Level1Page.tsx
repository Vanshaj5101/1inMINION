'use client'

import { useState } from 'react'
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { motion } from 'framer-motion'
import PromptBlock from '../PromptBlock'
import StepCard from '../StepCard'
import ChallengeCard from '../ChallengeCard'
import MissionCheck from '../MissionCheck'
import { level1 } from '@/lib/content/level1'

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, ease: 'easeOut' } }

export default function Level1Page() {
  const [openLayer, setOpenLayer] = useState(0)
  const [advancedOpen, setAdvancedOpen] = useState(false)

  return (
    <motion.main {...fadeUp} className="pt-20 pb-32 max-w-3xl mx-auto px-4 sm:px-6 space-y-16">

      {/* Level Header */}
      <section className="space-y-4 pt-8">
        <p className="section-eyebrow">{level1.header.eyebrow}</p>
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight whitespace-pre-line">{level1.header.title}</h1>
        <p className="text-lg leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>{level1.header.subtitle}</p>
        <span className="pill-badge">{level1.header.duration}</span>
        <div style={{ borderTop: '1px solid var(--border)' }} />
      </section>

      {/* Part 1 */}
      <section className="space-y-6">
        <div>
          <p className="section-eyebrow">// PART 01 — SEE THE DIFFERENCE</p>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Run these prompts in Claude. See what bad vs good looks like.</p>
        </div>

        <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex">
          OPEN CLAUDE.AI <ExternalLink size={12} />
        </a>

        <StepCard stepNumber="01" title="Give Your Minion a Bad Order" description="Copy this prompt. Paste it into Claude. Hit enter. Read the output. Notice: vague, generic, could be anything. This is your Minion with no guidance.">
          <PromptBlock label="BAD PROMPT 01" promptText={level1.badPrompt} variant="test" />
        </StepCard>

        <StepCard stepNumber="02" title="Now Give a Proper Order" description="Copy this improved version. Paste it into the SAME Claude chat. Compare the outputs side by side. Same Claude. Different result.">
          <PromptBlock label="GOOD PROMPT 01" promptText={level1.goodPrompt} variant="core" />
        </StepCard>

        {/* What Changed insight */}
        <div className="rounded-lg p-5 space-y-3" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderLeft: '3px solid var(--yellow)' }}>
          <p className="font-mono font-bold text-xs tracking-widest" style={{ color: 'var(--yellow)' }}>// WHAT CHANGED?</p>
          <div className="space-y-1.5">
            {['Role — you told Claude who it is', 'Context — you gave Claude your world', 'Task — you were specific about what you need', 'Format — you designed the output shape', 'Constraints — you added boundaries'].map((line, i) => (
              <p key={i} className="text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--yellow)' }}>→ </span>{line}
              </p>
            ))}
          </div>
          <p className="text-sm font-mono font-bold mt-2" style={{ color: 'var(--text-primary)' }}>That's 5 ingredients. Remember them.</p>
        </div>
      </section>

      {/* Part 2 — The 5 Ingredients */}
      <section className="space-y-6">
        <div>
          <p className="section-eyebrow">// PART 02 — THE 5 INGREDIENTS</p>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Every powerful prompt has these 5 things. Learn them once. Use them forever.</p>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2">
          {level1.ingredients.map(ing => (
            <div
              key={ing.number}
              className="flex-shrink-0 w-44 rounded-lg p-4 space-y-2 transition-all duration-200 hover:border-accent-yellow hover:shadow-yellow-sm"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
            >
              <span className="font-mono font-bold text-xl" style={{ color: 'var(--yellow)' }}>{ing.number}</span>
              <p className="font-bold text-base">{ing.name}</p>
              <p className="text-xs leading-snug" style={{ color: 'var(--text-secondary)' }}>{ing.explanation}</p>
              <p className="text-xs font-mono italic" style={{ color: 'var(--yellow)', opacity: 0.8 }}>{ing.example}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Part 3 — Progressive Layers */}
      <section className="space-y-6">
        <div>
          <p className="section-eyebrow">// PART 03 — BUILD YOUR MISSION PROMPT</p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Add one layer at a time. Run it after each layer. Watch your Minion improve with every step.
            <br /><br />
            🍌 Your mission: Help plan Operation: Steal the Sun. Gru needs a strategic advisor for the heist.
          </p>
        </div>

        {/* Layer progress indicator */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {level1.layers.map((layer, i) => (
            <button
              key={layer.id}
              onClick={() => setOpenLayer(i)}
              className="flex-shrink-0 px-3 py-1.5 rounded font-mono text-xs font-bold tracking-widest transition-all duration-150"
              style={{
                background: openLayer === i ? 'var(--yellow)' : 'transparent',
                color: openLayer === i ? '#0F0F1A' : 'var(--text-secondary)',
                border: `1px solid ${openLayer === i ? 'var(--yellow)' : 'var(--border)'}`,
              }}
            >
              {layer.id}
            </button>
          ))}
        </div>

        {/* Accordion layers */}
        <div className="space-y-3">
          {level1.layers.map((layer, i) => (
            <div
              key={layer.id}
              className="rounded-lg overflow-hidden transition-all duration-200"
              style={{ background: 'var(--bg-secondary)', border: `1px solid ${openLayer === i ? 'var(--yellow)' : 'var(--border)'}` }}
            >
              <button
                onClick={() => setOpenLayer(openLayer === i ? -1 : i)}
                className="w-full flex items-center justify-between px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  {layer.status && (
                    <span className="font-mono text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(233,149,10,0.09)', color: 'var(--yellow)', border: '1px solid rgba(255,215,0,0.3)' }}>
                      {layer.status}
                    </span>
                  )}
                  <span className="font-mono font-bold text-sm" style={{ color: openLayer === i ? 'var(--yellow)' : 'var(--text-muted)' }}>
                    {layer.label}
                  </span>
                </div>
                {openLayer === i ? <ChevronUp size={16} style={{ color: 'var(--yellow)' }} /> : <ChevronDown size={16} style={{ color: 'var(--text-secondary)' }} />}
              </button>

              {openLayer === i && (
                <div className="px-5 pb-6 space-y-5">
                  <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>{layer.explanation}</p>

                  {layer.pairActivity ? (
                    <div className="space-y-4">
                      <div className="rounded-lg p-4" style={{ background: 'rgba(233,149,10,0.06)', border: '1px solid rgba(233,149,10,0.2)' }}>
                        <p className="font-mono font-bold text-xs mb-2" style={{ color: 'var(--yellow)' }}>🍌 PAIR ACTIVITY</p>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          Person A: use the prompt on the left<br />
                          Person B: use the prompt on the right<br />
                          Compare your outputs. Whose role produced the better strategy? Discuss for 60 seconds.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <PromptBlock label={layer.labelA!} promptText={layer.promptA!} variant="core" />
                        <PromptBlock label={layer.labelB!} promptText={layer.promptB!} variant="core" />
                      </div>
                    </div>
                  ) : (
                    <PromptBlock label={layer.label} promptText={layer.prompt!} variant="core" />
                  )}

                  {layer.tip && (
                    <div className="rounded-lg p-4" style={{ background: 'rgba(29,91,212,0.06)', border: '1px solid rgba(29,91,212,0.2)' }}>
                      <p className="text-sm leading-relaxed whitespace-pre-line font-mono" style={{ color: 'var(--blue)' }}>{layer.tip}</p>
                    </div>
                  )}

                  {layer.whatChanged && (
                    <p className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--yellow)' }}>// WHAT CHANGED: </span>{layer.whatChanged}
                    </p>
                  )}

                  {layer.id === 'L5' && (
                    <div className="rounded-lg p-5 space-y-2" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--yellow)' }}>
                      <p className="font-mono font-bold text-xs tracking-widest" style={{ color: 'var(--yellow)' }}>// THE REVEAL</p>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        Now compare your Layer 00 and Layer 05 outputs.<br /><br />
                        Same Claude. Same mission.<br />
                        5 layers added. Completely different output.<br /><br />
                        Nothing changed except the prompt.<br />
                        That's prompt engineering.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Advanced Section */}
      <section>
        <button
          onClick={() => setAdvancedOpen(o => !o)}
          className="w-full flex items-center justify-between px-5 py-4 rounded-lg mb-4 transition-all duration-200"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-purple)' }}
        >
          <p className="font-mono font-bold text-xs tracking-widest" style={{ color: 'var(--red)' }}>
            // ADVANCED TRAINING — CLASSIFIED
          </p>
          <div className="classified-stamp" style={{ position: 'relative', top: 'auto', right: 'auto', transform: 'rotate(-15deg)', display: 'inline-block' }}>
            CLASSIFIED
          </div>
          {advancedOpen ? <ChevronUp size={16} style={{ color: 'var(--purple)' }} /> : <ChevronDown size={16} style={{ color: 'var(--purple)' }} />}
        </button>

        {advancedOpen && (
          <ChallengeCard variant="advanced" title="ADVANCED VILLAIN CHALLENGE">
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <p>Choose ONE of these advanced techniques and apply it to your Layer 05 prompt:</p>
              <div className="space-y-4">
                <div className="p-4 rounded-lg" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}>
                  <p className="font-mono font-bold text-xs mb-2" style={{ color: 'var(--purple)' }}>Option A — Few-Shot Examples</p>
                  <PromptBlock label="OPTION A" promptText={level1.advancedPrompts.optionA} variant="advanced" />
                </div>
                <div className="p-4 rounded-lg" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}>
                  <p className="font-mono font-bold text-xs mb-2" style={{ color: 'var(--purple)' }}>Option B — Chain of Thought</p>
                  <PromptBlock label="OPTION B" promptText={level1.advancedPrompts.optionB} variant="advanced" />
                </div>
                <div className="p-4 rounded-lg" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}>
                  <p className="font-mono font-bold text-xs mb-2" style={{ color: 'var(--purple)' }}>Option C — Self-Critique</p>
                  <PromptBlock label="OPTION C" promptText={level1.advancedPrompts.optionC} variant="advanced" />
                </div>
              </div>
              <p>Run your chosen technique. Compare the output to your Layer 05 version. What improved?</p>
            </div>
          </ChallengeCard>
        )}
      </section>

      {/* Mission Check */}
      <MissionCheck
        items={level1.missionCheckItems}
        nextLevel="/level/2"
        nextLabel="ADVANCE TO LEVEL 02: BUILD THE LAIR"
        levelNumber={1}
      />
    </motion.main>
  )
}
