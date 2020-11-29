'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

module.exports = new Schema({
    storeId: { type: Number, index: true},
    strField: String,
    numField: Number,
    date: { type: Date, default: Date.now }
})
