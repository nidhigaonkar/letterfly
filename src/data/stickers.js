export const STICKER_TYPES = [
  {
    type: 'star',
    label: 'Paper Star',
    icon: '⭐',
    colors: ['#f4b6c2', '#f6d76b', '#a7c7e7', '#c9dfc0'],
    defaultSize: 60,
  },
  {
    type: 'heart',
    label: 'Paper Heart',
    icon: '💗',
    colors: ['#f2a9b8', '#e08fa3', '#f6c1a1'],
    defaultSize: 58,
  },
  {
    type: 'flower',
    label: 'Little Flower',
    icon: '🌸',
    colors: ['#f7c8dd', '#fdeaa7', '#c9dfc0', '#c9b8e6'],
    defaultSize: 52,
  },
  {
    type: 'bouquet',
    label: 'Flower Bouquet',
    icon: '💐',
    colors: [['#f2a9b8', '#f6d76b', '#c9dfc0'], ['#c9b8e6', '#f6d76b', '#f2a9b8'], ['#f6c1a1', '#c9dfc0', '#f7c8dd']],
    defaultSize: 78,
  },
  {
    type: 'bow',
    label: 'Ribbon Bow',
    icon: '🎀',
    colors: ['#e08fa3', '#a7c7e7', '#f6d76b'],
    defaultSize: 56,
  },
  {
    type: 'washi',
    label: 'Washi Tape',
    icon: '🎗️',
    colors: ['#f6d76b', '#a7c7e7', '#f2a9b8', '#c9dfc0'],
    defaultSize: 90,
    wide: true,
  },
];

export const PAPER_COLORS = [
  { id: 'white', label: 'White', bg: '#ffffff', ink: '#5c4433' },
  { id: 'blush', label: 'Blush', bg: '#fbe9ee', ink: '#7a4a52' },
  { id: 'butter', label: 'Butter', bg: '#fdf6e0', ink: '#7a6a3a' },
  { id: 'mint', label: 'Mint', bg: '#e8f3e6', ink: '#3f5c3f' },
  { id: 'lavender', label: 'Lavender', bg: '#f0e9f8', ink: '#5c4a72' },
  { id: 'peach', label: 'Peach', bg: '#fdece0', ink: '#7a5236' },
];

export function makeSticker(type) {
  const def = STICKER_TYPES.find((s) => s.type === type);
  const color = def.colors[Math.floor(Math.random() * def.colors.length)];
  return {
    id: `${type}-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    type,
    x: 50 + (Math.random() * 16 - 8),
    y: 50 + (Math.random() * 16 - 8),
    rotation: Math.round(Math.random() * 30 - 15),
    scale: 1,
    color,
  };
}
