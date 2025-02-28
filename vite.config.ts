import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import istanbul from 'vite-plugin-istanbul';

export default defineConfig({
  plugins: [
    react(),
    istanbul({
      include: 'src/reactviews/**/*.tsx', // Match all TSX files recursively
      extension: ['.tsx'],
      requireEnv: false, 
      exclude: ['playwright.config.ts', 'test/**/*.ts', 'tests/**/*.ts'], // Exclude test files
    }),
  ],
});