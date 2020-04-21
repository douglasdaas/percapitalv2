'use strict'

/*
|--------------------------------------------------------------------------
| ClienteNaturalSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class ClienteNaturalSeeder {
  async run () {
    await Factory.model('App/Models/ClienteNatural').createMany(3)
    const clientesNaturales = await Database.table('cliente_naturals')
    console.log(clientesNaturales)
  }
}

module.exports = ClienteNaturalSeeder
