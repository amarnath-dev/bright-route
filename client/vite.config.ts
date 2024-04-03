// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// Above code was the default one without making any changes
//After getting the Material UI AutoComplete Error (err:styled_default is not a function)
//Added new vite.config code below

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
  optimizeDeps: {
    include: ["@emotion/react", "@emotion/styled"],
  },
});
