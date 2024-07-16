import { user } from './users/users.js';
import { admindb } from './admindb/admindb.js';

export const services = (app) => {
  app.configure(admindb);

  // All services will be registered here
  app.configure(user);
};
