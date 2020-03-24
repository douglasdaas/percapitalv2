'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClienteNaturalSchema extends Schema {
  up () {
    this.create('cliente_naturals', (table) => {
      table.increments()
      table.string('documento_identificacion',18).notNullable()
      table.string('tipo_documento_identificacion',1).notNullable()
      table.string('nombre',30).notNullable()
      table.string('apellido',30).notNullable()
      table.string('rif',18).notNullable()
      table.string('lugar_nacimiento',35).notNullable()
      table.string('fecha_nacimiento',35).notNullable()
      table.string('sexo',1).notNullable()
      table.string('estado_civil',35).notNullable()
      table.string('nacionalidad',35).notNullable()
      table.string('telefono_habitacion',35).notNullable()
      table.string('telefono_celular',35).notNullable()
      table.string('correo_electronico',35).notNullable().index('correos_electronicos')
      table.string('direccion_habitacion',80).notNullable()
      table.string('ciudad_habitacion',35).notNullable()
      table.string('estado_habitacion',35).notNullable()
      table.string('codigo_postal_habitacion',35).notNullable()
      table.string('pais_habitacion',35).notNullable()
      table.string('nivel_academico',35).notNullable()
      table.string('profesion_ocupacion',35).notNullable()
      table.string('nombre_empresa',50).notNullable()
      table.string('cargo',35).notNullable()
      table.string('anos_en_la_empresambre',35)
      table.string('direccion_empresa',80)
      table.string('ciudad_empresa',35)
      table.string('estado_empresa',35)
      table.string('codigo_postal_empresa',35)
      table.string('pais_empresa',35)
      table.string('documento_identificacion_conyugue',18)
      table.string('nombre_conyugue',35)
      table.string('apellido_conyugue',35)
      table.string('nombre_empresa_conyugue',35)
      table.string('anos_en_la_empresa_conyugue',35)
      table.string('direccion_empresa_conyugue',80)
      table.string('ciudad_empresa_conyugue',35)
      table.string('estado_empresa_conyugue',35)
      table.string('codigo_postal_empresa_conyugue',35)
      table.string('pais_empresa_conyugue',35)
      table.string('img_cedula_pasaporte',80)
      table.string('img_rif',80)
      table.string('img_recibo',80)
      table.boolean('estatus_legal').defaultTo(false)
      table.boolean('estatus_CVV').defaultTo(false)
      table.timestamps()
      table.timestamp('aprobadoLegal', { precision: 6 })

    })
  }

  down () {
    this.drop('cliente_naturals')
  }
}

module.exports = ClienteNaturalSchema
