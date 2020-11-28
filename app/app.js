'use strict'

const express = require('express')
const path = require('path')
const logger = require('morgan')
const sassMiddleware = require('node-sass-middleware')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const middleware = require('./rest/middleware')
app.use(middleware)

app.use('/', require('./rest/controllers/controller'))

module.exports = app
