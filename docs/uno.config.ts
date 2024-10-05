import {
  defineConfig,
  presetIcons,
  presetUno,
  presetAttributify,
  transformerDirectives,
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      unit: 'em',
    }),
  ],
  transformers: [transformerDirectives()],
  content: {
    pipeline: {
      include: ['./**/*.vue', './**/*.md'],
    },
  },
});
