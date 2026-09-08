// Cute "die-cut sticker" style paper decorations: flat colors, a white sticker
// border, and a bold ink outline — like planner stickers, not glowing icons.
import { useId } from 'react';

const INK = '#5c4433';

function mix(hexA, hexB, amt) {
  const parse = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const a = parse(hexA);
  const b = parse(hexB);
  const mixed = a.map((c, i) => Math.round(c + (b[i] - c) * amt));
  return `#${mixed.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

const lighten = (hex, amt) => mix(hex, '#ffffff', amt);

function shadowFilter(uid) {
  return (
    <filter id={`${uid}-shadow`} x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.6" floodColor={INK} floodOpacity="0.22" />
    </filter>
  );
}

export function PaperStar({ color = '#f4b6c2' }) {
  const uid = useId().replace(/:/g, '');
  const points = [
    [60, 6], [74, 44], [116, 44], [82, 68], [95, 108],
    [60, 84], [25, 108], [38, 68], [4, 44], [46, 44],
  ];
  const outline = points.map((p) => p.join(',')).join(' ');
  const highlight = lighten(color, 0.45);
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%">
      <defs>{shadowFilter(uid)}</defs>
      <g filter={`url(#${uid}-shadow)`}>
        <polygon points={outline} fill="#ffffff" transform="translate(60 58) scale(1.14) translate(-60 -58)" />
        <polygon points={outline} fill={color} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <polygon points="60,6 74,44 60,58 46,44" fill={highlight} />
        {[2, 6].map((i) => (
          <line key={i} x1="60" y1="58" x2={points[i][0]} y2={points[i][1]} stroke={INK} strokeOpacity="0.2" strokeWidth="1.5" />
        ))}
      </g>
    </svg>
  );
}

export function PaperHeart({ color = '#f2a9b8' }) {
  const uid = useId().replace(/:/g, '');
  const d = 'M60 100 C10 65 4 34 26 18 C42 6 58 16 60 32 C62 16 78 6 94 18 C116 34 110 65 60 100 Z';
  const highlight = lighten(color, 0.45);
  return (
    <svg viewBox="0 0 120 110" width="100%" height="100%">
      <defs>{shadowFilter(uid)}</defs>
      <g filter={`url(#${uid}-shadow)`}>
        <path d={d} fill="#ffffff" transform="translate(60 55) scale(1.14) translate(-60 -55)" />
        <path d={d} fill={color} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M30 22 C40 14 53 19 58 29 C49 25 39 27 33 33 Z" fill={highlight} />
      </g>
    </svg>
  );
}

function Petal({ x, y, r, angle, fill }) {
  return (
    <path
      d={`M ${x} ${y} C ${x - r * 0.55} ${y - r * 0.6}, ${x - r * 0.55} ${y - r * 1.5}, ${x} ${y - r * 1.9}
          C ${x + r * 0.55} ${y - r * 1.5}, ${x + r * 0.55} ${y - r * 0.6}, ${x} ${y} Z`}
      fill={fill}
      stroke={INK}
      strokeOpacity="0.5"
      strokeWidth="1.3"
      strokeLinejoin="round"
      transform={`rotate(${angle} ${x} ${y})`}
    />
  );
}

export function SingleFlower({ color = '#f7c8dd', center = '#f6d76b' }) {
  const uid = useId().replace(/:/g, '');
  const outerAngles = [0, 60, 120, 180, 240, 300];
  const innerAngles = [30, 90, 150, 210, 270, 330];
  const innerColor = lighten(color, 0.35);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <defs>{shadowFilter(uid)}</defs>
      <g filter={`url(#${uid}-shadow)`}>
        <circle cx="50" cy="50" r="42" fill="#ffffff" />
        {outerAngles.map((angle) => (
          <Petal key={`o${angle}`} x={50} y={50} r={17} angle={angle} fill={color} />
        ))}
        {innerAngles.map((angle) => (
          <Petal key={`i${angle}`} x={50} y={50} r={11} angle={angle} fill={innerColor} />
        ))}
        <circle cx="50" cy="50" r="9" fill={center} stroke={INK} strokeOpacity="0.5" strokeWidth="1.3" />
        <circle cx="47" cy="47" r="2.2" fill="#ffffff" opacity="0.85" />
      </g>
    </svg>
  );
}

