/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        main: '#6400FF',
        gray: '#999',
        lightGray: '#e5e5e5',
        back: '#fafafa',
        black: '#000',
        font: '#333',
      },
      fontFamily: {
        geist: ['var(--font-geist-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
