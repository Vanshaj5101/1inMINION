import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Hackathon Slide Deck',
  icons: { icon: '/favicon.png', apple: '/favicon.png' },
}

export default function SlidesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
