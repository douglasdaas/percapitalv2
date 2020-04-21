'use strict'
const { hooks } = require('@adonisjs/ignitor')


hooks.after.providersBooted(() => {
  const View = use('View')
  View.global('estatusLegal', (estatusLegal) =>  estatusLegal === 0 ?  'No Aprobado':  'Aprobado')
  View.global('estatusCVV', (estatusCVV) =>  estatusCVV === 0 ?  'Cuenta Faltante':  'Cuenta Creada')
  View.global('estatusPagoConciliacion', (estatusConciliacion) =>  estatusConciliacion === 0 ?  'Pagos por Conciliar':  'Pagos Conciliados')
  View.global('estatusRescateConciliacion', (estatusConciliacion) =>  estatusConciliacion === 0 ?  'Rescates por Conciliar':  'Rescatse Conciliados')
  View.global('estatusUnidadesAsignadas', (estatusUnidades) =>  estatusUnidades === 0 ?  'Unidades por Asignar':  'Unidades Asignadas')
  View.global('estatusUnidadesRescatadas', (estatusUnidades) =>  estatusUnidades === 0 ?  'Unidades por Rescatar':  'Unidades Rescatadas')
  View.global('sexo', (sexo) =>  sexo === 'm' ?  'Maculino':  'Femenino')
})

