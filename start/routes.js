'use strict'
const Helpers = use('Helpers')



/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

//CLIENTES
Route.group( () =>{
  Route.get('crearAutomatico/:id', 'UserController.crearAutomatico')
  Route.get('signup', 'ClienteNaturalController.signup')
  Route.get('solicitudui/:id', 'ClienteNaturalController.solicitudui')
  Route.post('solicitudui/:id', 'ClienteNaturalController.createSolicitudui')
  Route.get('pago/:id', 'ClienteNaturalController.pago')
  Route.post('pago/:id', 'ClienteNaturalController.createPago')
  Route.post('registro', 'ClienteNaturalController.registro')
}).prefix('cliente')
Route.resource('cliente', 'ClienteNaturalController')

//LEGAL
Route.group( () =>{
  Route.resource('documentos-empresas', 'DocumentosEmpresaController').only(['index','store'])
  Route.get('documentos-empresas/download/:id', 'DocumentosEmpresaController.download')
  Route.resource('formatos','FormatoController' ).only(['index','store'])
  Route.get('formatos/download/:id', 'FormatoController.download')
  Route.resource('deberes-legales','DeberLegalController' ).only(['index','store'])
  Route.get('deberes-legales/download/:id', 'DeberLegalController.download')
  Route.resource('leyes-y-normas','LeyNormaController' ).only(['index','store'])
  Route.get('leyes-y-normas/download/:id', 'LeyNormaController.download')
}).prefix('legal')
Route.resource('legal', 'LegalController').only(['index','show','update'])

//OPERACIONES
Route.group( () =>{

}).prefix('operaciones')
Route.resource('operaciones:option?', 'OperacionesController').only(['index','show','update'])


//TESORERIA
Route.group( () =>{

}).prefix('tesoreria')
Route.resource('tesoreria', 'TesoreriaController').only(['index','show','update'])






//04124442130
