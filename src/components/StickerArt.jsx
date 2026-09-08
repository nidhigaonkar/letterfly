// Hand-drawn-feeling paper decorations, rendered as inline SVG so they stay crisp at any size.

export function PaperStar({ color = '#f4b6c2', fold = '#ffffff' }) {
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%">
      <defs>
        <filter id="starShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#5c4433" floodOpacity="0.28" />
        </filter>
      </defs>
      <polygon
        points="60,6 74,44 116,44 82,68 95,108 60,84 25,108 38,68 4,44 46,44"
        fill={color}
        filter="url(#starShadow)"
      />
      <polygon
        points="60,6 74,44 60,60 46,44"
        fill={fold}
        opacity="0.35"
      />
      <polygon
        points="60,6 74,44 116,44 82,68 95,108 60,84 25,108 38,68 4,44 46,44"
        fill="none"
        stroke="#5c4433"
        strokeOpacity="0.18"
        strokeWidth="2"
      />
    </svg>
  );
}

export function PaperHeart({ color = '#f2a9b8', fold = '#ffffff' }) {
  return (
    <svg viewBox="0 0 120 110" width="100%" height="100%">
      <defs>
        <filter id="heartShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#5c4433" floodOpacity="0.28" />
        </filter>
      </defs>
      <path
        d="M60 100 C10 65 4 34 26 18 C42 6 58 16 60 32 C62 16 78 6 94 18 C116 34 110 65 60 100 Z"
        fill={color}
        filter="url(#heartShadow)"
      />
      <path
        d="M60 32 C58 16 42 6 26 18 C15 26 12 38 16 50 C30 40 46 34 60 32 Z"
        fill={fold}
        opacity="0.3"
      />
      <path
        d="M60 100 C10 65 4 34 26 18 C42 6 58 16 60 32 C62 16 78 6 94 18 C116 34 110 65 60 100 Z"
        fill="none"
        stroke="#5c4433"
        strokeOpacity="0.18"
        strokeWidth="2"
      />
    </svg>
  );
}

export function SingleFlower({ color = '#f7c8dd', center = '#f6d76b' }) {
  const petalAngles = [0, 60, 120, 180, 240, 300];
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <defs>
        <filter id="flowerShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#5c4433" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#flowerShadow)">
        {petalAngles.map((angle) => (
          <ellipse
            key={angle}
            cx="50"
            cy="28"
            rx="13"
            ry="19"
            fill={color}
            stroke="#5c4433"
            strokeOpacity="0.15"
            strokeWidth="1.5"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
        <circle cx="50" cy="50" r="12" fill={center} stroke="#5c4433" strokeOpacity="0.2" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

export function FlowerBouquet({ colors = ['#f2a9b8', '#f6d76b', '#c9dfc0'] }) {
  const blooms = [
    { x: 34, y: 30, r: 12, color: colors[0] },
    { x: 60, y: 22, r: 10, color: colors[1] },
    { x: 78, y: 34, r: 11, color: colors[2] },
  ];
  return (
    <svg viewBox="0 0 120 130" width="100%" height="100%">
      <defs>
        <filter id="bouquetShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#5c4433" floodOpacity="0.25" />
        </filter>
      </defs>
      <path d="M40 118 L60 60 L80 118 Z" fill="#f4ecd8" stroke="#5c4433" strokeOpacity="0.15" strokeWidth="1.5" />
      <path d="M60 60 L34 30" stroke="#8fae7c" strokeWidth="3" fill="none" />
      <path d="M60 60 L60 22" stroke="#8fae7c" strokeWidth="3" fill="none" />
      <path d="M60 60 L78 34" stroke="#8fae7c" strokeWidth="3" fill="none" />
      <g filter="url(#bouquetShadow)">
        {blooms.map((b, i) => (
          <g key={i}>
            {[0, 72, 144, 216, 288].map((angle) => (
              <ellipse
                key={angle}
                cx={b.x}
                cy={b.y - b.r * 0.9}
                rx={b.r * 0.55}
                ry={b.r * 0.8}
                fill={b.color}
                stroke="#5c4433"
                strokeOpacity="0.15"
                strokeWidth="1"
                transform={`rotate(${angle} ${b.x} ${b.y})`}
              />
            ))}
            <circle cx={b.x} cy={b.y} r={b.r * 0.4} fill="#f6d76b" />
          </g>
        ))}
      </g>
      <path d="M50 108 Q60 100 70 108" stroke="#e08fa3" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function RibbonBow({ color = '#e08fa3' }) {
  return (
    <svg viewBox="0 0 100 70" width="100%" height="100%">
      <defs>
        <filter id="bowShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#5c4433" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#bowShadow)">
        <path d="M50 35 L12 12 C4 8 4 44 14 40 Z" fill={color} stroke="#5c4433" strokeOpacity="0.15" strokeWidth="1.5" />
        <path d="M50 35 L88 12 C96 8 96 44 86 40 Z" fill={color} stroke="#5c4433" strokeOpacity="0.15" strokeWidth="1.5" />
        <circle cx="50" cy="35" r="10" fill={color} stroke="#5c4433" strokeOpacity="0.2" strokeWidth="1.5" />
        <path d="M45 42 L36 62 L48 56 Z" fill={color} opacity="0.85" />
        <path d="M55 42 L64 62 L52 56 Z" fill={color} opacity="0.85" />
      </g>
    </svg>
  );
}

export function WashiTape({ color = '#f6d76b', pattern = 'stripes' }) {
  const patternId = `washi-${pattern}-${color.replace('#', '')}`;
  return (
    <svg viewBox="0 0 160 46" width="100%" height="100%">
      <defs>
        <pattern id={patternId} width="14" height="14" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill={color} />
          {pattern === 'stripes' && <rect width="7" height="14" fill="#ffffff" opacity="0.35" />}
          {pattern === 'dots' && <circle cx="7" cy="7" r="3" fill="#ffffff" opacity="0.4" />}
        </pattern>
      </defs>
      <polygon
        points="4,4 12,0 148,0 156,4 152,42 144,46 8,46 0,42"
        fill={`url(#${patternId})`}
        opacity="0.88"
      />
    </svg>
  );
}
