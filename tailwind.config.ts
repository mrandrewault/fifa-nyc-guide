import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        impact: ['Impact', 'Arial Black', 'sans-serif'],
        sans: ['Georgia', 'serif'],
      },
      colors: {
        gold: '#E8C84A',
        green: '#4AE8A0',
        pink: '#E84A8C',
        blue: '#4AB4E8',
      },
      animation: {
        float: 'float 2s ease-in-out infinite alternate',
        spin: 'spin 1.2s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
