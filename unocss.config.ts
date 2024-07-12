
import { defineConfig } from 'unocss'
import {
    presetAttributify,
    presetIcons,
    presetUno,
    presetWebFonts,
    presetMini,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss';

import presetWind from '@unocss/preset-wind';

export default defineConfig({
    theme: {
        dark: {
            color: {
                main: '#fff',
            },
        },
        light: {
            color: {
                main: '#f1f1f1',
            },
        },

    },
    presets: [
        presetMini({
            dark: {
                dark: 'body.body--dark',
                light: 'body.body--light',
            },
        }),
        presetWind(),
        presetAttributify({
            prefix: 'vv-',
            prefixedOnly: true,
        }),
        presetUno(),
        presetIcons({
            scale: 1.2,
            warn: true,
            collections: {
                carbon: () =>
                    import('@iconify-json/carbon/icons.json').then(
                        (i) => i.default,
                    ),
                mdi: () =>
                    import('@iconify-json/mdi/icons.json').then(
                        (i) => i.default,
                    ),
                logos: (): any =>
                    import('@iconify-json/logos/icons.json').then(
                        (i) => i.default,
                    ),
                ion: () =>
                    import('@iconify-json/ion/icons.json').then(
                        (i) => i.default,
                    ),
                si: (): any =>
                    import('@iconify-json/simple-icons/icons.json').then(
                        (i) => i.default,
                    ),
            },
        }),
        presetWebFonts(),
    ], // Presets

    transformers: [transformerDirectives(), transformerVariantGroup()],
    safelist: 'prose prose-sm m-auto text-left'.split(' '),
})