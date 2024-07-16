import { MongoClient } from 'mongodb'

import { MongoDBService } from '@feathersjs/mongodb'
import dbMgmt from 'vv-feathers-mongodb-management'
import { logger } from './logger.js'
export const mongodb = (app) => {

  logger.info('Connexion à la base de données %j',process.env.NODE_ENV)
  /*if (process.env.NODE_ENV === 'development') {
    app.set('mongodb', app.get('mongodb').replace('mongo:27017','localhost:27019'))
    logger.info('Connexion à la base de données %j',app.get('mongodb'))
  }*/
  const connection = app.get('mongodb')

  const database = new URL(connection).pathname.substring(1)
  logger.info(`Base de donnée : ${database}`)
  logger.info(`Base url de connexion : ${app.get('mongodb')}`)
  const mongoClient = MongoClient.connect(app.get('mongodb'))
    .then((client) => {
      app.set('mongodbClient', mongoClient)

      // client.

      const dbAdmin = client.db().admin()
      
      if (!Object.keys(app.services).includes('mongo/databases')) {
        app.use(
          '/mongo/databases',
          dbMgmt.database({ adminDb: dbAdmin, client }),
        )
      }

      dbAdmin.listDatabases().then((result) => {
        logger.info('Databases : %j', result)

        if (Array.isArray(result.databases)) {
          for (let index = 0; index < result.databases.length; index++) {
            const database = result.databases[index]
            const currentDB = client.db(database.name)

            if (!Object.keys(app.services).includes(`mongo/${database.name}/collections`)) {
              app.use(
                `/mongo/${database.name}/collections`,
                dbMgmt.collection({ db: currentDB }),
              )
            }
            // app.service('/mongo/'+database.name+'/collections').find({})
            client
              .db(database.name)
              .listCollections()
              .toArray()
              .then((collections) => {
                if (Array.isArray(collections)) {
                  // collections.forEach((collection) => {
                  for (let idc = 0; idc < collections.length; idc++) {
                    const collection = collections[idc]

                    // if (collection?.name) {
                    const cname = collection?.name
                    // }

                    if (
                      !Object.keys(app.services).includes(
                        `mongo/${database.name}/${cname}`,
                      )
                    ) {
                      logger.info(
                        'Creation du service : %j',
                        `/mongo/${database.name}/${cname}`,
                      )
                      // const mongo1Client = MongoClient.connect(app.get('mongodb')).then( (client) => {
                      const dbc = client.db(database.name)

                      app.use(
                        `/mongo/${database.name}/${cname}`,
                        new MongoDBService({
                          paginate: false, // app.get('paginate'),//,
                          multi: true,
                          Model: dbc.collection(cname), // app.get('mongodbClient').then((dbi) => dbi.collection(cname))
                        }),
                        {
                          methods: ['find', 'get', 'create', 'patch', 'remove'],
                        },
                      )
                      // });
                    }
                  } // )
                  client.db(database.name)
                  // app.set('mongodbClient', mongoClient)
                }
              })

              if (!Object.keys(app.services).includes(`mongo/${database.name}/users`)) {
                app.use(
                  `/mongo/${database.name}/users`,
                  dbMgmt.user({ db: currentDB }),
                )
              }
          }
        }

        app.set('alldatabases', result.databases)
      })

      client.db(database.name)
      app.set('mongodbClient', mongoClient)
      app.set('currentDatabase', database)
      logger.info('currentDatabase : %s', app.get('currentDatabase'))
      app.set('mongodb_ok', true)
      logger.info('mongodb_ok : %s', app.get('mongodb_ok'))
      logger.info('Votre base de donnée Mongodb accessible configurée!')

      return client.db(database.name)
    })
    .catch((err) => {
      console.log('err :',err)
      if (String(err).includes('MongoServerSelectionError')) {
        app.set('mongodb_ok', false)
        logger.info(
          `Votre base de donnée Mongodb n'est pas accessible ou est non configurée!
  
          Mongo url : ${connection}`,
          )
        logger.info(`Dans le fichier de configuration vous devez avoir une chaine de connexion accessible!
  
            Exemple de configuration:
        
              "mongodb": "mongodb://localhost:27017/database?authSource=admin"
        `)
        logger.info('Demarrer mongo(exécution de docker-compose.yml) et redémarrer Vite en tapant la touche (r) puis [Entrer] dans la console ou le treminal d\'exécution en mode développement !')
      }
    
    })

  app.set('mongodbClient', mongoClient)
}