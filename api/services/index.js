

import {user} from './users/users.js'
export const services = (app) => {
  // All services will be registered here
  app.configure(user)
}
