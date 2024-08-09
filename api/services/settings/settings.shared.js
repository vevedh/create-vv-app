
export const settingsPath = 'settings'

export const settingsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const settingsClient = (client) => {
  const connection = client.get('connection')

  client.use(settingsPath, connection.service(settingsPath), {
    methods: settingsMethods
  })
}
