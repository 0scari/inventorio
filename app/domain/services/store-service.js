'use strict'

const storeRepo = require('../../persistance/mongo/repository/store-repository')

module.exports.save = async (resource) => {
    const inventory = processInventory(
        {StoreId: resource.StoreId},
        optional(resource.Delivery).or([]),
        optional(resource.Sale).or([]),
        optional(resource.Refund).or([])
    )
    await storeRepo.create(inventory)
}

module.exports.get = async (id) => storeRepo.read(id)

module.exports.delete = async id => 'deleted'

module.exports.update = async existingInventory => {
    const newInventory = processInventory(
        existingInventory,
        optional(resource.Delivery).or([]),
        optional(resource.Sale).or([]),
        optional(resource.Refund).or([])
    )
    await storeRepo.update(newInventory)
}

function processInventory(inventory, deliveredInventory, soldInventory, refundedInventory) {
    // additive activities must go first
    addInventory(deliveredInventory, inventory)
    addInventory(refundedInventory, inventory)
    removeInventory(soldInventory, inventory)
    return inventory
}

function addInventory(updatedInventory, existingInventory) {
    calculateInventory(
        updatedInventory,
        existingInventory,
        (inventory, currQuant, newQuant) => currQuant + newQuant)
}

function removeInventory(updatedInventory, existingInventory) {
    calculateInventory(
        updatedInventory,
        existingInventory,
        (inventory, currQuant, newQuant) => {
        const result = currQuant - newQuant
        if (result < 0) {
            console.warn(`Encountered negative inventory ${inventory} = ${result}`)
        }
        return result
    })
}

function calculateInventory(updatedInventory, existingInventory, math) {
    updatedInventory.forEach(update => {
        const inventoryItem = existingInventory[update.ItemName]
        if (inventoryItem) {
            inventoryItem.Quantity = math(inventoryItem.ItemName, inventoryItem.Quantity, update.Quantity)
        } else {
            addNewInventory(existingInventory, update)
        }
    })
}

function addNewInventory(inventoryList, item) {
    inventoryList[item.ItemName] = {"ItemId": item.ItemId, "Quantity": item.Quantity}
}

function optional(obj) {
    function or(alt) {return obj ? obj : alt}
    return {or: or}
}

