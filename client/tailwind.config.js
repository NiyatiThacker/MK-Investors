/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // ── Color Palette ──────────────────────────────────────
      colors: {
        green: {
          950: "#012604",    // Primary Dark Green (navbar, hero, footer)
          700: "#126009",    // Primary Mid Green (buttons, accents)
          100: "#E8F5E9",    // Light tint (section backgrounds, hover)
        },
        gold: {
          400: "#EBCC5A",    // Primary Gold (accent, CTA, highlights)
          600: "#D4AE3A",    // Gold hover state
        },
        // Text
        ink: {
          dark:  "#0D1F0D",  // Primary body text on light backgrounds
          muted: "#4B5563",  // Secondary / caption text
        },
      },

      // ── Typography ─────────────────────────────────────────
      fontFamily: {
        // SF Pro → system font stack (no import required on Apple devices)
        sans: [
          '"SF Pro Display"',
          '"SF Pro Text"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
      },

      fontSize: {
        "h1":      ["3rem",    { lineHeight: "1.15", fontWeight: "700" }],
        "h2":      ["2.25rem", { lineHeight: "1.2",  fontWeight: "700" }],
        "h3":      ["1.75rem", { lineHeight: "1.3",  fontWeight: "600" }],
        "h4":      ["1.375rem",{ lineHeight: "1.4",  fontWeight: "600" }],
        "body-lg": ["1.125rem",{ lineHeight: "1.75" }],
        "body":    ["1rem",    { lineHeight: "1.7"  }],
        "caption": ["0.8125rem", { lineHeight: "1.5" }],
      },

      // ── Spacing ────────────────────────────────────────────
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },

      // ── Border Radius ──────────────────────────────────────
      borderRadius: {
        "card": "1rem",     // 16px — product/service cards
      },

      // ── Box Shadows ────────────────────────────────────────
      boxShadow: {
        "card":       "0 4px 20px rgba(1, 38, 4, 0.08)",
        "card-hover": "0 10px 40px rgba(1, 38, 4, 0.16)",
        "navbar":     "0 2px 12px rgba(1, 38, 4, 0.10)",
      },

      // ── Transitions & Animations ───────────────────────────
      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
      },
      animation: {
        pulse: 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
