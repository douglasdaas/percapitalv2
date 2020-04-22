'use strict'

const ClienteJuridico = use('App/Models/ClienteJuridico')
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
 * Resourceful controller for interacting with clientejuridicos
 */
class ClienteJuridicoController {
  /**
   * Show a list of all clientejuridicos.
   * GET clientejuridicos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    let clientes = await ClienteJuridico.all()
    clientes = clientes.toJSON()
    return view.render('cliente.juridico.index', {clientes})
  }

  /**
   * Render a form to be used for creating a new clientejuridico.
   * GET clientejuridicos/create
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
    return view.render('cliente.juridico.create', {data})
  }

  /**
   * Create/save a new clientejuridico.
   * POST clientejuridicos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const informacionCliente = request.post()
    const registro_informacion_fiscal = request.only(['registro_informacion_fiscal'])


    const archivoConstitutivo = request.file('documento_constitutivo_empresas', {
      types: ['image'],
      size: '5mb'
    })
    const archivoRif = request.file('img_rif', {
      types: ['image'],
      size: '5mb'
    })

    informacionCliente.documento_constitutivo_empresas = `constitutivo-${new Date().getTime()}.${archivoConstitutivo.subtype}`
    informacionCliente.img_rif = `rif-${new Date().getTime()}.${archivoRif.subtype}`

    await archivoConstitutivo.move(Helpers.appRoot(`archivos/clientes/juridico/${registro_informacion_fiscal}`), {
      name: informacionCliente.documento_constitutivo_empresas,
      overwrite: true
    })

    if (!archivoConstitutivo.moved()) {
      return archivoConstitutivo.error()
    }
    await archivoRif.move(Helpers.appRoot(`archivos/clientes/juridico/${registro_informacion_fiscal}`), {
      name: informacionCliente.img_rif,
      overwrite: true
    })

    if (!archivoRif.moved()) {
      return archivoRif.error()
    }


    response.json(informacionCliente)
  }

  /**
   * Display a single clientejuridico.
   * GET clientejuridicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing clientejuridico.
   * GET clientejuridicos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update clientejuridico details.
   * PUT or PATCH clientejuridicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a clientejuridico with id.
   * DELETE clientejuridicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }

  async download ({ params: {id, tipoArchivo }, response}) {

    const cliente = await ClienteJuridico.find(id)
    if (tipoArchivo === 'documento_constitutivo_empresas'){
      response.download(Helpers.appRoot(`archivos/clientes/juridico/${cliente.registro_informacion_fiscal}/${cliente.documento_constitutivo_empresas}`))
    } else if (tipoArchivo === 'img_rif') {
      response.download(Helpers.appRoot(`archivos/clientes/juridico/${cliente.registro_informacion_fiscal}/${cliente.img_rif}`))
    } else {
      return 'Archivo no encontrado'
    }

  }

  async signup ({ params, request, response, view }) {
    return view.render('cliente.juridico.signup')
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
        .to(clienteInformacion.correo_electronico, `${clienteInformacion.razon_social}`)
        .from('testapp@per-capital.com', 'PerCapital')
        .subject('Informacion de Registro')
    })

    return clienteInformacion
  }
}

module.exports = ClienteJuridicoController
