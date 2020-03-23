'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SolicitudSuscripcionUiSchema extends Schema {
  up () {
    this.create('solicitud_suscripcion_uis', (table) => {
      table.increments()
      table.string('nombre_del_producto',50)
      table.integer('cantidad_unidades_inversion')
      table.decimal('precio_VUI', 12, 0)
      table.decimal('total', 12, 0)
      table.string('pago_dividendos',10)
      table.boolean('estatus_conciliacion').defaultTo(false)
      table.boolean('reprecentacion_asamblea_general')
      table.boolean('unidades_asignadas').defaultTo(false)
      table
        .integer('cliente_natural_id')
        .unsigned()
        .index('cliente_natural_id')
      table
        .foreign('cliente_natural_id')
        .references('cliente_naturals.id')
        .onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('solicitud_suscripcion_uis')
  }
}

module.exports = SolicitudSuscripcionUiSchema
