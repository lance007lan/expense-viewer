import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        federation({
            name: 'dashboard',
            filename: 'remoteEntry.js',
            exposes: {
                './DashboardTab': './src/DashboardTab.tsx',
                './ExpenseDetail': './src/ExpenseDetail.tsx',
            },
            // @tanstack/react-query is deliberately NOT shared: sharing it
            // reproducibly caused "Cannot read properties of null (reading
            // 'useRef')" inside its internal useSyncExternalStoreWithSelector
            // at runtime with this plugin (see the matching comment in
            // charts-remote/vite.config.ts). This remote bundles its own
            // complete copy and owns an independent QueryClient instead.
            shared: {
                react: { singleton: true, import: false },
                'react-dom': { singleton: true, import: false },
                'react-router-dom': { singleton: true, import: false },
            },
        }),
    ],
    // Module Federation needs a modern, non-legacy build target. Note:
    // cssCodeSplit: false actively breaks @originjs/vite-plugin-federation's
    // own CSS-url substitution for exposed modules (leaves an unresolved
    // "__v__css__..." placeholder string where it expects an array) — do
    // not set it here.
    build: {
        target: 'esnext',
        modulePreload: false,
    },
    server: {
        port: 5175,
        strictPort: true,
        cors: true,
    },
    preview: {
        port: 5175,
        strictPort: true,
        cors: true,
    },
});
