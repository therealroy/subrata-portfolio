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
  // Font Typography properties
  fontPresetId?: string;
  fontDisplay?: string;  // e.g. 'Syne'
  fontSans?: string;     // e.g. 'Space Grotesk'
  fontMono?: string;     // e.g. 'JetBrains Mono'
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

export interface FontPreset {
  id: string;
  name: string;
  category: string;
  description: string;
  display: string;   // e.g. 'Syne'
  sans: string;      // e.g. 'Space Grotesk'
  mono: string;      // e.g. 'JetBrains Mono'
}

export const FONT_PRESETS: FontPreset[] = [
  {
    id: 'obsidian-tech',
    name: 'Obsidian Tech (Default)',
    category: 'High-Impact Neo-Grotesque',
    description: 'Syne display headings with Space Grotesk body and JetBrains Mono code.',
    display: 'Syne',
    sans: 'Space Grotesk',
    mono: 'JetBrains Mono',
  },
  {
    id: 'clean-enterprise',
    name: 'Clean Enterprise / SaaS',
    category: 'Refined Contemporary',
    description: 'Plus Jakarta Sans headers with Inter body text. Crisp, clean, and corporate.',
    display: 'Plus Jakarta Sans',
    sans: 'Inter',
    mono: 'JetBrains Mono',
  },
  {
    id: 'cyber-futuristic',
    name: 'Cyberpunk & Sci-Fi',
    category: 'Futuristic Tech',
    description: 'Orbitron geometric headings with Space Grotesk body and Fira Code.',
    display: 'Orbitron',
    sans: 'Space Grotesk',
    mono: 'Fira Code',
  },
  {
    id: 'geometric-impact',
    name: 'Geometric Modern',
    category: 'Bold & Punchy',
    description: 'Outfit display with Plus Jakarta Sans body and Space Mono tags.',
    display: 'Outfit',
    sans: 'Plus Jakarta Sans',
    mono: 'Space Mono',
  },
  {
    id: 'executive-editorial',
    name: 'Executive Editorial',
    category: 'Prestige & Architectural',
    description: 'Playfair Display editorial headers paired with clean Inter body prose.',
    display: 'Playfair Display',
    sans: 'Inter',
    mono: 'JetBrains Mono',
  },
  {
    id: 'urban-grotesk',
    name: 'Urban Grotesque',
    category: 'Industrial Design',
    description: 'Montserrat heavyweight display with Space Grotesk body.',
    display: 'Montserrat',
    sans: 'Space Grotesk',
    mono: 'JetBrains Mono',
  },
  {
    id: 'digital-humanist',
    name: 'Digital Humanist',
    category: 'Friendly & Polished',
    description: 'Poppins display headers with Inter body and JetBrains Mono.',
    display: 'Poppins',
    sans: 'Inter',
    mono: 'JetBrains Mono',
  },
  {
    id: 'pure-terminal',
    name: 'Pure Terminal Code',
    category: 'Developer Minimalist',
    description: 'JetBrains Mono for headings and code with Inter for long prose.',
    display: 'JetBrains Mono',
    sans: 'Inter',
    mono: 'JetBrains Mono',
  },
];

export const POPULAR_DISPLAY_FONTS = [
  'Syne',
  'Plus Jakarta Sans',
  'Space Grotesk',
  'Inter',
  'Orbitron',
  'Outfit',
  'Montserrat',
  'Playfair Display',
  'Poppins',
  'JetBrains Mono',
];

export const POPULAR_SANS_FONTS = [
  'Space Grotesk',
  'Inter',
  'Plus Jakarta Sans',
  'Roboto',
  'Open Sans',
  'Poppins',
  'Montserrat',
  'Outfit',
];

export const POPULAR_MONO_FONTS = [
  'JetBrains Mono',
  'Fira Code',
  'Space Mono',
  'Roboto Mono',
  'Inconsolata',
  'Courier Prime',
];

export const DEFAULT_THEME: PortfolioTheme = {
  ...THEME_PRESETS[0],
  fontPresetId: 'obsidian-tech',
  fontDisplay: 'Syne',
  fontSans: 'Space Grotesk',
  fontMono: 'JetBrains Mono',
};

export function ensureGoogleFontsLoaded(fonts: string[]): void {
  if (typeof document === 'undefined') return;

  const validFonts = fonts
    .filter(Boolean)
    .map(f => f.trim())
    .filter(f => !['monospace', 'sans-serif', 'serif', 'system-ui'].includes(f.toLowerCase()));

  if (validFonts.length === 0) return;

  const linkId = 'dynamic-portfolio-google-fonts';
  let link = document.getElementById(linkId) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  const queryFamilies = validFonts.map(f => {
    const formatted = f.replace(/\s+/g, '+');
    return `family=${formatted}:wght@400;500;600;700;800;900`;
  }).join('&');

  const newHref = `https://fonts.googleapis.com/css2?${queryFamilies}&display=swap`;
  if (link.href !== newHref) {
    link.href = newHref;
  }
}

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

  // Dynamic Typography Font Variables
  const fontDisplay = theme.fontDisplay || 'Syne';
  const fontSans = theme.fontSans || 'Space Grotesk';
  const fontMono = theme.fontMono || 'JetBrains Mono';

  root.style.setProperty('--font-display', `"${fontDisplay}", "Space Grotesk", sans-serif`);
  root.style.setProperty('--font-sans', `"${fontSans}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`);
  root.style.setProperty('--font-mono', `"${fontMono}", monospace`);

  // Dynamically load font files from Google Fonts
  ensureGoogleFontsLoaded([fontDisplay, fontSans, fontMono]);

  // Apply directly to body element
  if (document.body) {
    document.body.style.backgroundColor = `rgb(${bgRgb})`;
    document.body.style.color = `rgb(${textRgb})`;
    document.body.style.fontFamily = `"${fontSans}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  }
}

