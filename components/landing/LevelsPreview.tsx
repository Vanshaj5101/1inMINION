'use client'

import { useState } from 'react'
import { Clock } from 'lucide-react'
import { levels } from '@/content/levels'
import { landingContent } from '@/content/landing'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

// Brightened accents tuned to read equally strong against the dark card background.
// (Kept local to the cards so the global --purple/--blue used by prompt blocks stay unchanged.)
const accentColor: Record<string, string> = {
  yellow: 'var(--yellow)',
  purple: '#A78BFA',
  blue:   '#60A5FA',
  orange: 'var(--orange)',
}

const accentBg: Record<string, string> = {
  yellow: 'rgba(242,155,28,0.12)',
  purple: 'rgba(167,139,250,0.14)',
  blue:   'rgba(96,165,250,0.14)',
  orange: 'rgba(249,115,22,0.12)',
}

export default function LevelsPreview() {
  const { levelsSection } = landingContent
  const ref = useScrollAnimation()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section
      className="scroll-section py-20 md:py-28 px-4"
      style={{ background: 'transparent' }}
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
            style={{ fontFamily: 'var(--font-display)', color: 'white' }}
          >
            {levelsSection.heading}
          </h2>
          <p
            className="text-base md:text-lg"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'rgba(255,255,255,0.52)',
              maxWidth: 540,
              lineHeight: 1.65,
            }}
          >
            {levelsSection.subheading}
          </p>
        </div>

        {/* Levels grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {levels.map((level) => {
            const accent = accentColor[level.color] ?? 'var(--yellow)'
            const bg = accentBg[level.color] ?? 'rgba(255,215,0,0.08)'
            const isHovered = hoveredCard === level.number

            return (
              <div
                key={level.number}
                onMouseEnter={() => setHoveredCard(level.number)}
                onMouseLeave={() => setHoveredCard(null)}
                className="level-card"
                style={{
                  background: isHovered ? 'rgba(6,10,22,0.85)' : 'rgba(6,10,22,0.55)',
                  border: `1px solid ${isHovered ? accent : 'rgba(255,255,255,0.10)'}`,
                  borderTop: `3px solid ${accent}`,
                  transform: isHovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
                  boxShadow: isHovered ? `0 16px 40px rgba(0,0,0,0.5), 0 0 20px ${accent}33` : 'none',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease',
                }}
              >
                {/* Number */}
                <div className="mb-4">
                  <span
                    className="text-5xl leading-none"
                    style={{ fontFamily: 'var(--font-display)', color: isHovered ? accent : '#D1D5DB', transition: 'color 0.25s ease' }}
                  >
                    {level.number}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-xl md:text-2xl leading-tight mb-2"
                  style={{ fontFamily: 'var(--font-display)', color: 'white' }}
                >
                  {level.title}
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
                    color: 'rgba(255,255,255,0.65)',
                    lineHeight: 1.65,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {level.description}
                </p>

                {/* Duration pill */}
                <div
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full w-fit"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: isHovered ? accent : 'rgba(255,255,255,0.70)',
                    background: 'transparent',
                    border: `1px solid ${isHovered ? accent : 'rgba(255,255,255,0.35)'}`,
                    transition: 'color 0.25s ease, border-color 0.25s ease',
                  }}
                >
                  <Clock size={12} />
                  {level.duration}
                </div>
              </div>
            )
          })}
        </div>


      </div>
    </section>
  )
}
