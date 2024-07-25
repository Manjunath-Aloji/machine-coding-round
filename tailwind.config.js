/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#112D4E',
        customBack: '#3F72AF',
        customInputBg : '#DBE2EF',
        danger : '#EB2D5B',
        success : '#23CF9B',
        primary : '#6C6BAF',
        secondary : '#E2BBE9',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        DmSans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

