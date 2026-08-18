import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        federation({
            // 'import' is a reserved word, so the federation container name
            // (a JS identifier used at runtime) is 'importApp' even though
            // the package itself is named 'import' — see the matching
            // comment on host's remotes config.
            name: 'importApp',
            filename: 'remoteEntry.js',
            exposes: {
                './ImportTab': './src/ImportTab.tsx',
            },
            // @tanstack/react-query is deliberately NOT shared — see the
            // matching comment in charts-remote/vite.config.ts. This remote
            // bundles its own complete copy and owns an independent
            // QueryClient instead.
            shared: {
                react: { singleton: true, import: false },
                'react-dom': { singleton: true, import: false },
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
        port: 5176,
        strictPort: true,
        cors: true,
    },
    preview: {
        port: 5176,
        strictPort: true,
        cors: true,
    },
});
