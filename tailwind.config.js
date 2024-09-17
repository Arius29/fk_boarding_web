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
        'not-started': '#C3BE42',
        'in-progress': '#0487FA',
        completed: '#22B770',
        abandoned: '#7A7E8D',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideIn: 'slideIn 0.5s ease-out',
      },
    },
  },
  plugins: [],
}
