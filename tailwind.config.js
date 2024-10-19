/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    colors: {
      background: "#00000F",
      primary: "#207EC5",
      secondary: "#072640",
      accent: "#4D96E0",

      // Text
      black: "#00000F",
      white: "#F6FAFE",
    },
    extend: {},
  },
};
