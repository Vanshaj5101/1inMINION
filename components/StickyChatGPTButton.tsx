'use client'

import { usePathname } from 'next/navigation'
import { ExternalLink } from 'lucide-react'

const HIDDEN_ON = ['/', '/onboarding', '/slides']

export default function StickyChatGPTButton() {
  const pathname = usePathname()
  if (HIDDEN_ON.includes(pathname)) return null

  return (
    <a
      href="https://chatgpt.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm tracking-widest transition-all duration-150"
      style={{
        fontFamily: 'var(--font-mono)',
        background: 'var(--yellow)',
        color: 'var(--text-primary)',
        minHeight: 48,
        boxShadow: 'var(--shadow-amber)',
        letterSpacing: '0.08em',
      }}
      aria-label="Open ChatGPT in a new tab"
    >
      CHATGPT
      <ExternalLink size={14} />
    </a>
  )
}
