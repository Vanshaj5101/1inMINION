export default function PixelMinion({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Body */}
      <rect x="9" y="14" width="18" height="18" rx="4" fill="#FFD700" />
      {/* Head */}
      <rect x="10" y="4" width="16" height="14" rx="6" fill="#FFD700" />
      {/* Goggles strap */}
      <rect x="9" y="11" width="18" height="5" rx="1" fill="#4A4A5A" />
      {/* Left goggle */}
      <circle cx="14" cy="13" r="4" fill="#888" />
      <circle cx="14" cy="13" r="3" fill="#E8E8F0" />
      {/* Right goggle */}
      <circle cx="22" cy="13" r="4" fill="#888" />
      <circle cx="22" cy="13" r="3" fill="#E8E8F0" />
      {/* Left eye */}
      <circle cx="14" cy="13" r="2" fill="#2A2A3A" style={{ transformOrigin: '14px 13px', animation: 'minionBlink 3s ease-in-out infinite' }} />
      <circle cx="14.6" cy="12.3" r="0.6" fill="white" />
      {/* Right eye */}
      <circle cx="22" cy="13" r="2" fill="#2A2A3A" style={{ transformOrigin: '22px 13px', animation: 'minionBlink 3s ease-in-out infinite' }} />
      <circle cx="22.6" cy="12.3" r="0.6" fill="white" />
      {/* Overalls */}
      <rect x="11" y="22" width="14" height="10" rx="2" fill="#3B5AA0" />
      {/* Overalls straps */}
      <rect x="13" y="18" width="3" height="5" rx="1" fill="#3B5AA0" />
      <rect x="20" y="18" width="3" height="5" rx="1" fill="#3B5AA0" />
      {/* Overalls pocket */}
      <rect x="15" y="24" width="6" height="4" rx="1" fill="#2E4A8A" />
      {/* Mouth */}
      <path d="M15 19.5 Q18 21 21 19.5" stroke="#5A3A1A" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  )
}
