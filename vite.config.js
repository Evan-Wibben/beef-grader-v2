// vite imports
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import ViteRestart from "vite-plugin-restart";
import viteCompression from 'vite-plugin-compression';

import * as path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default defineConfig(({command}) => ({
    base: command === 'serve' ? '' : '/dist/',
    build: {
        manifest: true,
        outDir: '../cms/web/dist/',
        rollupOptions: {
            input: {
                app: 'src/main.ts',
            }
        },
    },
    server: {
        port: 8080,
        hmr : {
            host: 'localhost'
        },
        strictPort: true,
    },
    plugins: [
        legacy(),
        ViteRestart({
            restart: [
                './templates/**/*',
                './src/**/*',
            ],
        }),
        nodeResolve({
            modulePaths: [
                path.resolve('./node_modules'),
            ],
        }),
        viteCompression()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        preserveSymlinks: true,
    }
}));