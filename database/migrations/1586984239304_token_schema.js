'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TokenSchema extends Schema {
  up () {
    this.create('tokens', (table) => {
      table.increments()
      table.integer('usuario_id').unsigned()
      table.string('token', 255).notNullable().unique().index()
      table.string('type', 80).notNullable()
      table.boolean('is_revoked').defaultTo(false)
      table
        .foreign('usuario_id')
        .references('usuarios.id')
        .onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('tokens')
  }
}

module.exports = TokenSchema
