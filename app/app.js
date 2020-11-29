'use strict'

const debug = require('debug')('pozdnako:server')
const express = require('express')
const path = require('path')
const logger = require('morgan')
const db = require('./persistance/database')

module.exports = db.connect('127.0.0.1', 27017, "inventory").then(async () => {
    console.debug("Successfully connected to DB")
    
    const app = express()
    app.use(logger('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))

    const middleware = require('./rest/middleware')
    app.use(middleware)

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        next()
    })

    app.use('/', require('./rest/controllers/controller'))
    const port = process.env.PORT || '3000'
    app.listen(port, () => {
            console.log(`Example app listening on port ${port}!`)
            debug('Listening on ' + port)
        }
    );
});
