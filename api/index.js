//import { feathers } from '@feathersjs/feathers';
//import express from '@feathersjs/express'
//import fs from 'fs'
//import https from 'https'
import { mainApp } from './app_dev.js'
import { logger } from './logger.js'

console.log('ENV mode :',process.env.NODE_ENV)

const port = mainApp.get('port')
const host = mainApp.get('host')

process.on('unhandledRejection', (reason) => logger.error('Unhandled Rejection %O', reason))
/*
const server = https
  .createServer(
    {
      key: fs.readFileSync('localhost.key'),
      cert: fs.readFileSync('localhost.pem')
    },
    mainApp
  )
  .listen(port,"0.0.0.0")

// Call app.setup to initialize all services and SocketIO
mainApp.setup(server)

server.on('listening', () => logger.info('Feathers application started'))
*/
mainApp.listen(port).then(() => {
  logger.info(`Feathers app listening on http://${host}:${port}`)
})

