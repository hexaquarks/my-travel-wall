import type { Config } from 'tailwindcss';
import { join } from 'path';
import flowbitePlugin from 'flowbite/plugin'

import { skeleton } from '@skeletonlabs/tw-plugin';

const config = {
    darkMode: 'class',
    content: [
        './src/**/*.{html,js,svelte,ts}',
        join(require.resolve(
            '@skeletonlabs/skeleton'),
            '../**/*.{html,js,svelte,ts}'
        ),
        './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
    ],
    theme: {
        extend: {
            colors: {
                // flowbite-svelte
                primary: {
                    50: '#FFF5F2',
                    100: '#FFF1EE',
                    200: '#FFE4DE',
                    300: '#FFD5CC',
                    400: '#FFBCAD',
                    500: '#FE795D',
                    600: '#EF562F',
                    700: '#EB4F27',
                    800: '#CC4522',
                    900: '#A5371B'
                }
            }
        }
    },
    plugins: [
        flowbitePlugin,
        skeleton({
            themes: { preset: ["wintry"] }
        }),
    ]
} satisfies Config;

export default config;
