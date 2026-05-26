import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { landingContent } from '@/content/landing'

export default function Hero() {
  const { hero } = landingContent
  const lines = hero.title.split('\n')
  const lastLine = lines[lines.length - 1].split(' ')
  const lastWord = lastLine[lastLine.length - 1]
  const beforeLast = lastLine.slice(0, -1).join(' ')

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-4"
      style={{
        backgroundImage: 'url(/hero_bg3.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#060a16',
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.60) 75%, rgba(0,0,0,0.75) 100%)',
        zIndex: 1,
      }} />

      {/* Hero content */}
      <div className="relative flex flex-col items-center gap-8" style={{ zIndex: 10 }}>
        <p className="text-xs tracking-widest uppercase" style={{
          fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.2em', fontWeight: 800,
        }}>
          1<span style={{ textTransform: 'none' }}>in</span>MINION PRESENTS
        </p>

        <h1 className="leading-none tracking-wide" style={{ fontFamily: 'var(--font-display)', color: 'white' }}>
          {lines.slice(0, -1).map((line, i) => (
            <span key={i} className="block text-7xl md:text-8xl lg:text-[108px]">{line}</span>
          ))}
          <span className="block text-8xl md:text-9xl lg:text-[160px]">
            {beforeLast && `${beforeLast} `}
            <span className="sun-gradient" style={{ display: 'inline-block', padding: '0 0.12em', margin: '0 -0.12em' }}>{lastWord}</span>
          </span>
        </h1>

        <p className="text-xl md:text-2xl" style={{
          fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.65)', fontStyle: 'italic',
        }}>
          {hero.oneliner}
        </p>

        <Link href="/onboarding" className="hero-cta mt-2">
          {hero.ctaButton}
          <ArrowRight size={22} />
        </Link>
      </div>

    </section>
  )
}
