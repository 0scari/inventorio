'use strict'

const mongoose = require('mongoose')
const schema = require('../schema/store')
const CRUDError = require('../../exception/mongo-crud-exception')

const Store = mongoose.model('Store', schema)

module.exports.create = async(resource) => {
    try {
        await upsert(resource)
    } catch (e) {
        throw new CRUDError('CREATE', e)
    }
}

module.exports.read = async(id) => {
    try {
        const model = await Store.findOne({StoreId: id})
        if (model) {
            // findOne returns Model.Store object, and because schema is non-strict: must extract wrapped doc
            return model._doc
        } else {
            return null
        }
    } catch (e) {
        throw new CRUDError('READ', e)
    }
}

module.exports.update = async(resource) => {
    try {
        await upsert(resource)
    } catch (e) {
        throw new CRUDError('UPDATE', e)
    }
}

module.exports.delete = async(resource) => {
    await Store.deleteOne({StoreId: resource.StoreId})
}

async function upsert(resource) {
    const query = {'StoreId': resource.StoreId}

    await Store.findOneAndUpdate(query, resource, {upsert: true})
    console.debug(`Upserted ${resource.StoreId}`)
}
