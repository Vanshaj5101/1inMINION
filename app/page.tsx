'use client'

import { useState, useCallback } from 'react'
import Hero from '@/components/landing/Hero'
import SplashScreen from '@/components/SplashScreen'

export default function LandingPage() {
  const [showSplash, setShowSplash] = useState(true)
  const handleDone = useCallback(() => setShowSplash(false), [])

  return (
    <main>
      {showSplash && <SplashScreen onDone={handleDone} />}
      <Hero />
    </main>
  )
}
