
import { boot } from 'quasar/wrappers';


import { pinia } from '../stores/index';

const { api } = useFeathers()

export default boot(({ app }) => {

  app.use(pinia as any);
  app.use(api as any);
});
