'use strict'

const ClienteNatural = use('App/Models/ClienteNatural')
const ClienteJuridico = use('App/Models/ClienteJuridico')
const SolicitudSuscripcionUi = use('App/Models/SolicitudSuscripcionUi')
const Event = use('Event')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with solicitudsuscripcionuis
 */
class SolicitudSuscripcionUiController {
  /**
   * Show a list of all solicitudsuscripcionuis.
   * GET solicitudsuscripcionuis
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ params:{tipoCliente} ,request, response, view }) {


    if (tipoCliente === '!natural'){
      let clientes = await ClienteNatural
          .query()
          .where('estatus_legal', true)
          .where('estatus_CVV', true)
          .has('solicitudesSuscripcion')
          .with('solicitudesSuscripcion', (builder) => {
            builder
              .orderBy('created_at', 'asc')
              .limit(1)
          })
          .fetch()

      clientes = clientes.toJSON()

      console.log(clientes)

      return view.render('solicitud-suscripcion.natural.index', {clientes})

    } else if (tipoCliente === '!juridico'){
      let clientes = await ClienteJuridico
        .query()
        .where('estatus_legal', true)
        .where('estatus_CVV', true)
        .has('solicitudesSuscripcion')
        .with('solicitudesSuscripcion', (builder) => {
          builder
            .orderBy('created_at', 'asc')
            .limit(1)
        })
        .fetch()

      clientes = clientes.toJSON()

      return view.render('solicitud-suscripcion.juridico.index', {clientes})
    }
  }

  /**
   * Render a form to be used for creating a new solicitudsuscripcionui.
   * GET solicitudsuscripcionuis/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ params:{ id, tipoCliente },request, response, view }) {
    if ( tipoCliente === '!natural'){
      const precio = 50000
      return view.render('solicitud-suscripcion.natural.create',{id,precio})
    } else if (tipoCliente === '!juridico'){
      const precio = 50000
      return view.render('solicitud-suscripcion.juridico.create',{id,precio})
    }

  }

  /**
   * Create/save a new solicitudsuscripcionui.
   * POST solicitudsuscripcionuis
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ params: {id, tipoCliente}, auth, request, response }) {
    if (tipoCliente === '!natural'){
      const cliente = await ClienteNatural.find(id)
      const precio = 5000
      const informacionSolicitudUI = request.post()
      let { cantidad_unidades_inversion } = request.post()

      informacionSolicitudUI.total = cantidad_unidades_inversion*precio

      const solicitudUI = await cliente
        .solicitudesSuscripcion()
        .create(informacionSolicitudUI)

      let datos = {
        cliente,
        solicitudUI
      }

      Event.fire('pagoSolicitudSuscripcionUI::clienteNatural', datos)

      if (auth.user) {
        return response.redirect(`/usuario!natural/${usuario.cliente_natural_id}`)
      } else {
        return response.redirect('http://per-capital.com/',200)
      }

    } else if (tipoCliente === '!juridico') {

      const cliente = await ClienteJuridico.find(id)
      const precio = 5000
      const informacionSolicitudUI = request.post()
      let { cantidad_unidades_inversion } = request.post()

      informacionSolicitudUI.total = cantidad_unidades_inversion*precio

      const solicitudUI = await cliente
        .solicitudesSuscripcion()
        .create(informacionSolicitudUI)

      let datos = {
        cliente,
        solicitudUI
      }

      Event.fire('pagoSolicitudSuscripcionUI::clienteJuridico', datos)

      if (auth.user) {
        return response.redirect(`/usuario!juridico/${usuario.cliente_juridico_id}`)
      } else {
        return response.redirect('http://per-capital.com/',200)
      }
    }


  }

  /**
   * Display a single solicitudsuscripcionui.
   * GET solicitudsuscripcionuis/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({params: {id, tipoCliente}, request, response, view }) {
    if (tipoCliente === '!natural'){
      let cliente = await ClienteNatural.find(id)
      await cliente.loadMany({
        solicitudesSuscripcion: (builder) => builder .with('pagos').orderBy('created_at', 'asc').limit(1)
      })


      cliente = cliente.toJSON()

      return view.render('solicitud-suscripcion.natural.show', {cliente})

    } else if (tipoCliente === '!juridico'){
      let cliente = await ClienteJuridico.find(id)
      await cliente.loadMany({
        solicitudesSuscripcion: (builder) => builder .with('pagos').orderBy('created_at', 'asc').limit(1)
      })

      cliente = cliente.toJSON()

      return view.render('solicitud-suscripcion.juridico.show', {cliente})
    }
  }

  /**
   * Render a form to update an existing solicitudsuscripcionui.
   * GET solicitudsuscripcionuis/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update solicitudsuscripcionui details.
   * PUT or PATCH solicitudsuscripcionuis/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params:{id,tipoCliente }, request, response }) {

    if (tipoCliente === '!natural'){
      let solicitud = await SolicitudSuscripcionUi.find(id)

      solicitud.estatus_conciliacion = true

      await solicitud.save()


      return response.redirect('/operaciones!natural/conciliacion-pagos',200)

    } else if (tipoCliente === '!juridico'){
      let solicitud = await SolicitudSuscripcionUi.find(id)

      solicitud.estatus_conciliacion = true

      await solicitud.save()


      return response.redirect('/operaciones!juridico/conciliacion-pagos',200)
    }
  }

  /**
   * Delete a solicitudsuscripcionui with id.
   * DELETE solicitudsuscripcionuis/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = SolicitudSuscripcionUiController
