'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/ClienteNatural', (faker) => {
  return {
    documento_identificacion: faker.integer({ min:0, max:30000000 }),
    tipo_documento_identificacion: faker.character({ pool: 'VEP'}),
    // nombre: faker.first(),
    nombre: 'Marcos',
    // apellido: faker.last(),
    apellido: 'Salazar',
    rif: faker.integer({ min:0, max:30000000 }),
    lugar_nacimiento: faker.city(),
    fecha_nacimiento: faker.birthday({string: true, american: false}),
    sexo: faker.character({ pool: 'mf', casing: 'upper'}),
    estado_civil: faker.pickone(['sotero','casado','viudo','divorciado']),
    nacionalidad: 'Venezolano',
    telefono_habitacion: faker.phone({ formatted: false }),
    telefono_celular: faker.phone({ formatted: false, mobile: true }),
    // correo_electronico: faker.email(),
    correo_electronico: 'salazarseijas@gmail.com',
    direccion_habitacion: faker.address(),
    ciudad_habitacion: faker.city(),
    estado_habitacion: faker.state({ full: true }),
    codigo_postal_habitacion: faker.zip(),
    pais_habitacion: faker.country({ full: true }),
    nivel_academico: faker.pickone(['primaria','secundaria','universitaria','postgrado','doctorado']),
    profesion_ocupacion: faker.profession(),
    nombre_empresa: faker.company(),
    cargo: faker.profession({rank: true}),
    img_cedula_pasaporte: faker.avatar({protocol: 'https', fileExtension: 'jpg'}),
    img_rif: faker.avatar({protocol: 'https', fileExtension: 'jpg'}),
    img_recibo: faker.avatar({protocol: 'https', fileExtension: 'jpg'})

  }
})
