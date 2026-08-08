import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const chartsRemoteUrl =
        env.VITE_CHARTS_REMOTE_URL ?? 'http://localhost:5174/assets/remoteEntry.js';

    return {
        plugins: [
            react(),
            tailwindcss(),
            federation({
                name: 'host',
                remotes: {
                    chartsRemote: chartsRemoteUrl,
                },
                // @tanstack/react-query is deliberately NOT shared here —
                // see the matching comment in charts-remote/vite.config.ts.
                shared: {
                    react: { singleton: true },
                    'react-dom': { singleton: true },
                    'react-router-dom': { singleton: true },
                },
            }),
        ],
        build: {
            target: 'esnext',
            modulePreload: false,
        },
        server: {
            proxy: {
                '/api': 'http://localhost:8080',
            },
        },
    };
});
