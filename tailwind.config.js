import scrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#161f5f",
        secondary: "#ff2e17",
      },
      backgroundColor: {
        primary: "#161f5f",
        download: "#F7F8FD",
        history: "#EFF3FF",
      },
      backgroundImage: {
        "pricelist-component": "url('/priceList.png')",
      },
      screens: {
        "laptop-l": { max: "100em" },
        "laptop-md": { max: "90em" },
        "laptop-m": { max: "83.75em" },
        laptop: { max: "80em" },
        "laptop-s": { max: "71.25em" },
        "tab-l": { max: "64em" },
        "tab-m": { max: "60.875em" },
        "tab-s": { max: "55em" },
        mobile: { max: "31.25em" },
        tab: { max: "38.4375em" },
        "mb-l": { max: "27.5em" },
        "mb-x": { max: "25em"}, 
        "mb-m": { max: "22em" },
        mb: { max: "20em" },              
        "min-laptop": { min: "80em" },       
      },
    },
  },
  plugins: [scrollbar({ nocompatible: true })],
};
