'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'

interface GearItem {
  id: string
  name: string
  definition: string
  theme_translation: string
  why_useful: string[]
}

interface BriefingData {
  level: {
    number: string
    title: string
    concept: string
    duration: string
    subdescription: string
  }
  mission_targets: string[]
  mission_gear: GearItem[]
}

interface LevelBriefingModalProps {
  data: BriefingData
  onEnter: () => void
}

export default function LevelBriefingModal({ data, onEnter }: LevelBriefingModalProps) {
  const [targetsOpen, setTargetsOpen] = useState(false)
  const [gearsOpen, setGearsOpen] = useState(false)
  const [openGear, setOpenGear] = useState<string | null>(null)

  const { level, mission_targets, mission_gear } = data

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      style={{
        background: 'rgba(249,250,251,0.94)',
        backdropFilter: 'blur(4px)',
        backgroundImage: 'radial-gradient(circle, #D1D5DB 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    >
      <div
        className="w-full flex flex-col gap-5 rounded-2xl p-8 sm:p-10"
        style={{
          maxWidth: 520,
          background: '#FFFFFF',
          border: '1.5px solid #9CA3AF',
          boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
        }}
      >
        {/* Level circle + title */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div
            className="flex items-center justify-center rounded-full"
            style={{ width: 80, height: 80, border: '2px solid #9CA3AF' }}
          >
            <span className="font-bold text-2xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', letterSpacing: '0.04em' }}>
              {level.number}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', letterSpacing: '0.04em' }}>
              {level.title}
            </h2>
            <p className="text-xs font-mono tracking-widest mt-0.5" style={{ color: 'var(--text-muted)' }}>
              {level.concept} · {level.duration}
            </p>
          </div>
          <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 400, textAlign: 'justify' }}>
            {level.subdescription}
          </p>
        </div>

        {/* Mission Targets accordion */}
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E5E7EB' }}>
          <button
            onClick={() => setTargetsOpen(o => !o)}
            className="w-full flex items-center justify-between px-5 py-4 transition-colors duration-150"
            style={{ background: targetsOpen ? '#F9FAFB' : '#FFFFFF', cursor: 'pointer' }}
          >
            <span className="font-bold text-base" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}>
              Mission Targets
            </span>
            {targetsOpen ? <ChevronUp size={18} style={{ color: '#9CA3AF' }} /> : <ChevronDown size={18} style={{ color: '#9CA3AF' }} />}
          </button>
          {targetsOpen && (
            <div className="px-5 pb-5" style={{ borderTop: '1px solid #E5E7EB' }}>
              <ul className="space-y-3 pt-4">
                {mission_targets.map((target, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5" style={{ background: 'var(--yellow)', color: 'var(--text-primary)' }}>
                      {i + 1}
                    </span>
                    {target}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Mission Gears accordion */}
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E5E7EB' }}>
          <button
            onClick={() => setGearsOpen(o => !o)}
            className="w-full flex items-center justify-between px-5 py-4 transition-colors duration-150"
            style={{ background: gearsOpen ? '#F9FAFB' : '#FFFFFF', cursor: 'pointer' }}
          >
            <span className="font-bold text-base" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}>
              Mission Gears
            </span>
            {gearsOpen ? <ChevronUp size={18} style={{ color: '#9CA3AF' }} /> : <ChevronDown size={18} style={{ color: '#9CA3AF' }} />}
          </button>
          {gearsOpen && (
            <div className="px-5 pb-5 space-y-3" style={{ borderTop: '1px solid #E5E7EB' }}>
              {mission_gear.map(gear => (
                <div key={gear.id} className="rounded-lg overflow-hidden mt-3" style={{ border: '1px solid #E5E7EB' }}>
                  <button
                    onClick={() => setOpenGear(openGear === gear.id ? null : gear.id)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left"
                    style={{ background: openGear === gear.id ? '#FFFBEB' : '#F9FAFB', cursor: 'pointer' }}
                  >
                    <span className="font-bold text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}>
                      {gear.name}
                    </span>
                    {openGear === gear.id ? <ChevronUp size={15} style={{ color: '#9CA3AF' }} /> : <ChevronDown size={15} style={{ color: '#9CA3AF' }} />}
                  </button>
                  {openGear === gear.id && (
                    <div className="px-4 pb-4 space-y-3" style={{ borderTop: '1px solid #E5E7EB', background: '#FFFFFF' }}>
                      <p className="text-sm leading-relaxed pt-3" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}>
                        {gear.definition}
                      </p>
                      <div className="p-3 rounded-lg" style={{ background: '#FFFBEB', borderLeft: '3px solid var(--yellow)' }}>
                        <p className="text-xs font-bold mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--yellow)' }}>🍌 GRU TRANSLATION</p>
                        <p className="text-xs leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}>
                          {gear.theme_translation}
                        </p>
                      </div>
                      <ul className="space-y-1.5">
                        {gear.why_useful.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}>
                            <span style={{ color: 'var(--yellow)', fontWeight: 700, flexShrink: 0 }}>→</span>
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={onEnter}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all duration-150"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 20,
            letterSpacing: '0.04em',
            background: 'var(--yellow)',
            color: 'var(--text-primary)',
            boxShadow: '0 4px 16px rgba(255,215,0,0.35)',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          INITIATE THE MISSION
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  )
}
