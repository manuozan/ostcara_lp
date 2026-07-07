import { useState, Fragment, useMemo } from 'react'
import PageLayout from '../components/PageLayout'
import dependenciaData from '../assets/coseguros_ostcara_relacion_dependencia.json'
import monotributoData from '../assets/coseguros_ostcara_monotributo.json'

const DATASETS = {
  dependencia: dependenciaData,
  monotributo: monotributoData,
}

const CATEGORIAS = [
  { key: 'dependencia', label: 'Relación de Dependencia', icon: 'fas fa-briefcase', dataKey: 'dependencia' },
  { key: 'monotributo', label: 'Monotributo', icon: 'fas fa-file-invoice-dollar', dataKey: 'monotributo' },
  { key: 'monotributo-social', label: 'Monotributo Social', icon: 'fas fa-hand-holding-heart', dataKey: 'monotributo' },
  { key: 'servicio-domestico', label: 'Servicio Doméstico', icon: 'fas fa-broom', dataKey: 'monotributo' },
]

// Estructura de las tablas: mapea cada práctica al campo correspondiente dentro del JSON de vigencia
const GRUPOS_CONFIG = [
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

function getMonthKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

function formatVigenciaLabel(monthKey) {
  const [y, m] = monthKey.split('-')
  return `${MESES[parseInt(m, 10) - 1]} ${y}`
}

// Elige la vigencia del mes actual; si no existe, la más reciente anterior; si no hay ninguna anterior, la más antigua disponible
function pickDefaultVigencia(vigencias, monthKey) {
  const keys = Object.keys(vigencias).sort()
  if (vigencias[monthKey]) return monthKey
  const anteriores = keys.filter((k) => k < monthKey)
  if (anteriores.length) return anteriores[anteriores.length - 1]
  return keys[0]
}

function buildGrupos(vigenciaData) {
  return GRUPOS_CONFIG.map((grupo) => ({
    titulo: grupo.titulo,
    items: grupo.items.map((item) => {
      const raw = item.path.reduce((obj, key) => obj?.[key], vigenciaData)
      return { practica: item.practica, valor: raw === 'EXENTO' ? null : raw }
    }),
  }))
}

function formatValor(valor) {
  const tieneCentavos = Math.round(valor * 100) % 100 !== 0
  return `$${valor.toLocaleString('es-AR', {
    minimumFractionDigits: tieneCentavos ? 2 : 0,
    maximumFractionDigits: 2,
  })}`
}

function CoseguroTable({ grupos }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse" style={{ fontFamily: "'Open Sans', sans-serif" }}>
        <thead>
          <tr>
            <th
              className="text-left text-xs font-bold text-white uppercase px-3 py-2"
              style={{ backgroundColor: '#2d3a45' }}
            >
              Práctica
            </th>
            <th
              className="text-right text-xs font-bold text-white uppercase px-3 py-2 whitespace-nowrap"
              style={{ backgroundColor: '#2d3a45' }}
            >
              Coseguro
            </th>
          </tr>
        </thead>
        <tbody>
          {grupos.map((grupo) => (
            <Fragment key={grupo.titulo}>
              <tr>
                <td
                  colSpan={2}
                  className="text-xs font-bold text-white uppercase px-3 py-1.5"
                  style={{ backgroundColor: '#3dc2c6' }}
                >
                  {grupo.titulo}
                </td>
              </tr>
              {grupo.items.map((item, i) => (
                <tr
                  key={item.practica}
                  style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#f6fbfc' }}
                  className="border-b border-gray-100"
                >
                  <td className="px-3 py-2 text-[#444]">{item.practica}</td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">
                    {item.valor === null ? (
                      <span
                        className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: '#e6f9ee', color: '#1e9e5e' }}
                      >
                        EXENTO
                      </span>
                    ) : (
                      <span className="font-bold text-[#2d3a45]">{formatValor(item.valor)}</span>
                    )}
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function HistorialModal({ meses, vigenciaActiva, vigenciaActual, onSelect, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-sm max-h-[80vh] overflow-y-auto rounded shadow-xl"
        style={{ fontFamily: "'Open Sans', sans-serif" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-4 py-3 sticky top-0"
          style={{ backgroundColor: '#2d3a45' }}
        >
          <h3 className="text-sm font-bold text-white uppercase tracking-wide">Histórico de coseguros</h3>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors" aria-label="Cerrar">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <ul className="p-2">
          {meses.map((mes) => {
            const isActive = mes === vigenciaActiva
            return (
              <li key={mes}>
                <button
                  onClick={() => onSelect(mes)}
                  className="w-full text-left px-3 py-2.5 rounded text-sm flex items-center justify-between transition-colors"
                  style={{
                    backgroundColor: isActive ? '#eafcfd' : 'transparent',
                    color: isActive ? '#3dc2c6' : '#444',
                    fontWeight: isActive ? 700 : 400,
                  }}
                >
                  {formatVigenciaLabel(mes)}
                  {mes === vigenciaActual && (
                    <span
                      className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: '#e6f9ee', color: '#1e9e5e' }}
                    >
                      Actual
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default function Coseguros() {
  const [activeTab, setActiveTab] = useState(CATEGORIAS[1].key)
  const [vigenciaOverride, setVigenciaOverride] = useState({})
  const [historialAbierto, setHistorialAbierto] = useState(false)

  const categoria = CATEGORIAS.find((c) => c.key === activeTab)
  const dataset = DATASETS[categoria.dataKey]

  const monthKeyActual = getMonthKey()
  const vigenciaActual = useMemo(
    () => pickDefaultVigencia(dataset.vigencias, monthKeyActual),
    [dataset, monthKeyActual]
  )
  const vigenciaActiva = vigenciaOverride[categoria.dataKey] || vigenciaActual
  const grupos = buildGrupos(dataset.vigencias[vigenciaActiva])
  const esHistorico = vigenciaActiva !== vigenciaActual
  const mesesDisponibles = useMemo(
    () => Object.keys(dataset.vigencias).sort().reverse(),
    [dataset]
  )

  const handleSelectVigencia = (mes) => {
    setVigenciaOverride((prev) => ({ ...prev, [categoria.dataKey]: mes }))
    setHistorialAbierto(false)
  }

  const handleVolverActual = () => {
    setVigenciaOverride((prev) => ({ ...prev, [categoria.dataKey]: vigenciaActual }))
  }

  return (
    <PageLayout title="COSEGUROS">
      <div style={{ fontFamily: "'Open Sans', sans-serif" }} className="text-sm text-[#444]">

        <p className="mb-5">
          Los coseguros vigentes se abonan directamente en el prestador al momento de la consulta.
          Los valores varían según tu tipo de aporte:
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-px">
          {CATEGORIAS.map((cat) => {
            const isActive = cat.key === activeTab
            return (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wide transition-colors border-b-2 -mb-px"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  color: isActive ? '#3dc2c6' : '#94a3b8',
                  borderBottomColor: isActive ? '#3dc2c6' : 'transparent',
                }}
              >
                <i className={cat.icon}></i>
                {cat.label}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-3 mb-3">
          <p className="text-xs text-gray-400">Vigencia: {formatVigenciaLabel(vigenciaActiva)}</p>
          <button
            onClick={() => setHistorialAbierto(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-[#3dc2c6] hover:text-[#2ba9ad] transition-colors"
          >
            Ver histórico
            <i className="fas fa-history"></i>
          </button>
        </div>

        {esHistorico && (
          <div
            className="flex items-center justify-between gap-3 px-3 py-2 mb-4 text-xs rounded"
            style={{ backgroundColor: '#fff8e6', color: '#92650c' }}
          >
            <span>
              <i className="fas fa-exclamation-triangle mr-1.5"></i>
              Estás viendo valores históricos ({formatVigenciaLabel(vigenciaActiva)}), no la vigencia actual.
            </span>
            <button onClick={handleVolverActual} className="font-bold underline shrink-0">
              Volver a la vigencia actual
            </button>
          </div>
        )}

        <CoseguroTable grupos={grupos} />

        <p className="text-xs text-gray-500 mt-5 mb-6">
          Los valores de referencia pueden actualizarse periódicamente. Ante cualquier duda, consultá con tu delegación u obra social.
        </p>

        <button
          onClick={() => setHistorialAbierto(true)}
          className="flex items-center gap-2 px-4 py-2.5 mb-6 text-xs font-bold uppercase tracking-wide transition-colors border"
          style={{ borderColor: '#3dc2c6', color: '#3dc2c6' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#3dc2c6'; e.currentTarget.style.color = '#ffffff' }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#3dc2c6' }}
        >
          <i className="fas fa-history"></i>
          Ver histórico de precios de coseguros
        </button>

        <p>
          Por consultas:{' '}
          <a href="mailto:consultas@ostcara.org.ar" className="text-[#3dc2c6] hover:underline">
            consultas@ostcara.org.ar
          </a>
        </p>
      </div>

      {historialAbierto && (
        <HistorialModal
          meses={mesesDisponibles}
          vigenciaActiva={vigenciaActiva}
          vigenciaActual={vigenciaActual}
          onSelect={handleSelectVigencia}
          onClose={() => setHistorialAbierto(false)}
        />
      )}
    </PageLayout>
  )
}
