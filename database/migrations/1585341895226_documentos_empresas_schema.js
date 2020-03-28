'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DocumentosEmpresasSchema extends Schema {
  up () {
    this.create('documentos_empresas', (table) => {
      table.increments()
      table.string('nombre')
      table.string('ruta')
      table.timestamps()
    })
  }

  down () {
    this.drop('documentos_empresas')
  }
}

module.exports = DocumentosEmpresasSchema
