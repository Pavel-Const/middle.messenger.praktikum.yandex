import { defineConfig } from 'vite';
import sass from 'vite-plugin-sass';

export default defineConfig({
    build: {
        outDir: 'dist'
    },
    plugins: [sass()],
});