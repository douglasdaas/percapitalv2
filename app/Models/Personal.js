'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Personal extends Model {
  static get primaryKey () {
    return 'documento_identificacion'
  }

  static castDates (field, value) {
    if (field === 'updated_at') {
      return `hace ${value.locale('es').fromNow(true)}`
    }
    if (field === 'created_at') {
      return value.format('DD/MM/YYYY')
    }
    return super.formatDates(field, value)
  }

  usuario () {
    return this.hasOne('App/Models/Usuario')
  }

}

module.exports = Personal
