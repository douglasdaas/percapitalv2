'use strict'

const ClienteNatural = use('App/Models/ClienteNatural')
const ClienteJuridico = use('App/Models/ClienteJuridico')
const Persona = use('Persona')
const Event = use('Event')



/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {

  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request: {id}, response }) {

  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async crearAutomatico ({params: { id, tipoCliente }, request, response}){
    console.log('id:: ',id)

    if (tipoCliente === '!natural') {
      let cliente = await ClienteNatural.find(id)

      const payload = {
        email: cliente.correo_electronico,
        password:'123456',
        password_confirmation:'123456'
      }

      await Persona.register(payload)

      cliente = cliente.toJSON()

      const datos = {
        cliente,
        email: payload.email,
        password: payload.password
      }

      Event.fire('usuarioCreado::clienteNatural',datos)

      return response.redirect('/tesoreria!natural',200)

    } else if (tipoCliente === '!juridico') {

      let cliente = await ClienteJuridico.find(id)

      const payload = {
        email: cliente.correo_electronico,
        password:'123456',
        password_confirmation:'123456'
      }

      await Persona.register(payload)

      cliente = cliente.toJSON()

      const datos = {
        cliente,
        email: payload.email,
        password: payload.password
      }

      Event.fire('usuarioCreado::clienteJuridico',datos)


      return response.redirect('/tesoreria!juridico',200)

    }

  }
}

module.exports = UserController
