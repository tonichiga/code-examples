const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "main-bg": "url(/images/main-bg.png)",
      },
      // Fonts are being loaded on `src/pages/_document.tsx`, so if you want to
      // change the font, you need to change the url there and name here.
      fontFamily: {
        sans: ["var(--font-roboto)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-roboto-mono)", ...defaultTheme.fontFamily.mono],
        glitch: ["Rubik Glitch"],
        racing: ["Racing Sans One"],
        FiraSans: ["FiraSans"],
      },
      background: {
        card: "linear-gradient(0deg, #4D1E1A 0%, #0C0C0C 100%);",
      },
      colors: {},

      transitionTimingFunction: {
        spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        //  transition: left 500ms cubic-bezier(0.000, 0.405, 0.000, 1.285);
      },

      boxShadow: {
        btn: "0px 0px 64px 0px rgba(255, 24, 1, 0.90)",
      },

      screens: {
        "max-se": { max: "375px" },
        "max-mobile": { max: "767px" },
        "max-tablet": { max: "1279px" },
        "max-laptop": { max: "1919px" },
        tablet: "768px",
        tabletBig: "870px",
        laptop: "1280px",
        desktop: "1920px",
        "max-se-tall": { raw: "(max-height: 800px)" },
        smallTall: { raw: "(min-height: 720px)" },
        tall: { raw: "(min-height: 1080px)" },
      },

      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        backdropFadeIn: {
          "0%": { "background-color": "rgba(0, 0, 0, 0)" },
          "100%": { "background-color": "rgba(0, 0, 0, 0.40)" },
        },
        modalSlideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        modalSlideDown: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        fromBottom: "fromBottom 0.5s ease-in-out",
        backdropFadeIn: "backdropFadeIn 0.5s ease-in-out forwards",
        modalSlideUp: "modalSlideUp 0.5s ease-in-out forwards",
        modalSlideDown: "modalSlideDown 0.5s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
