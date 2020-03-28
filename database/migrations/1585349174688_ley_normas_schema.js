'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LeyNormasSchema extends Schema {
  up () {
    this.create('ley_normas', (table) => {
      table.increments()
      table.string('nombre')
      table.string('ruta')
      table.timestamps()
    })
  }

  down () {
    this.drop('ley_normas')
  }
}

module.exports = LeyNormasSchema
