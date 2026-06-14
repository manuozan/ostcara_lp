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
    <div className="border border-gray-200 bg-white p-4 hover:border-[#3ec6f5] transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h4 className="font-bold text-[#444] text-sm mb-1">{prestador.nombre}</h4>
          <span
            className="inline-block text-xs text-white px-2 py-0.5 mb-2"
            style={{ backgroundColor: '#3ec6f5' }}
          >
            {prestador.especialidad}
          </span>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <i className="fas fa-map-marker-alt text-[#3ec6f5]"></i>
            {prestador.direccion}
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            <i className="fas fa-phone text-[#3ec6f5]"></i>
            {prestador.telefono}
          </p>
        </div>
        {distancia != null && (
          <div className="text-right shrink-0">
            <span className="text-xs font-bold text-[#3ec6f5]">{distancia.toFixed(1)} km</span>
          </div>
        )}
      </div>
      <div className="mt-3">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(prestador.direccion)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#3ec6f5] hover:underline"
        >
          <i className="fas fa-map mr-1"></i>Ver en mapa
        </a>
      </div>
    </div>
  )
}

function TabBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 text-sm font-semibold border-b-2 transition-colors ${
        active
          ? 'border-[#3ec6f5] text-[#3ec6f5]'
          : 'border-transparent text-gray-500 hover:text-[#3ec6f5]'
      }`}
    >
      {children}
    </button>
  )
}

export default function BuscadorPrestadores() {
  const [tab, setTab] = useState('especialidad')

  // Por especialidad
  const [especialidad, setEspecialidad] = useState('')
  const [localidad, setLocalidad] = useState('')
  const [resultados, setResultados] = useState(null)

  // Por geolocalización
  const [geoStatus, setGeoStatus] = useState('idle') // idle | loading | success | error
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
    if (!navigator.geolocation) {
      setGeoStatus('error')
      return
    }
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
      <h2
        className="text-base font-bold text-[#444] uppercase tracking-wide mb-5"
        style={{ fontFamily: "'Open Sans', sans-serif" }}
      >
        <i className="fas fa-search text-[#3ec6f5] mr-2"></i>
        Buscador de Prestadores
      </h2>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <TabBtn active={tab === 'especialidad'} onClick={() => { setTab('especialidad'); setResultados(null) }}>
          <i className="fas fa-stethoscope mr-2"></i>Por Especialidad
        </TabBtn>
        <TabBtn active={tab === 'geo'} onClick={() => { setTab('geo'); setGeoResultados(null); setGeoStatus('idle') }}>
          <i className="fas fa-location-arrow mr-2"></i>Por Geolocalización
        </TabBtn>
      </div>

      {/* Tab: Especialidad */}
      {tab === 'especialidad' && (
        <div>
          <form onSubmit={buscarPorEspecialidad} className="flex flex-col sm:flex-row gap-3 mb-6">
            <select
              value={especialidad}
              onChange={e => setEspecialidad(e.target.value)}
              className="flex-1 border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#3ec6f5]"
            >
              <option value="">Todas las especialidades</option>
              {ESPECIALIDADES.map(e => <option key={e} value={e}>{e}</option>)}
            </select>

            <select
              value={localidad}
              onChange={e => setLocalidad(e.target.value)}
              className="flex-1 border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#3ec6f5]"
            >
              <option value="">Todas las localidades</option>
              {LOCALIDADES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>

            <button
              type="submit"
              className="px-6 py-2 text-sm font-bold text-white shrink-0 transition-colors"
              style={{ backgroundColor: '#3ec6f5' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#5ac8fa'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#3ec6f5'}
            >
              BUSCAR
            </button>
          </form>

          {resultados !== null && (
            <div>
              <p className="text-xs text-gray-500 mb-4">
                {resultados.length} prestador{resultados.length !== 1 ? 'es' : ''} encontrado{resultados.length !== 1 ? 's' : ''}
              </p>
              {resultados.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">No se encontraron prestadores para los filtros seleccionados.</p>
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
              <label className="text-sm text-[#444] whitespace-nowrap">Radio de búsqueda:</label>
              <select
                value={geoRadius}
                onChange={e => setGeoRadius(Number(e.target.value))}
                className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#3ec6f5]"
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
              className="px-6 py-2 text-sm font-bold text-white transition-colors disabled:opacity-60"
              style={{ backgroundColor: '#3ec6f5' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#5ac8fa'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#3ec6f5'}
            >
              {geoStatus === 'loading'
                ? <><i className="fas fa-spinner fa-spin mr-2"></i>Localizando...</>
                : <><i className="fas fa-location-arrow mr-2"></i>Usar mi ubicación</>
              }
            </button>
          </div>

          {geoStatus === 'error' && (
            <div className="text-sm text-red-500 bg-red-50 border border-red-200 px-4 py-3 mb-4">
              <i className="fas fa-exclamation-triangle mr-2"></i>
              No se pudo obtener tu ubicación. Verificá los permisos del navegador.
            </div>
          )}

          {geoStatus === 'success' && geoResultados !== null && (
            <div>
              <p className="text-xs text-gray-500 mb-4">
                {geoResultados.length} prestador{geoResultados.length !== 1 ? 'es' : ''} dentro de {geoRadius} km
              </p>
              {geoResultados.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">No se encontraron prestadores en el radio seleccionado.</p>
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
