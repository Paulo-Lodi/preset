import type { Config } from "tailwindcss";
import { colors } from "./desing-system/token";

export default {
  content: ["./components/**/*.{js,ts,jsx,tsx,mdx}","./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
        error: colors.error,
        background: colors.background,
      },
      fontFamily: {
        sans: ["Roboto", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
