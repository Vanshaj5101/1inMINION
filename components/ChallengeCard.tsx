'use client'

import { ReactNode, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface ChallengeCardProps {
  variant: 'standard' | 'advanced'
  title: string
  children: ReactNode
  collapsible?: boolean
  defaultOpen?: boolean
}

export default function ChallengeCard({ variant, title, children, collapsible = false, defaultOpen = true }: ChallengeCardProps) {
  const [open, setOpen] = useState(defaultOpen)
  const isAdvanced = variant === 'advanced'

  const borderColor = isAdvanced ? 'var(--purple)' : 'var(--yellow)'
  const headerColor = isAdvanced ? 'var(--red)' : 'var(--yellow)'
  const headerText = isAdvanced ? '🔴 ADVANCED — CLASSIFIED' : '🟡 YOUR MISSION — ALL VILLAINS'

  return (
    <div
      className="rounded-lg overflow-hidden relative transition-all duration-200"
      style={{
        background: 'var(--bg-secondary)',
        border: `1px solid ${borderColor}`,
        borderLeft: `3px solid ${borderColor}`,
        boxShadow: isAdvanced ? '0 0 20px rgba(139,92,246,0.1)' : undefined,
      }}
    >
      {isAdvanced && (
        <div className="classified-stamp">CLASSIFIED // ADVANCED</div>
      )}

      <div
        className={`px-6 py-4 flex items-center justify-between ${collapsible ? 'cursor-pointer' : ''}`}
        style={{ borderBottom: `1px solid ${borderColor}22` }}
        onClick={collapsible ? () => setOpen(o => !o) : undefined}
      >
        <div>
          <p className="font-mono font-bold text-xs tracking-widest uppercase" style={{ color: headerColor }}>
            {headerText}
          </p>
          <h4 className="font-bold text-base mt-1 text-text-main">{title}</h4>
        </div>
        {collapsible && (
          open
            ? <ChevronUp size={16} style={{ color: borderColor }} />
            : <ChevronDown size={16} style={{ color: borderColor }} />
        )}
      </div>

      {(!collapsible || open) && (
        <div className="px-6 py-5">
          {typeof children === 'string'
            ? <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>{children}</p>
            : children
          }
        </div>
      )}
    </div>
  )
}
