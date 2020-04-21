'use strict'


const ClienteNatural = use('App/Models/ClienteNatural')
const ClienteJuridico = use('App/Models/ClienteJuridico')
const SolicitudRescateUi = use('App/Models/SolicitudRescateUi')
const Event = use('Event')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with rescateuis
 */
class RescateUiController {
  /**
   * Show a list of all rescateuis.
   * GET rescateuis
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({params:{tipoCliente}, request, response, view }) {

    if (!(tipoCliente) || tipoCliente === '!natural'){
      let clientes = await ClienteNatural
        .query()
        .where('estatus_legal', true)
        .where('estatus_CVV', true)
        .has('solicitudesRescate')
        .with('solicitudesRescate', (builder)  =>{
          builder
            .where('estatus_conciliacion', true)
            .orderBy('created_at', 'asc')
            .limit(1)
        })
        .fetch()

      clientes = clientes.toJSON()


      return view.render('rescate.natural.index', {clientes})

    } else if (tipoCliente === '!juridico'){

      let clientes = await ClienteJuridico
        .query()
        .where('estatus_legal', true)
        .where('estatus_CVV', true)
        .has('solicitudesRescate')
        .with('solicitudesRescate', (builder)  =>{
          builder
            .where('estatus_conciliacion', true)
            .orderBy('created_at', 'asc')
            .limit(1)
        })
        .fetch()

      clientes = clientes.toJSON()

      return view.render('rescate.juridico.index', {clientes})
    }

  }

  /**
   * Render a form to be used for creating a new rescateui.
   * GET rescateuis/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new rescateui.
   * POST rescateuis
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single rescateui.
   * GET rescateuis/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params:{id, tipoCliente}, request, response, view }) {

    if (tipoCliente === '!natural'){
      let cliente = await ClienteNatural.find(id)
      await cliente.loadMany({
        solicitudesRescate: (builder) => builder .with('pagoRescate').orderBy('created_at', 'asc').limit(1)
      })

      cliente = cliente.toJSON()

      return view.render('rescate.natural.show', {cliente})

    } else if (tipoCliente === '!juridico'){
      let cliente = await ClienteJuridico.find(id)
      await cliente.loadMany({
        solicitudesRescate: (builder) => builder .with('pagoRescate').orderBy('created_at', 'asc').limit(1)
      })

      cliente = cliente.toJSON()

      return view.render('rescate.juridico.show', {cliente})
    }

  }

  /**
   * Render a form to update an existing rescateui.
   * GET rescateuis/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update rescateui details.
   * PUT or PATCH rescateuis/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({  params: {id, tipoCliente}, request, response }) {

    if (tipoCliente === '!natural'){

      const {clienteId} = request.post()

      let solicitudRescate = await SolicitudRescateUi.find(id)
      let cliente = await ClienteNatural.find(clienteId)

      solicitudRescate.unidades_rescatadas = true

      await solicitudRescate.save()

      await solicitudRescate.load('pagoRescate')

      const pagoRescate = solicitudRescate.getRelated('pagoRescate')


      const datos = {
        cliente,
        solicitudRescate,
        pagoRescate
      }

      Event.fire('rescateUnidades::clienteNatural',datos)

      return response.redirect('/tesoreria!natural/rescate',200)

    } else if (tipoCliente === '!juridico'){

      const {clienteId} = request.post()

      let solicitudRescate = await SolicitudRescateUi.find(id)
      let cliente = await ClienteJuridico.find(clienteId)

      solicitudRescate.unidades_rescatadas = true

      await solicitudRescate.save()

      await solicitudRescate.load('pagoRescate')

      const pagoRescate = solicitudRescate.getRelated('pagoRescate')

      const datos = {
        cliente,
        solicitudRescate,
        pagoRescate
      }

      Event.fire('rescateUnidades::clienteJuridico',datos)

      return response.redirect('/tesoreria!juridico/rescate',200)
    }

  }

  /**
   * Delete a rescateui with id.
   * DELETE rescateuis/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = RescateUiController
