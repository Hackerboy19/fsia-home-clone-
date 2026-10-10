import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    // Production output matches what www.fsia.in/index.php loads:
    // /fsia-home-assets/fsia-home.js and /fsia-home-assets/fsia-home.css
    build: {
      outDir: 'fsia-home-assets',
      emptyOutDir: true,
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          entryFileNames: 'fsia-home.js',
          chunkFileNames: 'fsia-home-[name].js',
          assetFileNames: (info) => (info.names?.[0] || info.name || '').endsWith('.css') ? 'fsia-home.css' : 'assets/[name]-[hash][extname]',
          inlineDynamicImports: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
