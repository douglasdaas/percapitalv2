'use strict'

/*
|--------------------------------------------------------------------------
| UsuarioSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')


class UsuarioSeeder {
  async run () {
    await Factory.model('App/Models/Usuario').createMany(1)
    const usuarios = await Database.table('usuarios')
    console.log(usuarios)
  }
}

module.exports = UsuarioSeeder
