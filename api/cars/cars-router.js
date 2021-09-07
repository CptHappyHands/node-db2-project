const express = require('express')
const Car = require('./cars-model')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        return 'hello world'
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
})

module.exports = router