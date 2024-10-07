import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  root: './', // Spécifie le répertoire contenant index.html
  build: {
    outDir: './dist', // Répertoire de sortie pour les fichiers construits
    emptyOutDir: true, // Efface le répertoire de sortie avant de reconstruire
  },
  server: {
    port: 5173,
    open: true // Ouvre le navigateur automatiquement au démarrage
  },
  base: '/', // Assure-toi que cette base est correcte
});
