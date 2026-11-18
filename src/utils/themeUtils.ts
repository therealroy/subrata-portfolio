export interface PortfolioTheme {
  presetId: string;
  name: string;
  accent: string;      // e.g. #F04B20
  accentHover: string; // e.g. #D93E15
  accentLight: string; // e.g. #FF653D
  background: string;  // e.g. #09090b
  card: string;        // e.g. #141418
  text: string;        // e.g. #ffffff
  textMuted: string;   // e.g. #a1a1aa
}

export function hexToRgbSpace(hex: string): string {
  const cleanHex = hex.replace('#', '').trim();
  const fullHex = cleanHex.length === 3
    ? cleanHex.split('').map(c => c + c).join('')
    : cleanHex;

  const num = parseInt(fullHex, 16);
  if (isNaN(num)) return '240 75 32';

  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `${r} ${g} ${b}`;
}

export function adjustHexBrightness(hex: string, percent: number): string {
  const cleanHex = hex.replace('#', '').trim();
  const fullHex = cleanHex.length === 3
    ? cleanHex.split('').map(c => c + c).join('')
    : cleanHex;

  const num = parseInt(fullHex, 16);
  if (isNaN(num)) return hex;

  let r = (num >> 16) & 255;
  let g = (num >> 8) & 255;
  let b = num & 255;

  r = Math.min(255, Math.max(0, Math.round(r * (1 + percent / 100))));
  g = Math.min(255, Math.max(0, Math.round(g * (1 + percent / 100))));
  b = Math.min(255, Math.max(0, Math.round(b * (1 + percent / 100))));

  const toHex = (c: number) => c.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export const THEME_PRESETS: PortfolioTheme[] = [
  {
    presetId: 'obsidian-flame',
    name: 'Obsidian Flame (Default)',
    accent: '#F04B20',
    accentHover: '#D93E15',
    accentLight: '#FF653D',
    background: '#09090b',
    card: '#141418',
    text: '#ffffff',
    textMuted: '#a1a1aa',
  },
  {
    presetId: 'cyber-emerald',
    name: 'Cyber Emerald (Terminal)',
    accent: '#10B981',
    accentHover: '#059669',
    accentLight: '#34D399',
    background: '#060b08',
    card: '#0e1813',
    text: '#ffffff',
    textMuted: '#94a3b8',
  },
  {
    presetId: 'electric-azure',
    name: 'Electric Azure (.NET Cloud)',
    accent: '#0EA5E9',
    accentHover: '#0284C7',
    accentLight: '#38BDF8',
    background: '#070c18',
    card: '#0f172a',
    text: '#ffffff',
    textMuted: '#94a3b8',
  },
  {
    presetId: 'neon-violet',
    name: 'Neon Violet (AI / Space)',
    accent: '#A855F7',
    accentHover: '#9333EA',
    accentLight: '#C084FC',
    background: '#0a0614',
    card: '#160e24',
    text: '#ffffff',
    textMuted: '#c084fc',
  },
  {
    presetId: 'crimson-forge',
    name: 'Crimson Forge (High-Energy)',
    accent: '#EF4444',
    accentHover: '#DC2626',
    accentLight: '#F87171',
    background: '#0c0606',
    card: '#1a0d0d',
    text: '#ffffff',
    textMuted: '#fca5a5',
  },
  {
    presetId: 'amber-gold',
    name: 'Amber Gold (Executive)',
    accent: '#F59E0B',
    accentHover: '#D97706',
    accentLight: '#FBBF24',
    background: '#0c0a07',
    card: '#19140d',
    text: '#ffffff',
    textMuted: '#d4d4d8',
  },
  {
    presetId: 'monolith-white',
    name: 'Monolith (Minimal B&W)',
    accent: '#E4E4E7',
    accentHover: '#D4D4D8',
    accentLight: '#FFFFFF',
    background: '#050505',
    card: '#141414',
    text: '#ffffff',
    textMuted: '#a1a1aa',
  },
];

export const DEFAULT_THEME = THEME_PRESETS[0];

export function applyThemeToDocument(theme: PortfolioTheme): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const accent = theme.accent || '#F04B20';
  const accentHover = theme.accentHover || adjustHexBrightness(accent, -15);
  const accentLight = theme.accentLight || adjustHexBrightness(accent, 20);
  const bg = theme.background || '#09090b';
  const card = theme.card || '#141418';
  const surface = adjustHexBrightness(card, 15);
  const border = adjustHexBrightness(card, 28);
  const text = theme.text || '#ffffff';
  const textMuted = theme.textMuted || '#a1a1aa';

  const accentRgb = hexToRgbSpace(accent);
  const accentHoverRgb = hexToRgbSpace(accentHover);
  const accentLightRgb = hexToRgbSpace(accentLight);
  const bgRgb = hexToRgbSpace(bg);
  const cardRgb = hexToRgbSpace(card);
  const surfaceRgb = hexToRgbSpace(surface);
  const borderRgb = hexToRgbSpace(border);
  const textRgb = hexToRgbSpace(text);
  const textMutedRgb = hexToRgbSpace(textMuted);

  // Space-separated RGB variables for Tailwind opacity support
  root.style.setProperty('--color-accent', accentRgb);
  root.style.setProperty('--color-accent-hover', accentHoverRgb);
  root.style.setProperty('--color-accent-light', accentLightRgb);
  root.style.setProperty('--color-bg', bgRgb);
  root.style.setProperty('--color-card', cardRgb);
  root.style.setProperty('--color-surface', surfaceRgb);
  root.style.setProperty('--color-border', borderRgb);
  root.style.setProperty('--color-text', textRgb);
  root.style.setProperty('--color-text-muted', textMutedRgb);

  // Exact HEX variables for direct CSS usage
  root.style.setProperty('--theme-accent', accent);
  root.style.setProperty('--theme-accent-hover', accentHover);
  root.style.setProperty('--theme-accent-light', accentLight);
  root.style.setProperty('--theme-bg', bg);
  root.style.setProperty('--theme-card', card);
  root.style.setProperty('--theme-surface', surface);
  root.style.setProperty('--theme-border', border);
  root.style.setProperty('--theme-text', text);
  root.style.setProperty('--theme-text-muted', textMuted);

  // Apply directly to body element
  if (document.body) {
    document.body.style.backgroundColor = `rgb(${bgRgb})`;
    document.body.style.color = `rgb(${textRgb})`;
  }
}

