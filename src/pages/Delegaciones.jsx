import PageLayout from '../components/PageLayout'
import DelegacionesMap from '../components/DelegacionesMap'
import { DELEGACIONES } from '../data/delegaciones'

function agruparPorProvincia(delegaciones) {
  const grupos = {}
  delegaciones.forEach((d) => {
    if (!grupos[d.provincia]) grupos[d.provincia] = []
    grupos[d.provincia].push(d)
  })
  return Object.entries(grupos)
}

export default function Delegaciones() {
  const grupos = agruparPorProvincia(DELEGACIONES)

  return (
    <PageLayout title="DELEGACIONES">
      <p className="text-sm text-[#444] mb-6" style={{ fontFamily: "'Open Sans', sans-serif" }}>
        ¡Aprovechá el mapa interactivo de OSTCARA y buscá tu delegación más cercana, dirección, teléfono y mucho más!
      </p>

      <div className="w-full overflow-hidden rounded isolate relative" style={{ height: 500, zIndex: 0 }}>
        <DelegacionesMap />
      </div>

      <div className="mt-8 space-y-6">
        {grupos.map(([provincia, delegaciones]) => (
          <div key={provincia}>
            <h3
              className="text-sm font-bold text-white uppercase px-3 py-2 mb-3"
              style={{ backgroundColor: '#3dc2c6', fontFamily: "'Open Sans', sans-serif" }}
            >
              {provincia}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {delegaciones.map((d) => (
                <div
                  key={d.nombre}
                  className="border border-gray-200 p-4 text-sm text-[#444]"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  <p className="font-bold text-[#2d3a45] mb-1">{d.nombre}</p>
                  {d.direccion && (
                    <p className="flex items-start gap-2 mb-1">
                      <i className="fas fa-map-marker-alt text-[#3dc2c6] mt-0.5 shrink-0"></i>
                      <span>{d.direccion}</span>
                    </p>
                  )}
                  {d.telefono && (
                    <p className="flex items-start gap-2 mb-1">
                      <i className="fas fa-phone text-[#3dc2c6] mt-0.5 shrink-0"></i>
                      <span>{d.telefono}</span>
                    </p>
                  )}
                  {d.email && (
                    <p className="flex items-start gap-2">
                      <i className="fas fa-envelope text-[#3dc2c6] mt-0.5 shrink-0"></i>
                      <a href={`mailto:${d.email}`} className="text-[#3dc2c6] hover:underline break-all">
                        {d.email}
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}
