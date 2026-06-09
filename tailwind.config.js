/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './component/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        navy: {
          DEFAULT: '#0A0F1E',
          light: '#111827',
          surface: '#151B2E',
        },
      },
      fontFamily: {
        sans: ['var(--font-lato)', 'Lato', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(0, 0, 0, 0.25)',
        glow: '0 0 24px rgba(59, 130, 246, 0.15)',
      },
    },
  },
  plugins: [],
}
