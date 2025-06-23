import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Production config without local certificate paths
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Ensure assets are properly processed
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  // Base path for production - adjust if your app is not at the root of the domain
  base: '/',
})
