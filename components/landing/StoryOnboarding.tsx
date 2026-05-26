'use client'

import { ReactNode } from 'react'
import { landingContent } from '@/content/landing'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

// Phrases that get the yellow marker treatment in story paragraphs
const HIGHLIGHT_PHRASES = [
  'steal the SUN',
  'Stealing the sun requires intelligence.',
]

function renderHighlighted(text: string): ReactNode {
  const escaped = HIGHLIGHT_PHRASES.map(p =>
    p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  )
  const regex = new RegExp(`(${escaped.join('|')})`, 'g')
  const parts = text.split(regex)

  return parts.map((part, i) =>
    HIGHLIGHT_PHRASES.includes(part)
      ? <mark key={i} className="story-highlight">{part}</mark>
      : part
  )
}

export default function StoryOnboarding() {
  const { story } = landingContent
  const ref = useScrollAnimation()

  return (
    <section
      className="scroll-section py-20 md:py-28 px-4"
      style={{ background: 'transparent' }}
      ref={ref}
    >
      <div className="max-w-3xl mx-auto flex flex-col gap-10">

        {/* Section label + heading */}
        <div className="flex flex-col gap-2">
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--yellow)', letterSpacing: '0.18em' }}
          >
            {story.sectionLabel}
          </span>
          <h2
            className="text-5xl md:text-6xl leading-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'white' }}
          >
            {story.heading}
          </h2>
          <p
            className="text-xl font-bold"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.52)' }}
          >
            {story.subheading}
          </p>
        </div>

        {/* Story paragraphs with inline highlights */}
        <div className="flex flex-col gap-5">
          {story.paragraphs.map((para, i) => (
            <p
              key={i}
              className="text-base md:text-lg leading-relaxed"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'rgba(255,255,255,0.78)',
                lineHeight: 1.75,
              }}
            >
              {renderHighlighted(para)}
            </p>
          ))}
        </div>

        {/* Mission box */}
        <div
          className="rounded-2xl p-8 flex flex-col gap-5"
          style={{
            background: 'rgba(255,251,235,0.08)',
            border: '2px solid var(--yellow)',
            borderLeft: '5px solid var(--yellow)',
          }}
        >
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--yellow)', letterSpacing: '0.18em' }}
          >
            {story.missionBox.label}
          </span>

          <h3
            className="text-4xl md:text-5xl leading-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'white' }}
          >
            {story.missionBox.heading}
          </h3>

          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.75 }}
          >
            {story.missionBox.description}
          </p>

          {/* "Every skill…tomorrow" — highlighted callout */}
          <div
            className="rounded-xl px-6 py-5 flex items-start gap-3"
            style={{
              background: 'transparent',
              borderLeft: '4px solid var(--yellow)',
            }}
          >
            <span style={{ fontSize: 20 }}>💡</span>
            <p
              className="text-base md:text-lg font-bold leading-relaxed"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'white',
                lineHeight: 1.65,
              }}
            >
              {story.missionBox.highlight}
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
