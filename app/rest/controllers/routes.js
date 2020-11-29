'use strict'

const router = require('express').Router()
const status = require('http-status-codes')
const storeService = require('../../domain/services/store-service')

router.get('/resource/:id', async(req, res) => {
    res.status(status.OK).send(await storeService.get(req.params.id))
})

router.post('/resource', async(req, res) => {
    res.status(status.CREATED).send(await storeService.save(null))
})

router.put('/resource/:id', async(req, res) => {
    res.status(status.OK).send()
})

router.delete('/resource/:id', async(req, res) => {
    await storeService.delete(req.params.id)
    res.status(status.OK).send()
})

module.exports = router

