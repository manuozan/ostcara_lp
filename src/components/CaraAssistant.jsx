import { useState, useRef, useEffect } from 'react'
import caraAvatar from '../assets/cara.png'

// ── Knowledge base ─────────────────────────────────────────────────────────────

const FLOWS = {
  welcome: {
    messages: [
      '¡Hola! Soy **BOTSCARA**, tu asistente de OSTCARA. 👋',
      '¿En qué puedo ayudarte hoy?',
    ],
    options: [
      { label: '📋 Quiero afiliarme', next: 'afiliacion_menu' },
      { label: '✅ Autorizar prestaciones', next: 'autorizaciones_menu' },
      { label: '💳 Coseguros', next: 'coseguros_info' },
      { label: '📞 Contacto y delegaciones', next: 'contacto_info' },
    ],
  },

  // ── AFILIACIÓN ───────────────────────────────────────────────────────────────
  afiliacion_menu: {
    messages: ['¿Bajo qué tipo de aporte estás afiliado o vas a afiliarte?'],
    options: [
      { label: 'Relación de dependencia', next: 'afiliacion_dependencia_menu' },
      { label: 'Monotributo', next: 'afiliacion_monotributo_tipo' },
      { label: 'Servicio doméstico', next: 'afiliacion_servicio_domestico_menu' },
      { label: 'Opción de cambio de obra social', next: 'afiliacion_cambio' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'welcome',
  },

  afiliacion_monotributo_tipo: {
    messages: ['¿Sos monotributista **común** o **social**?'],
    options: [
      { label: 'Monotributo común', next: 'afiliacion_monotributo_menu' },
      { label: 'Monotributo social', next: 'afiliacion_monotributo_social_menu' },
      { label: '← Volver a afiliación', next: 'afiliacion_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'afiliacion_menu',
  },

  // Relación de dependencia
  afiliacion_dependencia_menu: {
    messages: ['**Relación de dependencia** — ¿para quién necesitás la documentación?'],
    options: [
      { label: 'Titular', next: 'afiliacion_dependencia_titular' },
      { label: 'Cónyuge / Concubina', next: 'afiliacion_dependencia_conyuge' },
      { label: 'Hijos', next: 'afiliacion_dependencia_hijos' },
      { label: '← Volver a afiliación', next: 'afiliacion_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'afiliacion_menu',
  },
  afiliacion_dependencia_titular: {
    messages: [
      '**Titular — Relación de dependencia:**',
      '• Último recibo de sueldo\n• Alta temprana de trabajador (en caso de ser un alta reciente)\n• DNI frente y dorso\n• Certificado de opción de cambio (solo en caso de haberlo realizado)',
    ],
    options: [
      { label: 'Ver Cónyuge / Concubina', next: 'afiliacion_dependencia_conyuge' },
      { label: 'Ver Hijos', next: 'afiliacion_dependencia_hijos' },
      { label: 'Consultar por mail', next: 'afiliacion_mail' },
      { label: '← Volver', next: 'afiliacion_dependencia_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'afiliacion_dependencia_menu',
  },
  afiliacion_dependencia_conyuge: {
    messages: [
      '**Cónyuge / Concubina — Relación de dependencia:**',
      '• Negativa de la ANSES\n• Certificado de matrimonio / concubinato\n• DNI frente y dorso\n• Último recibo de sueldo del titular',
    ],
    options: [
      { label: 'Ver Titular', next: 'afiliacion_dependencia_titular' },
      { label: 'Ver Hijos', next: 'afiliacion_dependencia_hijos' },
      { label: 'Consultar por mail', next: 'afiliacion_mail' },
      { label: '← Volver', next: 'afiliacion_dependencia_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'afiliacion_dependencia_menu',
  },
  afiliacion_dependencia_hijos: {
    messages: [
      '**Hijos — Relación de dependencia:**',
      '• Último recibo de sueldo del titular\n• Constancia de CUIL\n• DNI frente y dorso\n• Partida de nacimiento',
      '📌 Los hijos solteros mayores de 21 años tienen cobertura hasta los 25 años presentando certificado de alumno regular.',
    ],
    options: [
      { label: 'Ver Titular', next: 'afiliacion_dependencia_titular' },
      { label: 'Consultar por mail', next: 'afiliacion_mail' },
      { label: '← Volver', next: 'afiliacion_dependencia_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'afiliacion_dependencia_menu',
  },

  // Monotributo
  afiliacion_monotributo_menu: {
    messages: [
      '**Monotributo** — ¿para quién necesitás la documentación?',
      '📌 Deberás presentar todos los meses el ticket de pago AFIP actualizado. Para incorporar grupo familiar primario, debés abonar un importe adicional vía AFIP.',
    ],
    options: [
      { label: 'Titular', next: 'afiliacion_monotributo_titular' },
      { label: 'Cónyuge / Concubina', next: 'afiliacion_monotributo_conyuge' },
      { label: 'Hijos', next: 'afiliacion_monotributo_hijos' },
      { label: '← Volver', next: 'afiliacion_monotributo_tipo' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'afiliacion_monotributo_tipo',
  },
  afiliacion_monotributo_titular: {
    messages: [
      '**Titular — Monotributo:**',
      '• F184 ARCA\n• F152 (credencial de pago de monotributo)\n• DNI frente y dorso\n• Últimos 3 pagos\n• Certificado de opción de cambio SSSalud (solo si se realizó)',
    ],
    options: [
      { label: 'Ver Cónyuge / Concubina', next: 'afiliacion_monotributo_conyuge' },
      { label: 'Ver Hijos', next: 'afiliacion_monotributo_hijos' },
      { label: 'Consultar por mail', next: 'afiliacion_mail' },
      { label: '← Volver', next: 'afiliacion_monotributo_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'afiliacion_monotributo_menu',
  },
  afiliacion_monotributo_conyuge: {
    messages: [
      '**Cónyuge / Concubina — Monotributo:**',
      '• Negativa de la ANSES\n• F184 ARCA (actualizado con adherentes)\n• F152 (actualizado con el valor del adherente)\n• DNI frente y dorso\n• Certificado de matrimonio / concubinato\n• Último pago (con el adherente)',
    ],
    options: [
      { label: 'Ver Titular', next: 'afiliacion_monotributo_titular' },
      { label: 'Ver Hijos', next: 'afiliacion_monotributo_hijos' },
      { label: 'Consultar por mail', next: 'afiliacion_mail' },
      { label: '← Volver', next: 'afiliacion_monotributo_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'afiliacion_monotributo_menu',
  },
  afiliacion_monotributo_hijos: {
    messages: [
      '**Hijos — Monotributo:**',
      '• F184 ARCA (actualizado con adherentes)\n• F152 (actualizado con el valor del adherente)\n• DNI frente y dorso\n• Constancia de CUIL\n• Partida de nacimiento\n• Último pago (con el adherente)\n• CUD actualizado',
    ],
    options: [
      { label: 'Ver Titular', next: 'afiliacion_monotributo_titular' },
      { label: 'Consultar por mail', next: 'afiliacion_mail' },
      { label: '← Volver', next: 'afiliacion_monotributo_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'afiliacion_monotributo_menu',
  },

  // Monotributo social
  afiliacion_monotributo_social_menu: {
    messages: ['**Monotributo social** — ¿para quién necesitás la documentación?'],
    options: [
      { label: 'Titular', next: 'afiliacion_monotributo_social_titular' },
      { label: 'Cónyuge / Concubina', next: 'afiliacion_monotributo_social_conyuge' },
      { label: 'Hijos', next: 'afiliacion_monotributo_social_hijos' },
      { label: '← Volver', next: 'afiliacion_monotributo_tipo' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'afiliacion_monotributo_tipo',
  },
  afiliacion_monotributo_social_titular: {
    messages: [
      '**Titular — Monotributo social:**',
      '• Certificado de elección de obra social (ANSES)\n• F152 (credencial de pago de monotributo)\n• DNI frente y dorso\n• Últimos 3 pagos\n• Certificado de opción de cambio (solo en caso de haberlo realizado)',
    ],
    options: [
      { label: 'Ver Cónyuge / Concubina', next: 'afiliacion_monotributo_social_conyuge' },
      { label: 'Ver Hijos', next: 'afiliacion_monotributo_social_hijos' },
      { label: 'Consultar por mail', next: 'afiliacion_mail' },
      { label: '← Volver', next: 'afiliacion_monotributo_social_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'afiliacion_monotributo_social_menu',
  },
  afiliacion_monotributo_social_conyuge: {
    messages: [
      '**Cónyuge / Concubina — Monotributo social:**',
      '• Negativa de la ANSES\n• Certificado elección obra social (ANSES - adherente actualizado)\n• F152 (con el valor del adherente actualizado)\n• DNI frente y dorso\n• Certificado de matrimonio / concubinato\n• Último pago (con adherente)',
    ],
    options: [
      { label: 'Ver Titular', next: 'afiliacion_monotributo_social_titular' },
      { label: 'Ver Hijos', next: 'afiliacion_monotributo_social_hijos' },
      { label: 'Consultar por mail', next: 'afiliacion_mail' },
      { label: '← Volver', next: 'afiliacion_monotributo_social_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'afiliacion_monotributo_social_menu',
  },
  afiliacion_monotributo_social_hijos: {
    messages: [
      '**Hijos — Monotributo social:**',
      '• Certificado elección obra social (ANSES - adherente actualizado)\n• F152 (con el valor del adherente actualizado)\n• DNI frente y dorso\n• Partida de nacimiento\n• Constancia de CUIL\n• Último pago (con adherente)\n• CUD actualizado',
    ],
    options: [
      { label: 'Ver Titular', next: 'afiliacion_monotributo_social_titular' },
      { label: 'Consultar por mail', next: 'afiliacion_mail' },
      { label: '← Volver', next: 'afiliacion_monotributo_social_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'afiliacion_monotributo_social_menu',
  },

  // Servicio doméstico
  afiliacion_servicio_domestico_menu: {
    messages: [
      '**Servicio doméstico** — ¿para quién necesitás la documentación?',
      '📌 Deberás presentar todos los meses el ticket de pago AFIP actualizado.',
    ],
    options: [
      { label: 'Titular', next: 'afiliacion_servicio_domestico_titular' },
      { label: 'Cónyuge / Concubina', next: 'afiliacion_servicio_domestico_conyuge' },
      { label: 'Hijos', next: 'afiliacion_servicio_domestico_hijos' },
      { label: '← Volver a afiliación', next: 'afiliacion_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'afiliacion_menu',
  },
  afiliacion_servicio_domestico_titular: {
    messages: [
      '**Titular — Servicio doméstico:**',
      '• F102/RT (formulario de pago ARCA)\n• Constancia de alta de trabajador (ARCA - solicitar al empleador)\n• Último recibo de sueldo\n• Último pago\n• DNI frente y dorso\n• Certificado de opción de cambio (solo en caso de haberlo realizado)',
    ],
    options: [
      { label: 'Ver Cónyuge / Concubina', next: 'afiliacion_servicio_domestico_conyuge' },
      { label: 'Ver Hijos', next: 'afiliacion_servicio_domestico_hijos' },
      { label: 'Consultar por mail', next: 'afiliacion_mail' },
      { label: '← Volver', next: 'afiliacion_servicio_domestico_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'afiliacion_servicio_domestico_menu',
  },
  afiliacion_servicio_domestico_conyuge: {
    messages: [
      '**Cónyuge / Concubina — Servicio doméstico:**',
      '• Negativa de la ANSES\n• F575/RT (con el adherente)\n• Último recibo de sueldo del titular\n• Último pago (con el adherente)\n• DNI frente y dorso\n• Certificado de matrimonio / concubinato',
    ],
    options: [
      { label: 'Ver Titular', next: 'afiliacion_servicio_domestico_titular' },
      { label: 'Ver Hijos', next: 'afiliacion_servicio_domestico_hijos' },
      { label: 'Consultar por mail', next: 'afiliacion_mail' },
      { label: '← Volver', next: 'afiliacion_servicio_domestico_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'afiliacion_servicio_domestico_menu',
  },
  afiliacion_servicio_domestico_hijos: {
    messages: [
      '**Hijos — Servicio doméstico:**',
      '• F575/RT (con el adherente)\n• Último recibo de sueldo del titular\n• Último pago (con el adherente)\n• DNI frente y dorso\n• Partida de nacimiento\n• Constancia de CUIL',
    ],
    options: [
      { label: 'Ver Titular', next: 'afiliacion_servicio_domestico_titular' },
      { label: 'Consultar por mail', next: 'afiliacion_mail' },
      { label: '← Volver', next: 'afiliacion_servicio_domestico_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'afiliacion_servicio_domestico_menu',
  },

  afiliacion_cambio: {
    messages: [
      '**Opción de cambio de obra social — Res. 1216/2020**',
      'La opción de cambio se gestiona directamente en **MI SSSALUD** (sssalud.gob.ar/misssalud) desde la web, sin intermediarios.',
      '📌 Necesitás **Clave Fiscal nivel 3** o superior y adherir el servicio MI SSSALUD.',
      '📌 Una vez realizada, debés esperar **1 año** para hacer otra opción.',
      '**Documentación a presentar ante OSTCARA:**\n• Certificado de opción\n• DNI (frente y dorso) del titular\n• Últimos 2 recibos de sueldo\n• Documentación del grupo familiar (si aplica)',
    ],
    options: [
      { label: 'Consultar por mail', next: 'afiliacion_mail' },
      { label: '← Volver a afiliación', next: 'afiliacion_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'afiliacion_menu',
  },

  afiliacion_mail: {
    messages: [
      '📧 Podés enviar tus consultas de afiliación a:\n**afiliaciones@ostcara.org.ar**',
      'Te responderemos a la brevedad.',
    ],
    options: [
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'afiliacion_menu',
  },

  // ── AUTORIZACIONES ───────────────────────────────────────────────────────────
  autorizaciones_menu: {
    messages: ['¿Qué tipo de autorización necesitás?'],
    options: [
      { label: 'Cómo solicitar una autorización', next: 'autorizaciones_como' },
      { label: 'Estudios y prácticas ambulatorias', next: 'autorizaciones_estudios' },
      { label: 'Internación', next: 'autorizaciones_internacion' },
      { label: 'Medicación de alto costo', next: 'autorizaciones_medicacion' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'welcome',
  },

  autorizaciones_como: {
    messages: [
      '**¿Cómo solicitar una autorización?**',
      'Podés gestionarla de las siguientes formas:',
      '1️⃣ **Portal del afiliado:** ingresá a tu portal con tu número de afiliado y solicitá la autorización online.\n2️⃣ **Presencialmente:** acercate a cualquier delegación de OSTCARA con la documentación del médico.\n3️⃣ **Por mail:** enviá la documentación escaneada al área de autorizaciones.',
      '📌 Siempre necesitás la **orden médica** con diagnóstico y código de práctica (nomenclador).',
    ],
    options: [
      { label: 'Documentación necesaria para estudios', next: 'autorizaciones_estudios' },
      { label: 'Contacto autorizaciones', next: 'autorizaciones_contacto' },
      { label: '← Volver a autorizaciones', next: 'autorizaciones_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'autorizaciones_menu',
  },

  autorizaciones_estudios: {
    messages: [
      '**Estudios y prácticas ambulatorias:**',
      '📄 Documentación requerida:\n• Orden médica original con diagnóstico, firma y sello del médico\n• Código de práctica del nomenclador PMO\n• DNI del afiliado\n• Número de afiliado',
      '📌 El médico debe estar inscripto en el **padrón de OSTCARA** (cartilla médica).',
    ],
    options: [
      { label: 'Consultar cartilla de prestadores', next: 'autorizaciones_cartilla' },
      { label: 'Contacto autorizaciones', next: 'autorizaciones_contacto' },
      { label: '← Volver a autorizaciones', next: 'autorizaciones_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'autorizaciones_menu',
  },

  autorizaciones_internacion: {
    messages: [
      '**Internación:**',
      'Para internaciones programadas, el médico tratante o el sanatorio deben comunicarse con OSTCARA **con anticipación** para la autorización previa.',
      '📄 Se requiere:\n• Diagnóstico\n• Práctica o cirugía a realizar\n• Nombre del médico y establecimiento\n• Número de afiliado',
      '🚨 Para **internaciones de urgencia**, el establecimiento tiene 24–48 hs para notificar a la obra social.',
    ],
    options: [
      { label: 'Contacto autorizaciones', next: 'autorizaciones_contacto' },
      { label: '← Volver a autorizaciones', next: 'autorizaciones_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'autorizaciones_menu',
  },

  autorizaciones_medicacion: {
    messages: [
      '**Medicación de alto costo o crónica:**',
      '📄 Documentación requerida:\n• Prescripción médica con diagnóstico y nombre comercial / genérico del medicamento\n• Historia clínica o resumen (para medicación de alto costo)\n• Estudios que avalen el diagnóstico (si corresponde)',
      '📌 Algunos medicamentos requieren auditoría médica previa. El proceso puede demorar hasta 72 hs hábiles.',
    ],
    options: [
      { label: 'Contacto autorizaciones', next: 'autorizaciones_contacto' },
      { label: '← Volver a autorizaciones', next: 'autorizaciones_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'autorizaciones_menu',
  },

  autorizaciones_cartilla: {
    messages: [
      '📋 Podés consultar la cartilla de prestadores en la sección **CARTILLA** del sitio.',
      'Allí encontrás médicos, clínicas y laboratorios habilitados por OSTCARA en tu zona.',
    ],
    options: [
      { label: 'Contacto autorizaciones', next: 'autorizaciones_contacto' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'autorizaciones_menu',
  },

  autorizaciones_contacto: {
    messages: [
      '📧 Contacto para autorizaciones:\n**autorizaciones@ostcara.org.ar**',
      '🕐 Horario de atención: lunes a viernes de 8:00 a 16:00 hs.',
    ],
    options: [
      { label: '← Volver a autorizaciones', next: 'autorizaciones_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'autorizaciones_menu',
  },

  // ── COSEGUROS ────────────────────────────────────────────────────────────────
  coseguros_info: {
    messages: [
      'Los coseguros se abonan directamente en el prestador al momento de la consulta. ¿Bajo qué tipo de aporte estás afiliado?',
    ],
    options: [
      { label: 'Relación de dependencia', next: 'coseguros_dependencia_menu' },
      { label: 'Monotributo / Monotributo social / Servicio doméstico', next: 'coseguros_monotributo_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'welcome',
  },

  // Relación de dependencia
  coseguros_dependencia_menu: {
    messages: ['**Coseguros — Relación de Dependencia** (vigencia Julio 2026)\n¿Qué práctica querés consultar?'],
    options: [
      { label: 'Consultas', next: 'coseguros_dependencia_consultas' },
      { label: 'Psicología', next: 'coseguros_dependencia_psicologia' },
      { label: 'Laboratorio', next: 'coseguros_dependencia_laboratorio' },
      { label: 'Diagnósticas y terapéuticas', next: 'coseguros_dependencia_diagnosticas' },
      { label: 'Kinesiología y fisiatría', next: 'coseguros_dependencia_kinesio' },
      { label: 'Fonoaudiología', next: 'coseguros_dependencia_fono' },
      { label: 'Atención domiciliaria', next: 'coseguros_dependencia_domiciliaria' },
      { label: 'Odontología', next: 'coseguros_dependencia_odontologia' },
      { label: 'Atención integral (por ley)', next: 'coseguros_dependencia_integral' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'coseguros_info',
  },
  coseguros_dependencia_consultas: {
    messages: [
      '**Consultas — Relación de Dependencia:**',
      '• Médico de familia, generalista, pediatras, tocoginecólogo — $9.521,70\n• Médicos especialistas — $16.498,50\n• Programa HIV y Oncología — EXENTO\n• Oncología — EXENTO\n• Discapacidad — EXENTO\n• Plan Materno Infantil — EXENTO\n• Programas Preventivos — EXENTO',
      '📌 ¿Buscás valores de otro mes? Entrá a la sección **COSEGUROS** del sitio (/coseguros) y presioná el botón **"Ver histórico"** para consultar meses anteriores o el próximo mes.',
    ],
    options: [
      { label: 'Ver otra práctica', next: 'coseguros_dependencia_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'coseguros_dependencia_menu',
  },
  coseguros_dependencia_psicologia: {
    messages: [
      '**Psicología — Relación de Dependencia:**',
      '• Sesión incluida — $13.622,10\n• Sesión excedente — $25.923,30',
      '📌 ¿Buscás valores de otro mes? Entrá a la sección **COSEGUROS** del sitio (/coseguros) y presioná el botón **"Ver histórico"** para consultar meses anteriores o el próximo mes.',
    ],
    options: [
      { label: 'Ver otra práctica', next: 'coseguros_dependencia_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'coseguros_dependencia_menu',
  },
  coseguros_dependencia_laboratorio: {
    messages: [
      '**Prácticas de laboratorio — Relación de Dependencia:**',
      '• Hasta 6 determinaciones básicas — $6.222\n• Valor extra por prestación adicional a las 6 definidas — $2.636,70',
      '📌 ¿Buscás valores de otro mes? Entrá a la sección **COSEGUROS** del sitio (/coseguros) y presioná el botón **"Ver histórico"** para consultar meses anteriores o el próximo mes.',
    ],
    options: [
      { label: 'Ver otra práctica', next: 'coseguros_dependencia_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'coseguros_dependencia_menu',
  },
  coseguros_dependencia_diagnosticas: {
    messages: [
      '**Prácticas diagnósticas y terapéuticas — Relación de Dependencia:**',
      '• Imágenes de baja complejidad (RX simple y ecografía simple) — $6.222\n• Mediana complejidad — $11.862,60\n• Alta complejidad (TAC, RMN, RIE, laboratorio biomolecular/genético, medicina nuclear, endoscopía) — $28.050',
      '📌 ¿Buscás valores de otro mes? Entrá a la sección **COSEGUROS** del sitio (/coseguros) y presioná el botón **"Ver histórico"** para consultar meses anteriores o el próximo mes.',
    ],
    options: [
      { label: 'Ver otra práctica', next: 'coseguros_dependencia_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'coseguros_dependencia_menu',
  },
  coseguros_dependencia_kinesio: {
    messages: [
      '**Kinesiología y fisiatría — Relación de Dependencia:**',
      '• Por sesión — $6.446,40\n• Por sesión excedente — $1.383,12\n• Prácticas de enfermería — EXENTO',
      '📌 ¿Buscás valores de otro mes? Entrá a la sección **COSEGUROS** del sitio (/coseguros) y presioná el botón **"Ver histórico"** para consultar meses anteriores o el próximo mes.',
    ],
    options: [
      { label: 'Ver otra práctica', next: 'coseguros_dependencia_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'coseguros_dependencia_menu',
  },
  coseguros_dependencia_fono: {
    messages: [
      '**Fonoaudiología — Relación de Dependencia:**',
      '• Por sesión de fonoaudiología y foniatría — $6.222',
      '📌 ¿Buscás valores de otro mes? Entrá a la sección **COSEGUROS** del sitio (/coseguros) y presioná el botón **"Ver histórico"** para consultar meses anteriores o el próximo mes.',
    ],
    options: [
      { label: 'Ver otra práctica', next: 'coseguros_dependencia_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'coseguros_dependencia_menu',
  },
  coseguros_dependencia_domiciliaria: {
    messages: [
      '**Atención domiciliaria — Relación de Dependencia:**',
      '• Diurna (código verde) — $27.534,90\n• Nocturna (código verde) — $43.278,60\n• Emergencias (código rojo) — EXENTO\n• Mayores de 65 años — $1.528,47',
      '📌 ¿Buscás valores de otro mes? Entrá a la sección **COSEGUROS** del sitio (/coseguros) y presioná el botón **"Ver histórico"** para consultar meses anteriores o el próximo mes.',
    ],
    options: [
      { label: 'Ver otra práctica', next: 'coseguros_dependencia_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'coseguros_dependencia_menu',
  },
  coseguros_dependencia_odontologia: {
    messages: [
      '**Odontología — Relación de Dependencia:**',
      '• Consultas — $12.036\n• Consultas para menores de 15 años y mayores de 65 años — $6.222\n• Prácticas odontológicas — $12.036',
      '📌 ¿Buscás valores de otro mes? Entrá a la sección **COSEGUROS** del sitio (/coseguros) y presioná el botón **"Ver histórico"** para consultar meses anteriores o el próximo mes.',
    ],
    options: [
      { label: 'Ver otra práctica', next: 'coseguros_dependencia_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'coseguros_dependencia_menu',
  },
  coseguros_dependencia_integral: {
    messages: [
      '**Atención integral (coberturas por ley) — Relación de Dependencia:**',
      '• Atención y cuidado integral durante embarazo y 1ra infancia (Ley 27.611) — EXENTO\n• Respuesta integral al HIV, Hepatitis, ITS y tuberculosis (Ley 25.675) — EXENTO\n• Protección integral para personas trasplantadas (Ley 26.928) — EXENTO\n• Trasplante de órganos, tejidos y células (Ley 27.447) — EXENTO',
      '📌 ¿Buscás valores de otro mes? Entrá a la sección **COSEGUROS** del sitio (/coseguros) y presioná el botón **"Ver histórico"** para consultar meses anteriores o el próximo mes.',
    ],
    options: [
      { label: 'Ver otra práctica', next: 'coseguros_dependencia_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'coseguros_dependencia_menu',
  },

  // Monotributo / Monotributo social / Servicio doméstico
  coseguros_monotributo_menu: {
    messages: ['**Coseguros — Monotributo / Monotributo Social / Servicio Doméstico** (vigencia Julio 2026)\n¿Qué práctica querés consultar?'],
    options: [
      { label: 'Consultas', next: 'coseguros_monotributo_consultas' },
      { label: 'Psicología', next: 'coseguros_monotributo_psicologia' },
      { label: 'Laboratorio', next: 'coseguros_monotributo_laboratorio' },
      { label: 'Diagnósticas y terapéuticas', next: 'coseguros_monotributo_diagnosticas' },
      { label: 'Kinesiología y fisiatría', next: 'coseguros_monotributo_kinesio' },
      { label: 'Fonoaudiología', next: 'coseguros_monotributo_fono' },
      { label: 'Atención domiciliaria', next: 'coseguros_monotributo_domiciliaria' },
      { label: 'Odontología', next: 'coseguros_monotributo_odontologia' },
      { label: 'Atención integral (por ley)', next: 'coseguros_monotributo_integral' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'coseguros_info',
  },
  coseguros_monotributo_consultas: {
    messages: [
      '**Consultas — Monotributo / Monotributo Social / Servicio Doméstico:**',
      '• Médico de familia, generalista, pediatras, tocoginecólogo — $24.280\n• Médicos especialistas — $36.540\n• Programa HIV y Oncología — EXENTO\n• Oncología — EXENTO\n• Discapacidad — EXENTO\n• Plan Materno Infantil — EXENTO\n• Programas Preventivos — EXENTO',
      '📌 ¿Buscás valores de otro mes? Entrá a la sección **COSEGUROS** del sitio (/coseguros) y presioná el botón **"Ver histórico"** para consultar meses anteriores o el próximo mes.',
    ],
    options: [
      { label: 'Ver otra práctica', next: 'coseguros_monotributo_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'coseguros_monotributo_menu',
  },
  coseguros_monotributo_psicologia: {
    messages: [
      '**Psicología — Monotributo / Monotributo Social / Servicio Doméstico:**',
      '• Sesión incluida — $24.280\n• Sesión excedente — $36.545',
      '📌 ¿Buscás valores de otro mes? Entrá a la sección **COSEGUROS** del sitio (/coseguros) y presioná el botón **"Ver histórico"** para consultar meses anteriores o el próximo mes.',
    ],
    options: [
      { label: 'Ver otra práctica', next: 'coseguros_monotributo_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'coseguros_monotributo_menu',
  },
  coseguros_monotributo_laboratorio: {
    messages: [
      '**Prácticas de laboratorio — Monotributo / Monotributo Social / Servicio Doméstico:**',
      '• Hasta 6 determinaciones básicas — $14.625\n• Valor extra por prestación adicional a las 6 definidas — $5.987',
      '📌 ¿Buscás valores de otro mes? Entrá a la sección **COSEGUROS** del sitio (/coseguros) y presioná el botón **"Ver histórico"** para consultar meses anteriores o el próximo mes.',
    ],
    options: [
      { label: 'Ver otra práctica', next: 'coseguros_monotributo_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'coseguros_monotributo_menu',
  },
  coseguros_monotributo_diagnosticas: {
    messages: [
      '**Prácticas diagnósticas y terapéuticas — Monotributo / Monotributo Social / Servicio Doméstico:**',
      '• Imágenes de baja complejidad (RX simple y ecografía simple) — $14.625\n• Mediana complejidad — $23.140\n• Alta complejidad (TAC, RMN, RIE, laboratorio biomolecular/genético, medicina nuclear, endoscopía) — $59.700,60',
      '📌 ¿Buscás valores de otro mes? Entrá a la sección **COSEGUROS** del sitio (/coseguros) y presioná el botón **"Ver histórico"** para consultar meses anteriores o el próximo mes.',
    ],
    options: [
      { label: 'Ver otra práctica', next: 'coseguros_monotributo_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'coseguros_monotributo_menu',
  },
  coseguros_monotributo_kinesio: {
    messages: [
      '**Kinesiología y fisiatría — Monotributo / Monotributo Social / Servicio Doméstico:**',
      '• Por sesión — $14.625\n• Por sesión excedente — $21.496,50\n• Prácticas de enfermería — EXENTO',
      '📌 ¿Buscás valores de otro mes? Entrá a la sección **COSEGUROS** del sitio (/coseguros) y presioná el botón **"Ver histórico"** para consultar meses anteriores o el próximo mes.',
    ],
    options: [
      { label: 'Ver otra práctica', next: 'coseguros_monotributo_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'coseguros_monotributo_menu',
  },
  coseguros_monotributo_fono: {
    messages: [
      '**Fonoaudiología — Monotributo / Monotributo Social / Servicio Doméstico:**',
      '• Por sesión de fonoaudiología y foniatría — $14.625',
      '📌 ¿Buscás valores de otro mes? Entrá a la sección **COSEGUROS** del sitio (/coseguros) y presioná el botón **"Ver histórico"** para consultar meses anteriores o el próximo mes.',
    ],
    options: [
      { label: 'Ver otra práctica', next: 'coseguros_monotributo_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'coseguros_monotributo_menu',
  },
  coseguros_monotributo_domiciliaria: {
    messages: [
      '**Atención domiciliaria — Monotributo / Monotributo Social / Servicio Doméstico:**',
      '• Diurna (código verde) — $59.700,60\n• Nocturna (código verde) — $119.406,30\n• Emergencias (código rojo) — EXENTO\n• Mayores de 65 años — $36.540',
      '📌 ¿Buscás valores de otro mes? Entrá a la sección **COSEGUROS** del sitio (/coseguros) y presioná el botón **"Ver histórico"** para consultar meses anteriores o el próximo mes.',
    ],
    options: [
      { label: 'Ver otra práctica', next: 'coseguros_monotributo_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'coseguros_monotributo_menu',
  },
  coseguros_monotributo_odontologia: {
    messages: [
      '**Odontología — Monotributo / Monotributo Social / Servicio Doméstico:**',
      '• Consultas — $23.138\n• Consultas para menores de 15 años y mayores de 65 años — $17.057\n• Prácticas odontológicas — $23.140',
      '📌 ¿Buscás valores de otro mes? Entrá a la sección **COSEGUROS** del sitio (/coseguros) y presioná el botón **"Ver histórico"** para consultar meses anteriores o el próximo mes.',
    ],
    options: [
      { label: 'Ver otra práctica', next: 'coseguros_monotributo_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'coseguros_monotributo_menu',
  },
  coseguros_monotributo_integral: {
    messages: [
      '**Atención integral (coberturas por ley) — Monotributo / Monotributo Social / Servicio Doméstico:**',
      '• Atención y cuidado integral durante embarazo y 1ra infancia (Ley 27.611) — EXENTO\n• Respuesta integral al HIV, Hepatitis, ITS y tuberculosis (Ley 25.675) — EXENTO\n• Protección integral para personas trasplantadas (Ley 26.928) — EXENTO\n• Trasplante de órganos, tejidos y células (Ley 27.447) — EXENTO',
      '📌 ¿Buscás valores de otro mes? Entrá a la sección **COSEGUROS** del sitio (/coseguros) y presioná el botón **"Ver histórico"** para consultar meses anteriores o el próximo mes.',
    ],
    options: [
      { label: 'Ver otra práctica', next: 'coseguros_monotributo_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'coseguros_monotributo_menu',
  },

  // ── CONTACTO ─────────────────────────────────────────────────────────────────
  contacto_info: {
    messages: [
      '**Contacto y delegaciones**',
      '📧 Consultas generales: **consultas@ostcara.org.ar**\n📧 Afiliaciones: **afiliaciones@ostcara.org.ar**',
      '🌐 También podés encontrar la delegación más cercana en la sección **DELEGACIONES** del sitio.',
    ],
    options: [
      { label: 'Ver delegaciones', next: 'contacto_delegaciones' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'welcome',
  },

  contacto_delegaciones: {
    messages: [
      '🗺️ OSTCARA cuenta con delegaciones en distintas localidades del país.',
      'Ingresá a la sección **DELEGACIONES** del sitio para ver la dirección, teléfono y horario de la delegación más cercana a vos.',
    ],
    options: [
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'contacto_info',
  },

  contacto_mail: {
    messages: [
      '📧 Consultas generales: **consultas@ostcara.org.ar**',
    ],
    options: [
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'welcome',
  },
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function renderText(text) {
  // Bold: **text**
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  )
}

function BubbleText({ text }) {
  const lines = text.split('\n')
  return (
    <span>
      {lines.map((line, i) => (
        <span key={i}>
          {renderText(line)}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </span>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function CaraAssistant() {
  const [open, setOpen] = useState(false)
  const [currentFlow, setCurrentFlow] = useState('welcome')
  const [history, setHistory] = useState([])
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState(false)
  const [showTeaser, setShowTeaser] = useState(false)
  const bottomRef = useRef(null)
  const initialized = useRef(false)

  // Show a proactive greeting bubble after a while on the page
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!open) setShowTeaser(true)
    }, 8000)
    return () => clearTimeout(timer)
  }, [])

  // Push messages from a flow with a typing delay
  const playFlow = (flowKey, userLabel = null) => {
    const flow = FLOWS[flowKey]
    if (!flow) return
    setCurrentFlow(flowKey)

    const newMsgs = []
    if (userLabel) {
      newMsgs.push({ type: 'user', text: userLabel })
    }

    setMessages(prev => [...prev, ...newMsgs])
    setTyping(true)

    let delay = userLabel ? 500 : 200
    const botMsgs = flow.messages.map((text, i) => ({ type: 'bot', text, id: Date.now() + i }))

    botMsgs.forEach((msg, i) => {
      delay += i === 0 ? 600 : 700
      setTimeout(() => {
        setMessages(prev => [...prev, msg])
        if (i === botMsgs.length - 1) setTyping(false)
      }, delay)
    })
  }

  // Initialize on first open
  useEffect(() => {
    if (open && !initialized.current) {
      initialized.current = true
      playFlow('welcome')
    }
    if (open) setShowTeaser(false)
  }, [open])

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const handleOption = (option) => {
    setHistory(prev => [...prev, currentFlow])
    playFlow(option.next, option.label)
  }

  const handleReset = () => {
    setMessages([])
    setHistory([])
    setCurrentFlow('welcome')
    initialized.current = false
    setTimeout(() => {
      initialized.current = true
      playFlow('welcome')
    }, 50)
  }

  const flow = FLOWS[currentFlow]
  const showOptions = !typing && flow?.options?.length > 0

  return (
    <>
      <style>{`
        .cara-panel {
          height: calc(100svh - 5.5rem);
        }
        @media (min-width: 768px) {
          .cara-panel {
            height: min(720px, calc(100vh - 6rem));
          }
        }
      `}</style>

      {/* Chat panel */}
      {open && (
        <div
          className="cara-panel fixed bottom-20 right-4 z-50 flex flex-col shadow-2xl rounded-2xl overflow-hidden"
          style={{
            width: 'min(380px, calc(100vw - 2rem))',
            fontFamily: "'Open Sans', sans-serif",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 shrink-0"
            style={{ background: 'linear-gradient(135deg, #3ec6f5 0%, #3dc2c6 100%)' }}
          >
            <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 ring-2 ring-white/30 bg-white">
              <img src={caraAvatar} alt="BOTSCARA" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-sm leading-none">BOTSCARA</p>
              <p className="text-white/80 text-xs mt-0.5">Asistente OSTCARA</p>
            </div>
            <button
              onClick={handleReset}
              title="Reiniciar conversación"
              className="text-white/70 hover:text-white transition-colors mr-1"
            >
              <i className="fas fa-rotate-right text-sm"></i>
            </button>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.type === 'bot' && (
                  <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 mr-2 mt-0.5 bg-white">
                    <img src={caraAvatar} alt="BOTSCARA" className="w-full h-full object-cover" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.type === 'user'
                      ? 'text-white rounded-tr-sm'
                      : 'text-[#303030] rounded-tl-sm shadow-sm'
                  }`}
                  style={
                    msg.type === 'user'
                      ? { background: 'linear-gradient(135deg, #3ec6f5, #3dc2c6)' }
                      : { backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }
                  }
                >
                  <BubbleText text={msg.text} />
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex justify-start">
                <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 mr-2 mt-0.5 bg-white">
                  <img src={caraAvatar} alt="BOTSCARA" className="w-full h-full object-cover" />
                </div>
                <div
                  className="px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm"
                  style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}
                >
                  <div className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map(i => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{
                          backgroundColor: '#3ec6f5',
                          animationDelay: `${i * 0.15}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Options / quick replies */}
          {showOptions && (
            <div
              className="shrink-0 px-3 py-3 space-y-2 border-t"
              style={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb' }}
            >
              {flow.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleOption(opt)}
                  className="w-full text-left text-sm px-3 py-2 rounded-xl border transition-all duration-150 hover:text-white active:scale-95"
                  style={{
                    borderColor: '#3ec6f5',
                    color: '#3ec6f5',
                    backgroundColor: 'transparent',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = '#3ec6f5'
                    e.currentTarget.style.color = '#ffffff'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#3ec6f5'
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Proactive teaser bubble */}
      {showTeaser && !open && (
        <div
          className="fixed bottom-7 right-28 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl shadow-lg bg-white"
          style={{ maxWidth: 220, fontFamily: "'Open Sans', sans-serif" }}
        >
          <p className="text-sm text-[#303030] flex-1">¿En qué puedo ayudarte?</p>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowTeaser(false)
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
            aria-label="Cerrar mensaje"
          >
            <i className="fas fa-times text-xs"></i>
          </button>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => {
          setOpen(o => !o)
          setShowTeaser(false)
        }}
        className={`fixed bottom-4 right-4 z-50 flex items-center justify-center rounded-full bg-white shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 ${
          open ? 'w-12 h-12' : 'w-20 h-20'
        }`}
        aria-label={open ? 'Cerrar BOTSCARA' : 'Abrir BOTSCARA'}
      >
        {open ? (
          <i className="fas fa-times text-lg text-gray-500"></i>
        ) : (
          <img src={caraAvatar} alt="BOTSCARA" className="w-full h-full rounded-full object-cover" />
        )}
      </button>
    </>
  )
}
