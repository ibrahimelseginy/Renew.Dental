import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#BF996C",
          50: "#F9F6F0",
          100: "#F2EBE0",
          200: "#E5D5C1",
          300: "#D8C0A3",
          400: "#CCAA87",
          500: "#BF996C", // Base logo color
          600: "#A67F51",
          700: "#805F36",
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
        soft: "0 10px 40px -10px rgba(191, 153, 108, 0.2)",
        glow: "0 0 20px rgba(191, 153, 108, 0.3)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}

export default config
