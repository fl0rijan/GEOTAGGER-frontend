import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
    plugins: [
        react(),
        svgr({
            svgrOptions: {
                plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
                svgoConfig: {
                    plugins: [
                        {
                            name: 'preset-default',
                            params: { overrides: { cleanupIds: false } }
                        },
                        {
                            name: 'prefixIds',
                            params: {
                                delim: '__',
                                prefixIds: true,
                                prefixClassNames: false,
                            },
                        },
                    ],
                },
            },
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                quietDeps: true,
                silenceDeprecations: [
                    'import',
                    'global-builtin',
                    'if-function',
                    'color-functions',
                ],
            },
        },
    },
})
