export const ESPECIALIDADES = [
  'Clínica Médica',
  'Cardiología',
  'Pediatría',
  'Ginecología',
  'Traumatología',
  'Odontología',
  'Oftalmología',
  'Dermatología',
  'Neurología',
  'Psiquiatría',
  'Psicología',
  'Kinesiología',
  'Endocrinología',
  'Gastroenterología',
  'Urología',
  'Otorrinolaringología',
  'Reumatología',
  'Infectología',
  'Nutrición',
  'Laboratorio',
  'Diagnóstico por Imágenes',
  'Farmacia',
]

export const LOCALIDADES = [
  'CABA',
  'Avellaneda',
  'Lanús',
  'Lomas de Zamora',
  'La Matanza',
  'Quilmes',
  'Morón',
  'San Martín',
  'Rosario',
  'Córdoba',
]

export const PRESTADORES = [
  // CABA
  { id: 1,  nombre: 'Centro Médico San Martín',         especialidad: 'Clínica Médica',            localidad: 'CABA',           direccion: 'Av. San Martín 1452, CABA',           telefono: '011 4521-3300', lat: -34.6037, lng: -58.4441 },
  { id: 2,  nombre: 'Clínica del Sol',                  especialidad: 'Cardiología',                localidad: 'CABA',           direccion: 'Corrientes 2890, CABA',               telefono: '011 4863-7700', lat: -34.5995, lng: -58.4127 },
  { id: 3,  nombre: 'Pediatría Integral Palermo',       especialidad: 'Pediatría',                  localidad: 'CABA',           direccion: 'Thames 1680, CABA',                   telefono: '011 4776-2200', lat: -34.5875, lng: -58.4282 },
  { id: 4,  nombre: 'Dra. Valeria Romero',              especialidad: 'Ginecología',                localidad: 'CABA',           direccion: 'Av. Rivadavia 5530 Piso 3, CABA',    telefono: '011 4433-1100', lat: -34.6175, lng: -58.4385 },
  { id: 5,  nombre: 'Centro Traumatológico Belgrano',   especialidad: 'Traumatología',              localidad: 'CABA',           direccion: 'Cabildo 1920, CABA',                  telefono: '011 4784-5500', lat: -34.5607, lng: -58.4558 },
  { id: 6,  nombre: 'Odontología Familiar Caballito',   especialidad: 'Odontología',                localidad: 'CABA',           direccion: 'Rivadavia 4875, CABA',                telefono: '011 4902-8800', lat: -34.6192, lng: -58.4456 },
  { id: 7,  nombre: 'Laboratorio Central Norte',        especialidad: 'Laboratorio',                localidad: 'CABA',           direccion: 'Av. Santa Fe 3421, CABA',             telefono: '011 4825-6600', lat: -34.5876, lng: -58.4024 },
  { id: 8,  nombre: 'Dr. Marcos Ibáñez',               especialidad: 'Dermatología',               localidad: 'CABA',           direccion: 'Av. Callao 890, CABA',                telefono: '011 4811-3300', lat: -34.5989, lng: -58.3932 },
  { id: 9,  nombre: 'Farmacia del Pueblo',              especialidad: 'Farmacia',                   localidad: 'CABA',           direccion: 'Corrientes 1120, CABA',               telefono: '011 4382-0000', lat: -34.6038, lng: -58.3875 },
  { id: 10, nombre: 'Imágenes Boedo',                   especialidad: 'Diagnóstico por Imágenes',   localidad: 'CABA',           direccion: 'Av. Boedo 745, CABA',                 telefono: '011 4957-4400', lat: -34.6298, lng: -58.4185 },

  // Avellaneda
  { id: 11, nombre: 'Centro de Salud Avellaneda',       especialidad: 'Clínica Médica',            localidad: 'Avellaneda',     direccion: 'Av. Mitre 890, Avellaneda',           telefono: '011 4222-1100', lat: -34.6647, lng: -58.3642 },
  { id: 12, nombre: 'Cardiocenter Sur',                 especialidad: 'Cardiología',                localidad: 'Avellaneda',     direccion: 'Belgrano 540, Avellaneda',            telefono: '011 4201-7700', lat: -34.6598, lng: -58.3701 },
  { id: 13, nombre: 'Pediatras Unidos',                 especialidad: 'Pediatría',                  localidad: 'Avellaneda',     direccion: 'Av. Pavón 1230, Avellaneda',          telefono: '011 4208-3300', lat: -34.6612, lng: -58.3589 },
  { id: 14, nombre: 'Farmacia San Jorge',               especialidad: 'Farmacia',                   localidad: 'Avellaneda',     direccion: 'Av. Mitre 1500, Avellaneda',          telefono: '011 4222-5500', lat: -34.6670, lng: -58.3620 },

  // Lanús
  { id: 15, nombre: 'Clínica del Trabajo Lanús',        especialidad: 'Traumatología',              localidad: 'Lanús',          direccion: 'Av. H. Yrigoyen 3220, Lanús',        telefono: '011 4241-2200', lat: -34.7012, lng: -58.3920 },
  { id: 16, nombre: 'Dr. Pablo Ferraro',                especialidad: 'Clínica Médica',            localidad: 'Lanús',          direccion: 'Brig. Gral. Juan M. Rosas 2560, Lanús', telefono: '011 4246-8800', lat: -34.6989, lng: -58.3875 },
  { id: 17, nombre: 'Odontored Lanús',                  especialidad: 'Odontología',                localidad: 'Lanús',          direccion: 'Av. 9 de Julio 1180, Lanús',          telefono: '011 4248-6600', lat: -34.7034, lng: -58.3901 },

  // Lomas de Zamora
  { id: 18, nombre: 'Centro Médico Lomas',              especialidad: 'Ginecología',                localidad: 'Lomas de Zamora',direccion: 'Av. H. Yrigoyen 8820, Lomas de Zamora', telefono: '011 4292-4400', lat: -34.7620, lng: -58.4005 },
  { id: 19, nombre: 'Lab. Diagnóstico Lomas',           especialidad: 'Laboratorio',                localidad: 'Lomas de Zamora',direccion: 'Garibaldi 590, Lomas de Zamora',      telefono: '011 4293-1100', lat: -34.7598, lng: -58.3970 },

  // Quilmes
  { id: 20, nombre: 'Centro Cardiológico Quilmes',      especialidad: 'Cardiología',                localidad: 'Quilmes',        direccion: 'Av. Calchaquí 3810, Quilmes',         telefono: '011 4224-9900', lat: -34.7198, lng: -58.2541 },
  { id: 21, nombre: 'Psicólogos Asociados Quilmes',     especialidad: 'Psicología',                 localidad: 'Quilmes',        direccion: 'Av. Mitre 780, Quilmes',              telefono: '011 4253-3300', lat: -34.7210, lng: -58.2569 },
  { id: 22, nombre: 'Farmacia Del Centro Quilmes',      especialidad: 'Farmacia',                   localidad: 'Quilmes',        direccion: 'Rivadavia 550, Quilmes',              telefono: '011 4253-7700', lat: -34.7225, lng: -58.2548 },

  // Morón
  { id: 23, nombre: 'Sanatorio San Lucas',              especialidad: 'Clínica Médica',            localidad: 'Morón',          direccion: 'Av. Rivadavia 17250, Morón',          telefono: '011 4629-2200', lat: -34.6537, lng: -58.6205 },
  { id: 24, nombre: 'Dr. Carlos Méndez',                especialidad: 'Neurología',                 localidad: 'Morón',          direccion: 'Av. Gaona 3480, Morón',               telefono: '011 4628-5500', lat: -34.6512, lng: -58.6195 },

  // San Martín
  { id: 25, nombre: 'Centro Kinesiológico Norte',       especialidad: 'Kinesiología',               localidad: 'San Martín',     direccion: 'Av. San Martín 2891, San Martín',    telefono: '011 4752-8800', lat: -34.5751, lng: -58.5432 },
  { id: 26, nombre: 'Endocrinología y Nutrición SM',    especialidad: 'Endocrinología',             localidad: 'San Martín',     direccion: 'Belgrano 1540, San Martín',           telefono: '011 4754-4400', lat: -34.5763, lng: -58.5441 },

  // Rosario
  { id: 27, nombre: 'Centro Médico Rosario Centro',     especialidad: 'Clínica Médica',            localidad: 'Rosario',        direccion: 'Córdoba 1980, Rosario',               telefono: '0341 422-5500', lat: -32.9468, lng: -60.6393 },
  { id: 28, nombre: 'Dermatología Rosario',             especialidad: 'Dermatología',               localidad: 'Rosario',        direccion: 'Santa Fe 1760, Rosario',              telefono: '0341 440-3300', lat: -32.9512, lng: -60.6327 },
  { id: 29, nombre: 'Lab. Bioquímico Rosario',          especialidad: 'Laboratorio',                localidad: 'Rosario',        direccion: 'Av. Pellegrini 810, Rosario',         telefono: '0341 448-7700', lat: -32.9489, lng: -60.6411 },

  // Córdoba
  { id: 30, nombre: 'Clínica Universitaria Córdoba',    especialidad: 'Clínica Médica',            localidad: 'Córdoba',        direccion: 'Av. Colón 1180, Córdoba',             telefono: '0351 414-2200', lat: -31.4167, lng: -64.1833 },
  { id: 31, nombre: 'Traumatología Córdoba Centro',     especialidad: 'Traumatología',              localidad: 'Córdoba',        direccion: 'Obispo Trejo 760, Córdoba',           telefono: '0351 422-8800', lat: -31.4183, lng: -64.1872 },
  { id: 32, nombre: 'Farmacia Buen Pastor',             especialidad: 'Farmacia',                   localidad: 'Córdoba',        direccion: 'Av. Vélez Sarsfield 1420, Córdoba',  telefono: '0351 460-5500', lat: -31.4201, lng: -64.1845 },
]
