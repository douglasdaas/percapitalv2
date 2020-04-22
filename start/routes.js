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

//CLIENTES NATURAL
Route.group(() => {
  Route.get('/signup', 'ClienteNaturalController.signup')
  Route.get('/download/:id/:tipoArchivo', 'ClienteNaturalController.download')
}).prefix('cliente/natural')
Route.resource('cliente/natural', 'ClienteNaturalController').only(['create','store'])

//CLIENTES JURIDICO
Route.group( () => {
  Route.get('/signup', 'ClienteJuridicoController.signup')
  Route.get('/download/:id/:tipoArchivo', 'ClienteJuridicoController.download')
}).prefix('cliente/juridico')
Route.resource('cliente/juridico', 'ClienteJuridicoController').only(['create','store'])

//USUARIOS
Route.group( () =>{
  Route.get('/crearAutomatico/:id', 'UsuarioController.crearAutomatico')
  Route.get('/login', 'UsuarioController.inicioSesion').as('login')
  Route.post('/login','UsuarioController.login')
  Route.get('/logout','UsuarioController.logout').as('logout')
}).prefix('usuario:tipoCliente?')
Route.resource('usuario:tipoCliente?', 'UsuarioController').only(['show'])

//SOLICITUDES SUSCRIPCION UI
Route.group(() =>{
  Route.get('/create/:id','SolicitudSuscripcionUiController.create')
  Route.post('/:id','SolicitudSuscripcionUiController.store')
}).prefix('solicitud-suscripcion:tipoCliente?')

//SOLICITUDES RESCATE UI
Route.group(() =>{
  Route.get('/create/:id','SolicitudRescateUiController.create')
  Route.post('/:id','SolicitudRescateUiController.store')
}).prefix('solicitud-rescate:tipoCliente?')


//PAGO SUSCRIPCION UI
Route.group(() =>{
  Route.get('/create/:id', 'PagoController.create')
  Route.post('/:id','PagoController.store')
  Route.get('/download/:id', 'PagoController.download')
}).prefix('pago-suscripcion')

//PAGO RESCATE UI
Route.group(() =>{
  Route.get('/create/:id', 'PagoRescateUiController.create')
  Route.post('/:id','PagoRescateUiController.store')
  Route.get('/download/:id', 'PagoRescateUiController.download')
}).prefix('pago-rescate')

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
Route.resource('legal:tipoCliente?', 'LegalController').only(['index','show','update'])

//OPERACIONES
Route.group( () =>{
  Route.get('conciliacion-pagos','SolicitudSuscripcionUiController.index')
  Route.get('conciliacion-pagos/:id','SolicitudSuscripcionUiController.show')
  Route.patch('conciliacion-pagos/:id','SolicitudSuscripcionUiController.update')
  Route.get('solicitud-rescate','SolicitudRescateUiController.index')
  Route.get('solicitud-rescate/:id','SolicitudRescateUiController.show')
  Route.patch('solicitud-rescate/:id','SolicitudRescateUiController.update')
}).prefix('operaciones:tipoCliente?')
Route.resource('operaciones:tipoCliente?', 'OperacionesController').only(['index','show','update'])


//TESORERIA
Route.group( () =>{
  Route.get('/rescate','RescateUiController.index')
  Route.get('/rescate/:id','RescateUiController.show')
  Route.patch('/rescate/:id','RescateUiController.update')
}).prefix('tesoreria:tipoCliente?')
Route.resource('tesoreria:tipoCliente?', 'TesoreriaController').only(['index','show','update'])

