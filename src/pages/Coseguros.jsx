import { useState, Fragment } from 'react'
import PageLayout from '../components/PageLayout'

const GRUPOS_DEPENDENCIA = [
  {
    titulo: 'Consultas',
    items: [
      { practica: 'Médico de familia, generalista, pediatras, tocoginecólogo', valor: 9521.7 },
      { practica: 'Médicos especialistas', valor: 16498.5 },
      { practica: 'Programa HIV y Oncología', valor: null },
      { practica: 'Oncología', valor: null },
      { practica: 'Discapacidad', valor: null },
      { practica: 'Plan Materno Infantil', valor: null },
      { practica: 'Programas Preventivos', valor: null },
    ],
  },
  {
    titulo: 'Psicología',
    items: [
      { practica: 'Sesión incluida', valor: 13622.1 },
      { practica: 'Sesión excedente', valor: 25923.3 },
    ],
  },
  {
    titulo: 'Prácticas de laboratorio',
    items: [
      { practica: 'Hasta 6 determinaciones básicas', valor: 6222 },
      { practica: 'Valor extra por prestación adicional a las 6 definidas', valor: 2636.7 },
    ],
  },
  {
    titulo: 'Prácticas diagnósticas y terapéuticas',
    items: [
      { practica: 'Imágenes de baja complejidad (RX simple y ecografía simple)', valor: 6222 },
      { practica: 'Mediana complejidad', valor: 11862.6 },
      { practica: 'Alta complejidad (TAC, RMN, RIE, laboratorio biomolecular/genético, medicina nuclear, endoscopía)', valor: 28050 },
    ],
  },
  {
    titulo: 'Prácticas kinesiológicas y fisiátricas',
    items: [
      { practica: 'Por sesión', valor: 6446.4 },
      { practica: 'Por sesión excedente', valor: 1383.12 },
      { practica: 'Prácticas de enfermería', valor: null },
    ],
  },
  {
    titulo: 'Fonoaudiología',
    items: [
      { practica: 'Por sesión de fonoaudiología y foniatría', valor: 6222 },
    ],
  },
  {
    titulo: 'Atención domiciliaria — Consultas',
    items: [
      { practica: 'Diurna (código verde)', valor: 27534.9 },
      { practica: 'Nocturna (código verde)', valor: 43278.6 },
      { practica: 'Emergencias (código rojo)', valor: null },
      { practica: 'Mayores de 65 años', valor: 1528.47 },
    ],
  },
  {
    titulo: 'Odontología',
    items: [
      { practica: 'Consultas', valor: 12036 },
      { practica: 'Consultas para menores de 15 años y mayores de 65 años', valor: 6222 },
      { practica: 'Prácticas odontológicas', valor: 12036 },
    ],
  },
  {
    titulo: 'Atención integral (coberturas por ley)',
    items: [
      { practica: 'Atención y cuidado integral durante embarazo y 1ra infancia (Ley 27.611)', valor: null },
      { practica: 'Respuesta integral al HIV, Hepatitis, ITS y tuberculosis (Ley 25.675)', valor: null },
      { practica: 'Protección integral para personas trasplantadas (Ley 26.928)', valor: null },
      { practica: 'Trasplante de órganos, tejidos y células (Ley 27.447)', valor: null },
    ],
  },
]

