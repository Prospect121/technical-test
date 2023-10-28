/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  important: true,
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-out-down': {
          from: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
          to: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-out-up': {
          from: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
          to: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        'fade-in-down': 'fade-in-down 0.3s ease-out',
        'fade-out-down': 'fade-out-down 0.3s ease-out',
        'fade-in-up': 'fade-in-up 0.3s ease-out',
        'fade-out-up': 'fade-out-up 0.3s ease-out',
      },
      colors: {
        primary: {
          50: '#DEEFF8',
          100: '#BCDEF0',
          200: '#79BDE2',
          300: '#369CD3',
          400: '#22719B',
          500: '#133F57',
          600: '#103447',
          700: '#0B2432',
          800: '#071821',
          900: '#040C11',
          950: '#020608',
        },
        teal: {
          50: "#E5F8FB",
          100: "#CBF1F6",
          200: "#9BE4EE",
          300: "#67D6E5",
          400: "#32C8DC",
          500: "#1FA4B5",
          600: "#198290",
          700: "#13626D",
          800: "#0D434A",
          900: "#061F23",
          950: "#031011"
        }
      },
    },
  },
  plugins: [],
};
