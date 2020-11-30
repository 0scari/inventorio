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
            res.status(status.OK).send()
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

router.post('/stores', async(req, res) => {
    const result = {ok: [], errors: []}
    for(const store of req.body.value) {
        try {
            await storeService.save(store)
            result.ok.push(store.StoreId)
        } catch (e) {
            console.error(e)
            result.errors.push(store.StoreId)
        }
    }
    res.status(status.CREATED).send(result)
})

router.put('/store', async(req, res) => {
    try {
        const store = await storeService.get(req.body.value.StoreId)
        if (!store) {
            res.status(status.NOT_FOUND).send()
        } else {
            await storeService.update(req.body.value, store)
            res.status(status.OK).send()
        }
    } catch (e) {
        processError(e, res)
    }
})

router.put('/stores', async(req, res) => {
    const result = {ok: [], errors: []}

    for(const update of req.body.value) {
        try {
            const store = await storeService.get(update.StoreId)
            if (!store) {
                result.errors.push({id: update.StoreId, reason: 'NOT_FOUND'})
            } else {
                result.ok.push(update.StoreId)
            }
        } catch (e) {
            console.error(e)
            result.errors.push({id: update.StoreId, reason: e.message})
        }
    }
    res.status(status.OK).send(result)
})

function processError(error, res) {
    console.error(error)
    res.status(status.INTERNAL_SERVER_ERROR).send({
        message: 'Please contact support',
        error: error.message
    })
}

module.exports = router

