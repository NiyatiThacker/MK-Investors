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
          950: "#1B0634",    // Primary Deep Midnight Violet (navbar, hero, footer)
          900: "#2F0B3A",    // Deep Plum (gradients)
          700: "#A65B4A",    // Primary Copper/Terracotta (buttons, accents)
          600: "#8F4D3E",    // Deep Copper hover state
          100: "#FAF2EB",    // Warm Peach Cream (section backgrounds)
          50:  "#FDF8F5",    // Pearl Cream (inputs, cards)
        },
        gold: {
          400: "#DDA16D",    // Primary Sandy Peach (accent, CTA, highlights)
          600: "#C58B55",    // Muted Peach hover state
        },
        // Text
        ink: {
          dark:  "#433A34",  // Warm Charcoal Brown body text
          muted: "#7A7068",  // Secondary warm gray text
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
