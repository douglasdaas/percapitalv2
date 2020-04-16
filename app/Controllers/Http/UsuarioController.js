'use strict'

const ClienteNatural = use('App/Models/ClienteNatural')
const ClienteJuridico = use('App/Models/ClienteJuridico')
const Persona = use('Persona')
const Event = use('Event')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with usuarios
 */
class UsuarioController {
  /**
   * inicioSesion for usuarios.
   * GET usuarios/login
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async inicioSesion ({ request, response, view }) {
    return view.render('usuario.login')
  }

  /**
   * Login for usuarios.
   * POST usuarios/login
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async login ({ auth ,request, response, view }) {
    const payload = request.only(['uid', 'password'])

    const usuario = await Persona.verify(payload)

    await auth.logout(usuario)

    await auth.login(usuario)

    if (usuario.cliente_natural_id !==  null){
      return response.redirect(`/usuario!natural/${usuario.cliente_natural_id}`)
    } else if (usuario.cliente_juridico_id !== null) {
      return response.redirect(`/usuario!juridico/${usuario.cliente_juridico_id}`)
    } else {
      return 'error'
    }
  }

  /**
   * Logout for usuarios.
   * POST usuarios/login
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async logout ({ auth ,request, response, view }) {

    console.log('logout')

    await auth.logout()

    return response.redirect('/usuarios/login')

  }

  /**
   * Show a list of all usuarios.
   * GET usuarios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new usuario.
   * GET usuarios/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new usuario.
   * POST usuarios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single usuario.
   * GET usuarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params: {id,tipoCliente}, auth, request, response, view }) {

    if (tipoCliente === '!natural') {

      if (auth.user.cliente_natural_id !== id) {
        return "No Autorizado"
      }

      let cliente = await ClienteNatural.find(id)

      cliente = cliente.toJSON()

      return view.render('usuario.natural.show', {cliente})

    } else if (tipoCliente === '!juridico') {


      if (auth.user.cliente_juridico_id !== id) {
        return "No Autorizado"
      }

      let cliente = await ClienteJuridico.find(id)

      cliente = cliente.toJSON()

      console.log(cliente)

      return view.render('usuario.juridico.show', {cliente})

    }


  }

  /**
   * Render a form to update an existing usuario.
   * GET usuarios/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update usuario details.
   * PUT or PATCH usuarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a usuario with id.
   * DELETE usuarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }

  async crearAutomatico ({params: { id, tipoCliente }, request, response}){
    if (tipoCliente === '!natural') {
      let cliente = await ClienteNatural.find(id)

      cliente = cliente.toJSON()

      const payload = {
        email: cliente.correo_electronico,
        password:'123456',
        password_confirmation:'123456',
        cliente_natural_id: cliente.documento_identificacion,
        cliente_juridico_id: null
      }

      // const payload = request.only(['email', 'password', 'password_confirmation'])

      const user = await Persona.register(payload)



      const datos = {
        cliente,
        email: payload.email,
        password: payload.password
      }

      Event.fire('usuarioCreado::clienteNatural',datos)

      return response.redirect('/tesoreria!natural',200)

    } else if (tipoCliente === '!juridico') {
      console.log(id)

      let cliente = await ClienteJuridico.find(id)

      cliente = cliente.toJSON()

      const payload = {
        email: cliente.correo_electronico,
        password:'123456',
        password_confirmation:'123456',
        cliente_natural_id: null,
        cliente_juridico_id: cliente.registro_informacion_fiscal,
      }

      console.log(payload)

      // const payload = request.only(['email', 'password', 'password_confirmation'])

      const user = await Persona.register(payload)


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

module.exports = UsuarioController
