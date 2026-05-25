import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { landingContent } from '@/content/landing'

export default function Hero() {
  const { hero } = landingContent

  const lines = hero.title.split('\n')
  const lastLine = lines[lines.length - 1].split(' ')
  const lastWord = lastLine[lastLine.length - 1]       // "SUN"
  const beforeLast = lastLine.slice(0, -1).join(' ')   // "THE"

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-4"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Floating background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* Top gradient wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(255,215,0,0.07) 0%, transparent 55%)' }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Eyebrow */}
        <p
          className="text-xs tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', letterSpacing: '0.2em' }}
        >
          1<span style={{ textTransform: 'none' }}>in</span>MINION PRESENTS
        </p>

        {/* Title */}
        <h1 className="leading-none tracking-wide" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
          {lines.slice(0, -1).map((line, i) => (
            <span key={i} className="block text-7xl md:text-8xl lg:text-[108px]">{line}</span>
          ))}
          <span className="block text-7xl md:text-8xl lg:text-[108px]">
            {beforeLast} <span className="sun-gradient">{lastWord}</span>
          </span>
        </h1>

        {/* One-liner */}
        <p
          className="text-xl md:text-2xl"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontStyle: 'italic' }}
        >
          {hero.oneliner}
        </p>

        {/* CTA */}
        <Link href="/onboarding" className="hero-cta mt-2">
          {hero.ctaButton}
          <ArrowRight size={22} />
        </Link>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-hint" />
    </section>
  )
}
