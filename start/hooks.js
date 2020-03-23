'use strict'
const { hooks } = require('@adonisjs/ignitor')


hooks.after.providersBooted(() => {
  const View = use('View')
  View.global('estatusLegal', (estatusLegal) =>  estatusLegal === 0 ?  'No Aprobado':  'Aprobado')
  View.global('estatusCVV', (estatusCVV) =>  estatusCVV === 0 ?  'Cuenta Faltante':  'Cuenta Creada')
  View.global('estatusConciliacion', (estatusConciliacion) =>  estatusConciliacion === 0 ?  'Pagos por Conciliar':  'Pagos Conciliados')
  View.global('estatusUnidades', (estatusUnidades) =>  estatusUnidades === 0 ?  'Unidades por Asignar':  'Unidades Asignadas')
  View.global('sexo', (sexo) =>  sexo === 'm' ?  'Maculino':  'Femenino')
})

