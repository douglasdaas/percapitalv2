'use strict'

const Mail = use('Mail')
const ClienteNatural = use('App/Models/ClienteNatural')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with legals
 */
class LegalController {
  /**
   * Show a list of all legals.
   * GET legals
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let clientes = await ClienteNatural.all()

    clientes = clientes.toJSON()

    console.log(clientes)

    return view.render('legal.index', {clientes})
  }

  /**
   * Create/save a new legal.
   * POST legals
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single legal.
   * GET legals/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params: {id}, request, response, view }) {

    let cliente = await ClienteNatural.find(id)

    cliente = cliente.toJSON()

    console.log(cliente)

    return view.render('legal.show', {cliente})

  }

  /**
   * Render a form to update an existing legal.
   * GET legals/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update legal details.
   * PUT or PATCH legals/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params: {id}, request, response }) {
    let cliente = await ClienteNatural.find(id)

    cliente.estatus_legal = true
    cliente.aprobadoLegal = Date.now()

    await cliente.save()

    console.log(cliente)

    Mail.send('emails.aprobacion-legal', cliente.toJSON(), (message) => {
      message
        .to(cliente.correo_electronico, `${cliente.nombre} ${cliente.apellido}`)
        .from('testapp@per-capital.com', 'PerCapital')
        .subject('Aprobacion Legal')
    })

    response.redirect('/legal', 200)
  }

  /**
   * Delete a legal with id.
   * DELETE legals/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = LegalController
