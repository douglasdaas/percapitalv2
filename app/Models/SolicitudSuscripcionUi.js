'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SolicitudSuscripcionUi extends Model {

  pagos () {
    return this.hasOne('App/Models/PagoUi')
  }

  static castDates (field, value) {
    if (field === 'updated_at') {
      return `hace ${value.fromNow(true)}`
    }
    if (field === 'created_at') {
      return value.format('DD/MM/YYYY')
    }
    return super.formatDates(field, value)
  }
}

module.exports = SolicitudSuscripcionUi
