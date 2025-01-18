import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDefault: "#FFFFFF",
        bgPrimary: "#EFEFEF",
        bgSecondary: "#FBFBFB",
        txtMain: "#292064",
        txtSubtitle: "#454545",
        txtPlaceholder: "#B6B6B6",
        primary: "#292064",
        secondary: "#FC9700",
        tertiary: "#EAF4FF",
        success: "#198519",
        error: "#E30A17",
        info: "#5F5F5F",
        customBlue: "#3C6EB9",
        customPurple: "#7265C5",
      },
      backgroundImage: {
        'home-banner-gradient': 'linear-gradient(to bottom, rgba(58, 155, 213, 0.15), rgba(8, 46, 107, 0.15))',
        'content-banner-gradient': 'linear-gradient(to bottom, rgba(58, 155, 213, 0.35), rgba(8, 46, 107, 0.35))',
        'custom-bg': 'linear-gradient(to bottom, #f3f3f3, #efefef)'
      },
    },
  },
  plugins: [],
} satisfies Config;
