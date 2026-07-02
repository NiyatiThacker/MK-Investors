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
          950: "#121212",    // Matte black (navbar, hero, footer)
          900: "#1C1C1E",    // Dark charcoal
          700: "#3A3A3C",    // Mid charcoal gray
          600: "#2C2C2E",    // Dark gray
          100: "#F2F2F7",    // Light gray card bg
          50:  "#FAFAFC",    // Warm off-white
        },
        gold: {
          400: "#FFFFFF",    // Pure white highlight
          600: "#E5E5EA",    // Subtle silver hover accent
        },
        // Text
        ink: {
          dark:  "#1C1C1E",  // Neutral charcoal dark body text
          muted: "#666666",  // Neutral muted gray text
        },
      },

      // ── Typography ─────────────────────────────────────────
      fontFamily: {
        playfair: ["var(--font-playfair)"],
        inter: ["var(--font-inter)"],
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
        "card":       "0 4px 20px rgba(24, 34, 56, 0.08)",
        "card-hover": "0 10px 40px rgba(24, 34, 56, 0.16)",
        "navbar":     "0 2px 12px rgba(24, 34, 56, 0.10)",
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
