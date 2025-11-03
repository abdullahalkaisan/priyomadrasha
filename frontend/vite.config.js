// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })






import {
  defineConfig
} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [react(), tailwindcss()], 
  daisyui: {
    themes: ["light"], // 👈 Forces light mode
  },
})





// import react from "@vitejs/plugin-react"
// import {
//   defineConfig
// } from "vite"
// import tsconfigPaths from "vite-tsconfig-paths"

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), tsconfigPaths()],
// })














// import path from "path";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// import {
//   defineConfig
// } from "vite";

// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });
