'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


class OtrasPaginaController {
  /**
   * inicioSesion for personal.
   * GET usuarios/login
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async noAutorizado ({ request, response, view }) {
    return view.render('otras-paginas.no-autorizado')
  }
}

module.exports = OtrasPaginaController
