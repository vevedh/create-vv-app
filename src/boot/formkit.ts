import { boot } from 'quasar/wrappers';
import { createQuasarPlugin } from 'formkit-quasar';
import { plugin, defaultConfig } from '@formkit/vue';
import Quasar from 'quasar';

export default boot(({ app }) => {
  app.use(Quasar, {
    plugins: {},
  });

  app.use(
    plugin,
    defaultConfig({
      plugins: [createQuasarPlugin()],
    }),
  );
});
