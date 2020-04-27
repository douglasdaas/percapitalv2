'use strict'

const ClienteNatural = use('App/Models/ClienteNatural')
const ClienteJuridico = use('App/Models/ClienteJuridico')
const SolicitudSuscripcionUi = use('App/Models/SolicitudSuscripcionUi')
const Event = use('Event')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tesorerias
 */
class TesoreriaController {
  /**
   * Show a list of all tesorerias.
   * GET tesorerias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({params: {tipoCliente}, request, response, view }) {

    if (!(tipoCliente) || tipoCliente === '!natural'){
      let clientes = await ClienteNatural
        .query()
        .where('estatus_legal', true)
        .where('estatus_CVV', true)
        .whereHas('solicitudesSuscripcion', (builder) =>{
          builder
            .where('estatus_conciliacion', true)
            .orderBy('created_at', 'asc')
            .limit(1)
        })
        .with('solicitudesSuscripcion', (builder)  =>{
          builder
            .where('estatus_conciliacion', true)
            .orderBy('created_at', 'asc')
            .limit(1)
        })
        .fetch()

      clientes = clientes.toJSON()

      console.log(clientes)

      return view.render('tesoreria.natural.index', {clientes})

    } else if (tipoCliente === '!juridico'){

      let clientes = await ClienteJuridico
        .query()
        .where('estatus_legal', true)
        .where('estatus_CVV', true)
        .whereHas('solicitudesSuscripcion', (builder) =>{
          builder
            .where('estatus_conciliacion', true)
            .orderBy('created_at', 'asc')
            .limit(1)
        })
        .with('solicitudesSuscripcion', (builder)  =>{
          builder
            .where('estatus_conciliacion', true)
            .orderBy('created_at', 'asc')
            .limit(1)
        })
        .fetch()

      clientes = clientes.toJSON()
      console.log(clientes)

      return view.render('tesoreria.juridico.index', {clientes})
    }


  }

  /**
   * Render a form to be used for creating a new tesoreria.
   * GET tesorerias/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new tesoreria.
   * POST tesorerias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single tesoreria.
   * GET tesorerias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params: {id,tipoCliente}, request, response, view }) {

    if (tipoCliente === '!natural'){
      let cliente = await ClienteNatural.find(id)
      await cliente.loadMany({
        solicitudesSuscripcion: (builder) => builder .with('pagos').orderBy('created_at', 'asc').limit(1)
      })

      cliente = cliente.toJSON()

      return view.render('tesoreria.natural.show', {cliente})

    } else if (tipoCliente === '!juridico'){
      let cliente = await ClienteJuridico.find(id)
      await cliente.loadMany({
        solicitudesSuscripcion: (builder) => builder .with('pagos').orderBy('created_at', 'asc').limit(1)
      })

      cliente = cliente.toJSON()

      return view.render('tesoreria.juridico.show', {cliente})
    }

  }

  /**
   * Render a form to update an existing tesoreria.
   * GET tesorerias/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update tesoreria details.
   * PUT or PATCH tesorerias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params: {id, tipoCliente}, request, response }) {

    if (tipoCliente === '!natural'){

      const {clienteId} = request.post()

      let solicitud = await SolicitudSuscripcionUi.find(id)
      let cliente = await ClienteNatural.find(clienteId)

      solicitud.unidades_asignadas = true

      await solicitud.save()

      const datos = {
        cliente,
        solicitud
      }

      Event.fire('asignacionUnidades::clienteNatural',datos)

      await cliente.load('usuario')

      const usuario = cliente.getRelated('usuario')
      console.log('usuario',usuario)

      if (usuario === null ) {
        return response.redirect(`/usuario!natural/crearautomatico/${clienteId}` )
      }

      return response.redirect('/tesoreria!natural',200)

    } else if (tipoCliente === '!juridico'){

      const {clienteId} = request.post()

      let solicitud = await SolicitudSuscripcionUi.find(id)
      let cliente = await ClienteJuridico.find(clienteId)

      solicitud.unidades_asignadas = true

      await solicitud.save()

      const datos = {
        cliente,
        solicitud
      }

      Event.fire('asignacionUnidades::clienteJuridico',datos)

      await cliente.load('usuario')

      const usuario = cliente.getRelated('usuario')
      console.log('usuario',usuario)
      console.log(`/usuario!juridico/crearautomatico/${clienteId}`)

      if (usuario === null ) {
        return response.redirect(`/usuario!juridico/crearautomatico/${clienteId}` )
      }

      return response.redirect('/tesoreria!juridico',200)
    }

  }

  /**
   * Delete a tesoreria with id.
   * DELETE tesorerias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = TesoreriaController
