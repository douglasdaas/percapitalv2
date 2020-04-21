'use strict'

const SolicitudRescateUi = use('App/Models/SolicitudRescateUi')
const Helpers = use('Helpers')
const PagoRescateUi = use('App/Models/PagoRescateUi')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pagorescateuis
 */
class PagoRescateUiController {
  /**
   * Show a list of all pagorescateuis.
   * GET pagorescateuis
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

  }

  /**
   * Render a form to be used for creating a new pagorescateui.
   * GET pagorescateuis/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({params:{id}, request, response, view }) {
    let solicitudRescate = await SolicitudRescateUi.find(id)
    solicitudRescate = solicitudRescate.toJSON()
    let precio = 5000
    return view.render('pago-rescate.create', {solicitudRescate, precio})
  }

  /**
   * Create/save a new pagorescateui.
   * POST pagorescateuis
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({params:{id}, request, response }) {
    let solicitudRescate = await SolicitudRescateUi.find(id)
    let informacionPago = request.post()
    informacionPago.monto = solicitudRescate.total


    const archivoComprobante = request.file('img_comprobante_recibo', {
      types: ['image'],
      size: '5mb'
    })

    informacionPago.comprobate_pago = `comprobante-${new Date().getTime()}.${archivoComprobante.subtype}`

    await archivoComprobante.move(Helpers.appRoot('archivos/comprobantes-pago/rescate'), {
      name: informacionPago.comprobate_pago,
      overwrite: true
    })

    if (!archivoComprobante.moved()) {
      return archivoComprobante.error()
    }


    const pago = await solicitudRescate
      .pagoRescate()
      .create(informacionPago)

    solicitudRescate.estatus_conciliacion = true

    await solicitudRescate.save()

    console.log(solicitudRescate)

    if (solicitudRescate.cliente_natural_id){

      return  response.redirect('/operaciones!natural/solicitud-rescate/',200)

      // return response.route('SolicitudRescateUiController.update' , { id})

    } else if (solicitudRescate.cliente_juridico_id) {

      return  response.redirect('/operaciones!juridico/solicitud-rescate/',200)

        // return response.route('SolicitudRescateUiController.update',{ id, tipoCLiente: '!juridico' })

    }

  }

  /**
   * Display a single pagorescateui.
   * GET pagorescateuis/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing pagorescateui.
   * GET pagorescateuis/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update pagorescateui details.
   * PUT or PATCH pagorescateuis/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a pagorescateui with id.
   * DELETE pagorescateuis/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }

  async download ({ params: {id}, response}) {
    const file = await PagoRescateUi.find(id)
    console.log(file.comprobate_pago)
    response.download(Helpers.appRoot(`archivos/comprobantes-pago/rescate/${file.comprobate_pago}`))
  }
}

module.exports = PagoRescateUiController
