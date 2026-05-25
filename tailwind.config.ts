import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary':   '#F8F8F5',
        'bg-secondary': '#FFFFFF',
        'bg-tertiary':  '#F2F2EE',
        'bg-code':      '#F4F4F0',
        'accent-yellow':       '#E9950A',
        'accent-yellow-muted': '#C47D08',
        'accent-blue':         '#1D5BD4',
        'accent-purple':       '#6C2BD9',
        'accent-green':        '#0A7554',
        'accent-red':          '#C11F27',
        'text-main':    '#0F0F1A',
        'text-muted':   '#64748B',
        'border-dark':  '#E4E4DE',
      },
      fontFamily: {
        display: ['var(--font-bangers)', 'Bangers', 'cursive'],
        sans:    ['var(--font-nunito)', 'Nunito', 'sans-serif'],
        body:    ['var(--font-nunito)', 'Nunito', 'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'xs':        '0 1px 2px rgba(0,0,0,0.05)',
        'sm':        '0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)',
        'md':        '0 4px 8px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04)',
        'hover':     '0 8px 18px rgba(0,0,0,0.09), 0 2px 6px rgba(0,0,0,0.05)',
        'amber':     '0 4px 12px rgba(233,149,10,0.18), 0 1px 3px rgba(233,149,10,0.12)',
        'amber-lg':  '0 8px 20px rgba(233,149,10,0.26), 0 2px 6px rgba(233,149,10,0.16)',
      },
      animation: {
        'blink-cursor': 'blinkCursor 1s step-end infinite',
        'minion-blink': 'minionBlink 3s ease-in-out infinite',
        'fade-up':      'fadeUp 0.3s ease-out forwards',
        'shadow-pulse': 'shadowPulse 2.2s ease-in-out infinite',
      },
      keyframes: {
        blinkCursor: {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0' },
        },
        minionBlink: {
          '0%, 84%, 100%': { transform: 'scaleY(1)' },
          '88%':            { transform: 'scaleY(0.08)' },
          '91%':            { transform: 'scaleY(1)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shadowPulse: {
          '0%, 100%': { boxShadow: '0 4px 12px rgba(233,149,10,0.18)' },
          '50%':       { boxShadow: '0 8px 24px rgba(233,149,10,0.28)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
