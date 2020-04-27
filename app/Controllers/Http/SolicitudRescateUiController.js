'use strict'


const ClienteNatural = use('App/Models/ClienteNatural')
const ClienteJuridico = use('App/Models/ClienteJuridico')
const SolicitudRescateUi = use('App/Models/SolicitudRescateUi')
const Event = use('Event')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with solicitudrescateuis
 */
class SolicitudRescateUiController {
  /**
   * Show a list of all solicitudrescateuis.
   * GET solicitudrescateuis
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
        .with('solicitudesRescate', (builder) => {
          builder
            .orderBy('created_at', 'asc')
            .limit(1)
        })
        .fetch()

      clientes = clientes.toJSON()

      console.log(clientes)

      return view.render('solicitud-rescate.natural.index', {clientes})

    } else if (tipoCliente === '!juridico'){
      let clientes = await ClienteJuridico
        .query()
        .where('estatus_legal', true)
        .where('estatus_CVV', true)
        .has('solicitudesRescate')
        .with('solicitudesRescate', (builder) => {
          builder
            .orderBy('created_at', 'asc')
            .limit(1)
        })
        .fetch()

      clientes = clientes.toJSON()

      return view.render('solicitud-rescate.juridico.index', {clientes})
    }

  }

  /**
   * Render a form to be used for creating a new solicitudrescateui.
   * GET solicitudrescateuis/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ params:{ id, tipoCliente },request, response, view }) {
    if ( tipoCliente === '!natural'){
      const precio = 50000
      return view.render('solicitud-rescate.natural.create',{id,precio})
    } else if (tipoCliente === '!juridico'){
      const precio = 50000
      return view.render('solicitud-rescate.juridico.create',{id,precio})
    }

  }

  /**
   * Create/save a new solicitudrescateui.
   * POST solicitudrescateuis
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ auth, params: {id, tipoCliente}, request, response }) {
    if (tipoCliente === '!natural'){
      const cliente = await ClienteNatural.find(id)
      const precio = 5000
      const informacionSolicitudUI = request.post()
      let { cantidad_unidades_inversion } = request.post()

      informacionSolicitudUI.total = cantidad_unidades_inversion*precio

      const solicitudUI = await cliente
        .solicitudesRescate()
        .create(informacionSolicitudUI)

      let datos = {
        cliente,
        solicitudUI
      }

      // Event.fire('pagoSolicitudSuscripcionUI::clienteNatural', datos)

      if (auth.user) {
        return response.redirect(`/usuario!natural/${auth.user.cliente_natural_id}`)
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
        .solicitudesRescate()
        .create(informacionSolicitudUI)

      let datos = {
        cliente,
        solicitudUI
      }

      // Event.fire('pagoSolicitudSuscripcionUI::clienteJuridico', datos)

      if (auth.user) {
        return response.redirect(`/usuario!juridico/${auth.user.cliente_juridico_id}`)
      } else {
        return response.redirect('http://per-capital.com/',200)
      }

    }


  }

  /**
   * Display a single solicitudrescateui.
   * GET solicitudrescateuis/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params: {id, tipoCliente}, request, response, view }) {
    if (tipoCliente === '!natural'){
      let cliente = await ClienteNatural.find(id)
      await cliente.loadMany({
        solicitudesRescate: (builder) => builder.orderBy('created_at', 'asc').limit(1)
      })


      cliente = cliente.toJSON()

      return view.render('solicitud-rescate.natural.show', {cliente})

    } else if (tipoCliente === '!juridico'){
      let cliente = await ClienteJuridico.find(id)
      await cliente.loadMany({
        solicitudesRescate: (builder) => builder.orderBy('created_at', 'asc').limit(1)
      })

      cliente = cliente.toJSON()


      return view.render('solicitud-rescate.juridico.show', {cliente})
    }
  }

  /**
   * Render a form to update an existing solicitudrescateui.
   * GET solicitudrescateuis/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update solicitudrescateui details.
   * PUT or PATCH solicitudrescateuis/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params:{id, tipoCliente}, request, response }) {
    //TODO Que esta verga funcione (redireccionar a update desde el store de pago rescate)

    // console.log('entra update')
    //
    // if (tipoCliente === '!natural'){
    //   let solicitudRescate = await SolicitudRescateUi.find(id)
    //
    //   solicitudRescate.estatus_conciliacion = true
    //
    //   await solicitudRescate.save()
    //
    //
    //   return response.redirect('/operaciones!natural/solicitud-rescate',200)
    //
    // } else if (tipoCliente === '!juridico'){
    //   let solicitudRescate = await SolicitudRescateUi.find(id)
    //
    //   solicitudRescate.estatus_conciliacion = true
    //
    //   await solicitudRescate.save()
    //
    //
    //   return response.redirect('/operaciones!natural/solicitud-rescate',200)
    // }

  }

  /**
   * Delete a solicitudrescateui with id.
   * DELETE solicitudrescateuis/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = SolicitudRescateUiController
