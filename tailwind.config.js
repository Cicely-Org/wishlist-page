/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        brand: {
          violet:  "#3225b9",
          emerald: "#01c796",
          purple:  "#a52aff",
          deep:    "#422184",
        },
        surface: {
          DEFAULT: "#0b0b0f",
          raised:  "#111118",
          overlay: "#16161f",
          border:  "rgba(255,255,255,0.07)",
        },
      },
      animation: {
        "fade-up":    "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in":    "fadeIn 1s ease forwards",
        "float":      "float 7s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "spin-slow":  "spin 12s linear infinite",
        "slide-in-right": "slideInRight 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(28px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-14px)" },
        },
        glowPulse: {
          "0%,100%": { opacity: "0.5" },
          "50%":     { opacity: "1" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(20px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
