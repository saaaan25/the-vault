import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        'custom-color': '#F0B2B7',
        'custom-color-2': '#F3E6DE',
        'custom-color-3': '#EFCED0',
        'custom-color-4': '#737373',
        'custom-color-5': '#F6DCDE',
        'custom-color-6' : '#DDACAF'
      },

      fontFamily: {
        retropix: ['Retropix', 'sans-serif']
      }
    },
  },
  plugins: [],
};
export default config;
