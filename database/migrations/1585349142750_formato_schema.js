'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FormatoSchema extends Schema {
  up () {
    this.create('formatoes', (table) => {
      table.increments()
      table.string('nombre')
      table.string('ruta')
      table.timestamps()
    })
  }

  down () {
    this.drop('formatoes')
  }
}

module.exports = FormatoSchema
