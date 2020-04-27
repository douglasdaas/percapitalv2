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
    // nombre: faker.first(),
    nombre: 'Douglas',
    // nombre: 'Marcos',
    // nombre: 'Luis',
    // apellido: faker.last(),
    apellido: 'Acosta',
    // apellido: 'Salazar',
    // apellido: 'Pernia',
    lugar_nacimiento: faker.city(),
    fecha_nacimiento: faker.birthday({string: true, american: false}),
    nacionalidad: 'Venezolano',
    genero: faker.character({ pool: 'mf', casing: 'upper'}),
    profecion_oficio: faker.pickone(["Actor, Artista","Administrador","Agente De Seguridad  Vigilante  Escolta","Agente Viajero","Agricultor  Cultivador  Ganadero  Avicultor  Silvicultor","Alba\u00f1il","Alguacil","Ama De Casa","Ama De Llaves  Mayordomo  Domestica","Analista De Oficina","Animador","Anticuario  Coleccionista","Antropologia, Sociologia Y Trabajo Social","Arbitro Deportivo","Archivista","Archivologia Y Bibliotecologia","Arquitectura Aeronautica Y Ciencias Naoticas","Arquitectura Y Urbanismo","Artes Y Musica","Artes, Letras Y Similares","Artesano","Artista","Artista De Circo","Ascensorista","Aseador","Aserrador","Asesor  Consultor","Asistente","Azafata  Asistente De Abordo","Bailarin","Barbero","Barman","Bibliotecarios","Bioanalisis","Biologia","Biologia Marina Y Ciencias Aplicadas Al Mar","Bombero","Buzo","Caddy","Cajero","Caletero","Camarero","Camar\u00f3grafo","Cambista","Camillero","Cantante","Cantinero","Carpintero","Cartero","Cartografo","Catador","Cauchero","Cazador","Cerrajero","Ciencias Administrativas Gerenciales","Ciencias Administrativas Y Financieras Fiscales Y Rentas","Ciencias Basicas","Ciencias De La Salud","Ciencias Del Agro Y Del Mar, Recursos Naturales","Ciencias Fiscales Y Financieras","Ciencias Mecanicas, Electrica Y Electronicas","Ciencias Navales","Ciencias Policiales","Ciencias Sociales Y Similares","Ciencias Y Artes Militares","Cobrador","Cocinero  Chef","Comerciante De Chatarra Y Metales","Comerciante Independiente (Buhonero, Comisionista, Vendedor Ambulante, Comerciante)","Compositor","Computista  Programador","Comunicacion Social","Conductor (Chofer, Taxista, Gandolero)","Conserje","Construccion Y Dise\u00f1o De Obras Civiles","Constructor","Contable","Contaduria","Contratista","Coreagrafo","Corredor","Corredor De Seguros","Cosmetologo","Costurero","Creativo","Cristalero","Cuidador  Ni\u00f1ero","Decorador","Deportista (Atleta)","Derecho","Desempleado","Detective  Investigador","Dibujante","Director","Dise\u00f1ador","Diskjockey","Docente (Profesor  Maestro)","Ebanista","Economia","Educacion Agropecuaria","Educacion En Castellano Y Literatura, Idiomas Y Lenguas Extranjeras","Educacion En Ciencias Basicas","Educacion En Ciencias Sociales","Educacion Especial","Educacion Fisica","Educacion Pedagogica Y Preescolar","Educacion Tecnica Industrial Y Comercial","Educacion Y Pedagogia","Electricista","Empleado De Oficina O Negocio","Encuestador","Enfermeria","Enfermero","Entrenador Deportivo","Escenografo","Escritor","Escultor  Tallador","Esoterico  Brujo  Vidente  Astrologo  Espiritista","Estadistica Y Ciencias Actuariales","Estilista","Estudiante","Estudios Internacionales","Estudios Politicos","Exploracion Y Explotacion De Minas, Petroleo E Hidrocarburos","Explosivista","Farmacia","Filosofia Y Teologia","Fiscal De Transito","Fisica","Floristero","Fotografo","Fumigador","Funcionario Extranjero (Embajada, Consulado)","Funcionario Publico","Funcionario Publico De Eleccion Popular","Geografia","Gerente","Gestor","Granitero","Guardaparques  Guardabosques","Guia Turistico","Herrero","Herrero, Forjador","Historia","Idiomas Modernos","Informatica, Sistemas Y Computacion","Ingenieria Agronomica, Agricola, Agroindustrial Y De Produccion","Ingenieria Civil Y Similares","Ingenieria De Alimentos","Ingenieria De Sistemas, Computacion E Informatica","Ingenieria En Recursos Naturales Renovables Y Forestal","Ingenieria Geologica, Geofisica E Hidrometereologica","Ingenieria Mecanica, Electrica Y Electronica","Ingenieria Petrolera, Minas E Hidrocarburos","Ingenieria Quimica E Industriales","Inspector De Siniestro","Instructor (De Manejo, De Algun Oficio)","Interprete","Jardinero","Jefe","Jinete","Joyero  Orfebre","Jubilado  Pensionado","Laboratorista (Tecnico)","Lavandero  Limpiador  Planchador","Le\u00f1ador","Letras","Licorero  Bodeguero  Lunchero","Limosnero","Limpiabotas","Locutor De Radio , Tv","Loquero","Lotero","Maletero","Manicurista","Maquinista De Avion  De Navegacion","Masajista","Matematica","Mayordomo","Mecanico  Latonero  Pintor De Vehiculo","Mecanografo  Escribiente  Transcriptor","Medicina Veterinaria","Medicina Y Psiquiatria","Mensajero","Mercadotecnia, Publicidad Y Turismo","Mesonero","Militar","Minero","Minero  Cantero","Modelo","Motorizado","Musico","Nutricion Y Dietetica","Obrero","Odontologia","Oficinista","Operador De Equipos Y Maquinas","Panadero  Pastelero  Carnicero  Quesero","Paramedico","Parquero","Pasante","Pedicurista","Peluquero","Perito  Valuador","Pescador","Piloto De Avion  Navegacion  Vehiculo","Pintor","Plomero","Policia","Politico","Portero","Preparador De Papel","Presidente (Empresa, Club, Organizacion)","Prestamista","Productor (Teatro, Cine, Radio O Tv)","Psicologia","Publicista","Quimica","Recepcionista","Recreador","Rector  Vicerector  Decano","Relaciones Industriales","Relojero","Sacerdote  Religioso  Monja  Pastor","Salvavidas  Rescatista","Sastre","Secretaria","Sindicalista","Soldador","Subastador  Tasador","Supervisor  Coordinador","Tabaquero  Cigarrero","Tallador","Tapicero","Taquigrafo  Mecanografo","Tecnico De Equipos Electricos  Electronicos  Computacion  Mecanico","Tecnico De Las Ciencias Medicas","Tecnico De Minas","Tecnico De Sonido","Tecnico En Ciencias Biologicas Y Agronomicas","Tecnico En Ciencias Fisicas Y Quimicas","Tecnico Mecanico  Metalurgico","Telefonista","Telegrafista","Tintorero","Tipografo","Topografo","Trabajador Sexual","Traductor","Turismo","Vendedor  Promotor","Vendedor De Bienes Raices","Visitador Medico","Zapatero","Zootecnia"]),
    condicion_vivienda:faker.pickone(['Adjidicada','De familiares','Hipotecada','Propia']),
    carga_familiar:faker.pickone(['si','no']),
    estado_civil: faker.pickone(['sotero','casado','viudo','divorciado']),
    direccion_domicilio: faker.address(),
    ciudad_domicilio:  faker.city(),
    estado_domicilio: faker.state({ full: true }),
    codigo_postal_domicilio: faker.zip(),
    pais_domicilio: faker.country({ full: true }),
    telefono_fijo: faker.phone({ formatted: false }),
    telefono_celular: faker.phone({ formatted: false, mobile: true }),
    // correo_electronico: faker.email(),
    correo_electronico: 'douglasdaas@gmail.com',
    // correo_electronico: 'salazarseijas@gmail.com',
    // correo_electronico: 'salazarseijas@gmail.com',
    img_cedula_pasaporte: faker.avatar({protocol: 'https', fileExtension: 'jpg'}),
    img_rif: faker.avatar({protocol: 'https', fileExtension: 'jpg'}),
    img_recibo: faker.avatar({protocol: 'https', fileExtension: 'jpg'})
  }
})

