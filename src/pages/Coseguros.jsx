import { useState, Fragment, useMemo } from 'react'
import PageLayout from '../components/PageLayout'
import {
  DATASETS,
  buildGrupos,
  formatValor,
  formatVigenciaLabel,
  getMonthKey,
  getProximaVigencia,
  pickDefaultVigencia,
} from '../data/coseguros'

const CATEGORIAS = [
  { key: 'dependencia', label: 'Relación de Dependencia', icon: 'fas fa-briefcase', dataKey: 'dependencia' },
  { key: 'monotributo', label: 'Monotributo', icon: 'fas fa-file-invoice-dollar', dataKey: 'monotributo' },
  { key: 'monotributo-social', label: 'Monotributo Social', icon: 'fas fa-hand-holding-heart', dataKey: 'monotributo' },
  { key: 'servicio-domestico', label: 'Servicio Doméstico', icon: 'fas fa-broom', dataKey: 'monotributo' },
]

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
  const badge = (mes) => {
    if (mes === vigenciaActual) return { texto: 'Actual', bg: '#e6f9ee', color: '#1e9e5e' }
    if (mes > vigenciaActual) return { texto: 'Próxima', bg: '#eafcfd', color: '#2ba9ad' }
    return null
  }
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
          <h3 className="text-sm font-bold text-white uppercase tracking-wide">Vigencias de coseguros</h3>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors" aria-label="Cerrar">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <ul className="p-2">
          {meses.map((mes) => {
            const isActive = mes === vigenciaActiva
            const etiqueta = badge(mes)
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
                  {etiqueta && (
                    <span
                      className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: etiqueta.bg, color: etiqueta.color }}
                    >
                      {etiqueta.texto}
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
  const esHistorico = vigenciaActiva < vigenciaActual
  const esFutura = vigenciaActiva > vigenciaActual
  const mesesDisponibles = useMemo(
    () => Object.keys(dataset.vigencias).sort().reverse(),
    [dataset]
  )
  const proximaVigencia = useMemo(
    () => getProximaVigencia(categoria.dataKey, vigenciaActual),
    [categoria.dataKey, vigenciaActual]
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
            Ver otras vigencias
            <i className="fas fa-history"></i>
          </button>
        </div>

        {!esHistorico && !esFutura && proximaVigencia && (
          <div
            className="flex items-center justify-between gap-3 px-3 py-2 mb-4 text-xs rounded"
            style={{ backgroundColor: '#eafcfd', color: '#1d7e81' }}
          >
            <span>
              <i className="fas fa-calendar-alt mr-1.5"></i>
              Ya están publicados los valores que regirán desde {formatVigenciaLabel(proximaVigencia)}.
            </span>
            <button
              onClick={() => handleSelectVigencia(proximaVigencia)}
              className="font-bold underline shrink-0"
            >
              Ver próxima vigencia
            </button>
          </div>
        )}

        {(esHistorico || esFutura) && (
          <div
            className="flex items-center justify-between gap-3 px-3 py-2 mb-4 text-xs rounded"
            style={{ backgroundColor: '#fff8e6', color: '#92650c' }}
          >
            <span>
              <i className="fas fa-exclamation-triangle mr-1.5"></i>
              {esFutura
                ? `Estás viendo los valores que entran en vigencia en ${formatVigenciaLabel(vigenciaActiva)}, todavía no aplicables.`
                : `Estás viendo valores históricos (${formatVigenciaLabel(vigenciaActiva)}), no la vigencia actual.`}
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
          Ver otras vigencias de precios de coseguros
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
