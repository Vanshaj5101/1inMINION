import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import StoryOnboarding from '@/components/landing/StoryOnboarding'
import LevelsPreview from '@/components/landing/LevelsPreview'

export default function OnboardingPage() {
  return (
    <main className="pt-[60px]">
      <StoryOnboarding />
      <LevelsPreview />

      {/* Final CTA */}
      <section
        className="py-20 flex flex-col items-center gap-4 text-center px-4"
        style={{ background: 'var(--bg-primary)' }}
      >
        <p
          className="text-base"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)' }}
        >
          Your Minion is waiting. GRU is watching.
        </p>
        <Link href="/level/1" className="hero-cta">
          BEGIN TRAINING — LEVEL 01
          <ArrowRight size={22} />
        </Link>
        <p
          className="text-xs"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)' }}
        >
          Keep this page open alongside Claude
        </p>
      </section>

      {/* Footer */}
      <footer
        className="py-8 text-center"
        style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}
      >
        <p className="text-xs" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)' }}>
          Heist to the Sun — AI Training Experience · Built with Claude ·{' '}
          <a href="https://claude.ai" target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--yellow-muted)', textDecoration: 'underline' }}>
            claude.ai
          </a>
        </p>
      </footer>
    </main>
  )
}
