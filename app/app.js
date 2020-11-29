'use strict'

const debug = require('debug')('pozdnako:server')
const express = require('express')
const path = require('path')
const logger = require('morgan')
const db = require('./persistance/database')
const validationMiddleware = require('./rest/validation/middleware')

const appPort = process.env.PORT || 3000
const dbPort = process.env.PORT || 27017
const app = express()

module.exports = db.connect('127.0.0.1', dbPort, "store")
    .then(async () => {
        console.info("Successfully connected to DB")

        app.use(logger('dev'))
        app.use(express.json())
        app.use(validationMiddleware)
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*')
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
            next()
        })
        app.use('/', require('./rest/controllers/routes'))

        const server = app.listen(appPort, () => {
                console.info(`Example app listening on port ${appPort}`)
                debug('Listening on ' + appPort)
            }
        )
        await initShutdownHook(server)
    })
    .catch((error) => {
        console.error(`DB connection failed \n ${error}`)
    }
)

async function initShutdownHook(server) {
    process.on('SIGTERM', () => {
        console.debug('SIGTERM signal received.');
        console.debug('Closing http server.');
        server.close(() => {
            console.info('Http server closed.');
        })
        db.disconnect()})
}