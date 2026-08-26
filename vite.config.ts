import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Custom domain (unlimitedcopies.co.nz) serves from site root
export default defineConfig({
  plugins: [react()],
  base: '/',
})
