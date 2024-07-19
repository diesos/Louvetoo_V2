import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  root: 'Frontend', // Spécifie le répertoire contenant index.html
  build: {
    outDir: 'Frontend/dist', // Répertoire de sortie pour les fichiers construits
    emptyOutDir: true, // Efface le répertoire de sortie avant de reconstruire
  },
  server: {
    port: 5173,
    open: true // Ouvre le navigateur automatiquement au démarrage
  },
  base: '/', // Assure-toi que cette base est correcte
});
