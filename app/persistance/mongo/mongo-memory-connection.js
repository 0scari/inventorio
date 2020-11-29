'use strict'

const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

/**
 * Connect to the in-memory database.
 */
module.exports.connect = async(host, port, dbName) => {
    const mongod = new MongoMemoryServer(
        {
            instance: {
                port: port, // by default choose any free port
                ip: host,
                dbName: dbName, // by default generate random dbName
            },
            debug: true
        }
    )

    const uri = await mongod.getConnectionString()
    const mongooseOpts = {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000
    }

    return mongoose.connect(uri, mongooseOpts)
}

/**
 * Drop database, close the connection and stop mongod.
 */
module.exports.disconnect = async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongod.stop()
}
