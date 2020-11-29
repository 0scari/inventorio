'use strict'

const mongoose = require('mongoose')
const schema = require('../schema/store')
const CRUDError = require('../../exception/mongo-crud-exception')

let Store = mongoose.model('Store', schema)

module.exports.create = async (resource) => {
    try {
        await new Store(resource).save()
    } catch (e) {
        throw new CRUDError("CREATE", e)
    }
}

module.exports.read = async (id) => {
    try {
        return Store.find({storeId: id})
    } catch (e) {
        throw new CRUDError("READ", e)
    }
}

module.exports.update = async (resource) => {
    collection.update
}

module.exports.delete = async (id) => {
    collection.remove
}