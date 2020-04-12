'use strict'

const Event = use('Event')
const Mail = use('Mail')

Event.on('aprobadoLegal::clienteJuridico', async (cliente) => {
  Mail.send('emails.juridico.aprobacion-legal', cliente.toJSON(), (message) => {
    message
      .to(cliente.correo_electronico, `${cliente.razon_social}`)
      .from('testapp@per-capital.com', 'PerCapital')
      .subject('Aprobacion Legal')
  })
})

Event.on('aprobadoLegal::clienteNatural', async (cliente) => {
  Mail.send('emails.natural.aprobacion-legal', cliente.toJSON(), (message) => {
    message
      .to(cliente.correo_electronico, `${cliente.nombre} ${cliente.apellido}`)
      .from('testapp@per-capital.com', 'PerCapital')
      .subject('Aprobacion Legal')
  })
})

Event.on('creacionCuentaCVV::clienteJuridico', async (cliente) =>{
  Mail.send('emails.juridico.solicitudui', cliente.toJSON(), (message) => {
    message
      .to(cliente.correo_electronico, `${cliente.razon_social}`)
      .from('testapp@per-capital.com', 'PerCapital')
      .subject('Solicitud de unidades de Inversión')
  })
})

Event.on('creacionCuentaCVV::clienteNatural', async (cliente) =>{
  Mail.send('emails.natural.solicitudui', cliente.toJSON(), (message) => {
    message
      .to(cliente.correo_electronico, `${cliente.nombre} ${cliente.apellido}`)
      .from('testapp@per-capital.com', 'PerCapital')
      .subject('Solicitud de unidades de Inversión')
  })
})

Event.on('pagoSolicitudSuscripcionUI::clienteJuridico', async (datos) =>{
  Mail.send('emails.pago' ,datos , (message) => {
    message
      .to(datos.cliente.correo_electronico, `${datos.cliente.razon_social}`)
      .from('testapp@per-capital.com', 'PerCapital')
      .subject('Pago de unidades de Inversión')
  })
})

Event.on('pagoSolicitudSuscripcionUI::clienteNatural', async (datos) =>{
  Mail.send('emails.pago' ,datos , (message) => {
    message
      .to(datos.cliente.correo_electronico, `${datos.cliente.nombre} ${datos.cliente.apellido}`)
      .from('testapp@per-capital.com', 'PerCapital')
      .subject('Pago de unidades de Inversión')
  })
})

Event.on('asignacionUnidades::clienteJuridico', async (datos) =>{
  Mail.send('emails.unidades-asignadas', datos, (message) => {
    message
      .to(datos.cliente.correo_electronico, `${datos.cliente.razon_social} `)
      .from('testapp@per-capital.com', 'PerCapital')
      .subject('Asignacion de Unidades de Inverción')
  })
})

Event.on('asignacionUnidades::clienteNatural', async (datos) =>{
  Mail.send('emails.unidades-asignadas', datos, (message) => {
    message
      .to(datos.cliente.correo_electronico, `${datos.cliente.nombre} ${datos.cliente.apellido}`)
      .from('testapp@per-capital.com', 'PerCapital')
      .subject('Asignacion de Unidades de Inverción')
  })
})

Event.on('usuarioCreado::clienteJuridico', async (datos) =>{
  Mail.send('emails.usuario-creado', datos, (message) => {
    message
      .to( cliente.correo_electronico, `${cliente.razon_social}`)
      .from('testapp@per-capital.com', 'PerCapital')
      .subject('Usuario en PerCapital')
  })
})

Event.on('usuarioCreado::clienteNatural', async (datos) =>{
  Mail.send('emails.usuario-creado', datos, (message) => {
    message
      .to( cliente.correo_electronico, `${cliente.nombre} ${cliente.apellido}`)
      .from('testapp@per-capital.com', 'PerCapital')
      .subject('Usuario en PerCapital')
  })
})



