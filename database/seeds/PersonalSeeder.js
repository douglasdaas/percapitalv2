'use strict'

/*
|--------------------------------------------------------------------------
| PersonalSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class PersonalSeeder {
  async run () {
    await Factory.model('App/Models/Personal').createMany(1)
    const personales = await Database.table('personals')
    console.log(personales)
  }
}

module.exports = PersonalSeeder
