/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '1133px': '1133px',
      },
      fontFamily: {
        rubik: ['rubik', 'sans-serif'],
        poppins: ['poppins', 'sans-serif'],
        nunito: ['nunito sans', 'sans-serif'],
      },
      container: {
        center: true,
      },
      backgroundImage: {
        heroSign: "url('./src/assets/images/robert-bye-95vx5QVl9x4-unsplash-2.png')",
        heroForgotPassword: "url('./src/assets/images/nani-williams-6PpLqUlCA0s-unsplash 1.png')",
        heroHome: "url('./src/assets/images/nathan-dumlao-71u2fOofI-U-unsplash 2.png')",
        'bg-cart': "url('/src/assets/bg-cart.png')",
      },
      colors: {
        brown: '#6A4029',
        yellow: '#FFBA33',
        primary: '#6A4029',
        secondary: '#FFBA33',
        third: '#bababa',
        fourth: '#f73a3a',
      },
      boxShadow: {
        'shadow-button': '2px 4px 12px 2px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
};
