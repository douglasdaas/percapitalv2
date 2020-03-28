'use strict'

const DeberLegal = use('App/Models/DeberLegal')
const Helpers = use('Helpers')


class DeberLegalController {

  async index ({ params, request, response, view }) {
    let deberesLegales = await DeberLegal.all()
    deberesLegales = deberesLegales.toJSON()
    console.log(deberesLegales)

    return view.render('legal.deberes-legales',{deberesLegales})
  }
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response}) {
    let informacionDeberLegal = request.post()

    const archivo = request.file('deberLegal', {
      types: ['image'],
      size: '5mb'
    })

    informacionDeberLegal.ruta = `${new Date().getTime()}.${archivo.subtype}`

    await archivo.move(Helpers.appRoot('archivos/deberes-legales'), {
      name: informacionDeberLegal.ruta,
      overwrite: true
    })

    if (!archivo.moved()) {
      return archivo.error()
    }

    await DeberLegal.create(informacionDeberLegal)
    response.redirect('/legal/deberes-legales', 201)

  }

  async download ({ params: {id}, response}) {
    const file = await DeberLegal.find(id)
    console.log(file.ruta)
    response.download(Helpers.appRoot(`archivos/deberes-legales/${file.ruta}`))
  }
}

module.exports = DeberLegalController
