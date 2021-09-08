const db = require("../../data/db-config")
const Car = require("./cars-model")
const vinValidator = require('vin-validator')

async function checkCarId(req, res, next) {
  try {
    const car = await Car.getById(req.params.id)
    if(!car) {
      next({status: 404, message: `car with id ${req.params.id} is not found` })
    } else {
      req.car = car
      next()
    }
  } catch (err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage} = req.body;
  if (!vin) {
    res.status(400).json({
      message: `vin is missing`
    })
  } else if (!make) {
    res.status(400).json({
      message: `make is missing`
  }) 
} else if (!model) {
    res.status(400).json({
      message: 'model is missing'
    })
} else if (!mileage) {
  res.status(400).json({
    message: `mileage is missing`
  })
} else {
  next()
}
}

// async function checkVinNumberValid(req, res, next) {
//   // const { vin } = req.body
//   try {
//     const vinNumber = await vinValidator.validate(req.body.vin)
//     if(vinNumber === false ) {
//       res.status(400).json({
//         message: `vin ${req.body.vin} is invalid`
//       })
//     } else {
//       req.body.vin = vinNumber
//       next()
//     }
//   } catch (err) {
//     next(err)
//   }
// }

const checkVinNumberValid = async (req, res, next) => {
  if (vinValidator.validate(req.body.vin)) { 
    next() 
  } else { next({status: 400, message: `vin ${req.body.vin} is invalid`}) }
}

async function checkVinNumberUnique(req, res, next) {
  try {
    const vinNumber = await db('cars')
    .where("vin", req.body.vin).first()
    if (vinNumber) {
      next({ status: 400, message: `vin ${req.body.vin} already exists` })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
}