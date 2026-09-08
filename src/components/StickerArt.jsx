// Hand-crafted-feeling paper decorations, rendered as inline SVG so they stay crisp at any size.
// Each shape uses a gradient (to fake the way paper catches light) plus thin crease lines
// (to fake folds), so they read as folded/cut paper rather than flat icons.
import { useId } from 'react';

export function PaperStar({ color = '#f4b6c2' }) {
  const uid = useId().replace(/:/g, "");
  const points = [
    [60, 6], [74, 44], [116, 44], [82, 68], [95, 108],
    [60, 84], [25, 108], [38, 68], [4, 44], [46, 44],
  ];
  const outline = points.map((p) => p.join(',')).join(' ');
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%">
      <defs>
        <radialGradient id={`${uid}-g`} cx="42%" cy="38%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="45%" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <filter id={`${uid}-shadow`} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#5c4433" floodOpacity="0.3" />
        </filter>
      </defs>
      <g filter={`url(#${uid}-shadow)`}>
        <polygon points={outline} fill={color} stroke="#5c4433" strokeOpacity="0.25" strokeWidth="1.5" />
        <polygon points={outline} fill={`url(#${uid}-g)`} />
        {[0, 2, 4, 6, 8].map((i) => (
          <line
            key={i}
            x1="60"
            y1="58"
            x2={points[i][0]}
            y2={points[i][1]}
            stroke="#5c4433"
            strokeOpacity="0.22"
            strokeWidth="1.3"
          />
        ))}
      </g>
    </svg>
  );
}

export function PaperHeart({ color = '#f2a9b8' }) {
  const uid = useId().replace(/:/g, "");
  const d = 'M60 100 C10 65 4 34 26 18 C42 6 58 16 60 32 C62 16 78 6 94 18 C116 34 110 65 60 100 Z';
  return (
    <svg viewBox="0 0 120 110" width="100%" height="100%">
      <defs>
        <radialGradient id={`${uid}-g`} cx="35%" cy="28%" r="75%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="50%" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <filter id={`${uid}-shadow`} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#5c4433" floodOpacity="0.3" />
        </filter>
      </defs>
      <g filter={`url(#${uid}-shadow)`}>
        <path d={d} fill={color} stroke="#5c4433" strokeOpacity="0.25" strokeWidth="1.5" />
        <path d={d} fill={`url(#${uid}-g)`} />
        <path d="M60 32 L60 92" stroke="#5c4433" strokeOpacity="0.15" strokeWidth="1.3" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function Petal({ id, x, y, r, angle }) {
  return (
    <path
      d={`M ${x} ${y} C ${x - r * 0.55} ${y - r * 0.6}, ${x - r * 0.55} ${y - r * 1.5}, ${x} ${y - r * 1.9}
          C ${x + r * 0.55} ${y - r * 1.5}, ${x + r * 0.55} ${y - r * 0.6}, ${x} ${y} Z`}
      fill={`url(#${id})`}
      stroke="#5c4433"
      strokeOpacity="0.18"
      strokeWidth="1"
      transform={`rotate(${angle} ${x} ${y})`}
    />
  );
}

export function SingleFlower({ color = '#f7c8dd', center = '#f6d76b' }) {
  const uid = useId().replace(/:/g, "");
  const outerAngles = [0, 60, 120, 180, 240, 300];
  const innerAngles = [30, 90, 150, 210, 270, 330];
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <defs>
        <linearGradient id={`${uid}-outer`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id={`${uid}-inner`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.85" />
        </linearGradient>
        <filter id={`${uid}-shadow`} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#5c4433" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter={`url(#${uid}-shadow)`}>
        {outerAngles.map((angle) => (
          <Petal key={`o${angle}`} id={`${uid}-outer`} x={50} y={50} r={17} angle={angle} />
        ))}
        {innerAngles.map((angle) => (
          <Petal key={`i${angle}`} id={`${uid}-inner`} x={50} y={50} r={11} angle={angle} />
        ))}
        <circle cx="50" cy="50" r="9" fill={center} stroke="#5c4433" strokeOpacity="0.2" strokeWidth="1.3" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line
            key={a}
            x1="50"
            y1="50"
            x2="50"
            y2="43"
            stroke="#5c4433"
            strokeOpacity="0.25"
            strokeWidth="1"
            transform={`rotate(${a} 50 50)`}
          />
        ))}
      </g>
    </svg>
  );
}

