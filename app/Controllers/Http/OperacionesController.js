'use strict'

const Mail = use('Mail')
const ClienteNatural = use('App/Models/ClienteNatural')
const SolicitudSuscripcionUi = use('App/Models/SolicitudSuscripcionUi')

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
  async index ({params: {option}, request, response, view }) {

    if (option === '!pagos'){

      let clientes = await ClienteNatural
        .query()
        .where('estatus_legal', true)
        .where('estatus_CVV', true)
        .has('solicitudes')
        .with('solicitudes')
        .fetch()

      clientes = clientes.toJSON()
      console.log(clientes)
      return view.render('operaciones.index!pagos', {clientes} )

    }

    let clientes = await ClienteNatural
    .query()
    .where('estatus_legal', true)
    .fetch()

    clientes = clientes.toJSON()
    console.log(clientes)
    return view.render('operaciones.index', {clientes})

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
  async show ({ params: {id, option}, request, response, view }) {

    let cliente = await ClienteNatural
      .query()
      .where('id', id)
      .with('solicitudes.pagos')
      .fetch()

    cliente = cliente.toJSON()
    cliente = cliente[0]
    console.log(JSON.stringify(cliente,2,2))

    if (option === '!pagos'){

      return view.render('operaciones.show!pagos', {cliente})

    }

    return view.render('operaciones.show', {cliente})
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
  async update ({ params: {id}, request, response }) {

    let { solicitud, cvv } = request.post()

    if (solicitud !== undefined) {
      console.log(solicitud)

       solicitud = await SolicitudSuscripcionUi.find(solicitud)

      solicitud.estatus_conciliacion = true

      await solicitud.save()

      return response.redirect('/operaciones!pagos',200)
    }

    if (cvv === '1') {

      let cliente = await ClienteNatural.find(id)

      cliente.estatus_CVV = true

      await cliente.save()

       Mail.send('emails.solicitudui', cliente.toJSON(), (message) => {
        message
          .to(cliente.correo_electronico, `${cliente.nombre} ${cliente.apellido}`)
          .from('testapp@per-capital.com', 'PerCapital')
          .subject('Solicitud de unidades de Inversión')
      })

      return response.redirect('/operaciones',200)
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
