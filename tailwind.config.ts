import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "#fdf9f3",
        "surface-dim": "#ddd9d4",
        "surface-bright": "#fdf9f3",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f7f3ed",
        "surface-container": "#f1ede7",
        "surface-container-high": "#ebe8e2",
        "surface-container-highest": "#e6e2dc",
        "on-surface": "#1c1c18",
        "on-surface-variant": "#4a463f",
        "inverse-surface": "#31302d",
        "inverse-on-surface": "#f4f0ea",
        outline: "#7b766e",
        "outline-variant": "#ccc6bc",
        "surface-tint": "#615e59",
        primary: {
          DEFAULT: "#0f0d0a",
          foreground: "#ffffff",
          container: "#25231f",
          "on-container": "#8e8a84",
          fixed: "#e7e2db",
          "fixed-dim": "#cbc6bf",
        },
        secondary: {
          DEFAULT: "#745943",
          foreground: "#ffffff",
          container: "#fed9bc",
          "on-container": "#785d46",
        },
        tertiary: {
          DEFAULT: "#110d07",
          foreground: "#ffffff",
        },
        "soft-white": "#FFFEFC",
        "warm-gray": "#6F6A63",
        "light-taupe": "#D8CEC2",
        "muted-olive": "#74745B",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
      spacing: {
        base: "8px",
        "margin-mobile": "24px",
        "section-v-mobile": "64px",
        "section-v-desktop": "112px",
        gutter: "32px",
      },
      maxWidth: {
        "container-max": "1280px",
      },
      fontFamily: {
        serif: ["var(--font-eb-garamond)", "serif"],
        sans: ["var(--font-plus-jakarta-sans)", "sans-serif"],
        garamond: ["var(--font-eb-garamond)", "serif"],
        jakarta: ["var(--font-plus-jakarta-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
