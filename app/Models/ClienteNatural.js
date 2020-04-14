'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ClienteNatural extends Model {
  static get primaryKey () {
    return 'documento_identificacion'
  }
  static get dates () {
    return super.dates.concat(['aprobadoLegal'])
  }

  static castDates (field, value) {
    if (field === 'updated_at') {
      return `hace ${value.locale('es').fromNow(true)}`
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
    return this.hasOne('App/Models/Usuario')
  }

}

module.exports = ClienteNatural
