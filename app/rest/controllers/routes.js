'use strict'

const router = require('express').Router()
const status = require('http-status-codes')
const storeService = require('../../domain/services/store-service')

router.get('/store/:id', async(req, res) => {
    res.status(status.OK).send(await storeService.get(req.params.id))
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
        await storeService.update(req.body.value)
    } catch (e) {
        processError(e, res)
    }
    res.status(status.OK).send()
})

router.delete('/resource/:id', async(req, res) => {
    await storeService.delete(req.params.id)
    res.status(status.OK).send()
})

function processError(error, res) {
    console.error(error)
    res.status(status.INTERNAL_SERVER_ERROR).send({
        message: "Please contact support",
        error: error.message
    })
}

module.exports = router

