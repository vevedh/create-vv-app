
import { authenticate } from '@feathersjs/authentication'
import { SettingsService, getOptions } from './settings.class.js'
import { settingsPath, settingsMethods } from './settings.shared.js'

export * from './settings.class.js'

// A configure function that registers the service and its hooks via `app.configure`
export const settings = (app) => {
  // Register our service on the Feathers application
  app.use(settingsPath, new SettingsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: settingsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(settingsPath).hooks({
    around: {
      all: [authenticate('jwt')]
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