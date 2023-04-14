module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        table: "#F3F3F3",
        purple: "#7E7EF1",
        blue: "#305ECA",
        blueLight: "#44A0D3",
        red: "#FF0000"
      },
      fontSize: {
        headline: "24px",
        section: "16px",
        title: "14px",
        bodyText: "14px",
        caption: "12px",
        sm: "12px",
        logo: "18px",
        tiny: "10px",
        lg: '36px'
      },
      fontWeight: {
        standard: "400",
        semi: "500",
        semibold: "600"
      },
      textColor: {
        link: "#224DDB",
        caption: "#C6C6C6",
        white: "#fff",
        captionColor: "#C6C6C6",
        disabled: "#747579",
        primary: {
          red: "#B80433"
        }
      },
      borderRadius: {
        card: "0.75rem", // 12px,
        full: "9999px",
        xl2: "1rem"
      }
    }
  },
  plugins: []
};
