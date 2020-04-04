'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ClienteJuridico extends Model {
  static get dates () {
    return super.dates.concat(['aprobadoLegal'])
  }

  static castDates (field, value) {
    if (field === 'updated_at') {
      return `hace ${value.fromNow(true)}`
    }
    if (field === 'created_at') {
      return value.format('DD/MM/YYYY')
    }
    if (field === 'aprobadoLegal') {
      return ` El ${value.format('DD/MM/YYYY')} a las ${value.format('HH:mm:ss')}`
    }
    return super.formatDates(field, value)
  }

  solicitudes () {
    return this.hasMany('App/Models/SolicitudSuscripcionUi')
  }

  usuario () {
    return this.hasOne('App/Models/User')
  }
}

module.exports = ClienteJuridico
