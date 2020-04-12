'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PagoUiSchema extends Schema {
  up () {
    this.create('pago_uis', (table) => {
      table.increments()
      table.text('combrobate_pago')
      table.string('referencia')
      table.decimal('monto', 12, 0)
      table.boolean('estatus_conciliacion').defaultTo(false)
      table
        .integer('solicitud_suscripcion_ui_id')
        .unsigned()
      table
        .foreign('solicitud_suscripcion_ui_id')
        .references('solicitud_suscripcion_uis.id')
        .onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('pago_uis')
  }
}

module.exports = PagoUiSchema
