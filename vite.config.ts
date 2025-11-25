import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';

const popup = resolve(__dirname, 'popup.html');
const background = resolve(__dirname, 'src/background/index.ts');
const chatgptContentScript = resolve(__dirname, 'src/content/chatgptContentScript.ts');

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup,
        background,
        chatgptContentScript,
      },
      output: {
        entryFileNames: (chunk) => {
          switch (chunk.name) {
            case 'background':
              return 'background.js';
            case 'chatgptContentScript':
              return 'chatgptContentScript.js';
            case 'popup':
              return 'popup.js';
            default:
              return '[name].js';
          }
        },
        chunkFileNames: 'chunks/[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});
