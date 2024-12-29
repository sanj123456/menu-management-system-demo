/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        
        'green': '#9ff443',
        'blue': '#253bff',
        "primary": "#101828",
        'secondary': "",
        'lightBlack': "#101828",
        'gray': "#475467",
        'lightgray': "#d0d5dd"
      },
    },
  },
  plugins: [],
};
