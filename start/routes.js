'use strict'

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

Route.group( () =>{
  Route.resource('inversionista', 'ClienteNaturalController')
  Route.get('crearAutomatico/:id', 'UserController.crearAutomatico')
  Route.get('signup', 'ClienteNaturalController.signup')
  Route.get('solicitudui/:id', 'ClienteNaturalController.solicitudui')
  Route.post('solicitudui/:id', 'ClienteNaturalController.createSolicitudui')
  Route.get('pago/:id', 'ClienteNaturalController.pago')
  Route.post('pago/:id', 'ClienteNaturalController.createPago')
  Route.post('registro', 'ClienteNaturalController.registro')
}).prefix('cliente')

Route.group( () =>{
  Route.resource('legal', 'LegalController').only(['index','show','update'])
})

Route.group( () =>{
  Route.resource('operaciones:option?', 'OperacionesController').only(['index','show','update'])
})

Route.group( () =>{
  Route.resource('tesoreria', 'TesoreriaController').only(['index','show','update'])
})


//04124442130
