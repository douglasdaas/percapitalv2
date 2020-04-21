'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PagoRescateUiSchema extends Schema {
  up () {
    this.create('pago_rescate_uis', (table) => {
      table.increments()
      table.text('comprobate_pago')
      table.string('referencia')
      table.string('fecha_realizada_transferencia')
      table.decimal('monto', 12, 0)
      table.boolean('estatus_conciliacion').defaultTo(false)
      table
        .integer('solicitud_rescate_ui_id')
        .unsigned()
      table
        .foreign('solicitud_rescate_ui_id')
        .references('solicitud_rescate_uis.id')
        .onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('pago_rescate_uis')
  }
}

module.exports = PagoRescateUiSchema
