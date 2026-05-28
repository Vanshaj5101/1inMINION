'use client'

import { ArrowRight } from 'lucide-react'

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
  const { level } = data

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
            boxShadow: '0 4px 16px rgba(242,155,28,0.35)',
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
