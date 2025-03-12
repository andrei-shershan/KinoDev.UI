import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('E:/EDUCATION/KinoDev/KinoDev.Docker/certs/kinodev.key'),
      cert: fs.readFileSync('E:/EDUCATION/KinoDev/KinoDev.Docker/certs/kinodev.crt'),
      // Enforce a minimum TLS version (e.g., TLSv1.2)
      minVersion: 'TLSv1.2'
    }
  }
})
