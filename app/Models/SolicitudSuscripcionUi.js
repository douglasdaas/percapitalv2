'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SolicitudSuscripcionUi extends Model {

  pagos () {
    return this.hasOne('App/Models/PagoUi')
  }
}

module.exports = SolicitudSuscripcionUi
