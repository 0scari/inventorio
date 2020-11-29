'use strict'

const router = require('express').Router()
const status = require('http-status-codes')
const storeService = require('../../domain/services/store-service')

router.get('/store/:id', async(req, res) => {
    try {
        const store = await storeService.get(req.params.id)
        if (store) {
            res.status(status.OK).send(store)
        } else {
            res.status(status.NOT_FOUND).send()
        }
    } catch (e) {
        processError(e, res)
    }
})

router.delete('/store/:id', async(req, res) => {
    try {
        const store = await storeService.get(req.params.id)
        if (store) {
            await storeService.delete(store)
            res.status(status.OK).send(store)
        } else {
            res.status(status.NOT_FOUND).send()
        }
    } catch (e) {
        processError(e, res)
    }
})

router.post('/store', async(req, res) => {
    try {
        await storeService.save(req.body.value)
    } catch (e) {
        processError(e, res)
    }
    res.status(status.CREATED).send()
})

router.put('/store', async(req, res) => {
    try {
        let store = await storeRepo.read(req.body.value.StoreId)
        if (!store) {
            res.status(status.NOT_FOUND).send()
        } else {
            await storeService.update()
            res.status(status.OK).send()
        }
    } catch (e) {
        processError(e, res)
    }
})

function processError(error, res) {
    console.error(error)
    res.status(status.INTERNAL_SERVER_ERROR).send({
        message: "Please contact support",
        error: error.message
    })
}

module.exports = router

