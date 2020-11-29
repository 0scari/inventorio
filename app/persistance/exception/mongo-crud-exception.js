'use strict'

class CRUDError extends Error {
    constructor(operation, cause) {
        super(`${operation} error \n ${cause}`)
        this.name = 'CRUDError'
    }
}

module.exports = CRUDError
