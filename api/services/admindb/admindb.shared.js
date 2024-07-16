export const admindbPath = 'api/v1/admindb'

export const admindbMethods = ['find',  'create', 'remove']

export const admindbClient = (client) => {
  const connection = client.get('connection')

  client.use(admindbPath, connection.service(admindbPath), {
    methods: admindbMethods
  })
}
