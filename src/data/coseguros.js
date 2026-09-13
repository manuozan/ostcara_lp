import dependenciaData from '../assets/coseguros_ostcara_relacion_dependencia.json'
import monotributoData from '../assets/coseguros_ostcara_monotributo.json'

// Fuente unica de coseguros: la usan tanto la pagina /coseguros como el asistente BOTSCARA,
// para que nunca queden desfasados entre si al cargar una vigencia nueva.
export const DATASETS = {
  dependencia: dependenciaData,
  monotributo: monotributoData,
}

// Estructura de las tablas: mapea cada práctica al campo correspondiente dentro del JSON de vigencia
export const GRUPOS_CONFIG = [
  {
    titulo: 'Consultas',
    items: [
      { path: ['consultas', 'medico_familia_generalista_pediatras_tocoginecologo'], practica: 'Médico de familia, generalista, pediatras, tocoginecólogo' },
      { path: ['consultas', 'medicos_especialistas'], practica: 'Médicos especialistas' },
      { path: ['consultas', 'programa_hiv_oncologia'], practica: 'Programa HIV y Oncología' },
      { path: ['consultas', 'oncologia'], practica: 'Oncología' },
      { path: ['consultas', 'discapacidad'], practica: 'Discapacidad' },
      { path: ['consultas', 'plan_materno_infantil'], practica: 'Plan Materno Infantil' },
      { path: ['consultas', 'programas_preventivos'], practica: 'Programas Preventivos' },
    ],
  },
  {
    titulo: 'Psicología',
    items: [
      { path: ['psicologia', 'sesion_incluida'], practica: 'Sesión incluida' },
      { path: ['psicologia', 'sesion_excedente'], practica: 'Sesión excedente' },
    ],
  },
  {
    titulo: 'Prácticas de laboratorio',
    items: [
      { path: ['practicas_laboratorio', 'hasta_6_determinaciones_basicas'], practica: 'Hasta 6 determinaciones básicas' },
      { path: ['practicas_laboratorio', 'valor_extra_prestacion_adicional'], practica: 'Valor extra por prestación adicional a las 6 definidas' },
    ],
  },
  {
    titulo: 'Prácticas diagnósticas y terapéuticas',
    items: [
      { path: ['practicas_diagnosticas_terapeuticas', 'baja_complejidad_rx_simple_ecografia_simple'], practica: 'Imágenes de baja complejidad (RX simple y ecografía simple)' },
      { path: ['practicas_diagnosticas_terapeuticas', 'mediana_complejidad'], practica: 'Mediana complejidad' },
      { path: ['practicas_diagnosticas_terapeuticas', 'alta_complejidad_tac_rmn_rie_lab_biomolecular_genetico_medicina_nuclear_endoscopia'], practica: 'Alta complejidad (TAC, RMN, RIE, laboratorio biomolecular/genético, medicina nuclear, endoscopía)' },
    ],
  },
  {
    titulo: 'Prácticas kinesiológicas y fisiátricas',
    items: [
      { path: ['practicas_kinesio_fisiatras', 'por_sesion'], practica: 'Por sesión' },
      { path: ['practicas_kinesio_fisiatras', 'por_sesion_excedente'], practica: 'Por sesión excedente' },
      { path: ['practicas_enfermeria'], practica: 'Prácticas de enfermería' },
    ],
  },
  {
    titulo: 'Fonoaudiología',
    items: [
      { path: ['practicas_fonoaudiologia_foniatria', 'por_sesion'], practica: 'Por sesión de fonoaudiología y foniatría' },
    ],
  },
  {
    titulo: 'Atención domiciliaria — Consultas',
    items: [
      { path: ['atencion_domiciliaria_consultas', 'diurna_codigo_verde'], practica: 'Diurna (código verde)' },
      { path: ['atencion_domiciliaria_consultas', 'nocturna_codigo_verde'], practica: 'Nocturna (código verde)' },
      { path: ['atencion_domiciliaria_consultas', 'emergencias_codigo_rojo'], practica: 'Emergencias (código rojo)' },
      { path: ['atencion_domiciliaria_consultas', 'mayores_65_anos'], practica: 'Mayores de 65 años' },
    ],
  },
  {
    titulo: 'Odontología',
    items: [
      { path: ['odontologia', 'consultas'], practica: 'Consultas' },
      { path: ['odontologia', 'consultas_menores_15_mayores_65'], practica: 'Consultas para menores de 15 años y mayores de 65 años' },
      { path: ['odontologia', 'practicas_odontologicas'], practica: 'Prácticas odontológicas' },
    ],
  },
  {
    titulo: 'Atención integral (coberturas por ley)',
    items: [
      { path: ['atencion_integral', 'embarazo_1ra_infancia_ley_27611'], practica: 'Atención y cuidado integral durante embarazo y 1ra infancia (Ley 27.611)' },
      { path: ['atencion_integral', 'hiv_hepatitis_its_tuberculosis_ley_25675'], practica: 'Respuesta integral al HIV, Hepatitis, ITS y tuberculosis (Ley 25.675)' },
      { path: ['atencion_integral', 'trasplantados_ley_26928'], practica: 'Protección integral para personas trasplantadas (Ley 26.928)' },
      { path: ['atencion_integral', 'trasplante_organos_tejidos_celulas_ley_27447'], practica: 'Trasplante de órganos, tejidos y células (Ley 27.447)' },
    ],
  },
]

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

