import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#ffd5eb',
          200: '#ffafda',
          300: '#ff8ac8',
          400: '#ff64b7',
          500: '#ff3ea5',
          600: '#ff1993',
          DEFAULT: '#F20081',
          800: '#ca026d',
        },
        secondary: {
          100: '#82a7e2',
          200: '#6591d9',
          300: '#497cd0',
          400: '#3469be',
          500: '#2e599f',
          600: '#274980',
          700: '#1f3962',
          800: '#172945',
          DEFAULT: '#0e1828',
        },
        black: {
          DEFAULT: '#000000',
          light: '#e3e4eb',
          footer: '#262626',
          'dark-light': 'rgba(14,23,38,.15)',
        },
        white: {
          DEFAULT: '#ffffff',
          beige: '#F4F4F2',
          light: '#b9bdc4',
          dark: '#888ea8',
        },
        body: {
          DEFAULT: '#F4F4F2'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        var: ['Ottertype-Var', 'sans-serif'],
        regular: ['Ottertype-Regular', 'sans-serif'],
        bold: ['Ottertype-Bold', 'sans-serif'],
        black: ['Ottertype-Black', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
