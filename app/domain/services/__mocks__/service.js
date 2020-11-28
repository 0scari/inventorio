'use strict'

const mock = jest.genMockFromModule('../service')
mock.store = async(playlist) => { }

mock.get = id => { }

mock.delete = async id => 'deleted'

module.exports = mock
