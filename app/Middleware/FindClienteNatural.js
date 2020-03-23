'use strict'

const ClienteNatural = use('App/Models/ClienteNatural')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class FindClienteNatural {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, params : {id} , respose}, next) {

    let cliente = await ClienteNatural.find(id)

    cliente = cliente.toJSON()

    if (!cliente) {
      return response.status(404).json({
        message: 'Cliente no encotrado',
        id
      })
    }

    await next()
  }
}

module.exports = FindClienteNatural
