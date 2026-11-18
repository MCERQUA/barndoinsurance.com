import localFont from "next/font/local";

// Self-hosted latin woff2 (src/lib/fonts/) instead of next/font/google, which
// intermittently crashed the Netlify build (loader.js TypeError, exit 2) when
// Google served a font URL with no extension. Same families, weights, CSS
// variable names and display as before.
export const headingFont = localFont({
  src: [
    { path: "./fonts/RobotoSlab-600-900.woff2", weight: "600 900", style: "normal" },
  ],
  variable: "--font-heading",
  display: "swap",
});

export const bodyFont = localFont({
  src: [
    { path: "./fonts/Inter-400-700.woff2", weight: "400 700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});
