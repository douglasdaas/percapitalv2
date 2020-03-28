'use strict'

const LeyNorma = use('App/Models/LeyNorma')
const Helpers = use('Helpers')


class LeyNormaController {

  async index ({ params, request, response, view }) {
    let leyesYNormas = await LeyNorma.all()
    leyesYNormas = leyesYNormas.toJSON()
    console.log(leyesYNormas)

    return view.render('legal.leyes-y-normas',{leyesYNormas})
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response}) {
    let informacionLeyesYNormas = request.post()

    const archivo = request.file('leyYNorma', {
      types: ['image'],
      size: '5mb'
    })

    informacionLeyesYNormas.ruta = `${new Date().getTime()}.${archivo.subtype}`

    await archivo.move(Helpers.appRoot('archivos/leyes-y-normas'), {
      name: informacionLeyesYNormas.ruta,
      overwrite: true
    })

    if (!archivo.moved()) {
      return archivo.error()
    }

    await LeyNorma.create(informacionLeyesYNormas)
    response.redirect('/legal/leyes-y-normas', 201)

  }

  async download ({ params: {id}, response}) {
    const file = await LeyNorma.find(id)
    console.log(file.ruta)
    response.download(Helpers.appRoot(`archivos/leyes-y-normas/${file.ruta}`))
  }
}

module.exports = LeyNormaController
