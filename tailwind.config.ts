import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.{html,js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        jsPrimary100: "#000",
        jsPrimary200: "#0056D2",
        jsBlue: "#082838",
        jsBlack: "#646c70",
      },
      screens: {
        custom_sm: "400px",
      },
    },
  },
  plugins: [],
};
export default config;
