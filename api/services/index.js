import { user } from './users/users.js';
import { admindb } from './admindb/admindb.js';
import { settings } from './settings/settings.js';

export const services = (app) => {
  app.configure(admindb);
  app.configure(settings)
  // All services will be registered here
  app.configure(user);
};
