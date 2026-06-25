import type { Config } from "tailwindcss";

/**
 * BARNDO INSURANCE — Rural-American / barndominium design system (Worker B, GLM 5.2).
 *
 * Brand direction (blueprint §8): warm barn-red primary (rural American,
 * structural, strong), natural cedar-tan secondary (barndo's barn-meets-home
 * identity), galvanized-steel accent (metal-building material reference), warm
 * cream canvas (residential warmth countering the industrial primary), strong
 * slab-serif headings. Mood: "rural American homeowner who chose to build
 * something different — proud of it, needs an insurer who gets it."
 *
 * This is the canonical DESIGN-SYSTEM light-trust pattern with a barn-red
 * signature: warm cream body, dark barn-red peak sections (Stats/CTA/Footer),
 * amber CTA (highest-converting on warm-light bg), layered depth on peaks.
 *
 * Two layers:
 *  1. NEW barndo tokens (barn-red brand, amber CTA, galvanized steel, cedar tan,
 *     cream canvas). Used by the premium restyled sections.
 *  2. LEGACY ALIASES (forest-green / ember-orange / warm-white / bark / timber /
 *     muted / border) mapped onto the barndo palette so every C-owned page file
 *     that still references the framing template's old class names re-themes
 *     cohesively WITHOUT being edited.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Barndo foundation (warm, cream, airy) ─────────────────────────
        canvas: "#FBF6EE", // warm cream page bg (residential warmth)
        card: "#FFFFFF", // clean white elevated surface
        panel: "#F4EBDD", // warm recessed surface (FAQ rows, sub-panels)
        ink: "#231A16", // primary text — warm near-black
        "ink-soft": "#3D302A", // secondary heading text
        muted: "#5E5249", // body / secondary text (warm gray, ≈5.4:1 on canvas)
        line: "#E5D9C8", // borders (warm cream-sand)
        "line-soft": "#F0E8DA", // hairline dividers

        // ── Brand: warm barn red (signature hue — identity) ────────────────
        // Standard monotonic ramp (50 lightest → 900 darkest). Brand is the
        // identity + dark-section fill; CTA (amber) is the action.
        brand: {
          DEFAULT: "#8A2F28",
          bright: "#B04A40", // lighter stop for gradients / icon hover
          ink: "#5E1F1A", // deepest barn red — Stats/CTA/Footer peaks
          50: "#F6ECEA",
          100: "#E8CFCB",
          200: "#D2A39B",
          300: "#B97668",
          400: "#9F4B3D",
          500: "#8A2F28", // DEFAULT
          600: "#73261F",
          700: "#5E1F1A", // ink
          800: "#4A1813",
          900: "#32100D",
        },

        // ── CTA: amber (highest-converting on warm-light bg) ───────────────
        cta: {
          DEFAULT: "#E8821A",
          dark: "#C2690B",
          soft: "#FCE7CF",
        },

        // ── Galvanized: steel (metal-building material accent) ─────────────
        galvanized: {
          DEFAULT: "#6A727C",
          bright: "#969DA6",
          soft: "#DEE2E6",
          600: "#565D66",
        },

        // ── Cedar: natural wood tan (secondary warm accent) ────────────────
        cedar: {
          DEFAULT: "#A8763E",
          bright: "#C2935A",
          soft: "#F3E7D6",
          ink: "#6B4A22",
        },

        // ── LEGACY ALIASES (framing template → barndo) ─────────────────────
        // forest-green → barn-red brand. ember-orange → amber CTA.
        // warm-white → cream canvas. bark → warm ink. timber → cedar tan-ink.
        "forest-green": {
          DEFAULT: "#8A2F28", // → barn-red brand
          dark: "#5E1F1A",
          50: "#F6ECEA", // → light barn tint (readable soft fills)
          light: "#B04A40",
        },
        "ember-orange": {
          DEFAULT: "#E8821A", // → amber CTA
          dark: "#C2690B",
          light: "#F0943A",
        },
        "warm-white": "#FBF6EE", // → cream canvas
        bark: {
          DEFAULT: "#231A16", // → warm ink (dark text stays dark on light)
          light: "#3D302A",
        },
        timber: {
          DEFAULT: "#6B4A22", // → cedar tan-ink (warm accent text)
          light: "#8A6334",
        },
        border: "#E5D9C8", // → cream line (muted already defined above)
      },
      fontFamily: {
        // CSS vars set by next/font in src/lib/fonts.ts (Roboto Slab + Inter).
        heading: ["var(--font-heading)", "Roboto Slab", "Georgia", "serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(35,26,22,.05)",
        card: "0 1px 2px rgba(35,26,22,.05), 0 12px 32px -14px rgba(35,26,22,.14)",
        "card-hover":
          "0 4px 10px rgba(35,26,22,.07), 0 28px 52px -18px rgba(138,47,40,.22)",
        cta: "0 14px 30px -10px rgba(232,130,26,.45)",
        float: "0 26px 70px -28px rgba(35,26,22,.28)",
        steel: "0 14px 34px -12px rgba(106,114,124,.30)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up .6s cubic-bezier(.22,1,.36,1) both",
      },
    },
  },
  plugins: [],
};
export default config;
