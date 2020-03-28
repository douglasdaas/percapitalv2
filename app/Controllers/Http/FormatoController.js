'use strict'

const Formato = use('App/Models/Formato')
const Helpers = use('Helpers')

class FormatoController {

  async index ({ params, request, response, view }) {
    let formatos = await Formato.all()
    formatos = formatos.toJSON()
    console.log(formatos)

    return view.render('legal.formatos',{formatos})
  }
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response}) {
    let informacionFormato = request.post()

    const archivo = request.file('formato', {
      types: ['image'],
      size: '5mb'
    })

    informacionFormato.ruta = `${new Date().getTime()}.${archivo.subtype}`

    await archivo.move(Helpers.appRoot('archivos/formatos'), {
      name: informacionFormato.ruta,
      overwrite: true
    })

    if (!archivo.moved()) {
      return archivo.error()
    }

    await Formato.create(informacionFormato)
    response.redirect('/legal/formatos', 201)

  }

  async download ({ params: {id}, response}) {
    const file = await Formato.find(id)
    console.log(file.ruta)
    response.download(Helpers.appRoot(`archivos/formatos/${file.ruta}`))
  }
}

module.exports = FormatoController