Factory.blueprint('App/Models/ClienteJuridico', (faker) =>{
  return{
    registro_informacion_fiscal: faker.integer({ min:0, max:30000000 }),
    // razon_social: faker.company(),
    razon_social: 'Empresa de Douglas',
    // razon_social: 'Empresa de Marcos',
    // razon_social: 'Empresa de Luis',
    nombre_comercial: faker.company(),
    actividad_economica: faker.pickone(['primaria','secundaria','universitaria','postgrado','doctorado']),
    actividad_economica_especifica: faker.pickone(['primaria','secundaria','universitaria','postgrado','doctorado']),
    actividad_economica_categoria_especial: faker.pickone(['primaria','secundaria','universitaria','postgrado','doctorado']),
    nombre_registro_inicial:  faker.integer({ min:0, max:30000000 }),
    numero_registro_inicial:  faker.integer({ min:0, max:30000000 }),
    tomo_registro_inicial:  faker.integer({ min:0, max:30000000 }),
    folio_registro_inicial:  faker.integer({ min:0, max:30000000 }),
    fecha_registro_inicial: faker.birthday({string: true, american: false}),
    capital_social_inicial: faker.integer({ min:0, max:30000000 }),
    nombre_registro_modificicaion: faker.integer({ min:0, max:30000000 }),
    numero_registro_modificicaion: faker.integer({ min:0, max:30000000 }),
    tomo_registro_modificicaion: faker.integer({ min:0, max:30000000 }),
    folio_registro_modificicaion: faker.integer({ min:0, max:30000000 }),
    fecha_registro_modificicaion:  faker.birthday({string: true, american: false}),
    capital_actual_modificicaion:  faker.integer({ min:0, max:30000000 }),
    numero_gaceta_oficial: faker.integer({ min:0, max:30000000 }),
    fecha_gaceta: faker.integer({ min:0, max:30000000 }),
    autoridad_ente_adscripcion: faker.integer({ min:0, max:30000000 }),
    codigo_ONT: faker.integer({ min:0, max:30000000 }),
    telefono: faker.phone({ formatted: false }),
    sitio_web: faker.url(),
    // correo_electronico: faker.email(),
    correo_electronico: 'empresadouglas@gmail.com',
    // correo_electronico: 'salazarseijas@gmail.com',
    // correo_electronico: 'salazarseijas@gmail.com',
    direccion: faker.address(),
    ciudad: faker.city(),
    estado: faker.state({ full: true }),
    pais: faker.country({ full: true }),
    documento_constitutivo_empresas: faker.avatar({protocol: 'https', fileExtension: 'jpg'}),
    img_rif: faker.avatar({protocol: 'https', fileExtension: 'jpg'})
  }
})
Factory.blueprint('App/Models/Personal', (faker) =>{
  return{
    nombre:'Personal Maestro',
    apellido:'',
    documento_identificacion: '0',
    correo_electronico: 'perfilmaestro@per-capital.com',
    legal: 1,
    operaciones: 1,
    tesoreria: 1,
  }
})
Factory.blueprint('App/Models/Usuario', (faker) =>{
  return{
    email: 'perfilmaestro@per-capital.com',
    password:'123456',
    cliente_natural_id: null,
    cliente_juridico_id: null,
    personal_id:'0'
  }
})
