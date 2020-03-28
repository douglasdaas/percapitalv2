'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DeberLegalSchema extends Schema {
  up () {
    this.create('deber_legals', (table) => {
      table.increments()
      table.string('nombre')
      table.string('ruta')
      table.timestamps()
    })
  }

  down () {
    this.drop('deber_legals')
  }
}

module.exports = DeberLegalSchema
