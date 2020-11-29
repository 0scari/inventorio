'use strict'

const status = require('http-status-codes')
const {storeSchema, validate} = require('../validation/schema/store')

module.exports = async(req, res, next) => {
    if (req.method = 'POST' || req.method == 'PUT') {
        if (!req.headers['content-type'] && req.headers['content-type'] != 'application/json') {
            res.status(status.UNSUPPORTED_MEDIA_TYPE).end()
        } else if (!validate(storeSchema, req.body.value)) {
            res.status(status.BAD_REQUEST).end({error: validate.lastError})
        }
    }
    next()
}