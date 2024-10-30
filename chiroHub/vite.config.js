import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ChiroSeminars/', // Use the path relevant to your deployment
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    } 
  }
});
