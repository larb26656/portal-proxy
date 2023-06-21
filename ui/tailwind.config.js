/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      'primary': '#40b1f7',
      'secondary': '#fedd10',
      'bg': '#1c1c1c',
      'bg-highlight': '#2b2b2b',
      'bg-highlight-l': '#ababab',
      'dark': '#000000',
      'light': '#ffffff',
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      display: ['Anton']
    },
    spacing: {
      '0': '0px',
      '1': '4px',
      '2': '8px',
      '3': '16px',
      '4': '24px',
      '5': '32px',
    },
    padding: {
      '0': '0px',
      '1': '4px',
      '2': '8px',
      '3': '16px',
      '4': '24px',
      '5': '32px',
    },
    extend: {}
  },
  plugins: [],
}

