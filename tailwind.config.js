export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "var(--bg-base)",
        surface: "var(--bg-surface)",
        card: "var(--bg-card)",
        primary: "var(--accent-primary)",
        terminal: "var(--accent-secondary)",
        muted: "var(--accent-muted)",
      },
      fontFamily: {
        display: ["Space Mono", "Fragment Mono", "ui-monospace", "monospace"],
        body: ["Geist", "DM Sans", "system-ui", "sans-serif"],
        code: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        technical: "4px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 229, 204, 0.4)",
      },
    },
  },
  plugins: [],
};
