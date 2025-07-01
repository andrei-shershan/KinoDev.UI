import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Default Vite config for Docker builds
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'dist',
      target: 'es2015',
      cssCodeSplit: true,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1000,
      // Basic rollup options for Docker builds
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['antd', '@ant-design/icons'],
            stripe: ['@stripe/react-stripe-js', '@stripe/stripe-js'],
          },
        },
      },
    },
    server: {
      port: 3000,
      strictPort: true,
      host: true,
    },
  };
});
