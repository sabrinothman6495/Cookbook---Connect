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
      '@styles': path.resolve(__dirname, './src/styles'),
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
        target: 'https://cookbook-connect-i81c.onrender.com/',
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
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
      },
      output: {
        manualChunks(id) {
          if (id.includes('@tabler/icons-react') || id.includes('react-icons')) {
            return 'icons';
          }
          if (id.includes('react')) {
            return 'vendor';
          }
          if (id.includes('@mantine')) {
            return 'mantine';
          }
        },
      },
    },
  },
});























