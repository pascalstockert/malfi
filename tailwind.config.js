/** @type {import('tailwindcss').Config} */
const colors = require( 'tailwindcss/colors' );
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    fontFamily: {
      heading: ['Nunito', 'sans-serif'],
      text: ['Raleway', 'sans-serif'],
    },
    colors: {
      primary: {
        100: '#478547',
        200: '#539b53',
        300: '#5fb15f',
        400: '#6bc76b',
        500: '#77dd77',
        600: '#85e085',
        700: '#92e492',
        800: '#a0e7a0',
        900: '#adebad',
      },
      dark: {
        100: '#262626',
        200: '#262626',
        300: '#262626',
        400: '#262626',
        500: '#262626',
        600: '#3c3c3c',
        700: '#515151',
        800: '#676767',
        900: '#7d7d7d',
      },
      light: {
        100: '#949494',
        200: '#acacac',
        300: '#c5c5c5',
        400: '#dddddd',
        500: '#f6f6f6',
        600: '#f6f6f6',
        700: '#f6f6f6',
        800: '#f6f6f6',
        900: '#f6f6f6',
      },
      error: '#ff6961',
    },
    extend: {},
  },
  plugins: [],
}

