'use strict'

const Personal = use('App/Models/Personal')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Legal {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   * @param {Function} next
   */
  async handle ({ auth, request , response, view}, next) {
    if (auth.user){
      const personal = await Personal.find(auth.user.personal_id)
      if (personal.legal === 0) {
        return response.redirect('otras-paginas/no-autorizado')
      }
      await next()
    } else {
      return response.redirect('personal/login')
    }
  }
}

module.exports = Legal
