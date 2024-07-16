// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { AdmindbService, getOptions } from './admindb.class.js'
import { admindbPath, admindbMethods } from './admindb.shared.js'

export * from './admindb.class.js'

// A configure function that registers the service and its hooks via `app.configure`
export const admindb = (app) => {
  // Register our service on the Feathers application
  app.use(admindbPath, new AdmindbService(getOptions(app),app), {
    // A list of all methods this service exposes externally
    methods: admindbMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(admindbPath).hooks({
    around: {
      all: [] //authenticate('jwt')
    },
    before: {
      all: [],
      find: [],
      get: [],
      create: [],
      patch: [],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
