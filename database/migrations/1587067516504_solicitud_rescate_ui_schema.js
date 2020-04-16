'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SolicitudRescateUiSchema extends Schema {
  up () {
    this.create('solicitud_rescate_uis', (table) => {
      table.increments()
      table.string('nombre_del_producto',50)
      table.integer('cantidad_unidades_inversion')
      table.decimal('precio_VUI', 12, 0)
      table.decimal('total', 12, 0)
      table.boolean('estatus_conciliacion').defaultTo(false)
      table.boolean('unidades_rescatadas').defaultTo(false)
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
    this.drop('solicitud_rescate_uis')
  }
}

module.exports = SolicitudRescateUiSchema
