/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'primary': ['Lobster', 'system-ui'],
        'secondary': ['Lora', 'system-ui'],
      },
      colors: {
        'white': {
          'DEFAULT': '#EBEFF7',
          '50': '#EBEFE7',
          '100': '#EBEFD7',
          '200': '#EBEFF7',
        },
        'black': {
          'DEFAULT': '#2B2F36',
          '50': '#2B2F26',
          '100': '#2B2F16',
          '200': '#2B2F36',
        },
      }
    },
  },
  plugins: [],
}