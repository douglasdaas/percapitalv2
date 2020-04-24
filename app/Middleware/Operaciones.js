'use strict'

const Personal = use('App/Models/Personal')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Operaciones {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   * @param {Function} next
   */
  async handle ({ auth, request , response, view}, next) {

    const personal = await Personal.find(auth.user.personal_id)
    if (personal.operaciones === 0) {
      return response.redirect('otras-paginas/no-autorizado')
    }

    await next()
  }
}

module.exports = Operaciones
