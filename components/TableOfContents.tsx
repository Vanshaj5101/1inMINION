'use client'

import { useEffect, useState } from 'react'

interface TocSection {
  id: string
  label: string
}

export default function TableOfContents({ sections }: { sections: TocSection[] }) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '')

  useEffect(() => {
    // rootMargin: trigger when a section enters the top 30% of the viewport
    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) setActiveId(id)
          })
        },
        { rootMargin: '-10% 0px -65% 0px', threshold: 0 }
      )
      observer.observe(el)
      return observer
    })

    return () => observers.forEach(o => o?.disconnect())
  }, [sections])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      className="hidden xl:flex fixed flex-col gap-1"
      style={{ top: 128, right: 256, zIndex: 40, maxWidth: 168, pointerEvents: 'none' }}
      aria-label="On this page"
    >
      <p
        className="text-xs tracking-widest uppercase mb-2"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontWeight: 700, pointerEvents: 'none' }}
      >
        On this page
      </p>

      {sections.map(({ id, label }) => {
        const isActive = activeId === id
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="text-left transition-all duration-200"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              fontWeight: isActive ? 700 : 400,
              color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
              opacity: isActive ? 1 : 0.45,
              paddingLeft: isActive ? 10 : 6,
              paddingTop: 4,
              paddingBottom: 4,
              borderTop: 'none',
              borderRight: 'none',
              borderBottom: 'none',
              borderLeft: isActive ? '2px solid var(--yellow)' : '2px solid transparent',
              background: 'none',
              cursor: 'pointer',
              lineHeight: 1.4,
              pointerEvents: 'auto',
              transition: 'all 200ms ease',
            }}
          >
            {label}
          </button>
        )
      })}
    </nav>
  )
}
