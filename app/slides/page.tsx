'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const SLIDES = [
  {
    eyebrow: 'NOVUS CONNECT',
    title: 'AI Hackathon',
    isTitle: true,
    subtitle: 'Every great heist starts with a well-trained minion.',
    body: null,
  },
  {
    eyebrow: 'AI HACKATHON',
    title: 'Opportunity & Objectives',
    isTitle: false,
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <span style={{ color: '#f29b1c', fontWeight: 800 }}>Opportunity</span>
          <p style={{ marginTop: 8, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75 }}>
            AI tools are reshaping how we work, but fluency across Learning Enterprise varies widely. This hackathon gives every staff member, regardless of their starting point, a hands-on entry point into the evolution of modern AI use and a clearer view of how it fits their role.
          </p>
        </div>
        <div>
          <span style={{ color: '#f29b1c', fontWeight: 800 }}>Learning Objectives</span>
          <p style={{ marginTop: 6, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75 }}>By the end of the session, participants will be able to:</p>
          <ol style={{ marginTop: 10, paddingLeft: '1.5em', display: 'flex', flexDirection: 'column', gap: 8, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75 }}>
            <li>Apply core <span style={{ color: '#f29b1c', fontWeight: 700 }}>Prompt Engineering principles</span> (role, context, task, format, and constraints) to write more effective AI prompts.</li>
            <li><span style={{ color: '#f29b1c', fontWeight: 700 }}>Set up a Custom GPT</span> so AI tools retain understanding across interactions without needing to be re-briefed each time.</li>
            <li><span style={{ color: '#f29b1c', fontWeight: 700 }}>Identify at least one realistic opportunity to embed AI</span> into your workflows, systems, processes, or recurring responsibilities.</li>
            <li><span style={{ color: '#f29b1c', fontWeight: 700 }}>Evaluate AI-generated outputs with a critical lens</span>, recognizing strengths, limitations, and responsible-use considerations.</li>
          </ol>
        </div>
      </div>
    ),
  },
  {
    eyebrow: 'HEIST TO STEAL THE SUN',
    title: 'Activity Overview',
    isTitle: false,
    body: null,
  },
  {
    eyebrow: 'HEIST TO STEAL THE SUN',
    title: 'Activity: Level 1 — Prompt Engineering',
    isTitle: false,
    body: null,
  },
  {
    eyebrow: 'HEIST TO STEAL THE SUN',
    title: 'Activity: Level 2 — Custom GPTs',
    isTitle: false,
    body: null,
  },
  {
    eyebrow: 'HATCH THE PLAN',
    title: 'Integrating AI in Your Work',
    isTitle: false,
    body: (
      <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 18, lineHeight: 1.75 }}>
        The Minion Heist to Steal the Sun activity was great practice (and fun!) using AI. Now, the real prize is your everyday work. AI fits into the workflows, systems, and recurring tasks you already own — helping you move faster, stay consistent, and scale what you do best. The next step is figuring out exactly where it belongs for you.
      </p>
    ),
  },
  {
    eyebrow: 'HATCH THE PLAN',
    title: 'Brainstorming with AI',
    isTitle: false,
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.75 }}>
          <span style={{ color: 'white', fontWeight: 700 }}>Open a <span style={{ color: '#f29b1c' }}>new chat</span> in ChatGPT</span> and complete the following steps:
        </p>
        <div>
          <span style={{ color: '#f29b1c', fontWeight: 700 }}>Steps:</span>
          <ol style={{ marginTop: 8, paddingLeft: '1.5em', display: 'flex', flexDirection: 'column', gap: 8, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75 }}>
            <li>Go to the <span style={{ color: '#f29b1c', fontWeight: 700 }}>[webpage title here]</span> and copy the prompt</li>
            <li>Open a notepad or document to paste the prompt in for editing</li>
            <li>Add 3–5 descriptive bullet points about your role at Learning Enterprise</li>
            <li>Copy and paste the prompt with your additions into your new chat</li>
            <li>Review the results from ChatGPT, add 1–2 that interest you most to your <span style={{ color: '#f29b1c', fontWeight: 700 }}>AI Hackathon Exit Ticket</span></li>
          </ol>
        </div>
        <p style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
          <span style={{ color: '#f29b1c', fontWeight: 700 }}>Note:</span> If you and your partner have different roles, run the prompt for each role separately. Do <strong>NOT</strong> combine roles in one prompt.
        </p>
      </div>
    ),
  },
  {
    eyebrow: 'EXIT TICKET',
    title: 'Hackathon Exit Ticket',
    isTitle: false,
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <span style={{ color: '#f29b1c', fontWeight: 700 }}>Directions:</span>
          <p style={{ marginTop: 8, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75 }}>
            Please complete the exit ticket below. Your responses will help identify themes for AI integration, usage, and opportunities for training/support.
          </p>
        </div>
        <div>
          <span style={{ color: '#f29b1c', fontWeight: 700 }}>Include:</span>
          <ul style={{ marginTop: 8, paddingLeft: '1.5em', display: 'flex', flexDirection: 'column', gap: 6, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75 }}>
            <li>Both names (partners)</li>
            <li>Select your team</li>
            <li>List at least 1–2 ways AI can be incorporated in your work. If partners have different roles, please list 1–2 ways for each role.</li>
          </ul>
        </div>
        <p style={{ color: '#f29b1c', fontWeight: 700, marginTop: 8 }}>[ ADD Hackathon Exit Ticket Link ]</p>
      </div>
    ),
  },
  {
    eyebrow: 'DROP THE INTEL',
    title: 'Share Out',
    isTitle: false,
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 18, lineHeight: 1.75 }}>
          Use the link below to access our <span style={{ color: '#f29b1c', fontWeight: 700 }}>Hackathon Share Out Padlet</span> and add your intel. Share a key takeaway, an a-ha moment, something that surprised you, or a question you&apos;re still sitting with. Read what others post and steal an idea or two for yourself.
        </p>
        <p style={{ color: '#f29b1c', fontWeight: 700, fontSize: 18 }}>[ ADD Hackathon Share Out Padlet Link ]</p>
      </div>
    ),
  },
  {
    eyebrow: 'A MINION THANKS',
    title: 'Wrap Up',
    isTitle: false,
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <span style={{ color: '#f29b1c', fontWeight: 700 }}>Today you:</span>
          <ul style={{ marginTop: 10, paddingLeft: '1.5em', display: 'flex', flexDirection: 'column', gap: 8, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75 }}>
            <li>Leveled up your prompt engineering.</li>
            <li>Built a custom GPT.</li>
            <li>Scoped where AI fits in your work and captured ideas on your exit ticket.</li>
            <li>Shared takeaways, ideas, and questions to spur on creative, applicable AI use.</li>
          </ul>
        </div>
        <p style={{ fontStyle: 'italic', fontWeight: 700, color: '#f29b1c', fontSize: 20, marginTop: 8 }}>
          Go forth, scheme boldly, and aim for the sun.
        </p>
      </div>
    ),
  },
]

