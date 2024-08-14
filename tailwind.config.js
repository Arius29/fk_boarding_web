/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'factor-k-background': "url('./assets/images/factor-k-background.png')",
      },
      colors: {
        'blue-550': '#0487FA',
        'blue-650': '#0A4280',
      },
    },
  },
  plugins: [],
}
