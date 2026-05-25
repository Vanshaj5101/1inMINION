'use client'

import { Clock } from 'lucide-react'
import { levels, totalTime } from '@/content/levels'
import { landingContent } from '@/content/landing'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const accentColor: Record<string, string> = {
  yellow: 'var(--yellow)',
  purple: 'var(--purple)',
  blue:   'var(--blue)',
  orange: 'var(--orange)',
}

const accentBg: Record<string, string> = {
  yellow: 'rgba(255,215,0,0.08)',
  purple: 'rgba(139,92,246,0.08)',
  blue:   'rgba(59,130,246,0.08)',
  orange: 'rgba(249,115,22,0.08)',
}

export default function LevelsPreview() {
  const { levelsSection } = landingContent
  const ref = useScrollAnimation()

  return (
    <section
      className="scroll-section py-20 md:py-28 px-4"
      style={{ background: 'var(--bg-secondary)' }}
      ref={ref}
    >
      <div className="mx-auto" style={{ maxWidth: 'var(--max-width)' }}>

        {/* Section header */}
        <div className="flex flex-col items-center text-center gap-3 mb-14">
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--yellow)' }}
          >
            {levelsSection.sectionLabel}
          </span>
          <h2
            className="text-5xl md:text-6xl"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            {levelsSection.heading}
          </h2>
          <p
            className="text-base md:text-lg"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--text-muted)',
              maxWidth: 540,
              lineHeight: 1.65,
            }}
          >
            {levelsSection.subheading}
          </p>
        </div>

        {/* Levels grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {levels.map((level) => {
            const accent = accentColor[level.color] ?? 'var(--yellow)'
            const bg = accentBg[level.color] ?? 'rgba(255,215,0,0.08)'

            return (
              <div
                key={level.number}
                className="level-card"
                style={{ borderTop: `3px solid ${accent}` }}
              >
                {/* Number + emoji row */}
                <div className="flex items-start justify-between mb-4">
                  <span
                    className="text-5xl leading-none"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: '#D1D5DB',
                    }}
                  >
                    {level.number}
                  </span>
                  <span className="text-4xl">{level.emoji}</span>
                </div>

                {/* Codename */}
                <h3
                  className="text-xl md:text-2xl leading-tight mb-2"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
                >
                  {level.codename}
                </h3>

                {/* Concept badge */}
                <span
                  className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: accent,
                    background: bg,
                    border: `1px solid ${accent}`,
                  }}
                >
                  {level.concept}
                </span>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed flex-1 mb-4"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--text-muted)',
                    lineHeight: 1.65,
                  }}
                >
                  {level.description}
                </p>

                {/* Duration pill */}
                <div
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full w-fit"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--text-muted)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <Clock size={12} />
                  {level.duration}
                </div>
              </div>
            )
          })}
        </div>

        {/* Total time */}
        <p
          className="text-center text-sm mt-10"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)' }}
        >
          <strong style={{ color: 'var(--text-secondary)' }}>{totalTime.label}:</strong>{' '}
          {totalTime.value} — {totalTime.note}
        </p>

      </div>
    </section>
  )
}
