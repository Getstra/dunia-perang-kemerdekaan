
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: {
          light: "#ffffff", // Pure white background
          dark: "#121212", // Dark background for dark mode
        },
        text: {
          light: "#000000", // Pure black text
          dark: "#ffffff", // White text for dark mode
        },
        // Minimal accent colors
        accent: {
          light: "#f0f0f0", // Light gray for light mode accents
          dark: "#1e1e1e", // Dark gray for dark mode accents
        },
        border: {
          light: "#e0e0e0", // Light border color
          dark: "#333333", // Dark border color
        }
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
