'use strict'

const ClienteNatural = use('App/Models/ClienteNatural')
const Persona = use('Persona')
const Mail = use('Mail')



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

  async crearAutomatico ({params: { id }, request, response}){
    console.log('id:: ',id)

    let cliente = await ClienteNatural.find(id)

    const payload = {
      email: cliente.correo_electronico,
      password:'123456',
      password_confirmation:'123456'
    }
    console.log('todo bien')
    let user = await Persona.register(payload)
    console.log('creo el usuario')

    cliente = cliente.toJSON()

    const datos = {
      cliente,
      email: payload.email,
      password: payload.password
    }

    Mail.send('emails.usuario-creado', datos, (message) => {
      message
        .to(email, `${cliente.nombre} ${cliente.apellido}`)
        .from('testapp@per-capital.com', 'PerCapital')
        .subject('Usuario en PerCapital')
    })
    console.log('envio el correo')
    response.redirect('/tesoreria',200)
  }
}

module.exports = UserController
