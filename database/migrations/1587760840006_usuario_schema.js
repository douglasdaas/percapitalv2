'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsuarioSchema extends Schema {
  up () {
    this.table('usuarios', (table) => {
      // alter table
      table
        .string('personal_id')
        .index('personal_id')
      table
        .foreign('personal_id')
        .references('personals.documento_identificacion')
        .onDelete('cascade')
    })
  }

  down () {
    this.table('usuarios', (table) => {
      // reverse alternations
    })
  }
}

module.exports = UsuarioSchema
