'use strict'

const repo = require('../../persistance/mongo/repository/repository')

module.exports.save = async(resource) => repo.create({storeId: 123, strField: "String value"})

module.exports.get = async(id) => repo.read(id)

module.exports.delete = async id => 'deleted'
