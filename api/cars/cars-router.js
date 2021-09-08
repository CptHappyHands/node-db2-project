const express = require('express')
const Car = require('./cars-model')
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberUnique,
    checkVinNumberValid,
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
        // const data = await Car.getById(req.params.id)
        res.json(req.car)
        next()
    } catch (err) {
        next(err)
    }
})

router.post('/', checkCarPayload, checkVinNumberUnique, checkVinNumberValid, async (req, res, next) => {
    try {
        const newCar = await Car.create(req.body)
        res.json(newCar)
        next()
    } catch (err) {
        next(err)
    }
})

module.exports = router