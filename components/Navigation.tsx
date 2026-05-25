'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const LEVELS = [1, 2, 3, 4]
const LEVEL_LABELS = ['Level 1', 'Level 2', 'Level 3', 'Level 4']

export default function Navigation() {
  const pathname = usePathname()
  const [completedLevels, setCompletedLevels] = useState<number[]>([])

  const levelMatch = pathname.match(/^\/level\/(\d+)/)
  const currentLevel = levelMatch ? parseInt(levelMatch[1]) : null
  const isLevelPage = currentLevel !== null

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('completedLevels') || '[]') as number[]
    setCompletedLevels(stored)
  }, [pathname])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6"
      style={{
        height: 72,
        background: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border)',
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      {/* Left: brand */}
      <Link
        href="/"
        className="flex items-center gap-2"
        style={{ textDecoration: 'none', color: 'var(--text-primary)' }}
      >
        <Image src="/1inMINION.png" alt="1inMINION" width={160} height={60} style={{ objectFit: 'contain' }} />
      </Link>

      {/* Center: level progress track — level pages only */}
      {isLevelPage && (
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center" style={{ gap: 0 }}>
          {LEVELS.map((n, idx) => {
            const isCompleted = completedLevels.includes(n)
            const isCurrent   = n === currentLevel

            // connector line between nodes
            const showLine = idx < LEVELS.length - 1
            // line is "active" (yellow) if the next level has been reached or completed
            const nextN = n + 1
            const nextReached = completedLevels.includes(nextN) || nextN === currentLevel

            return (
              <div key={n} className="flex items-center">
                {/* Node */}
                <Link
                  href={`/level/${n}`}
                  aria-label={`Level ${n} of 4`}
                  className="flex flex-col items-center"
                  style={{ textDecoration: 'none', position: 'relative' }}
                >
                  {/* Icon container */}
                  <div
                    className="flex items-center justify-center transition-all duration-200"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      border: isCurrent
                        ? '2.5px solid var(--yellow)'
                        : isCompleted
                        ? '2.5px solid var(--green)'
                        : '2px solid var(--border)',
                      background: isCurrent
                        ? 'var(--yellow-light)'
                        : isCompleted
                        ? 'rgba(5,150,105,0.10)'
                        : 'var(--bg-secondary)',
                      boxShadow: isCurrent ? '0 0 0 3px rgba(255,215,0,0.2)' : 'none',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {isCurrent ? (
                      /* Minion on current level */
                      <Image
                        src="/minion_img.png"
                        alt="minion"
                        width={28}
                        height={28}
                        style={{ objectFit: 'contain', borderRadius: '50%' }}
                      />
                    ) : isCompleted ? (
                      /* Green flag on completed levels */
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="none" style={{ display: 'block' }}>
                        <path d="M4 3v18" stroke="#059669" strokeWidth="2.2" strokeLinecap="round"/>
                        <path d="M4 4 L18 8 L4 13 Z" fill="#059669"/>
                      </svg>
                    ) : (
                      /* Lock on locked levels */
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}>
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    )}
                  </div>

                  {/* Label below */}
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      fontWeight: isCurrent ? 700 : 500,
                      color: isCurrent ? 'var(--yellow-muted)' : isCompleted ? 'var(--green)' : 'var(--text-muted)',
                      marginTop: 4,
                      letterSpacing: '0.04em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {LEVEL_LABELS[idx]}
                  </span>
                </Link>

                {/* Connector line */}
                {showLine && (
                  <div
                    style={{
                      width: 48,
                      height: 2,
                      marginBottom: 14, /* align with icon centers */
                      background: nextReached
                        ? 'linear-gradient(to right, var(--yellow-muted), rgba(255,215,0,0.4))'
                        : 'var(--border)',
                      borderRadius: 1,
                      transition: 'background 0.3s ease',
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Right: spacer */}
      <div className="w-[120px]" />
    </nav>
  )
}
