/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: { 50: "#FFFBF0", 100: "#FAF3E0", 200: "#F1E6C8" },
        leaf: { 300: "#BFE3B4", 400: "#8FCB81", 500: "#5FAE5B", 700: "#2F6B3A" },
        bark: { 400: "#A47551", 600: "#6F4E37", 900: "#3B2A20" },
        marker: "#FFE58A",
        // Waste stream specific colors
        stream: {
          wet: "#2E7D32",       // Green
          dry: "#1E88E5",       // Blue
          sanitary: "#E53935",  // Red
          ewaste: "#F59E0B",    // Amber
          hazard: "#C62828",    // Deep Red
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Plus Jakarta Sans", "sans-serif"],
        hand: ["Caveat", "cursive"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0)" },
          "50%": { transform: "translateY(-18px) rotate(8deg)" },
        },
        drift: {
          "0%": { transform: "translateY(0px) translateX(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-25px) translateX(15px) rotate(12deg)" },
          "100%": { transform: "translateY(0px) translateX(0px) rotate(0deg)" },
        },
        bounceBadge: {
          "0%": { transform: "translateY(-30px) scale(0.8)", opacity: "0" },
          "70%": { transform: "translateY(5px) scale(1.05)", opacity: "1" },
          "100%": { transform: "translateY(0) scale(1)", opacity: "1" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%, 60%": { transform: "translateX(-6px)" },
          "40%, 80%": { transform: "translateX(6px)" },
        },
        popVote: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.3)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        drift: "drift 8s ease-in-out infinite",
        bounceBadge: "bounceBadge 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
        shake: "shake 0.4s ease-in-out",
        popVote: "popVote 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
    },
  },
  plugins: [],
};
