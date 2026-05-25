import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface LevelCardProps {
  level: string
  title: string
  subtitle: string
  description: string
  duration: string
  href: string
}

export default function LevelCard({ level, title, subtitle, description, duration, href }: LevelCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="h-full flex flex-col gap-4 bg-bg-secondary border border-border-dark rounded-lg p-6 transition-all duration-200 group-hover:border-accent-yellow group-hover:shadow-yellow-sm">
        <div className="flex items-start justify-between">
          <span className="font-mono font-bold text-2xl text-accent-yellow tracking-widest">{level}</span>
          <span className="pill-badge">{duration}</span>
        </div>

        <div>
          <h3 className="text-xl font-bold text-text-main leading-tight">{title}</h3>
          <p className="text-sm font-mono text-accent-yellow mt-1 opacity-70">{subtitle}</p>
        </div>

        <p className="text-sm text-text-muted leading-relaxed flex-1">{description}</p>

        <div className="flex items-center gap-2 text-accent-yellow font-mono font-bold text-xs tracking-widest group-hover:gap-3 transition-all duration-150">
          BEGIN {level}
          <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  )
}
