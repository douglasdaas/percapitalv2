'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClienteNaturalSchema extends Schema {
  up () {
    this.create('cliente_naturals', (table) => {
      table.string('documento_identificacion').notNullable().index().unique()
      table.text('nombre').notNullable()
      table.text('apellido').notNullable()
      table.text('lugar_nacimiento').notNullable()
      table.text('fecha_nacimiento').notNullable()
      table.text('nacionalidad').notNullable()
      table.text('otra_nacionalidad')
      table.text('genero').notNullable()
      table.text('profecion_oficio').notNullable()
      table.text('condicion_vivienda').notNullable()
      table.text('carga_familiar')
      table.text('estado_civil')
      table.text('direccion_domicilio').notNullable()
      table.text('ciudad_domicilio').notNullable()
      table.text('estado_domicilio').notNullable()
      table.text('codigo_postal_domicilio').notNullable()
      table.text('pais_domicilio').notNullable()
      table.text('telefono_fijo').notNullable()
      table.text('telefono_celular').notNullable()
      table.string('correo_electronico',256).notNullable().index('correos_electronicos')
      //CONYUGE
      table.text('nombre_completo_conyugue')
      table.text('documento_identificacion_conyugue')
      table.text('fuente_ingresos_conyugue')
      //PEP
      table.text('es_pep_inversionista')
      table.text('nombre_ente_adcripcion_inversionista')
      table.text('cargo_desempena_inversionista')
      table.text('pais_inversionista')
      table.text('identificador_relacionado_inversionista')
      table.text('es_pep_parentesco')
      table.text('nombre_ente_adcripcion_parentesco')
      table.text('cargo_desempena_parentesco')
      table.text('pais_parentesco')
      table.text('identificador_relacionado_parentesco')
      table.text('es_pep_asociado')
      table.text('nombre_ente_adcripcion_asociado')
      table.text('cargo_desempena_asociado')
      table.text('pais_asociado')
      table.text('identificador_relacionado_asociado')
      //REFERENCIAS
      table.text('institucion_bancaria')
      table.text('nombre_producto_bancario')
      table.text('numero_producto_bancario')
      table.text('cifras_promedio_bancario')
      table.text('nombre_apellido')
      table.text('cedula_identidad')
      table.text('telefono_local')
      table.text('celular')
      //CUENTAS EN DIVISAS
      table.text('nombre_banco_beneficiario')
      table.text('numero_cuenta_IBAN_beneficiario')
      table.text('SWIFT_ABA_beneficiario')
      table.text('direccion_banco_beneficiario')
      table.text('nombre_banco_intermediario')
      table.text('numero_cuenta_IBAN_intermediario')
      table.text('SWIFT_ABA_intermediario')
      table.text('direccion_banco_intermediario')
      table.text('nombre_beneficiario')
      table.text('direccion_beneficiario')
      //INFORMACION ECONOMICA
      table.text('actividad_economica')
      table.text('actividad_especifica')
      table.text('categoria_especial')
      table.text('relacion_dependencia')
      table.text('nombre_empresa_dependencia')
      table.text('rif_empresa_dependencia')
      table.text('remuneracion_empresa_dependencia')
      table.text('fecha_ingreso_empresa_dependencia')
      table.text('cargo_ocupa_empresa_dependencia')
      table.text('direccion_empresa_dependencia')
      table.text('telefono_empresa_dependencia')
      table.text('ramo_negocio_empresa_dependencia')
      table.text('negocio_propio')
      table.text('nombre_empresa_propio')
      table.text('rif_empresa_propio')
      table.text('ingresos_mensuales_propio')
      table.text('fecha_conatitucion_empresa_propio')
      table.text('datos_registro_propio')
      table.text('direccion_fiscal_empresa_propio')
      table.text('telefono_empresa_propio')
      table.text('ramo_negocio_empresa_propio')
      table.text('provedor_nombre_razon_1_propio')
      table.text('provedor_ubicacion_1_propio')
      table.text('provedor_nombre_razon_2_propio')
      table.text('provedor_ubicacion_2_propio')
      table.text('provedor_nombre_razon_3_propio')
      table.text('provedor_ubicacion_3_propio')
      table.text('cliente_nombre_razon_1_propio')
      table.text('cliente_ubicacion_1_propio')
      table.text('cliente_nombre_razon_2_propio')
      table.text('cliente_ubicacion_2_propio')
      table.text('cliente_nombre_razon_3_propio')
      table.text('cliente_ubicacion_3_propio')
      table.text('otras_fuentes_ingreso')
      table.text('actividad_generadora_ingresos_otros')
      table.text('ingrsos_mensuales_totales_otros')
      table.text('egresos_totales_mensuales_otros')
      table.text('total_activos_otros')
      table.text('total_pasivos_otros')
      table.text('otras_inversiones_otros')
      table.text('total_patrimonio_otros')
      //INFORMACION PRODUCTO BURSATIL
      table.text('nombre_producto')
      table.text('numero_producto')
      table.text('moneda_producto')
      table.text('monto_promedio_mensual')
      table.text('numero_promedio_transaccoines_debito')
      table.text('numero_promedio_transaccoines_credito')
      table.text('enviar_recibir_fondos_exterior_pais_origen')
      table.text('enviar_recibir_fondos_exterior_pais_destino')
      table.text('enviar_recibir_fondos_exterior_uso_moneda_virtual')
      table.text('nombre_producto_otros_posee_1')
      table.text('numero_producto_otros_posee_1')
      table.text('moneda_producto_otros_posee_1')
      table.text('nombre_producto_otros_posee_2')
      table.text('numero_producto_otros_posee_2')
      table.text('moneda_producto_otros_posee_2')
      table.text('nombre_producto_otros_posee_3')
      table.text('numero_producto_otros_posee_3')
      table.text('moneda_producto_otros_posee_3')
      table.text('motivo_solicita_servicios')
      table.text('origen_fondos')
      table.text('destino_fondos')
      //PERFIL
      table.text('experiencia_inversiones')
      table.text('tipo_inversion')
      table.text('tiempo_inversion')
      table.text('anos_experiencia')
      table.text('nivel_riesgo_asumir')
      table.text('tipos_instrumentos_financieros_experiencia')
      //ARCHIVOS
      table.text('img_cedula_pasaporte',256)
      table.text('img_rif',256)
      table.text('img_recibo',256)
      //ESTATUS
      table.boolean('estatus_legal').defaultTo(false)
      table.boolean('estatus_CVV').defaultTo(false)
      table.text('numero_cuenta_cvv')
      //HORAS
      table.timestamp('aprobadoLegal', { precision: 6 })
      table.timestamps()
    })
  }

  down () {
    this.drop('cliente_naturals')
  }
}

module.exports = ClienteNaturalSchema
