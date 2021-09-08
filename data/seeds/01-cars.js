// STRETCH
const cars = [
    {
        vin: '1111111111111',
        make: 'Hyundai',
        model: 'Elantra',
        mileage: 130000,
        title: 'clean',
        transmission: 'automatic'
    },
    {
        vin: '1111111111112',
        make: 'Ford',
        model: 'focus',
        mileage: 150000,
        title: 'clean',
        transmission: 'automatic'
    },
]

exports.seed = function(knex) {
    return knex('cars').truncate().then(() => {
        return knex('cars').insert(cars)
})
}

   