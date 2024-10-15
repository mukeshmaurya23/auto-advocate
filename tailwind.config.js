/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce': 'bounce 1s infinite',
        'bounce-slow': 'bounce 1.5s infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(-25%)', opacity: 1 },
          '50%': { transform: 'none', opacity: 0.7 },
        },
      },
      backgroundColor: {
        'green-700': '#2a7086',
      },
      animationDelay: {
        '200': '200ms',
        '400': '400ms',
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}
