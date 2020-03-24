'use strict'

const ClienteNatural = use('App/Models/ClienteNatural')
const SolicitudSuscripcionUi = use('App/Models/SolicitudSuscripcionUi')
const Mail = use('Mail')


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
  async index ({ request, response, view }) {
    let clientes = await ClienteNatural
      .query()
      .where('estatus_legal', true)
      .where('estatus_CVV', true)
      .has('solicitudes')
      .with('solicitudes', (builder)  =>{
        builder.where('estatus_conciliacion', true)
    })
      .fetch()

    clientes = clientes.toJSON()

    return view.render('tesoreria.index', {clientes})

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
  async show ({ params: {id}, request, response, view }) {
    let cliente = await ClienteNatural
      .query()
      .where('id', id)
      .with('solicitudes.pagos')
      .fetch()

    cliente = cliente.toJSON()
    cliente = cliente[0]

    return view.render('tesoreria.show', {cliente})
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
  async update ({ params: {id}, request, response }) {
    let cliente = await ClienteNatural.find(id)

    let { solicitud } = request.post()

    if (solicitud !== undefined) {

      solicitud = await SolicitudSuscripcionUi.find(solicitud)

      solicitud.unidades_asignadas = true

      await solicitud.save()

      cliente = cliente.toJSON()
      solicitud = solicitud.toJSON()

      const datos = {
        cliente,
        solicitud
      }

      Mail.send('emails.unidades-asignadas', datos, (message) => {
        message
          .to(cliente.correo_electronico, `${cliente.nombre} ${cliente.apellido}`)
          .from('testapp@per-capital.com', 'PerCapital')
          .subject('Asignacion de Unidades de Inverción')
      })

       response.redirect(`/cliente/crearautomatico/${id}` )
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
