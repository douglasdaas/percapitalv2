'use strict'

const Mail = use('Mail')
const Encryption = use('Encryption')
const ClienteNatural = use('App/Models/ClienteNatural')
const SolicitudSuscripcionUi = use('App/Models/SolicitudSuscripcionUi')
const Helpers = use('Helpers')
const paises = require ('../../../archivos/listas/paises')
const profesiones = require ('../../../archivos/listas/profesiones')
const actividadesEconomicas = require ('../../../archivos/listas/actividadesEconomicas')
const categoriasEspeciales = require ('../../../archivos/listas/categoriasEspeciales')
const otrosIngresos = require ('../../../archivos/listas/otrosIngresos')
const tiposInstrumentosFinancieros = require ('../../../archivos/listas/tiposInstrumentosFinancieros')


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
    return view.render('cliente.index', {clientes})
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
    // console.log(data)
    return view.render('cliente.create', {data})
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
  async createLink ({ request, response, view }) {
     return view.render('cliente.create',{datos})
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

    informacionCliente.img_cedula_pasaporte = `identidad-${new Date().getTime()}.${archivo.subtype}`
    informacionCliente.img_rif = `rif-${new Date().getTime()}.${archivo.subtype}`
    informacionCliente.img_recibo = `recibo-${new Date().getTime()}.${archivo.subtype}`

    await archivo.move(Helpers.appRoot('archivos/documentos-empresas'), {
      name: archivoIdentidad.img_cedula_pasaporte,
      overwrite: true
    })

    if (!archivoIdentidad.moved()) {
      return archivoIdentidad.error()
    }
    await archivoRif.move(Helpers.appRoot('archivos/documentos-empresas'), {
      name: informacionCliente.img_rif,
      overwrite: true
    })

    if (!archivoRif.moved()) {
      return archivoRif.error()
    }

    await archivoRecibo.move(Helpers.appRoot('archivos/documentos-empresas'), {
      name: archivoRecibo.img_recibo,
      overwrite: true
    })

    if (!archivoRecibo.moved()) {
      return archivoRecibo.error()
    }


    response.json(informacionCliente)
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
    return view.render('cliente.signup')
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
  async solicitudui ({ params: {id}, view }) {

    const precio = 50000
    return view.render('cliente.solicitudui',{id,precio})
  }

  async createSolicitudui ({ request, params: {id}, view, response }) {

    const cliente = await ClienteNatural.find(id)
    const precio = 5000
    const informacionSolicitudUI = request.post()
    let { cantidad_unidades_inversion } = request.post()

    informacionSolicitudUI.total = cantidad_unidades_inversion*precio

    const solicitudUI = await cliente
      .solicitudes()
      .create(informacionSolicitudUI)

    console.log(solicitudUI)

    response.redirect('http://per-capital.com/',200)

    Mail.send('emails.pago' ,solicitudUI.toJSON() , (message) => {
      message
        .to(cliente.correo_electronico, `${cliente.nombre} ${cliente.apellido}`)
        .from('testapp@per-capital.com', 'PerCapital')
        .subject('Pago de unidades de Inversión')
    })

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
  async pago ({ params:{id}, request, response, view }) {

    let solicitud = await SolicitudSuscripcionUi.find(id)
    // solicitud.total = `${solicitud.total.toLocaleString('de-DE')} Bs`
    solicitud = solicitud.toJSON()
    return view.render('cliente.pago', {solicitud})
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
