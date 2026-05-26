import OnboardingCarousel from '@/components/landing/OnboardingCarousel'

export default function OnboardingPage() {
  return (
    <main style={{
      backgroundImage: 'url(/hero_bg2.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#060a16',
      position: 'relative',
    }}>
      {/* Dark overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(6,10,22,0.68)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <OnboardingCarousel />
      </div>
    </main>
  )
}
