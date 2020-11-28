'use strict'

const db = require('../../persistance/db')

module.exports.store = async(playlist) => 'stored'

module.exports.get = async(id) => 'Resource ' + id

module.exports.delete = async id => 'deleted'

