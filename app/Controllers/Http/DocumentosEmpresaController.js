'use strict'

const DocumentosEmpresa = use('App/Models/DocumentosEmpresa')
const Helpers = use('Helpers')

class DocumentosEmpresaController {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ params, request, response, view }) {
    let documentos = await DocumentosEmpresa.all()
    documentos = documentos.toJSON()
    console.log(documentos)

    return view.render('legal.documentos-empresas',{documentos})
  }
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response}) {
    let informacionDocumento = request.post()

    const archivo = request.file('documento', {
      types: ['image'],
      size: '5mb'
    })

    informacionDocumento.ruta = `${new Date().getTime()}.${archivo.subtype}`

    await archivo.move(Helpers.appRoot('archivos/documentos-empresas'), {
      name: informacionDocumento.ruta,
      overwrite: true
    })

    if (!archivo.moved()) {
      return archivo.error()
    }

    await DocumentosEmpresa.create(informacionDocumento)
    response.redirect('/legal/documentos-empresas', 201)
  }

  async download ({ params: {id}, response}) {
    const file = await DocumentosEmpresa.find(id)
    console.log(file.ruta)
    response.download(Helpers.appRoot(`archivos/documentos-empresas/${file.ruta}`))
  }
}

module.exports = DocumentosEmpresaController
