'use strict'

const express = require('express')
const router = express.Router()
const status = require('http-status-codes')
const service = require('../../domain/services/service')

router.get('/resource/:id', async(req, res) => {
    res.status(status.OK).send(await service.get(req.params.id))
})

router.post('/resource', async(req, res) => {
    res.status(status.CREATED).header('Content-Type', 'application/json').send('Huston, got a problem!')
})

router.put('/resource/:id', async(req, res) => {
    res.status(status.OK).send()

})

router.delete('/resource/:id', async(req, res) => {
    await service.delete(req.params.id)
    res.status(status.OK).send()
})

module.exports = router