function Bloom({ uid, idx, x, y, r, color, center }) {
  const petalAngles = [0, 72, 144, 216, 288];
  const gradId = `${uid}-bloom-${idx}`;
  return (
    <g>
      <defs>
        <linearGradient id={gradId} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {petalAngles.map((angle) => (
        <Petal key={angle} id={gradId} x={x} y={y} r={r} angle={angle} />
      ))}
      <circle cx={x} cy={y} r={r * 0.35} fill={center} stroke="#5c4433" strokeOpacity="0.2" strokeWidth="1" />
    </g>
  );
}

export function FlowerBouquet({ colors = ['#f2a9b8', '#f6d76b', '#c9dfc0'] }) {
  const uid = useId().replace(/:/g, "");
  const blooms = [
    { x: 36, y: 34, r: 10, color: colors[0] },
    { x: 60, y: 24, r: 9, color: colors[1] },
    { x: 80, y: 36, r: 9.5, color: colors[2] },
  ];
  return (
    <svg viewBox="0 0 120 130" width="100%" height="100%">
      <defs>
        <linearGradient id={`${uid}-wrap`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fffaf0" />
          <stop offset="100%" stopColor="#f0e3c8" />
        </linearGradient>
        <filter id={`${uid}-shadow`} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#5c4433" floodOpacity="0.25" />
        </filter>
      </defs>
      <path
        d="M40 118 L60 60 L80 118 Z"
        fill={`url(#${uid}-wrap)`}
        stroke="#5c4433"
        strokeOpacity="0.18"
        strokeWidth="1.5"
      />
      <path d="M60 60 L60 118" stroke="#5c4433" strokeOpacity="0.12" strokeWidth="1" />
      <path d="M60 60 L34 30" stroke="#8fae7c" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M60 60 L60 22" stroke="#8fae7c" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M60 60 L78 34" stroke="#8fae7c" strokeWidth="3" fill="none" strokeLinecap="round" />
      <g filter={`url(#${uid}-shadow)`}>
        {blooms.map((b, i) => (
          <Bloom key={i} uid={uid} idx={i} x={b.x} y={b.y} r={b.r} color={b.color} center="#f6d76b" />
        ))}
      </g>
      <path d="M50 108 Q60 100 70 108" stroke="#e08fa3" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function RibbonBow({ color = '#e08fa3' }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 100 70" width="100%" height="100%">
      <defs>
        <linearGradient id={`${uid}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <filter id={`${uid}-shadow`} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#5c4433" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter={`url(#${uid}-shadow)`}>
        <path d="M50 35 L12 12 C4 8 4 44 14 40 Z" fill={color} stroke="#5c4433" strokeOpacity="0.2" strokeWidth="1.5" />
        <path d="M50 35 L12 12 C4 8 4 44 14 40 Z" fill={`url(#${uid}-g)`} />
        <path d="M50 35 L88 12 C96 8 96 44 86 40 Z" fill={color} stroke="#5c4433" strokeOpacity="0.2" strokeWidth="1.5" />
        <path d="M50 35 L88 12 C96 8 96 44 86 40 Z" fill={`url(#${uid}-g)`} />
        <path d="M50 20 L50 50" stroke="#5c4433" strokeOpacity="0.15" strokeWidth="1" />
        <circle cx="50" cy="35" r="10" fill={color} stroke="#5c4433" strokeOpacity="0.25" strokeWidth="1.5" />
        <path d="M45 42 L36 62 L48 56 Z" fill={color} opacity="0.9" stroke="#5c4433" strokeOpacity="0.15" strokeWidth="1" />
        <path d="M55 42 L64 62 L52 56 Z" fill={color} opacity="0.9" stroke="#5c4433" strokeOpacity="0.15" strokeWidth="1" />
      </g>
    </svg>
  );
}

export function WashiTape({ color = '#f6d76b', pattern = 'stripes' }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 160 46" width="100%" height="100%">
      <defs>
        <pattern id={`${uid}-p`} width="14" height="14" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill={color} />
          {pattern === 'stripes' && <rect width="7" height="14" fill="#ffffff" opacity="0.35" />}
          {pattern === 'dots' && <circle cx="7" cy="7" r="3" fill="#ffffff" opacity="0.4" />}
        </pattern>
        <linearGradient id={`${uid}-sheen`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id={`${uid}-shadow`} x="-30%" y="-60%" width="160%" height="220%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#5c4433" floodOpacity="0.22" />
        </filter>
      </defs>
      <g filter={`url(#${uid}-shadow)`}>
        <polygon points="4,4 12,0 148,0 156,4 152,42 144,46 8,46 0,42" fill={`url(#${uid}-p)`} opacity="0.92" />
        <polygon points="4,4 12,0 148,0 156,4 152,42 144,46 8,46 0,42" fill={`url(#${uid}-sheen)`} />
        <polygon points="130,0 156,4 152,20" fill="#ffffff" opacity="0.25" />
      </g>
    </svg>
  );
}
