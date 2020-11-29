'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

module.exports = new Schema({
        StoreId: { type: Number, index: true}
    },
    { strict: false, versionKey: false }
)