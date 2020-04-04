'use strict'

const ClienteJuridico = use('App/Models/ClienteJuridico')
const actividadesEconomicas = require('../../../archivos/listas/actividadesEconomicas')
const categoriasEspeciales = require('../../../archivos/listas/categoriasEspeciales')
const tiposInstrumentosFinancieros = require('../../../archivos/listas/tiposInstrumentosFinancieros')
const paises = require('../../../archivos/listas/paises')
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
    // data.profesiones = profesiones
    data.actividadesEconomicas = actividadesEconomicas
    data.categoriasEspeciales = categoriasEspeciales
    // data.otrosIngresos = otrosIngresos
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
}

module.exports = ClienteJuridicoController
