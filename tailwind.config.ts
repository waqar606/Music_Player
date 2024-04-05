import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        myPurple: {
          DEFAULT: '#7b0fff', 
          hover:'#6304d6'
        },
        customGreen: {
          DEFAULT: 'hsl(125, 59%, 50%)', 
          light: 'hsl(125, 59%, 70%)',    
        },
        myGrey:{
          DEFAULT:'#A1A1A1',
        },
        newGrey:{
          DEFAULT:'#18181B'
        }
      },
    },
  },
  plugins: [],
};
export default config;
