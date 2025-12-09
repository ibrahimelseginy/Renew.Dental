import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#BF996C", // Updated to match logo identity color
          50: "#F9F6F0",
          100: "#F2EBE0",
          200: "#E5D5C1",
          300: "#D8C0A1",
          400: "#CBA982",
          500: "#BF996C",
          600: "#9E845B",
          700: "#766344",
          800: "#4F422E",
          900: "#272117",
        },
        secondary: {
          DEFAULT: "#94a3b8",
        },
      },
      fontFamily: {
        sans: ["var(--font-alexandria)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(197, 165, 114, 0.15)", // Gold shadow
      },
    },
  },
  plugins: [],
}

export default config

