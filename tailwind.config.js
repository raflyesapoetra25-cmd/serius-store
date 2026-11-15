/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0D0D0D',
        paper: '#F6F3EC',
        white: '#FFFFFF',
        'acid-lime': '#CDFF3E',
        tomato: '#FF4D2E',
        lavender: '#B9A7FF',
        amber: '#FFB020',
        success: '#1FA85B',
        'gray-600': '#6B6B6B',
        'gray-200': '#E4E0D6',
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        'brutal': '4px 4px 0 0 #0D0D0D',
        'brutal-sm': '2px 2px 0 0 #0D0D0D',
        'brutal-hover': '1px 1px 0 0 #0D0D0D',
      },
      spacing: {
        '18': '4.5rem',
      }
    },
  },
  plugins: [],
}
