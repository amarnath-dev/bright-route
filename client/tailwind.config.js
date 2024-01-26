/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./node_modules/flowbite-react/lib/**/*.{js,ts}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-one': '#2b6777',
        'color-two': '#c8d8e4',
        'color-three': '#ffffff',
        'color-four': '#f2f2f2',
        'color-five': '#52ab98',
      },
    },
  },
  plugins: [import('flowbite/plugin')],
}

