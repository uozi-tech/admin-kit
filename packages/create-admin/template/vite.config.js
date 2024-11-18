import { createViteConfig } from '@uozi-admin/shared-config/vite';
import { fileURLToPath, URL } from 'node';
// https://vite.dev/config/
export default createViteConfig({
    override: {
        resolve: {
            alias: {
                '~': fileURLToPath(new URL('./src', import.meta.url)),
            },
            extensions: [
                '.mjs',
                '.js',
                '.ts',
                '.jsx',
                '.tsx',
                '.json',
                '.vue',
                '.less',
            ],
        },
    },
    plugins: {
        autoImport: {
            imports: [
                'vue',
                'vue-router',
                'pinia',
                {
                    '~/language/gettext': [
                        '$gettext',
                        '$pgettext',
                        '$ngettext',
                        '$npgettext',
                    ],
                },
            ],
        },
    },
});
