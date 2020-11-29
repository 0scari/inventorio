'use strict'

const database = require('./mongo/mongo-memory-connection')

module.exports.connect = (host, port, dbName) => database.connect(host, port, dbName)

module.exports.disconnect = () => database.disconnect()
