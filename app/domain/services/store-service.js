'use strict'

const storeRepo = require('../../persistance/mongo/repository/store-repository')

module.exports.save = async(resource) => {
    const inventory = buildInventoryList(
        optional(resource.Delivery).or([]),
        optional(resource.Sale).or([]),
        optional(resource.Refund).or([])
    )
    inventory.StoreId = resource.StoreId
    storeRepo.create(inventory)
}

module.exports.get = async(id) => storeRepo.read(id)

module.exports.delete = async id => 'deleted'

module.exports.update = async resource => storeRepo.update(resource)

function buildInventoryList(deliveries, sales, refunds) {
    const inventory = {}
    // additive activities must go first
    processAdditionActivities(deliveries, inventory)
    processAdditionActivities(refunds, inventory)
    processDeductionActivities(sales, inventory)
    return inventory
}

function processAdditionActivities(activities, inventory) {
    process(activities, inventory, (item, currQuant, newQuant) => currQuant + newQuant)
}

function processDeductionActivities(activities, inventory) {
    process(activities, inventory, (item, currQuant, newQuant) => {
        const result = currQuant - newQuant
        if (result < 0) {
            console.warn(`Encountered negative inventory {$item} = {$result}`)
        }
        return result
    })
}

function process(activities, inventory, math) {
    activities.forEach(activityInventory => {
        const inventoryItem = inventory[activityInventory.ItemName]
        if (inventoryItem) {
            inventoryItem.Quantity = math(inventoryItem.ItemName, inventoryItem.Quantity, activityInventory.Quantity)
        } else {
            addNewInventory(inventory, activityInventory)
        }
    })
}

function addNewInventory(inventory, item) {
    inventory[item.ItemName] = {"ItemId": item.ItemId, "Quantity": item.Quantity}
}

function optional(obj) {
    function or(alt) {return obj ? obj : alt}
    return {or: or}
}