const GRUPOS_MONOTRIBUTO = [
  {
    titulo: 'Consultas',
    items: [
      { practica: 'Médico de familia, generalista, pediatras, tocoginecólogo', valor: 24280 },
      { practica: 'Médicos especialistas', valor: 36540 },
      { practica: 'Programa HIV y Oncología', valor: null },
      { practica: 'Oncología', valor: null },
      { practica: 'Discapacidad', valor: null },
      { practica: 'Plan Materno Infantil', valor: null },
      { practica: 'Programas Preventivos', valor: null },
    ],
  },
  {
    titulo: 'Psicología',
    items: [
      { practica: 'Sesión incluida', valor: 24280 },
      { practica: 'Sesión excedente', valor: 36545 },
    ],
  },
  {
    titulo: 'Prácticas de laboratorio',
    items: [
      { practica: 'Hasta 6 determinaciones básicas', valor: 14625 },
      { practica: 'Valor extra por prestación adicional a las 6 definidas', valor: 5987 },
    ],
  },
  {
    titulo: 'Prácticas diagnósticas y terapéuticas',
    items: [
      { practica: 'Imágenes de baja complejidad (RX simple y ecografía simple)', valor: 14625 },
      { practica: 'Mediana complejidad', valor: 23140 },
      { practica: 'Alta complejidad (TAC, RMN, RIE, laboratorio biomolecular/genético, medicina nuclear, endoscopía)', valor: 59700.6 },
    ],
  },
  {
    titulo: 'Prácticas kinesiológicas y fisiátricas',
    items: [
      { practica: 'Por sesión', valor: 14625 },
      { practica: 'Por sesión excedente', valor: 21496.5 },
      { practica: 'Prácticas de enfermería', valor: null },
    ],
  },
  {
    titulo: 'Fonoaudiología',
    items: [
      { practica: 'Por sesión de fonoaudiología y foniatría', valor: 14625 },
    ],
  },
  {
    titulo: 'Atención domiciliaria — Consultas',
    items: [
      { practica: 'Diurna (código verde)', valor: 59700.6 },
      { practica: 'Nocturna (código verde)', valor: 119406.3 },
      { practica: 'Emergencias (código rojo)', valor: null },
      { practica: 'Mayores de 65 años', valor: 36540 },
    ],
  },
  {
    titulo: 'Odontología',
    items: [
      { practica: 'Consultas', valor: 23138 },
      { practica: 'Consultas para menores de 15 años y mayores de 65 años', valor: 17057 },
      { practica: 'Prácticas odontológicas', valor: 23140 },
    ],
  },
  {
    titulo: 'Atención integral (coberturas por ley)',
    items: [
      { practica: 'Atención y cuidado integral durante embarazo y 1ra infancia (Ley 27.611)', valor: null },
      { practica: 'Respuesta integral al HIV, Hepatitis, ITS y tuberculosis (Ley 25.675)', valor: null },
      { practica: 'Protección integral para personas trasplantadas (Ley 26.928)', valor: null },
      { practica: 'Trasplante de órganos, tejidos y células (Ley 27.447)', valor: null },
    ],
  },
]

const CATEGORIAS = [
  {
    key: 'dependencia',
    label: 'Relación de Dependencia',
    icon: 'fas fa-briefcase',
    grupos: GRUPOS_DEPENDENCIA,
    vigencia: 'Julio 2026',
  },
  {
    key: 'monotributo',
    label: 'Monotributo',
    icon: 'fas fa-file-invoice-dollar',
    grupos: GRUPOS_MONOTRIBUTO,
    vigencia: 'Julio 2026',
  },
  {
    key: 'monotributo-social',
    label: 'Monotributo Social',
    icon: 'fas fa-hand-holding-heart',
    grupos: GRUPOS_MONOTRIBUTO,
    vigencia: 'Julio 2026',
  },
  {
    key: 'servicio-domestico',
    label: 'Servicio Doméstico',
    icon: 'fas fa-broom',
    grupos: GRUPOS_MONOTRIBUTO,
    vigencia: 'Julio 2026',
  },
]

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

export default function Coseguros() {
  const [activeTab, setActiveTab] = useState(CATEGORIAS[1].key)
  const categoria = CATEGORIAS.find((c) => c.key === activeTab)

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

        {categoria.vigencia && (
          <p className="text-xs text-gray-400 mb-3">Vigencia: {categoria.vigencia}</p>
        )}

        <CoseguroTable grupos={categoria.grupos} />

        <p className="text-xs text-gray-500 mt-5 mb-6">
          Los valores de referencia pueden actualizarse periódicamente. Ante cualquier duda, consultá con tu delegación u obra social.
        </p>

        <p>
          Por consultas:{' '}
          <a href="mailto:consultas@ostcara.org.ar" className="text-[#3dc2c6] hover:underline">
            consultas@ostcara.org.ar
          </a>
        </p>
      </div>
    </PageLayout>
  )
}
