'use strict'

const Mail = use('Mail')
const Encryption = use('Encryption')
const ClienteNatural = use('App/Models/ClienteNatural')
const SolicitudSuscripcionUi = use('App/Models/SolicitudSuscripcionUi')
const Helpers = use('Helpers')
const paises = require('../../../archivos/listas/paises')
const profesiones = require('../../../archivos/listas/profesiones')
const actividadesEconomicas = require('../../../archivos/listas/actividadesEconomicas')
const categoriasEspeciales = require('../../../archivos/listas/categoriasEspeciales')
const otrosIngresos = require('../../../archivos/listas/otrosIngresos')
const tiposInstrumentosFinancieros = require('../../../archivos/listas/tiposInstrumentosFinancieros')
const monedas = require('../../../archivos/listas/monedas')
const monedasVirtuales = require('../../../archivos/listas/monedasVirtuales')
const origenFondos = require('../../../archivos/listas/origenFondos')
const destinoFondos = require('../../../archivos/listas/destinoFondos')



/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with clientenaturals
 */
class ClienteNaturalController {
  /**
   * Show a list of all clientenaturals.
   * GET clientenaturals
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    let clientes = await ClienteNatural.all()
    clientes = clientes.toJSON()
    return view.render('cliente.natural.index', {clientes})
  }

  /**
   * Render a form to be used for creating a new clientenatural.
   * GET clientenaturals/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
   let data ={}
    data.paises = paises
    data.profesiones = profesiones
    data.actividadesEconomicas = actividadesEconomicas
    data.categoriasEspeciales = categoriasEspeciales
    data.otrosIngresos = otrosIngresos
    data.tiposInstrumentosFinancieros = tiposInstrumentosFinancieros
    data.monedas = monedas
    data.monedasVirtuales = monedasVirtuales
    data.origenFondos = origenFondos
    data.destinoFondos = destinoFondos
    // console.log(data)
    return view.render('cliente.natural.create', {data})
  }

  /**
   * Create/save a new clientenatural.
   * POST clientenaturals
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const informacionCliente = request.post()
    const documento_identificacion = request.only(['documento_identificacion'])

    const archivoIdentidad = request.file('img_cedula_pasaporte', {
      types: ['image'],
      size: '5mb'
    })
    const archivoRif = request.file('img_rif', {
      types: ['image'],
      size: '5mb'
    })
    const archivoRecibo = request.file('img_recibo', {
      types: ['image'],
      size: '5mb'
    })

    informacionCliente.img_cedula_pasaporte = `identidad-${new Date().getTime()}.${archivoIdentidad.subtype}`
    informacionCliente.img_rif = `rif-${new Date().getTime()}.${archivoRif.subtype}`
    informacionCliente.img_recibo = `recibo-${new Date().getTime()}.${archivoRecibo.subtype}`

    await archivoIdentidad.move(Helpers.appRoot(`archivos/clientes/natural/${documento_identificacion}`), {
      name: informacionCliente.img_cedula_pasaporte,
      overwrite: true
    })

    if (!archivoIdentidad.moved()) {
      return archivoIdentidad.error()
    }
    await archivoRif.move(Helpers.appRoot(`archivos/clientes/natural/${documento_identificacion}`), {
      name: informacionCliente.img_rif,
      overwrite: true
    })

    if (!archivoRif.moved()) {
      return archivoRif.error()
    }

    await archivoRecibo.move(Helpers.appRoot(`archivos/clientes/natural/${documento_identificacion}`), {
      name: informacionCliente.img_recibo,
      overwrite: true
    })

    if (!archivoRecibo.moved()) {
      return archivoRecibo.error()
    }

    const clienteNatural = await ClienteNatural.create(informacionCliente)

    response.json(clienteNatural)
  }

  /**
   * Display a single clientenatural.
   * GET clientenaturals/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing clientenatural.
   * GET clientenaturals/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update clientenatural details.
   * PUT or PATCH clientenaturals/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a clientenatural with id.
   * DELETE clientenaturals/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }

  /**
   * Display a single clientenatural.
   * GET clientenaturals/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async signup ({ params, request, response, view }) {
    return view.render('cliente.natural.signup')
  }

  /**
   * Create/save a new clientenatural.
   * POST clientenaturals
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async registro ({ request, response }) {

    let clienteInformacion = request.post()

    Mail.send('emails.informacion-de-registro', clienteInformacion, (message) => {
      message
        .to(clienteInformacion.correo_electronico, `${clienteInformacion.nombre} ${clienteInformacion.apellido}`)
        .from('testapp@per-capital.com', 'PerCapital')
        .subject('Informacion de Registro')
    })

    return clienteInformacion
  }

  /**
   * Display a single clientenatural.
   * GET clientenaturals/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  /**
   * Display a single clientenatural.
   * GET clientenaturals/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async pago ({ params:{id}, request, response, view }) {

    let solicitud = await SolicitudSuscripcionUi.find(id)
    // solicitud.total = `${solicitud.total.toLocaleString('de-DE')} Bs`
    solicitud = solicitud.toJSON()
    return view.render('cliente.natural.pago', {solicitud})
  }

  async createPago ({ params:{id}, request, response, view }) {

    const solicitud = await SolicitudSuscripcionUi.find(id)
    let informacionPago = request.post()
    informacionPago.monto = solicitud.total

    const pago = await solicitud
      .pagos()
      .create(informacionPago)

    response.redirect('http://per-capital.com/',200)
  }

}

module.exports = ClienteNaturalController
