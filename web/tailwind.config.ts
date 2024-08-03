import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: { elypink: "#ffc6f5", vpgray: "#1b1b1f", vpwhite: "#ebebf599" },
    },
  },
  plugins: [],
};
export default config;
