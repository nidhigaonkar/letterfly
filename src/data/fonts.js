export const FONT_OPTIONS = [
  { id: 'parisienne', label: 'Parisienne', family: "'Parisienne', cursive" },
  { id: 'caveat', label: 'Caveat', family: "'Caveat', cursive" },
  { id: 'shadows', label: 'Shadows Into Light', family: "'Shadows Into Light', cursive" },
  { id: 'homemade', label: 'Homemade Apple', family: "'Homemade Apple', cursive" },
  { id: 'playball', label: 'Playball', family: "'Playball', cursive" },
];

export const DEFAULT_FONT = FONT_OPTIONS[0].id;

export function getFontFamily(fontId) {
  const font = FONT_OPTIONS.find((f) => f.id === fontId);
  return font ? font.family : FONT_OPTIONS[0].family;
}
