/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      xxs: "50px",
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px"
    },
    extend: {
      colors: {
        brandColor: "#228920",

        secondaryColor: "#212121"
      },
      fontFamily: {
        "public-sans": ["Public Sans", "sans"],
        lightBasicH3: ["Public Sans", "sans"],
        lightBasicParagraph: ["Public Sans", "sans"]
      },
      fontSize: {
        lightBasicParagraph: "0.9375rem",
        buttonTextSize: "0.9375rem"
      },
      fontWeight: {
        buttonText: "500"
      },
      lineHeight: {
        lightBasicH3: "2.25rem",
        lightBasicParagraph: "1.375rem"
      },
      boxShadow: {
        custom: "0px 2px 4px 0px #A5A3AE4D"
      },
      letterSpacing: {
        buttonText: "0.026875rem"
      },
      keyframes: {
        jump: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" }
        },
        longJump: {
          "0%, 100%": { transform: "scale(1)", background: "transparent" },
          "50%": {
            transform: "scale(1.1)",
            background: "#228920",
            color: "white"
          }
        }
      },
      animation: {
        jump: "jump 0.3s ease",
        longJump: "longJump 1s ease"
      }
    }
  },
  plugins: [
    function ({ addBase }) {
      addBase([
        {
          "@font-face": {
            fontFamily: "Public Sans",
            src: `url('/public/fonts/PublicSans-Regular.ttf') format('truetype')`,
            fontWeight: "400",
            fontStyle: "normal"
          }
        },
        {
          "@font-face": {
            fontFamily: "Public Sans",
            src: `url('/public/fonts/PublicSans-Bold.ttf') format('truetype')`,
            fontWeight: "700",
            fontStyle: "bold"
          }
        },
        {
          "@font-face": {
            fontFamily: "Public Sans",
            src: `url('/public/fonts/PublicSans-Black.ttf') format('truetype')`,
            fontWeight: "900",
            fontStyle: "black"
          }
        },
        {
          "@font-face": {
            fontFamily: "Public Sans",
            src: `url('/public/fonts/PublicSans-ExtraBold.ttf') format('truetype')`,
            fontWeight: "800",
            fontStyle: "extraBold"
          }
        },
        {
          "@font-face": {
            fontFamily: "Public Sans",
            src: `url('/public/fonts/PublicSans-ExtraLight.ttf') format('truetype')`,
            fontWeight: "200",
            fontStyle: "extraLight"
          }
        },
        {
          "@font-face": {
            fontFamily: "Public Sans",
            src: `url('/public/fonts/PublicSans-Light.ttf') format('truetype')`,
            fontWeight: "300",
            fontStyle: "light"
          }
        },
        {
          "@font-face": {
            fontFamily: "Public Sans",
            src: `url('/public/fonts/PublicSans-Medium.ttf') format('truetype')`,
            fontWeight: "500",
            fontStyle: "medium"
          }
        },
        {
          "@font-face": {
            fontFamily: "Public Sans",
            src: `url('/public/fonts/PublicSans-SemiBold.ttf') format('truetype')`,
            fontWeight: "600",
            fontStyle: "semiBold"
          }
        },
        {
          "@font-face": {
            fontFamily: "Public Sans",
            src: `url('/public/fonts/PublicSans-Thin.ttf') format('truetype')`,
            fontWeight: "100",
            fontStyle: "thin"
          }
        },
        {
          "@font-face": {
            fontFamily: "Montserrat",
            src: `url('/public/fonts/Montserrat-Regular.ttf') format('truetype')`,
            fontWeight: "400",
            fontStyle: "normal"
          }
        },
        {
          "@font-face": {
            fontFamily: "Montserrat",
            src: `url('/public/fonts/Montserrat-Medium.ttf') format('truetype')`, // Add medium weight (500)
            fontWeight: "500",
            fontStyle: "medium"
          }
        },
        {
          "@font-face": {
            fontFamily: "Montserrat",
            src: `url('/public/fonts/Montserrat-Bold.ttf') format('truetype')`,
            fontWeight: "700",
            fontStyle: "bold"
          }
        }
      ]);
    }
  ]
};
