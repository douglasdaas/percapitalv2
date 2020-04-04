'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClienteJuridicoSchema extends Schema {
  up () {
    this.create('cliente_juridicos', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('cliente_juridicos')
  }
}

module.exports = ClienteJuridicoSchema
