'use strict'

const Peronsal = use('App/Models/Personal')
const Persona = use('Persona')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with personals
 */
class PersonalController {
  /**
   * inicioSesion for personal.
   * GET usuarios/login
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async inicioSesion ({ request, response, view }) {
    return view.render('personal.login')
  }

  /**
   * Login for personal.
   * POST personal/login
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

    const personal = await Peronsal.find(usuario.personal_id)

    if (personal.legal === 1){
      return response.redirect(`/legal`)
    } else if (personal.operaciones === 1) {
      return response.redirect(`/operaciones`)
    } else if (personal.tesoreria === 1) {
      return response.redirect(`/tesoreria`)
    } else {
      return 'error'
    }
  }

  /**
   * Logout for personal.
   * POST personal/logout
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async logout ({ auth ,request, response, view }) {

    console.log('logout')

    await auth.logout()

    return response.redirect('/personal/login')

  }


  /**
   * Show a list of all personals.
   * GET personals
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new personal.
   * GET personals/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('personal.create')
  }

  /**
   * Create/save a new personal.
   * POST personals
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    const informacionPersonal = request.post()

    const { documento_identificacion } = request.post()

    await Peronsal.create(informacionPersonal)

    return response.redirect(`/usuario!personal/crearautomatico/${documento_identificacion}` )

  }

  /**
   * Display a single personal.
   * GET personals/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing personal.
   * GET personals/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update personal details.
   * PUT or PATCH personals/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a personal with id.
   * DELETE personals/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PersonalController