export function getMonthKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

export function formatVigenciaLabel(monthKey) {
  const [y, m] = monthKey.split('-')
  return `${MESES[parseInt(m, 10) - 1]} ${y}`
}

// Elige la vigencia del mes actual; si no existe, la más reciente anterior; si no hay ninguna anterior, la más antigua disponible
export function pickDefaultVigencia(vigencias, monthKey) {
  const keys = Object.keys(vigencias).sort()
  if (vigencias[monthKey]) return monthKey
  const anteriores = keys.filter((k) => k < monthKey)
  if (anteriores.length) return anteriores[anteriores.length - 1]
  return keys[0]
}

export function getVigenciaActual(dataKey) {
  return pickDefaultVigencia(DATASETS[dataKey].vigencias, getMonthKey())
}

// Primera vigencia posterior a la actual, si ya está publicada (difusión anticipada exigida por la SSSalud)
export function getProximaVigencia(dataKey, vigenciaActual = getVigenciaActual(dataKey)) {
  return Object.keys(DATASETS[dataKey].vigencias).sort().find((k) => k > vigenciaActual)
}

export function formatValor(valor) {
  const tieneCentavos = Math.round(valor * 100) % 100 !== 0
  return `$${valor.toLocaleString('es-AR', {
    minimumFractionDigits: tieneCentavos ? 2 : 0,
    maximumFractionDigits: 2,
  })}`
}

export function buildGrupos(vigenciaData) {
  return GRUPOS_CONFIG.map((grupo) => ({
    titulo: grupo.titulo,
    items: grupo.items.map((item) => {
      const raw = item.path.reduce((obj, key) => obj?.[key], vigenciaData)
      return { practica: item.practica, valor: raw === 'EXENTO' ? null : raw }
    }),
  }))
}

// Devuelve el grupo como lista de viñetas en texto plano, para el asistente
export function getGrupoLineas(dataKey, grupoTitulo, vigenciaKey) {
  const vigenciaData = DATASETS[dataKey].vigencias[vigenciaKey]
  const grupo = GRUPOS_CONFIG.find((g) => g.titulo === grupoTitulo)
  if (!vigenciaData || !grupo) return ''
  return grupo.items
    .map((item) => {
      const raw = item.path.reduce((obj, key) => obj?.[key], vigenciaData)
      return `• ${item.practica} — ${raw === 'EXENTO' ? 'EXENTO' : formatValor(raw)}`
    })
    .join('\n')
}
