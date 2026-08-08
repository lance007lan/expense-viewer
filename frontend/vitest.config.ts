import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Deliberately separate from vite.config.ts: the federation plugin does
// build-only work (resolving a remote's remoteEntry.js) that has no
// business running under the test runner, so tests get their own config.
export default defineConfig({
    plugins: [react(), tailwindcss()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/setupTests.ts',
    },
});
