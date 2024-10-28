import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#1a1a1a",
        primary: {
          DEFAULT: "#1a1a1a",
          foreground: "#fafafa",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#1a1a1a",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#1a1a1a",
        },
        secondary: {
          DEFAULT: "#f2f2f2",
          foreground: "#1a1a1a",
        },
        muted: {
          DEFAULT: "#f2f2f2",
          foreground: "#8f8f8f",
        },
        accent: {
          DEFAULT: "#f2f2f2",
          foreground: "#1a1a1a",
        },
        destructive: {
          DEFAULT: "#ffcc00",
          foreground: "#fafafa",
        },
        border: "#e0e0e0",
        input: "#e0e0e0",
        ring: "#1a1a1a",
        chart: {
          "1": "#ffcc00",
          "2": "#3c9c9c",
          "3": "#4a90e2",
          "4": "#d5d9e0",
          "5": "#f2d6b2",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
