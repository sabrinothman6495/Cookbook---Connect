import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@context': path.resolve(__dirname, './src/context'),
      '@styles': path.resolve(__dirname, './src/styles')
    },
  },
  esbuild: {
    loader: 'jsx',
    include: [
      'src/**/*.js',
      'src/**/*.jsx',
      'src/**/*.ts',
      'src/**/*.tsx',
    ],
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@tabler/icons-react')) {
            if (id.includes('IconHeart')) {
              return 'icons-heart';
            }
            return null;
          }
        }
      }
    },
    commonjsOptions: {
      include: [/@tabler\/icons-react\/.*IconHeart/],
    }
  },
});




















