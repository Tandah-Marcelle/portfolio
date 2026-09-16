import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Tech Orange — Primary Branding Accent (#FF6B00)
        "tech-orange": {
          DEFAULT: "#FF6B00",
          50: "#FFF3EB",
          100: "#FFE4D1",
          200: "#FFC5A3",
          300: "#FFA16B",
          400: "#FF8038",
          500: "#FF6B00",
          600: "#E05A00",
          700: "#B84500",
          800: "#8F3500",
          900: "#6B2700",
          950: "#3D1400",
        },
        // Deep Emerald Green — Secondary Accent (#00C853)
        "tech-emerald": {
          DEFAULT: "#00C853",
          50: "#E6FBF0",
          100: "#C4F6DC",
          200: "#91EFC0",
          300: "#55E4A0",
          400: "#1CD682",
          500: "#00C853",
          600: "#00A543",
          700: "#008335",
          800: "#02662B",
          900: "#035425",
          950: "#003013",
        },
        // Dark Mode Base Surfaces (Obsidian Obsidian Theme)
        dark: {
          bg: "#07090E",
          card: "#0F131D",
          surface: "#161C2A",
          border: "#232C3F",
          muted: "#8A99AD",
        },
        // Legacy primary/secondary mappings pointing to brand palette for full compatibility
        primary: {
          50: "#E6FBF0",
          100: "#C4F6DC",
          500: "#00C853",
          600: "#00A543",
          900: "#035425",
          950: "#07090E",
        },
        secondary: {
          50: "#FFF3EB",
          100: "#FFE4D1",
          200: "#FFC5A3",
          300: "#FFA16B",
          400: "#FF8038",
          500: "#FF6B00",
          600: "#FF6B00",
          700: "#E05A00",
          900: "#6B2700",
          950: "#3D1400",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "orange-glow": "0 0 25px -5px rgba(255, 107, 0, 0.4)",
        "emerald-glow": "0 0 25px -5px rgba(0, 200, 83, 0.4)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
    },
  },
  plugins: [],
};

export default config;
