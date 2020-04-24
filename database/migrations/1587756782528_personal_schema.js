'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PersonalSchema extends Schema {
  up () {
    this.create('personals', (table) => {
      table.string('nombre')
      table.string('apellido')
      table.string('documento_identificacion').notNullable().index('personal').unique()
      table.string('correo_electronico', 254).unique().notNullable().index('email')
      table.boolean('legal').defaultTo(false)
      table.boolean('operaciones').defaultTo(false)
      table.boolean('tesoreria').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('personals')
  }
}

module.exports = PersonalSchema
