import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4 gap-8" style={{ background: 'var(--bg-primary)' }}>
      <div className="text-8xl">🍌</div>
      <div className="space-y-3">
        <p className="font-mono text-xs tracking-widest" style={{ color: 'var(--yellow)' }}>// ERROR 404 — MINION GONE ROGUE</p>
        <h1 className="text-3xl font-bold">This page has gone rogue.</h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Go back to mission briefing.</p>
      </div>
      <Link href="/" className="btn-primary">
        <ArrowLeft size={16} />
        BACK TO MISSION BRIEFING
      </Link>
    </main>
  )
}
