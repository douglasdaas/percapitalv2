'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsuarioSchema extends Schema {
  up () {
    this.create('usuarios', (table) => {
      table.increments()
      table.string('email_natural', 254).unique().index('email_natural')
      table.string('email_juridico', 254).unique().index('email_juridico')
      table.string('password', 60).notNullable()
      table.string('account_status')
      table
        .foreign('email_natural')
        .references('cliente_naturals.correo_electronico')
        .onDelete('cascade')
      table
        .foreign('email_juridico')
        .references('cliente_juridicos.correo_electronico')
        .onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('usuarios')
  }
}

module.exports = UsuarioSchema
