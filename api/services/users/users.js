// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication';
import { UserService, getOptions } from './users.class.js';
import { userPath, userMethods } from './users.shared.js';
import { hooks } from '@feathersjs/authentication-local';
export * from './users.class.js';

// A configure function that registers the service and its hooks via `app.configure`
export const user = (app) => {
  // Register our service on the Feathers application
  app.use(userPath, new UserService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: userMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  });
  // Initialize hooks
  app.service(userPath).hooks({
    around: {
      all: [],
      find: [authenticate('jwt')], //
      get: [authenticate('jwt')],
      create: [hooks.hashPassword('password')],
      update: [authenticate('jwt')],
      patch: [authenticate('jwt')],
      remove: [authenticate('jwt')],
    },
    before: {
      all: [],
      find: [
        (context) => {
          /*const hasemail = context.arguments[0].query?.username;

          if (hasemail == 'admin@domain.com' && context?.result?.total == 0) {
            context.self.create({ username: hasemail, password: 'P@ssw0rd' });
          }*/
          return context;
        },
      ],
      get: [],
      create: [],
      patch: [],
      remove: [],
    },
    after: {
      all: [hooks.protect('password')],
    },
    error: {
      all: [],
    },
  });
};
