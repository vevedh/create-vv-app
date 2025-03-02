import { AuthenticationManagementService } from 'feathers-authentication-management';
import { authenticate } from '@feathersjs/authentication';
import { authNotifier, sanitizeUserForClient } from './notifier.js';
import { iff } from 'feathers-hooks-common';

const isAction =
  (...args) =>
  (hook) =>
    args.includes(hook.data.action);

export class AuthManagement extends AuthenticationManagementService {}
export const authManagement = (app) => {
  app.use(
    'auth-management',
    new AuthManagement(app, {
      app: app,
      service: '/users',
      notifier: authNotifier(app),
      longTokenLen: 15, // token's length will be twice this
      shortTokenLen: 6,
      shortTokenDigits: true,
      resetDelay: 1000 * 60 * 60 * 2, // 2 hours
      delay: 1000 * 60 * 60 * 24 * 5, // 5 days
      resetAttempts: 0,
      reuseResetToken: false,
      identifyUserProps: ['email'],
      sanitizeUserForClient,
      skipIsVerifiedCheck: false,
      passwordField: 'password',
    }),
  );

  app.service('auth-management').hooks({
    before: {
      all: [],
      find: [],
      get: [],
      create: [
        // The user must be signed in before being allowed to change their password or communication values.
        iff(isAction('passwordChange', 'identityChange'), authenticate('jwt')),
      ],
      update: [],
      patch: [],
      remove: [],
    },

    after: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: [],
    },

    error: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: [],
    },
  });
};
