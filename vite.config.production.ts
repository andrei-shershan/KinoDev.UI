import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { compression } from 'vite-plugin-compression2';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProd = mode === 'production';
  
  return {
    plugins: [
      react(),
      // Add compression plugin for production builds
      isProd && compression({
        algorithm: 'gzip',
        exclude: [/\.(br)$/, /\.(gz)$/],
      }),
      isProd && compression({
        algorithm: 'brotliCompress',
        exclude: [/\.(br)$/, /\.(gz)$/],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: !isProd, // Only generate sourcemaps in development
      minify: isProd ? 'terser' : false,
      target: 'es2015',
      cssCodeSplit: true,
      reportCompressedSize: false, // Improves build performance
      chunkSizeWarningLimit: 1000, // Increase warning limit for larger chunks
      terserOptions: isProd ? {
        compress: {
          drop_console: true, // Remove console logs in production
          drop_debugger: true, // Remove debugger statements in production
        }
      } : {},
      // Ensure SPA fallback for client-side routing
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
