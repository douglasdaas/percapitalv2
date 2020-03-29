'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClienteNaturalSchema extends Schema {
  up () {
    this.create('cliente_naturals', (table) => {
      table.increments()
      table.string('tipo_documento_identificacion',1).notNullable()
      table.string('documento_identificacion',18).notNullable()
      table.string('nombre',30).notNullable()
      table.string('apellido',30).notNullable()
      table.string('lugar_nacimiento',35).notNullable()
      table.string('fecha_nacimiento',35).notNullable()
      table.string('estado_civil',35).notNullable()
      table.string('nacionalidad',35).notNullable()
      table.string('otra_nacionalidad',35)
      table.string('genero',10).notNullable()
      table.string('profecion_oficio',50).notNullable()
      table.string('condicion_vivienda',50).notNullable()
      table.string('carga_familiar',50)
      table.string('direccion_domicilio',80).notNullable()
      table.string('ciudad_domicilio',35).notNullable()
      table.string('estado_domicilio',35).notNullable()
      table.string('codigo_postal_domicilio',35).notNullable()
      table.string('pais_domicilio',35).notNullable()
      table.string('telefono_fijo',35).notNullable()
      table.string('telefono_celular',35).notNullable()
      table.string('correo_electronico',35).notNullable().index('correos_electronicos')
      //CONYUGE
      table.string('nombre_completo_conyugue',50)
      table.string('tipo_documento_identificacion_conyugue',1)
      table.string('documento_identificacion_conyugue',18)
      table.string('fuente_ingresos_conyugue',50)
      //PEP
      table.string('es_pep_inversionista',50)
      table.string('nombre_ente_adcripcion_inversionista',50)
      table.string('cargo_desempena_inversionista',50)
      table.string('pais_inversionista',50)
      table.string('identificador_relacionado_inversionista',50)
      table.string('es_pep_parentesco',50)
      table.string('nombre_ente_adcripcion_parentesco',50)
      table.string('cargo_desempena_parentesco',50)
      table.string('pais_parentesco',50)
      table.string('identificador_relacionado_parentesco',50)
      table.string('es_pep_asociado',50)
      table.string('nombre_ente_adcripcion_asociado',50)
      table.string('cargo_desempena_asociado',50)
      table.string('pais_asociado',50)
      table.string('identificador_relacionado_asociado',50)
      //REFERENCIAS
      table.string('institucion_bancaria',50)
      table.string('nombre_producto',50)
      table.string('numero_producto',50)
      table.string('nombre_apellido',50)
      table.string('cedula_identidad',50)
      table.string('telefono_local',50)
      table.string('celular',50)
      //CUENTAS EN DIVISAS
      table.string('nombre_banco_beneficiario',50)
      table.string('numero_cuenta_IBAN_beneficiario',50)
      table.string('SWIFT_ABA_beneficiario',50)
      table.string('direccion_banco_beneficiario',50)
      table.string('nombre_banco_intermediario',50)
      table.string('numero_cuenta_IBAN_intermediario',50)
      table.string('SWIFT_ABA_intermediario',50)
      table.string('direccion_banco_intermediario',50)
      table.string('nombre_beneficiario',50)
      table.string('direccion_beneficiario',50)
      //ARCHIVOS
      table.string('img_cedula_pasaporte',80)
      table.string('img_rif',80)
      table.string('img_recibo',80)
      //ESTATUS
      table.boolean('estatus_legal').defaultTo(false)
      table.boolean('estatus_CVV').defaultTo(false)
      //HORAS
      table.timestamps()
      table.timestamp('aprobadoLegal', { precision: 6 })

    })
  }

  down () {
    this.drop('cliente_naturals')
  }
}

module.exports = ClienteNaturalSchema
