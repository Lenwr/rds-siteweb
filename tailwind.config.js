/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
    theme: {
      extend: {
        colors: {
          brand: {
            600: "var(--brand-600)",
            700: "var(--brand-700)",
            800: "var(--brand-800)",
          },
          accent: { 500: "var(--accent-500)" },
          ink: "var(--ink)",
          muted: "var(--muted)",
          line: "var(--line)",
          card: "var(--card)",
          footer: "var(--footer)",
        },
        borderRadius: {
          DEFAULT: "var(--radius)",
          sm: "var(--radius-sm)",
        },
        boxShadow: {
          card: "0 10px 30px rgba(2,6,23,0.06)",
          header: "0 6px 20px rgba(2,6,23,0.06)",
        },
        fontFamily: {
          sans: ["Inter", "system-ui", "sans-serif"],
          display: ["Manrope", "Inter", "system-ui", "sans-serif"],
        },
      },
    },
    plugins: [],
  };
  