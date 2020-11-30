'use strict'

const status = require('http-status-codes')
const {storeSchema, validate} = require('../validation/schema/store')

module.exports = async(req, res, next) => {
    if (req.method == 'POST' || req.method == 'PUT') {
        if (!req.headers['content-type'] && req.headers['content-type'] != 'application/json') {
            res.status(status.UNSUPPORTED_MEDIA_TYPE).end()
        }
        if (isBulkLoad(req)) {
            if (!isBulkLoadValid(req.body.value)) {
                res.status(status.BAD_REQUEST).end()
            }
        } else {
            if (!validate(storeSchema, req.body.value)) {
                res.status(status.BAD_REQUEST).end(JSON.stringify({error: validate.lastError}))
            }
        }
    }
    next()
}

function isBulkLoad(req) {
    return req.originalUrl === '/stores'
}

function isBulkLoadValid(stores) {
    if (!Array.isArray(stores)) {
        return false
    }
    for (const store of stores) {
        if (!validate(storeSchema, store)) {
            return false
        }
    }
    return true
}
