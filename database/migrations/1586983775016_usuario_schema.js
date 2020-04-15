'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsuarioSchema extends Schema {
  up () {
    this.create('usuarios', (table) => {
      table.increments()
      table.string('email', 254).unique().notNullable().index('email')
      table.string('password', 60).notNullable()
      table.string('account_status')
      table
        .string('cliente_natural_id')
        .index('cliente_natural_id')
      table
        .foreign('cliente_natural_id')
        .references('cliente_naturals.documento_identificacion')
        .onDelete('cascade')
      table
        .string('cliente_juridico_id')
        .index('cliente_juridico_id')
      table
        .foreign('cliente_juridico_id')
        .references('cliente_juridicos.registro_informacion_fiscal')
        .onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('usuarios')
  }
}

module.exports = UsuarioSchema
