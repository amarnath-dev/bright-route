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
        'color-five': '#0d9488',
        'background-one': "#020914",
        'background-two': "#0d1117",
        'home-color': "#1496BB",
      },
    },
  },
  plugins: [import('flowbite/plugin')],
}

