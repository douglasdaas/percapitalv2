'use strict'

const ClienteNatural = use('App/Models/ClienteNatural')
const ClienteJuridico = use('App/Models/ClienteJuridico')
const Event = use('Event')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with operaciones
 */
class OperacionesController {
  /**
   * Show a list of all operaciones.
   * GET operaciones
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({params: {tipoCliente}, request, response, view }) {

    if (!(tipoCliente) ||tipoCliente === '!natural'){
      let clientes = await ClienteNatural
        .query()
        .where('estatus_legal', true)
        .fetch()

      clientes = clientes.toJSON()

      return view.render('operaciones.natural.index', {clientes})

    } else if (tipoCliente === '!juridico'){
      let clientes = await ClienteJuridico
        .query()
        .where('estatus_legal', true)
        .fetch()

      clientes = clientes.toJSON()

      return view.render('operaciones.juridico.index', {clientes})
    }

  }

  /**
   * Render a form to be used for creating a new operacione.
   * GET operaciones/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new operacione.
   * POST operaciones
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single operacione.
   * GET operaciones/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params: {id, tipoCliente}, request, response, view }) {

    if (tipoCliente === '!natural'){
      let cliente = await ClienteNatural.find(id)

      cliente = cliente.toJSON()

      return view.render('operaciones.natural.show', {cliente})

    } else if (tipoCliente === '!juridico'){
      let cliente = await ClienteJuridico.find(id)

      cliente = cliente.toJSON()

      return view.render('operaciones.juridico.show', {cliente})
    }

  }

  /**
   * Render a form to update an existing operacione.
   * GET operaciones/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update operacione details.
   * PUT or PATCH operaciones/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params: {id,tipoCliente}, request, response }) {

    if (tipoCliente === '!natural'){
      let cliente = await ClienteNatural.find(id)

      cliente.estatus_CVV = true

      await cliente.save()

      Event.fire('creacionCuentaCVV::clienteNatural', cliente)

      return response.redirect('/operaciones!natural',200)

    } else if (tipoCliente === '!juridico'){

      var cliente = await ClienteJuridico.find(id)
      cliente.estatus_CVV = true

      await cliente.save()

      Event.fire('creacionCuentaCVV::clienteJuridico', cliente)

      return response.redirect('/operaciones!juridico',200)
    }
  }

  /**
   * Delete a operacione with id.
   * DELETE operaciones/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = OperacionesController
