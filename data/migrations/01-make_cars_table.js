exports.up = async function (knex) {
  await knex.schema.createTable('cars', table => {
    table.increments('id')
    table.string('vin').unique().notNullable()
    table.string('make').notNullable()
    table.string('model').notNullable()
    table.decimal('mileage').notNullable()
    table.string('title')
    table.string('transmission')
  })
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('cars')
}