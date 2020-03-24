'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('email', 254).notNullable().unique().index('emails')
      table.string('password', 60).notNullable()
      table.string('account_status')
      table
        .foreign('email')
        .references('cliente_naturals.correo_electronico')
        .onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UsersSchema
