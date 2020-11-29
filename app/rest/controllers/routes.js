'use strict'

const router = require('express').Router()
const status = require('http-status-codes')
const storeService = require('../../domain/services/store-service')

router.get('/resource/:id', async(req, res) => {
    res.status(status.OK).send(await storeService.get(req.params.id))
})

router.post('/resource', async(req, res) => {
    try {
        await storeService.save(req.body.value)
    } catch (e) {
        console.error(e)
        res.status(status.INTERNAL_SERVER_ERROR).send({
            message: "Please contact support",
            error: e.message
        })
    }
    res.status(status.CREATED).send()
})

router.put('/resource/:id', async(req, res) => {
    res.status(status.OK).send()
})

router.delete('/resource/:id', async(req, res) => {
    await storeService.delete(req.params.id)
    res.status(status.OK).send()
})

module.exports = router

