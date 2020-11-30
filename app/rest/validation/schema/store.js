'use strict'

const validate = require('validate-fields')()

validate.typedef('Activity', {
    'ItemName': 'string(1,40)',
    'ItemId?': `number(1${'0'.repeat(11)},${'9'.repeat(12)})`,
    'Quantity?': 'number(1,)'
})

module.exports.storeSchema = {
    StoreId: `number(1${'0'.repeat(4)},${'9'.repeat(5)})`,
    'Refund?': ['Activity'],
    'Delivery?': ['Activity'],
    'Sale?': ['Activity']
}

module.exports.validate = validate
