'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    // Start fade-out at 1.6s, finish at 2s
    const fadeTimer = setTimeout(() => setFading(true), 1600)
    const doneTimer = setTimeout(onDone, 2200)
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer) }
  }, [onDone])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.6s ease',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <Image
        src="/1inMINION.png"
        alt="1inMINION"
        width={560}
        height={224}
        style={{ objectFit: 'contain' }}
        priority
      />

      {/* Loading bar */}
      <div style={{ width: 160, height: 3, borderRadius: 99, background: '#F3F4F6', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            borderRadius: 99,
            background: 'var(--yellow)',
            animation: 'splashLoad 1.6s ease-out forwards',
          }}
        />
      </div>

      <style>{`
        @keyframes splashLoad {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  )
}
