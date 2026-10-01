import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { siteMeta } from './plugins/siteMeta';

export default defineConfig({
  plugins: [react(), siteMeta()],
  build: {
    target: 'es2020',
    cssTarget: 'chrome90',
    rollupOptions: {
      output: {
        /**
         * three.js is isolated so it can be loaded lazily by the 3D sections
         * without dragging the rest of the app around with it.
         */
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) return 'three';
            if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) {
              return 'motion';
            }
          }
          return undefined;
        },
      },
    },
  },
});
