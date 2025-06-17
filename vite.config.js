import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/catalogo-forms",
  plugins: [react()],
  target: "ES2022"
})
