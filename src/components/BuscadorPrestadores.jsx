import { useState } from 'react'
import { ESPECIALIDADES, LOCALIDADES, PRESTADORES } from '../data/prestadores'

function distanciaKm(lat1, lng1, lat2, lng2) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function PrestadorCard({ prestador, distancia }) {
  return (
    <div
      className="bg-white border border-gray-100 p-4 hover:border-[#3dc2c6] transition-colors group"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4
            className="font-bold text-[#2d3a45] text-sm mb-1.5 leading-snug"
            style={{ fontFamily: "'Nunito', 'Open Sans', sans-serif" }}
          >
            {prestador.nombre}
          </h4>
          <span
            className="inline-block text-[10px] font-bold text-white px-2 py-0.5 mb-2 uppercase tracking-wide"
            style={{ backgroundColor: '#3dc2c6', fontFamily: "'Nunito', sans-serif" }}
          >
            {prestador.especialidad}
          </span>
          <p className="text-xs text-[#617585] flex items-center gap-1.5 mt-1">
            <i className="fas fa-map-marker-alt text-[#3dc2c6] shrink-0 text-[10px]"></i>
            {prestador.direccion}
          </p>
          <p className="text-xs text-[#617585] flex items-center gap-1.5 mt-1">
            <i className="fas fa-phone text-[#3dc2c6] shrink-0 text-[10px]"></i>
            {prestador.telefono}
          </p>
        </div>
        {distancia != null && (
          <div className="shrink-0 text-right">
            <span
              className="text-sm font-bold"
              style={{ color: '#3dc2c6', fontFamily: "'Nunito', sans-serif" }}
            >
              {distancia.toFixed(1)} km
            </span>
          </div>
        )}
      </div>
      <div className="mt-3 pt-3 border-t border-gray-50">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(prestador.direccion)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-[#3dc2c6] hover:text-[#2ba5a9] transition-colors flex items-center gap-1"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          <i className="fas fa-map text-[10px]"></i>
          Ver en mapa
        </a>
      </div>
    </div>
  )
}

const SELECT_CLASS = 'flex-1 border border-gray-200 px-3 py-2.5 text-sm text-[#2d3a45] bg-white focus:outline-none focus:border-[#3dc2c6] focus:ring-1 focus:ring-[#3dc2c6] transition-colors'

export default function BuscadorPrestadores() {
  const [tab, setTab] = useState('especialidad')
  const [especialidad, setEspecialidad] = useState('')
  const [localidad, setLocalidad] = useState('')
  const [resultados, setResultados] = useState(null)
  const [geoStatus, setGeoStatus] = useState('idle')
  const [geoResultados, setGeoResultados] = useState(null)
  const [geoRadius, setGeoRadius] = useState(10)

  function buscarPorEspecialidad(e) {
    e.preventDefault()
    const filtered = PRESTADORES.filter(p => {
      const matchEsp = !especialidad || p.especialidad === especialidad
      const matchLoc = !localidad || p.localidad === localidad
      return matchEsp && matchLoc
    })
    setResultados(filtered)
  }

  function buscarPorGeolocalizacion() {
    if (!navigator.geolocation) { setGeoStatus('error'); return }
    setGeoStatus('loading')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        const conDistancia = PRESTADORES
          .map(p => ({ ...p, distancia: distanciaKm(latitude, longitude, p.lat, p.lng) }))
          .filter(p => p.distancia <= geoRadius)
          .sort((a, b) => a.distancia - b.distancia)
        setGeoResultados(conDistancia)
        setGeoStatus('success')
      },
      () => setGeoStatus('error')
    )
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: '#e6f7f8' }}
        >
          <i className="fas fa-search text-sm" style={{ color: '#3dc2c6' }}></i>
        </div>
        <h2
          className="text-lg font-extrabold text-[#2d3a45]"
          style={{ fontFamily: "'Nunito', 'Open Sans', sans-serif" }}
        >
          Buscador de Prestadores
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex border-b-2 border-gray-100 mb-6">
        {[
          { key: 'especialidad', icon: 'fas fa-stethoscope', label: 'Por Especialidad' },
          { key: 'geo', icon: 'fas fa-location-arrow', label: 'Por Geolocalización' },
        ].map(({ key, icon, label }) => (
          <button
            key={key}
            onClick={() => {
              setTab(key)
              if (key === 'especialidad') setResultados(null)
              else { setGeoResultados(null); setGeoStatus('idle') }
            }}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold border-b-2 -mb-[2px] transition-colors"
            style={{
              fontFamily: "'Nunito', 'Open Sans', sans-serif",
              color: tab === key ? '#3dc2c6' : '#617585',
              borderBottomColor: tab === key ? '#3dc2c6' : 'transparent',
            }}
          >
            <i className={`${icon} text-xs`}></i>
            {label}
          </button>
        ))}
      </div>

      {/* Tab: Especialidad */}
      {tab === 'especialidad' && (
        <div>
          <form onSubmit={buscarPorEspecialidad} className="flex flex-col sm:flex-row gap-3 mb-6">
            <select
              value={especialidad}
              onChange={e => setEspecialidad(e.target.value)}
              className={SELECT_CLASS}
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              <option value="">Todas las especialidades</option>
              {ESPECIALIDADES.map(e => <option key={e} value={e}>{e}</option>)}
            </select>

            <select
              value={localidad}
              onChange={e => setLocalidad(e.target.value)}
              className={SELECT_CLASS}
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              <option value="">Todas las localidades</option>
              {LOCALIDADES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>

            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-bold text-white shrink-0 transition-colors"
              style={{
                backgroundColor: '#3dc2c6',
                fontFamily: "'Nunito', sans-serif",
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2ba5a9'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#3dc2c6'}
            >
              Buscar
            </button>
          </form>

          {resultados !== null && (
            <div>
              <p
                className="text-xs font-semibold text-[#617585] mb-4"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                {resultados.length} prestador{resultados.length !== 1 ? 'es' : ''} encontrado{resultados.length !== 1 ? 's' : ''}
              </p>
              {resultados.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 border border-dashed border-gray-200">
                  <i className="fas fa-search text-2xl text-gray-300 mb-2 block"></i>
                  <p className="text-sm text-[#617585]" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    No se encontraron prestadores para los filtros seleccionados.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {resultados.map(p => <PrestadorCard key={p.id} prestador={p} />)}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab: Geolocalización */}
      {tab === 'geo' && (
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <label
                className="text-sm font-semibold text-[#2d3a45] whitespace-nowrap"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Radio:
              </label>
              <select
                value={geoRadius}
                onChange={e => setGeoRadius(Number(e.target.value))}
                className={SELECT_CLASS}
                style={{ fontFamily: "'Open Sans', sans-serif", flex: 'none', width: 'auto', minWidth: '90px' }}
              >
                <option value={5}>5 km</option>
                <option value={10}>10 km</option>
                <option value={20}>20 km</option>
                <option value={50}>50 km</option>
              </select>
            </div>

            <button
              onClick={buscarPorGeolocalizacion}
              disabled={geoStatus === 'loading'}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white transition-colors disabled:opacity-60"
              style={{
                backgroundColor: '#3dc2c6',
                fontFamily: "'Nunito', sans-serif",
              }}
              onMouseEnter={e => { if (geoStatus !== 'loading') e.currentTarget.style.backgroundColor = '#2ba5a9' }}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#3dc2c6'}
            >
              {geoStatus === 'loading'
                ? <><i className="fas fa-spinner fa-spin text-xs"></i>Localizando...</>
                : <><i className="fas fa-location-arrow text-xs"></i>Usar mi ubicación</>}
            </button>
          </div>

          {geoStatus === 'error' && (
            <div className="flex items-start gap-3 text-sm bg-red-50 border border-red-200 px-4 py-3 mb-4">
              <i className="fas fa-exclamation-triangle text-red-400 mt-0.5 shrink-0"></i>
              <span className="text-red-600" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                No se pudo obtener tu ubicación. Verificá los permisos del navegador.
              </span>
            </div>
          )}

          {geoStatus === 'success' && geoResultados !== null && (
            <div>
              <p
                className="text-xs font-semibold text-[#617585] mb-4"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                {geoResultados.length} prestador{geoResultados.length !== 1 ? 'es' : ''} dentro de {geoRadius} km
              </p>
              {geoResultados.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 border border-dashed border-gray-200">
                  <i className="fas fa-map-marker-alt text-2xl text-gray-300 mb-2 block"></i>
                  <p className="text-sm text-[#617585]" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    No se encontraron prestadores en el radio seleccionado.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {geoResultados.map(p => <PrestadorCard key={p.id} prestador={p} distancia={p.distancia} />)}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
