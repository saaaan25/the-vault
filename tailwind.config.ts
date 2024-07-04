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
        palette1: {
          'custom-color': '#FF9F9F',
          'custom-color-2': '#F3E6DE',
          'custom-color-3': '#F6DCDE',
          'custom-color-4': '#EFCED0',
          'custom-color-5': '#DDACAF',
          'custom-color-6': '#F0B2B7',
          'custom-color-7': '#737373',
        },
        palette2: {
          'custom-color': '#FFC368',
          'custom-color-2': '#FFE0B0',
          'custom-color-3': '#F6D7A9',
          'custom-color-4': '#F4C98B',
          'custom-color-5': '#EDB769 ',
          'custom-color-6': '#FFB648',
        },
        palette3: {
          'custom-color': '#6C80C8',
          'custom-color-2': '#DFE2ED',
          'custom-color-3': '#CDD0DF',
          'custom-color-4': '#BBC3E1',
          'custom-color-5': '#929DC6',
          'custom-color-6': '#6576B6',
        },

        'custom-overlay': 'rgba(0, 0, 0, 0.5)',
         spacing: {
        'custom-space': '20px',
      },
      boxShadow: {
        'custom-box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      fontSize: {
        'custom-text': '1.25rem',
      },
      },
      
      spacing: {
        'custom-space': '20px',
      },
      boxShadow: {
        'custom-box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      fontSize: {
        'custom-text': '1.25rem',
      },


      fontFamily: {
        retropix: ['Retropix', 'sans-serif']
      }
    },
  },
  plugins: [],
  
};

export default config;
