'use strict'

const mongoose = require('mongoose')
const schema = require('../schema/resource')
const CRUDError = require('../../exception/mongo-crud-exception')

let Resource = mongoose.model('Resource', schema)

module.exports.create = async (resource) => {
    try {
        await new Resource(resource).save()
    } catch (e) {
        throw new CRUDError("CREATE", e)
    }
}

module.exports.read = async (id) => {
    try {
        return Resource.find({storeId: id})
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