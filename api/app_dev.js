// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
import { feathers } from '@feathersjs/feathers';
import express, {
  cors,
  errorHandler,
  json,
  notFound,
  rest,
  serveStatic,
  urlencoded,
} from '@feathersjs/express';
import configuration from '@feathersjs/configuration';
import socketio from '@feathersjs/socketio';
import history from 'connect-history-api-fallback';
import { logger } from './logger.js';
import { logError } from './hooks/log-error.js';
import { mongodb } from './mongodb.js';
import { authentication } from './authentication.js';
import { services } from './services/index.js';
import { channels } from './channels.js';
import * as kill from 'kill-port';
//import swagger from 'feathers-swagger'
//import { SwaggerUIBundle, SwaggerUIStandalonePreset } from 'swagger-ui-dist'
//import nocache from 'nocache'
//import { MongoClient } from 'mongodb'
export const main = () => {
  //const kill = import('kill-port');

  const app = express(feathers());

  if (app._isSetup) {
    console.log('Configuration connexions :', app);
  }

  // Load app configuration
  app.configure(configuration());
  //app.configure(swagger.customMethodsHandler)
  //const port = app.get('port')
  //const host = app.get('host')
  //app.use(nocache())

  app.use(
    cors({
      origin: app.get('origins'),
      //origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: ['Access-Control-Allow-Origin'],
      credentials: true,
      //credentials: true,
    }),
  );

  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(history());
  // Host the public folder
  app.use('/', serveStatic(app.get('public')));

  logger.info('Application started public folder : %s', app.get('public'));

  // Configure services and real-time functionality
  app.configure(rest());
  /*
  app.configure(
    swagger({
      openApiVersion: 3,
      docsJsonPath: "/swagger.json",
      docsPath: "/swagger",
      ui: swagger.swaggerUI({ docsPath: "/api/docs" }),
      docs: true,
      specs: {
        info: {
          title: "My API",
          description: "My API Documentation",
          version: "3.0.0",
        },
        components: {
          topbar: () => {
            return null;
          },
          securitySchemes: {
            BasicAuth: {
              type: "http",
              scheme: "basic",
            },
            BearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
          securityDefinitions: {
            BasicAuth: {
              type: "basic",
            },
            BearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        security: {
          BearerAuth: [],
        },
      },
      plugins: [],
    })
  );*/
  app.configure(
    socketio({
      cors: {
        origin: app.get('origins'),
        // origin: true,
        // credentials: true,
      },

      //namespace: '/socket.io',

      //transports: ['websocket', 'polling'],
    }),
  );
  app.configure(mongodb);

  app.configure(authentication);
  app.configure(services);

  app.configure(channels);

  //app.set('liveservices',{ ...Object.keys(app.services) })

  Object.keys(app.services).forEach((serviceName) => {
    logger.info(`Configured service ${serviceName}`);
    //console.log(`Configured service ${serviceName} methods: `,app.services[serviceName])
  });
  // Configure a middleware for 404s and the error handler

  app.use(notFound({ verbose: false }));
  app.use(
    errorHandler({
      logger,
    }),
  );

  // Register hooks that run on all service methods
  app.hooks({
    around: {
      all: [
        (context, next) => {
          console.log('All Service :', context.path);
          return next();
        },
        logError,
      ],
    },
    before: {
      all: [
        (context) => {
          console.log('Service :', context.path);
          //return next
        },
      ],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: [],
    },
    after: {},
    error: {},
  });
  // Register application setup and teardown hooks here
  app.hooks({
    setup: [
      async (context, next) => {
        // E.g. wait for MongoDB connection to complete
        //const isMongo = await context.app.get('mongodbClient')
        //console.log('isMongo',isMongo.client)
        /* if (context.app.get('mongodbClient') && !isMongo) {
        //console.log('Base de donnée mongodb non accessible')
        try {
          //app.configure(mongodb)
          //app.configure(services)
        } catch (error) {
          console.log('Base de donnée mongodb vraiment injoignable')
        }

      }

      */
        await next();
      },
    ],
    teardown: [
      async (context, next) => {
        // Close MongoDB connection
        await context.app.get('mongoClient').close();
        await next();
      },
    ],
  });

  console.log('Configuration :', app.settings);

  return app;
};

//console.log('Api meta :',import.meta)

//console.log(import.meta.env.VITE_API_URL);

// Bootstrap

export const mainApp = main();
