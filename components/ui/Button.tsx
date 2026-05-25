import Link from 'next/link'
import { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  href?: string
  onClick?: () => void
  className?: string
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
}: ButtonProps) {
  const baseStyle: React.CSSProperties =
    variant === 'primary'
      ? {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          background: 'var(--yellow)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-display)',
          fontSize: 22,
          letterSpacing: '0.04em',
          padding: '14px 36px',
          borderRadius: 9999,
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 20px var(--yellow-glow)',
          transition: 'transform 150ms ease, box-shadow 150ms ease',
          textDecoration: 'none',
          whiteSpace: 'nowrap' as const,
        }
      : {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'transparent',
          color: 'var(--yellow)',
          fontFamily: 'var(--font-display)',
          fontSize: 20,
          letterSpacing: '0.04em',
          padding: '12px 28px',
          borderRadius: 9999,
          border: '2px solid var(--yellow)',
          cursor: 'pointer',
          transition: 'background 150ms ease, color 150ms ease',
          textDecoration: 'none',
          whiteSpace: 'nowrap' as const,
        }

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (variant === 'primary') {
      ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'
      ;(e.currentTarget as HTMLElement).style.boxShadow =
        '0 4px 40px rgba(255,215,0,0.65)'
    } else {
      ;(e.currentTarget as HTMLElement).style.background = 'var(--yellow)'
      ;(e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (variant === 'primary') {
      ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
      ;(e.currentTarget as HTMLElement).style.boxShadow =
        '0 4px 20px var(--yellow-glow)'
    } else {
      ;(e.currentTarget as HTMLElement).style.background = 'transparent'
      ;(e.currentTarget as HTMLElement).style.color = 'var(--yellow)'
    }
  }

  const props = {
    style: baseStyle,
    className,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  }

  if (href) {
    return (
      <Link href={href} {...props}>
        {children}
        {variant === 'primary' && <ArrowRight size={20} />}
      </Link>
    )
  }

  return (
    <button onClick={onClick} {...props}>
      {children}
      {variant === 'primary' && <ArrowRight size={20} />}
    </button>
  )
}
