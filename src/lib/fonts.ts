import { Roboto_Slab, Inter } from "next/font/google";

// Barndo typography (blueprint §8): strong slab-serif heading (agricultural
// authority + residential warmth — the "barn-meets-home" identity) + clean
// readable sans body (Inter). Roboto Slab has full static weight instances →
// reliable with next/font. CSS var names are unchanged from the template so
// layout.tsx + the `font-heading` / `font-body` Tailwind families keep working.
export const headingFont = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

export const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
