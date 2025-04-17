
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
      backdropBlur: {
        glass: "8px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Enhanced Neumorphism colors for better dark mode compatibility
        neu: {
          bg: {
            light: "#f0f0f3",
            dark: "#1A1F2C",
          },
          shadow: {
            light: {
              primary: "#ffffff",
              secondary: "#d1d9e6",
            },
            dark: {
              primary: "#202330",
              secondary: "#151823",
            },
          },
          text: {
            light: "#2a2a2a",
            dark: "#e0e0e0",
          },
          accent: {
            primary: "#8B5CF6",
            secondary: "#7048e8",
            tertiary: "#5734b6",
          },
          // Medieval theme accents
          gold: "#D4AF37",
          brown: "#8B4513",
          stone: "#7F7F7F",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        "neu-light": "10px 10px 20px #d1d9e6, -10px -10px 20px #ffffff",
        "neu-light-sm": "5px 5px 10px #d1d9e6, -5px -5px 10px #ffffff",
        "neu-light-inner":
          "inset 5px 5px 10px #d1d9e6, inset -5px -5px 10px #ffffff",
        "neu-dark": "10px 10px 20px #151823, -10px -10px 20px #202330",
        "neu-dark-sm": "5px 5px 10px #151823, -5px -5px 10px #202330",
        "neu-dark-inner":
          "inset 5px 5px 10px #151823, inset -5px -5px 10px #202330",
        "neu-card-light": "8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff",
        "neu-card-dark": "8px 8px 16px #151823, -8px -8px 16px #202330",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
