/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontSize: {
        default: ["16px", "24px"],
        small: ["12px", "16px"],
        middle: ["14px", "16px"],
        h100: [
          "10px",
          {
            lineHeight: "16px",
            letterSpacing: "-0.01em",
            fontWeight: "500"
          }
        ],
        h200: [
          "12px",
          {
            lineHeight: "16px",
            letterSpacing: "-0.01em",
            fontWeight: "500"
          }
        ],
        h300: [
          "16px",
          {
            lineHeight: "24px",
            letterSpacing: "-0.01em",
            fontWeight: "500"
          }
        ],
        h400: [
          "24px",
          {
            lineHeight: "32px",
            letterSpacing: "-0.01em",
            fontWeight: "500"
          }
        ],
        h500: [
          "32px",
          {
            lineHeight: "40px",
            letterSpacing: "-0.01em",
            fontWeight: "500"
          }
        ]
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        natural: {
          0: "#ffffff",
          10: "#FBFCFE",
          30: "#E9EDF2",
          40: "#E0E5EC",
          50: "#D2DAE4",
          90: "#9DADC3",
          300: "#71839C",
          700: "#233F66",
          900: "#092449"
        },
        primary: {
          20: "#F0F6FF",
          30: "#E9F2FF",
          40: "#DFEDFF",
          50: "#BFDAFF",
          75: "#85B7FA",
          100: "#488FEF",
          200: "#2373DF",
          300: "#004BB1",
          400: "#003F95",
          500: "#012D69"
        },
        error: {
          20: "#FCECF3",
          30: "#FADCE9",
          40: "#F8CDDF",
          50: "#F099BE",
          75: "#EB74A6",
          100: "#DD568E",
          200: "#DA3B7E",
          300: "#CF2C71",
          400: "#BF155C",
          500: "#990342"
        },
        alert: {
          20: "#FFFAE7",
          30: "#FFF6D8",
          40: "#FFF2C7",
          50: "#FFE68C",
          75: "#FFDA58",
          100: "#FDCF2A",
          200: "#FBC917",
          300: "#F2BD00",
          400: "#E1B000",
          500: "#C59900"
        }
      },
      dropShadow: {
        elevation1: [
          "0 1px 2px rgba(30, 30, 30, 0.25)",
          "0 0.5px 3px rgba(30, 30, 30, 0.15)"
        ],
        elevation2: [
          "0 1px 2px rgba(30, 30, 30, 0.25)",
          "0 2px 6px rgba(30, 30, 30, 0.15)"
        ],
        elevation3: [
          "0 4px 8px rgba(30, 30, 30, 0.25)",
          "0 1px 3px rgba(30, 30, 30, 0.15)"
        ],
        elevation4: [
          "0 6px 10px rgba(30, 30, 30, 0.25)",
          "0 2px 3px rgba(30, 30, 30, 0.15)"
        ],
        elevation5: [
          "0 8px 12px rgba(30, 30, 30, 0.25)",
          "0 4px 4px rgba(30, 30, 30, 0.15)"
        ]
      }
    }
  },
  plugins: [require("flowbite/plugin")]
}
