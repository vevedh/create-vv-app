// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication';
import { UserService, getOptions } from './users.class.js';
import { userPath, userMethods } from './users.shared.js';
import { hooks } from '@feathersjs/authentication-local';
import {
  addVerification,
  removeVerification,
} from 'feathers-authentication-management';
import { authNotifier } from '../auth-management/notifier.js';
import {
  disallow,
  iff,
  isProvider,
  preventChanges,
} from 'feathers-hooks-common';
import { get } from 'http';
export * from './users.class.js';

const sendVerify = () => {
  return async (context) => {
    console.log('SEND VERIFY :', context);
    const notifier = authNotifier(context.app);

    const users = Array.isArray(context.result)
      ? context.result
      : [context.result];

    // Send an e-mail/SMS with the verification token
    await Promise.all(
      users.map(async (user) => await notifier('resendVerifySignup', user)),
    );
  };
};

// A configure function that registers the service and its hooks via `app.configure`
export const users = (app) => {
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
      create: [],
      update: [],
      patch: [],
      remove: [],
    },
    before: {
      all: [],
      find: [authenticate('jwt')],
      get: [authenticate('jwt')],
      create: [
        hooks.hashPassword('password'),

        addVerification(), // adds .isVerified, .verifyExpires, .verifyToken, .verifyChanges
      ],
      update: [
        disallow('external'),
        authenticate('jwt'),
        hooks.hashPassword('password'),
      ],
      patch: [
        authenticate('jwt'),
        iff(
          isProvider('external'),
          preventChanges(
            true,
            'email',
            'isVerified',
            'verifyToken',
            'verifyShortToken',
            'verifyExpires',
            'verifyChanges',
            'resetToken',
            'resetShortToken',
            'resetExpires',
          ),
          hooks.hashPassword('password'),
        ),
      ],
      remove: [authenticate('jwt'), hooks.hashPassword('password')],
    },
    after: {
      all: [hooks.protect('password'), removeVerification('auth-management')],
      find: [],
      get: [],
      create: [sendVerify()],
      update: [],
      patch: [],
      remove: [],
    },
    error: {
      all: [],
    },
  });
};