function Bloom({ x, y, r, color, center }) {
  const petalAngles = [0, 72, 144, 216, 288];
  return (
    <g>
      <circle cx={x} cy={y} r={r * 1.35} fill="#ffffff" />
      {petalAngles.map((angle) => (
        <Petal key={angle} x={x} y={y} r={r} angle={angle} fill={color} />
      ))}
      <circle cx={x} cy={y} r={r * 0.35} fill={center} stroke={INK} strokeOpacity="0.5" strokeWidth="1" />
    </g>
  );
}

export function FlowerBouquet({ colors = ['#f2a9b8', '#f6d76b', '#c9dfc0'] }) {
  const uid = useId().replace(/:/g, '');
  const blooms = [
    { x: 36, y: 34, r: 10, color: colors[0] },
    { x: 60, y: 24, r: 9, color: colors[1] },
    { x: 80, y: 36, r: 9.5, color: colors[2] },
  ];
  return (
    <svg viewBox="0 0 120 130" width="100%" height="100%">
      <defs>{shadowFilter(uid)}</defs>
      <g filter={`url(#${uid}-shadow)`}>
        <path d="M40 118 L60 60 L80 118 Z" fill="#faf3e2" stroke={INK} strokeOpacity="0.35" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M60 60 L60 118" stroke={INK} strokeOpacity="0.15" strokeWidth="1" />
        <path d="M60 60 L34 30" stroke="#8fae7c" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M60 60 L60 22" stroke="#8fae7c" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M60 60 L78 34" stroke="#8fae7c" strokeWidth="3" fill="none" strokeLinecap="round" />
        {blooms.map((b, i) => (
          <Bloom key={i} x={b.x} y={b.y} r={b.r} color={b.color} center="#f6d76b" />
        ))}
        <path d="M50 108 Q60 100 70 108" stroke="#e08fa3" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function RibbonBow({ color = '#e08fa3' }) {
  const uid = useId().replace(/:/g, '');
  const highlight = lighten(color, 0.4);
  return (
    <svg viewBox="0 0 100 70" width="100%" height="100%">
      <defs>{shadowFilter(uid)}</defs>
      <g filter={`url(#${uid}-shadow)`}>
        <path
          d="M50 35 L12 12 C4 8 4 44 14 40 Z M50 35 L88 12 C96 8 96 44 86 40 Z"
          fill="#ffffff"
          transform="translate(50 26) scale(1.12) translate(-50 -26)"
        />
        <path d="M50 35 L12 12 C4 8 4 44 14 40 Z" fill={color} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M50 35 L88 12 C96 8 96 44 86 40 Z" fill={color} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M18 18 C24 16 30 18 34 24" fill="none" stroke={highlight} strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="35" r="10" fill={color} stroke={INK} strokeWidth="2.5" />
        <path d="M45 42 L36 62 L48 56 Z" fill={color} stroke={INK} strokeOpacity="0.5" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M55 42 L64 62 L52 56 Z" fill={color} stroke={INK} strokeOpacity="0.5" strokeWidth="1.3" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export function WashiTape({ color = '#f6d76b', pattern = 'stripes' }) {
  const uid = useId().replace(/:/g, '');
  const outline = '4,4 12,0 148,0 156,4 152,42 144,46 8,46 0,42';
  return (
    <svg viewBox="0 0 160 46" width="100%" height="100%">
      <defs>
        <pattern id={`${uid}-p`} width="14" height="14" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill={color} />
          {pattern === 'stripes' && <rect width="7" height="14" fill="#ffffff" opacity="0.35" />}
          {pattern === 'dots' && <circle cx="7" cy="7" r="3" fill="#ffffff" opacity="0.4" />}
        </pattern>
        {shadowFilter(uid)}
      </defs>
      <g filter={`url(#${uid}-shadow)`}>
        <polygon points={outline} fill={`url(#${uid}-p)`} stroke={INK} strokeOpacity="0.3" strokeWidth="1.5" strokeLinejoin="round" />
        <polygon points="130,0 156,4 152,20" fill="#ffffff" stroke={INK} strokeOpacity="0.2" strokeWidth="1" opacity="0.8" />
      </g>
    </svg>
  );
}
