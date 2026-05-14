import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import saver from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(),  saver()],
    css: {
        preprocessorOptions: {
            scss: {
                quietDeps: true,

                silenceDeprecations: [
                    'import',
                    'global-builtin',
                    'if-function',
                    'color-functions'
                ],
            },
        },
    },
})
