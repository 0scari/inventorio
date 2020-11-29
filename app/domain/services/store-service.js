'use strict'

const storeRepo = require('../../persistance/mongo/repository/store-repository')

module.exports.save = async(resource) => storeRepo.create(resource)

module.exports.get = async(id) => storeRepo.read(id)

module.exports.delete = async id => 'deleted'
