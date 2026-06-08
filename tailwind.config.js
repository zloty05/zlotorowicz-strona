/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: {
          DEFAULT: '#C4992A',
          light: '#D4AA3A',
          dark: '#A07A18',
          subtle: '#F5EDD6',
        },
        ink: {
          DEFAULT: '#111111',
          soft: '#333333',
          muted: '#666666',
          faint: '#999999',
        },
        surface: {
          DEFAULT: '#FAFAF8',
          card: '#FFFFFF',
          border: '#E8E4DC',
          hover: '#F2EFE8',
        },
      },
    },
  },
  plugins: [],
}
