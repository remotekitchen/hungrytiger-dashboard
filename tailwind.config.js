/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",],
 
  daisyui: {
    themes: [
      {
        mytheme: {
          // primary: "#677BFE",
          primary: "#42C2FF",

          secondary: "#9ca3af",

          accent: "#1FB2A5",

          neutral: "#191D24",

          "base-100": "#f3f4f6",
          "gray-bold": "#21272A",

          info: "#3ABFF8",

          success: "#36D399",

          warning: "#FBBD23",

          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
