import { NotFound, GeneralError, BadRequest } from '@feathersjs/errors';
import { MongoDBService } from '@feathersjs/mongodb';

import { MongoClient } from 'mongodb';

import dbMgmt from 'vv-feathers-mongodb-management';

import { logger } from '../../logger.js';
// This is a skeleton for a custom service class. Remove or add the methods you need here
export class AdmindbService {
  constructor(options, app) {
    this.options = options || {};
    this.app = app || {};
  }

  async getCollections(name) {
    const client = (await this.app.get('mongodbClient')).client;
    //return new Promise(async (resolve, reject) => {
    let res = null;
    //logger.info("Client db : %j", await client.db(name));
  }

  async find(_params) {
    return new Promise(async (resolve, reject) => {
      logger.info('admindb:find : %j', _params);
      if (_params && Object.keys(_params.query)[0] === 'database') {
        logger.info('admindb:Mongo database : %s', this.app.get('currentDatabase'));
        resolve(this.app.get('currentDatabase'));
      } else if (_params && Object.keys(_params.query)[0] === 'databases') {
        //logger.info('admindb:Mongo databases : %j',this.app.get('alldatabases'));
        //return this.app.get('alldatabases');
        const connection = this.app.get('mongodb');
        const database = new URL(connection).pathname.substring(1);
        logger.info('Base de donnée : ' + database);
        logger.info('Base url de connexion : ' + connection);
        const client = (await this.app.get('mongodbClient')).client; ////await MongoClient.connect(connection)

        const db = await client.db().admin(); //.admin();
        const status = await db.serverStatus();
        logger.info('Status : %j', status);
        //logger.info("Bases de données : %j", await db.listDatabases());
        const databases = Object.assign(
          [],
          (await db.listDatabases()).databases
        );
        //logger.info("Bases de données : %j", databases);

        let dbi;
        let jsonRes = [];
        databases.forEach((dbElt) => {
          jsonRes.push({ ...dbElt, tables: null, status: status });
        });
        //logger.info("JSON : %j", jsonRes);
        let i = 0;
        for (let index = 0; index < jsonRes.length; index++) {
          const element = jsonRes[index];
          const dbi = await client.db(element.name);
          const cols = await dbi.listCollections().toArray();
          //logger.info("collections : %j", cols);
          jsonRes[index].tables = cols;
        }
        //logger.info("JSON : %j", jsonRes);
        //client2.close()
        resolve(jsonRes);
      } else {
        resolve(new BadRequest('Erreur dans la requête'));
      }
    });
    //
  }

 
  async create( _params,data) {
    return new Promise((resolve, reject) => {
      logger.info('admindb:create : %j', _params);
      if (_params && _params.query.createdb && _params.query.collection) {
        const connection = this.app.get('mongodb');
        const database = new URL(connection).pathname.substring(1);
        logger.info('Create Base de donnée : ' + database);
        logger.info('Create Base url de connexion : ' + this.app.get('mongodb'));
        MongoClient.connect(connection).then(async (client) => {
          
          try {
            const newDb = client.db(_params.query.createdb);
            await newDb.createCollection(_params.query.collection);
            
            // mise a jour des collections
            const currentDB = client.db(_params.query.createdb)

            if (!Object.keys(this.app.services).includes(`mongo/${_params.query.createdb}/collections`)) {
              this.app.use(
                `/mongo/${_params.query.createdb}/collections`,
                dbMgmt.collection({ db: currentDB }),
              )
            }
            //---------------------------------------
            // mise a jour du service de la collection
            //---------------------------------------
            const cname = _params.query.collection
            if (!Object.keys(this.app.services).includes(`mongo/${_params.query.createdb}/${cname}`)) {
              logger.info('Creation du service : %j',`/mongo/${_params.query.createdb}/${cname}`)
              // const mongo1Client = MongoClient.connect(app.get('mongodb')).then( (client) => {
              //const dbc = client.db(_params.query.createdb)

              this.app.use(
                `/mongo/${_params.query.createdb}/${cname}`,
                new MongoDBService({
                  paginate: this.app.get('paginate'),//,
                  multi: true,
                  Model: currentDB.collection(cname), // app.get('mongodbClient').then((dbi) => dbi.collection(cname))
                }),
                {
                  methods: ['find', 'get', 'create', 'patch', 'remove'],
                },
              )
            }
            
            client.close();

            resolve({
              database: _params.query.createdb,
              collection: _params.query.collection,
              created: true,
            });
          } catch (error) {
            resolve(new BadRequest('Erreur dans la requête'));
          }
        });
      } else {
        resolve(new BadRequest('Erreur generale dans la requête'));
      }
    });
  }
  async remove(_params,data) {
    return new Promise((resolve, reject) => {
      if (_params && _params.query.dbname && (_params.query?.collection=='' || _params.query?.collection==undefined)) {
        const connection = this.app.get('mongodb');
        const database = new URL(connection).pathname.substring(1);
        
        logger.info('Delete Base url de connexion : ' + this.app.get('mongodb'));
        MongoClient.connect(connection).then(async (client) => {
          try {
            const collections = client.db(_params.query.dbname).listCollections().toArray();
            /*
            collections.forEach((collection) => {
              logger.info("Delete collection : " + collection.name);
              client.db(_params.query.dbname).dropCollection(collection.name);
            });
            */
           if ((await collections).length == 0) {
            const deleteDb = client.db(_params.query.dbname).dropDatabase();
            logger.info('Delete Base de donnée : %j ' + deleteDb);
            if (!Object.keys(this.app.services).includes(`mongo/${_params.query.dbname}/collections`)) {
              this.app.unuse(`/mongo/${_params.query.dbname}/collections`)
            }
            resolve({
              database:_params.query.dbname,
              deleted: true,
            });
           } else {
            resolve({
              database:_params.query.dbname,
              message:'Base de donnée non vide',
              deleted: false,
            });
           }
            
          } catch (error) {
            resolve(new BadRequest('Erreur dans la requête'));
          }
        });
      } else {
        if (_params && _params.query.dbname && (_params.query?.collection!=='' || _params.query?.collection!==undefined)) {
          // Suppression d'une collection
          const connection = this.app.get('mongodb');
          const database = new URL(connection).pathname.substring(1);
          

          
          MongoClient.connect(connection).then(async (client) => {
            try {
              const deleteCollection = client.db(_params.query.dbname).dropCollection(_params.query.collection);
              logger.info('Delete collection : %j ' + deleteCollection);
              if (!Object.keys(this.app.services).includes(`mongo/${_params.query.dbname}/${_params.query.collection}`)) {
                this.app.unuse(`/mongo/${_params.query.dbname}/${_params.query.collection}`)
              }
              resolve({
                database:_params.query.dbname,
                collection:_params.query.collection,
                deleted: true,
              });
            } catch (error) {
              resolve(new BadRequest('Erreur dans la requête'));
            }
            client.close();
          }).catch((error) => {
            resolve(new BadRequest('Erreur dans la requête'));
          });
          
        }
        resolve(new BadRequest('Erreur dans la requête'));
      }
      
    });
  }

  
}

export const getOptions = (app) => {
  return { app };
};
