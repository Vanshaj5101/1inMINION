'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { landingContent } from '@/content/landing'
import { levels, totalTime } from '@/content/levels'

const accentColor: Record<string, string> = {
  yellow: 'var(--yellow)',
  purple: 'var(--purple)',
  blue:   'var(--blue)',
  orange: 'var(--orange)',
}

const TOTAL = 4

export default function OnboardingCarousel() {
  const { story } = landingContent
  const [current, setCurrent] = useState(0)

  const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), [])
  const next = useCallback(() => setCurrent(c => Math.min(TOTAL - 1, c + 1)), [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [prev, next])

  const slideStyle: React.CSSProperties = {
    width: `${100 / TOTAL}%`,
    height: '100%',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 72,
    paddingLeft: 24,
    paddingRight: 24,
  }

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>

      {/* Slides track */}
      <div style={{
        display: 'flex',
        width: `${TOTAL * 100}%`,
        height: '100%',
        transform: `translateX(-${current * (100 / TOTAL)}%)`,
        transition: 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>

        {/* ── Slide 1: Backstory ─────────────────────────────── */}
        <div style={slideStyle}>
          <div style={{ maxWidth: 680, width: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--yellow)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
              {story.sectionLabel}
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)', color: 'white', lineHeight: 1.05, margin: 0 }}>
              {story.heading}
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'rgba(255,255,255,0.65)', fontWeight: 700, margin: 0 }}>
              {story.subheading}
            </p>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.12)' }} />
            {story.paragraphs.slice(0, 2).map((p, i) => (
              <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, margin: 0 }}>
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* ── Slide 2: Mission ───────────────────────────────── */}
        <div style={slideStyle}>
          <div style={{ maxWidth: 680, width: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--yellow)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
              {story.missionBox.label}
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)', color: 'white', lineHeight: 1.05, margin: 0 }}>
              {story.missionBox.heading}
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, margin: 0 }}>
              {story.missionBox.description}
            </p>
            <div style={{ borderLeft: '4px solid var(--yellow)', paddingLeft: 20, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>💡</span>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 700, color: 'white', lineHeight: 1.65, margin: 0 }}>
                {story.missionBox.highlight}
              </p>
            </div>
          </div>
        </div>

        {/* ── Slide 3: Training Program ──────────────────────── */}
        <div style={slideStyle}>
          <div style={{ maxWidth: 900, width: '100%', display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'center', textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--yellow)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
              YOUR TRAINING PROGRAM
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 60px)', color: 'white', lineHeight: 1.1, margin: 0 }}>
              4 Levels. 60 Minutes. One Heist Plan.
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, width: '100%' }}>
              {levels.map(level => {
                const accent = accentColor[level.color] ?? 'var(--yellow)'
                return (
                  <div key={level.number} style={{
                    background: 'rgba(6,10,22,0.60)',
                    border: `1px solid rgba(255,255,255,0.10)`,
                    borderTop: `3px solid ${accent}`,
                    borderRadius: 12,
                    padding: '20px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    textAlign: 'left',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'rgba(255,255,255,0.25)', lineHeight: 1 }}>{level.number}</span>
                      <span style={{ fontSize: 26 }}>{level.emoji}</span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'white', margin: 0, lineHeight: 1.2 }}>{level.codename}</p>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: accent, fontWeight: 700, letterSpacing: '0.06em' }}>{level.concept}</span>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, margin: 0, flex: 1 }}>{level.description}</p>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.40)' }}>⏱ {level.duration}</span>
                  </div>
                )
              })}
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.40)', margin: 0 }}>
              {totalTime.label}: <strong style={{ color: 'rgba(255,255,255,0.65)' }}>{totalTime.value}</strong> — {totalTime.note}
            </p>
          </div>
        </div>

        {/* ── Slide 4: Ready ─────────────────────────────────── */}
        <div style={{ ...slideStyle, textAlign: 'center' }}>
          <div style={{ maxWidth: 560, width: '100%', display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--yellow)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
              READY, MINION?
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 7vw, 88px)', color: 'white', lineHeight: 1.05, margin: 0 }}>
              Your Training Starts Now.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(255,255,255,0.60)', lineHeight: 1.7, margin: 0 }}>
              Keep this page open alongside Claude. Each level takes 10–20 minutes and builds on the last.
            </p>
            <Link href="/level/1" className="hero-cta" style={{ marginTop: 8 }}>
              BEGIN TRAINING — LEVEL 01
              <ArrowRight size={22} />
            </Link>
          </div>
        </div>

      </div>

      {/* ── Prev button ── */}
      {current > 0 && (
        <button
          onClick={prev}
          aria-label="Previous slide"
          style={{
            position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)',
            width: 48, height: 48, borderRadius: '50%',
            background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.20)',
            color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)', transition: 'background 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.20)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.10)')}
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* ── Next button ── */}
      {current < TOTAL - 1 && (
        <button
          onClick={next}
          aria-label="Next slide"
          style={{
            position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)',
            width: 48, height: 48, borderRadius: '50%',
            background: 'rgba(255,215,0,0.15)', border: '1px solid rgba(255,215,0,0.40)',
            color: 'var(--yellow)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)', transition: 'background 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,215,0,0.28)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,215,0,0.15)')}
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* ── Slide dots ── */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 8, alignItems: 'center',
      }}>
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? 28 : 8,
              height: 8,
              borderRadius: 4,
              background: i === current ? 'var(--yellow)' : 'rgba(255,255,255,0.28)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* ── Slide counter ── */}
      <div style={{
        position: 'absolute', bottom: 32, right: 28,
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.35)',
      }}>
        {current + 1} / {TOTAL}
      </div>

    </div>
  )
}
