const db = require("../../data/db-config")
const Car = require("./cars-model")

async function checkCarId(req, res, next) {
  try {
    const car = await Car.getById(req.params.id)
    if(!car) {
      next({status: 404, message: `car with id ${car.id} is not found` })
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
  req.body.vin = vin;
  next()
}
}

// async function checkVinNumberValid(req, res, next) {
//   try {

//   } catch (err) {
//     next(err)
//   }
// }

async function checkVinNumberUnique(req, res, next) {
  try {
    const vinNumber = await db('cars')
    .where("vin", req.body.vin).first()
    if (vinNumber) {
      next({ status: 400, message: `vin ${vin} already exists` })
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

}