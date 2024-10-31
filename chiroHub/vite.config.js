import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: ['esnext'],
    assetsDir: 'assets', 
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    } 
  }
});
