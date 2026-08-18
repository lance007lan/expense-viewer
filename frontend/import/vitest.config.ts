import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Deliberately separate from vite.config.ts: the federation plugin does
// build-only work (generating remoteEntry.js) that has no business running
// under the test runner, so tests get their own minimal config.
export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/setupTests.ts',
    },
});
