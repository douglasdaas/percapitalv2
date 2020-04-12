'use strict'

const SolicitudSuscripcionUi = use('App/Models/SolicitudSuscripcionUi')
const Helpers = use('Helpers')
const PagoUi = use('App/Models/PagoUi')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pagos
 */
class PagoController {
  /**
   * Show a list of all pagos.
   * GET pagos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new pago.
   * GET pagos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ params: {id},request, response, view }) {
    let solicitud = await SolicitudSuscripcionUi.find(id)
    solicitud = solicitud.toJSON()
    return view.render('cliente.pago', {solicitud})
  }

  /**
   * Create/save a new pago.
   * POST pagos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ params:{id}, request, response }) {
    const solicitud = await SolicitudSuscripcionUi.find(id)
    let informacionPago = request.post()
    informacionPago.monto = solicitud.total

    const archivoComprobante = request.file('img_comprobante_recibo', {
      types: ['image'],
      size: '5mb'
    })

    informacionPago.combrobate_pago = `comprobante-${new Date().getTime()}.${archivoComprobante.subtype}`

    await archivoComprobante.move(Helpers.appRoot('archivos/comprobantes-pago'), {
      name: informacionPago.combrobate_pago,
      overwrite: true
    })

    if (!archivoComprobante.moved()) {
      return archivoComprobante.error()
    }


    const pago = await solicitud
      .pagos()
      .create(informacionPago)

    response.redirect('http://per-capital.com/',200)
  }

  /**
   * Display a single pago.
   * GET pagos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing pago.
   * GET pagos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update pago details.
   * PUT or PATCH pagos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a pago with id.
   * DELETE pagos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }

  async download ({ params: {id}, response}) {
    const file = await PagoUi.find(id)
    console.log(file.ruta)
    response.download(Helpers.appRoot(`archivos/comprobantes-pago/${file.combrobate_pago}`))
  }
}

module.exports = PagoController