const TOTAL = SLIDES.length // auto-counts — no manual update needed

export default function SlidesPage() {
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

  const [hoveredDot, setHoveredDot] = useState<number | null>(null)

  // Only the title slide uses the photo background. Content slides use a
  // subtle solid gradient so text stays readable.
  const isTitleSlide = current === 0

  return (
    <main style={{
      position: 'relative',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      backgroundImage: isTitleSlide
        ? 'url(/hero_bg3.png)'
        : 'linear-gradient(155deg, #0d1730 0%, #080d1c 55%, #04060f 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#060a16',
      transition: 'background-image 0.4s ease',
    }}>

      {/* Fixed dark overlay — darkens the photo on the title slide for legibility.
          Hidden on content slides, which already use a clean gradient. */}
      {isTitleSlide && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.42) 50%, rgba(0,0,0,0.62) 100%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />
      )}

      {/* Slides track — transparent panels only */}
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        <div style={{
          display: 'flex',
          width: `${TOTAL * 100}%`,
          height: '100%',
          transform: `translateX(-${current * (100 / TOTAL)}%)`,
          transition: 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform',
        }}>
          {SLIDES.map((s, i) => (
            <div
              key={i}
              style={{
                width: `${100 / TOTAL}%`,
                height: '100%',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: s.isTitle ? 'center' : 'flex-start',
                justifyContent: 'center',
                padding: '60px 8vw 80px',
                overflowY: 'auto',
              }}
            >
            <div style={{
              maxWidth: 820,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: s.isTitle ? 20 : 24,
              textAlign: s.isTitle ? 'center' : 'left',
            }}>
              {/* Eyebrow */}
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase' as const,
                fontWeight: 700,
                color: s.isTitle ? 'rgba(255,255,255,0.65)' : '#1F2937',
                background: s.isTitle ? 'transparent' : 'var(--yellow)',
                padding: s.isTitle ? '0' : '4px 10px',
                borderRadius: s.isTitle ? 0 : 4,
                alignSelf: s.isTitle ? 'center' : 'flex-start',
              }}>
                {s.eyebrow}
              </span>

              {/* Title */}
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                lineHeight: 1.05,
                margin: 0,
                ...(s.isTitle ? {
                  fontSize: 'clamp(64px, 11vw, 140px)',
                  background: 'linear-gradient(135deg, #f29b1c, #F97316)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                } : {
                  fontSize: 'clamp(36px, 5vw, 60px)',
                  color: '#F3F4F6',
                }),
              }}>
                {s.title}
              </h1>

              {/* Subtitle (title slide only) */}
              {s.isTitle && s.subtitle && (
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 20,
                  fontStyle: 'italic',
                  fontWeight: 700,
                  color: '#f29b1c',
                  margin: 0,
                }}>
                  {s.subtitle}
                </p>
              )}

              {/* Body */}
              {s.body && (
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 16 }}>
                  {s.body}
                </div>
              )}
            </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back button */}
      <Link
        href="/"
        style={{
          position: 'fixed', top: 20, left: 20,
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '8px 16px',
          background: 'var(--yellow)',
          border: 'none',
          borderRadius: 8,
          color: '#1F2937',
          fontFamily: 'var(--font-mono)',
          fontSize: 11, fontWeight: 700,
          letterSpacing: '0.1em',
          textDecoration: 'none',
          zIndex: 20,
        }}
      >
        <ArrowLeft size={13} />
        BACK TO MISSION
      </Link>

      {/* Prev arrow */}
      {current > 0 && (
        <button
          onClick={prev}
          aria-label="Previous slide"
          style={{
            position: 'fixed', left: 20, top: '50%', transform: 'translateY(-50%)',
            width: 48, height: 48, borderRadius: '50%',
            background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.20)',
            color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)', transition: 'background 0.2s ease',
            zIndex: 10,
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.20)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.10)')}
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Next arrow */}
      {current < TOTAL - 1 && (
        <button
          onClick={next}
          aria-label="Next slide"
          style={{
            position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)',
            width: 48, height: 48, borderRadius: '50%',
            background: 'rgba(255,215,0,0.15)', border: '1px solid rgba(255,215,0,0.40)',
            color: 'var(--yellow)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)', transition: 'background 0.2s ease',
            zIndex: 10,
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,215,0,0.28)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,215,0,0.15)')}
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Dot indicators */}
      <div style={{
        position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 10, alignItems: 'center',
        zIndex: 10,
      }}>
        {SLIDES.map((s, i) => (
          <div key={i} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Tooltip */}
            {hoveredDot === i && (
              <div style={{
                position: 'absolute',
                bottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                whiteSpace: 'nowrap',
                background: 'rgba(0,0,0,0.85)',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                fontSize: 11, fontWeight: 600,
                letterSpacing: '0.06em',
                padding: '5px 9px',
                borderRadius: 6,
                border: '1px solid rgba(255,255,255,0.12)',
                pointerEvents: 'none',
              }}>
                {s.title}
              </div>
            )}
            <button
              onClick={() => setCurrent(i)}
              onMouseEnter={() => setHoveredDot(i)}
              onMouseLeave={() => setHoveredDot(null)}
              aria-label={`Go to slide ${i + 1}: ${s.title}`}
              style={{
                width: 10, height: 10,
                borderRadius: '50%',
                background: i === current ? 'var(--yellow)' : 'rgba(255,255,255,0.30)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'background 0.3s ease',
                flexShrink: 0,
              }}
            />
          </div>
        ))}
      </div>

    </main>
  )
}
