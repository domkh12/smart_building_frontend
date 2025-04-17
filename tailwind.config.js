const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    screens: {
      xxxs: "240px",
      xxs: "320px",
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      custom: "300px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: "#2C3092",
      "primary-hover": "#4A4FB3",
      secondary: "#ff8a4c",
      "secondary-hover": "#ff5a1f",
      smallBorder: "#E1E1E1",
      "gray-cus": "#424242",
      "light-gray": "#808080",
    },
    extend: {
      fontSize: {
        clamp: "clamp(0.5rem, 5vw, 1.5rem)",
        clampSmall: "clamp(0.5rem, 5vw, 1rem)",
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    require("flowbite/plugin")({
      charts: true,
    }),
  ],
};
