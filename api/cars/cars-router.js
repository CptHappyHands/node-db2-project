const express = require('express')
const Car = require('./cars-model')
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberUnique
} = require('./cars-middleware')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const data = await Car.getAll()
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', checkCarId, async (req, res, next) => {
    try {
        const data = await Car.getById(req.params.id)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.post('/', checkCarPayload, checkVinNumberUnique, async (req, res, next) => {
    try {
        const newCar = await Car.create(req.body)
        res.status(201).json(newCar)
    } catch (err) {
        next(err)
    }
})

module.exports = router