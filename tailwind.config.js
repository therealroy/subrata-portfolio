/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: 'rgb(var(--color-accent, 240 75 32) / <alpha-value>)',
          'orange-hover': 'rgb(var(--color-accent-hover, 217 62 21) / <alpha-value>)',
          'orange-light': 'rgb(var(--color-accent-light, 255 101 61) / <alpha-value>)',
          accent: 'rgb(var(--color-accent, 240 75 32) / <alpha-value>)',
          'accent-hover': 'rgb(var(--color-accent-hover, 217 62 21) / <alpha-value>)',
          'accent-light': 'rgb(var(--color-accent-light, 255 101 61) / <alpha-value>)',
          // Dynamic customizable themes
          bg: 'rgb(var(--color-bg, 9 9 11) / <alpha-value>)',
          card: 'rgb(var(--color-card, 20 20 24) / <alpha-value>)',
          surface: 'rgb(var(--color-surface, 27 27 34) / <alpha-value>)',
          border: 'rgb(var(--color-border, 45 45 55) / <alpha-value>)',
          text: 'rgb(var(--color-text, 255 255 255) / <alpha-value>)',
          'text-muted': 'rgb(var(--color-text-muted, 161 161 170) / <alpha-value>)',
          // Theme Aliases
          burgundy: 'rgb(var(--color-bg, 9 9 11) / <alpha-value>)',
          'burgundy-dark': 'rgb(var(--color-bg, 9 9 11) / <alpha-value>)',
          'burgundy-card': 'rgb(var(--color-card, 20 20 24) / <alpha-value>)',
          'burgundy-surface': 'rgb(var(--color-surface, 27 27 34) / <alpha-value>)',
          'burgundy-border': 'rgb(var(--color-border, 45 45 55) / <alpha-value>)',
          dark: 'rgb(var(--color-bg, 9 9 11) / <alpha-value>)',
          charcoal: 'rgb(var(--color-card, 20 20 24) / <alpha-value>)',
          cream: '#FAF7F5',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans, "Space Grotesk")', 'Space Grotesk', 'Inter', 'sans-serif'],
        display: ['var(--font-display, "Syne")', 'Syne', 'Space Grotesk', 'sans-serif'],
        mono: ['var(--font-mono, "JetBrains Mono")', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-orange': '0 0 25px -4px rgb(var(--color-accent, 240 75 32) / 0.35)',
        'glow-orange-lg': '0 0 50px -8px rgb(var(--color-accent, 240 75 32) / 0.45)',
        'glow-subtle': '0 10px 40px -10px rgba(0, 0, 0, 0.7)',
        'inner-glow': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
