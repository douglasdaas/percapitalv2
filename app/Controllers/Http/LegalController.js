'use strict'

const Mail = use('Mail')
const ClienteNatural = use('App/Models/ClienteNatural')
const ClienteJuridico = use('App/Models/ClienteJuridico')
const Event = use('Event')


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
  async index ({ params:{tipoCliente}, request, response, view }) {
    if (!(tipoCliente) || tipoCliente === '!natural'){
      let clientes = await ClienteNatural.all()

      clientes = clientes.toJSON()

      return view.render('legal.natural.index', {clientes})

    } else if (tipoCliente === '!juridico'){
      let clientes = await ClienteJuridico.all()

      clientes = clientes.toJSON()

      return view.render('legal.juridico.index', {clientes})
    }

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
  async show ({ params: { tipoCliente, id}, request, response, view }) {

    if (tipoCliente === '!natural'){
      let cliente = await ClienteNatural.find(id)

      cliente = cliente.toJSON()

      return view.render('legal.natural.show', {cliente})

    } else if (tipoCliente === '!juridico'){
      let cliente = await ClienteJuridico.find(id)

      cliente = cliente.toJSON()

      return view.render('legal.juridico.show', {cliente})
    }

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
  async update ({ params: {id, tipoCliente}, request, response }) {

    if (tipoCliente === '!natural'){
      let cliente = await ClienteNatural.find(id)
      cliente.estatus_legal = true
      cliente.aprobadoLegal = Date.now()

      await cliente.save()

      Event.fire('aprobadoLegal::clienteNatural', cliente)

      return response.redirect('/legal!natural', 200)

    } else if (tipoCliente === '!juridico'){
      var cliente = await ClienteJuridico.find(id)
      cliente.estatus_legal = true
      cliente.aprobadoLegal = Date.now()

      await cliente.save()

      Event.fire('aprobadoLegal::clienteJuridico', cliente)

      return response.redirect('/legal!juridico', 200)

    }

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
