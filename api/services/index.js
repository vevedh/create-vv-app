import { users } from './users/users.js';
import { admindb } from './admindb/admindb.js';
import { mailer } from './mailer/mailer.js';
import { settings } from './settings/settings.js';
import { authManagement } from './auth-management/auth-management.service.js';
import { authNotifier } from './auth-management/notifier.js';

export const services = (app) => {
  app.configure(users);
  app.configure(admindb);
  app.configure(mailer);
  app.configure(authNotifier);
  app.configure(authManagement);
  app.configure(settings);

  // All services will be registered here
};
