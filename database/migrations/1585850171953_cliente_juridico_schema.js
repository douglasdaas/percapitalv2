'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClienteJuridicoSchema extends Schema {
  up () {
    this.create('cliente_juridicos', (table) => {
      table.string('registro_informacion_fiscal',18).notNullable().index().unique()
      table.text('razon_social')
      table.text('nombre_comercial')
      table.text('actividad_economica')
      table.text('actividad_economica_especifica')
      table.text('actividad_economica_categoria_especial')
      table.text('nombre_registro_inicial')
      table.text('numero_registro_inicial')
      table.text('tomo_registro_inicial')
      table.text('folio_registro_inicial')
      table.text('fecha_registro_inicial')
      table.text('capital_social_inicial')
      table.text('nombre_registro_modificicaion')
      table.text('numero_registro_modificicaion')
      table.text('tomo_registro_modificicaion')
      table.text('folio_registro_modificicaion')
      table.text('fecha_registro_modificicaion')
      table.text('capital_actual_modificicaion')
      table.text('numero_gaceta_oficial')
      table.text('fecha_gaceta')
      table.text('autoridad_ente_adscripcion')
      table.text('codigo_ONT')
      table.text('telefono')
      table.text('sitio_web')
      table.string('correo_electronico',256).notNullable().index('correos_electronicos')
      table.text('direccion')
      table.text('ciudad')
      table.text('estado')
      table.text('pais')
      //INFORMACION ECONOMICA FINANCIERA
      table.text('nombre_accionista_1')
      table.text('documento_identidad_accionista_1')
      table.text('porcentaje_accionario_accionista_1')
      table.text('cargo_accionista_1')
      table.text('es_pep_accionista_1')
      table.text('relacionado_pep_accionista_1')
      table.text('nombre_accionista_2')
      table.text('documento_identidad_accionista_2')
      table.text('porcentaje_accionario_accionista_2')
      table.text('cargo_accionista_2')
      table.text('es_pep_accionista_2')
      table.text('relacionado_pep_accionista_2')
      table.text('nombre_accionista_3')
      table.text('documento_identidad_accionista_3')
      table.text('porcentaje_accionario_accionista_3')
      table.text('cargo_accionista_3')
      table.text('es_pep_accionista_3')
      table.text('relacionado_pep_accionista_3')
      table.text('nombre_representante_autorizado_1')
      table.text('documento_identidad_representante_autorizado_1')
      table.text('porcentaje_accionario_representante_autorizado_1')
      table.text('cargo_accionista_representante_autorizado_1')
      table.text('condicion_representante_autorizado_1')
      table.text('es_pep_accionista_representante_autorizado_1')
      table.text('relacionado_pep_representante_autorizado_1')
      table.text('nombre_representante_autorizado_2')
      table.text('documento_identidad_representante_autorizado_2')
      table.text('porcentaje_accionario_representante_autorizado_2')
      table.text('cargo_accionista_representante_autorizado_2')
      table.text('condicion_representante_autorizado_2')
      table.text('es_pep_accionista_representante_autorizado_2')
      table.text('relacionado_pep_representante_autorizado_2')
      table.text('nombre_representante_autorizado_3')
      table.text('documento_identidad_representante_autorizado_3')
      table.text('porcentaje_accionario_representante_autorizado_3')
      table.text('cargo_accionista_representante_autorizado_3')
      table.text('condicion_representante_autorizado_3')
      table.text('es_pep_accionista_representante_autorizado_3')
      table.text('relacionado_pep_representante_autorizado_3')
      //PEP
      table.text('nombre_institucion_ente_adscripcion_pep_1')
      table.text('cargo_pep_1')
      table.text('pais_pep_1')
      table.text('identificacion_pep_caso_relacionado_1')
      table.text('nombre_institucion_ente_adscripcion_pep_2')
      table.text('cargo_pep_2')
      table.text('pais_pep_2')
      table.text('identificacion_pep_caso_relacionado_2')
      table.text('nombre_institucion_ente_adscripcion_pep_3')
      table.text('cargo_pep_3')
      table.text('pais_pep_3')
      table.text('identificacion_pep_caso_relacionado_3')
      //OFICINAS
      table.text('numero_subsidiarias_oficinas')
      table.text('pais_mayor_presencia')
      table.text('numero_empleados')
      table.text('ventas_mensuales')
      table.text('ingreso_mensuales')
      table.text('egresos_mensuales')
      table.text('ano_ultima_declaracion_isrl')
      table.text('monto_ultima_declaracion_isrl')
      table.text('provedor_nombre_razon_1')
      table.text('provedor_ubicacion_1')
      table.text('provedor_nombre_razon_2')
      table.text('provedor_ubicacion_2')
      table.text('provedor_nombre_razon_3')
      table.text('provedor_ubicacion_3')
      table.text('cliente_nombre_razon_1')
      table.text('cliente_ubicacion_1')
      table.text('cliente_nombre_razon_2')
      table.text('cliente_ubicacion_2')
      table.text('cliente_nombre_razon_3')
      table.text('cliente_ubicacion_3')
      table.text('nombre_razon_empresa_relacionada_1')
      table.text('actividad_economica_empresa_relacionada_1')
      table.text('registro_informacion_fiscal_empresa_relacionada_1')
      table.text('nombre_razon_empresa_relacionada_2')
      table.text('actividad_economica_empresa_relacionada_2')
      table.text('registro_informacion_fiscal_empresa_relacionada_2')
      table.text('nombre_razon_empresa_relacionada_3')
      table.text('actividad_economica_empresa_relacionada_3')
      table.text('registro_informacion_fiscal_empresa_relacionada_3')
      //REFERENCIAS BANCARIAS
      table.text('institucion_bancaria_1')
      table.text('nombre_producto_1')
      table.text('numero_producto_1')
      table.text('cifras_promedio_1')
      table.text('institucion_bancaria_2')
      table.text('nombre_producto_2')
      table.text('numero_producto_2')
      table.text('cifras_promedio_2')
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
      //INFORMACION PRODUCTO O SERVICIO
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
      table.text('documento_constitutivo_empresas',256)
      table.text('img_rif',256)
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
    this.drop('cliente_juridicos')
  }
}

module.exports = ClienteJuridicoSchema
