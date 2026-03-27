module.exports = {
  "content": [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  "theme": {
    "extend": {
      "fontFamily": {
        "sans": ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "\"Segoe UI\"", "Roboto", "Arial", "sans-serif"]
      },
      "colors": {
        "dark-base": "#121212",
        "light-base": "#f0f4f7",
        "eco-green": "#00eaaf",
        "eco-green-dark": "#00846c",
        "eco-green-med": "#00c49a",
        "eco-green-bright": "#00eaaf",
        "text-dark": "#1d1d1f",
        "text-light": "#ffffff",
        "text-muted": "#a0aec0",
        "cyan-neon": "#00D9FF",
        "electric-blue": "#0080FF",
        "navy-deep": "#121212"
      },
      "fontSize": {
        "h1": ["64px", { lineHeight: "1.2", fontWeight: "600" }],
        "h2": ["44px", { lineHeight: "1.3", fontWeight: "600" }],
        "h3": ["24px", { lineHeight: "1.4", fontWeight: "600" }],
        "body": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "p": ["21px", { lineHeight: "1.6", fontWeight: "400" }],
      },
      "backdropBlur": {
        "glass": "25px"
      },
      "animation": {
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "scale-in": "scale-in 0.5s ease-out"
      }
    }
  },
  "plugins": []
}
