'use strict'

/*
|--------------------------------------------------------------------------
| ClienteJuridicoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class ClienteJuridicoSeeder {
  async run () {
    await Factory.model('App/Models/ClienteJuridico').createMany(3)
    const clientesJuridicos = await Database.table('cliente_juridicos')
    console.log(clientesJuridicos )
  }
}

module.exports = ClienteJuridicoSeeder
