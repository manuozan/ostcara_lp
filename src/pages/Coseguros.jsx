import { useState, Fragment } from 'react'
import PageLayout from '../components/PageLayout'

const GRUPOS_DEPENDENCIA = [
  {
    titulo: 'Consultas',
    items: [
      { practica: 'Médico de familia, generalista, pediatras, tocoginecólogo', valor: 7475 },
      { practica: 'Médicos especialistas', valor: 12954.75 },
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
      { practica: 'Sesión incluida', valor: 10695 },
      { practica: 'Sesión excedente', valor: 20355 },
    ],
  },
  {
    titulo: 'Prácticas de laboratorio',
    items: [
      { practica: 'Hasta 6 determinaciones básicas', valor: 4887.5 },
      { practica: 'Valor extra por prestación adicional a las 6 definidas', valor: 2070 },
    ],
  },
  {
    titulo: 'Prácticas diagnósticas y terapéuticas',
    items: [
      { practica: 'Imágenes de baja complejidad (RX simple y ecografía simple)', valor: 4887.5 },
      { practica: 'Mediana complejidad', valor: 9315 },
      { practica: 'Alta complejidad (TAC, RMN, RIE, laboratorio biomolecular/genético, medicina nuclear, endoscopía)', valor: 22022.5 },
    ],
  },
  {
    titulo: 'Prácticas kinesiológicas y fisiátricas',
    items: [
      { practica: 'Por sesión', valor: 5060 },
      { practica: 'Por sesión excedente', valor: 8625 },
      { practica: 'Prácticas de enfermería', valor: null },
    ],
  },
  {
    titulo: 'Fonoaudiología',
    items: [
      { practica: 'Por sesión de fonoaudiología y foniatría', valor: 4887.5 },
    ],
  },
  {
    titulo: 'Atención domiciliaria — Consultas',
    items: [
      { practica: 'Diurna (código verde)', valor: 21620 },
      { practica: 'Nocturna (código verde)', valor: 33982.5 },
      { practica: 'Emergencias (código rojo)', valor: null },
      { practica: 'Mayores de 65 años', valor: 9516.25 },
    ],
  },
  {
    titulo: 'Odontología',
    items: [
      { practica: 'Consultas', valor: 9447.25 },
      { practica: 'Consultas para menores de 15 años y mayores de 65 años', valor: 4887.5 },
      { practica: 'Prácticas odontológicas', valor: 9447.25 },
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
      { practica: 'Médico de familia, generalista, pediatras, tocoginecólogo', valor: 15000 },
      { practica: 'Médicos especialistas', valor: 22500 },
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
      { practica: 'Sesión incluida', valor: 15000 },
      { practica: 'Sesión excedente', valor: 22500 },
    ],
  },
  {
    titulo: 'Prácticas de laboratorio',
    items: [
      { practica: 'Hasta 6 determinaciones básicas', valor: 9000 },
      { practica: 'Valor extra por prestación adicional a las 6 definidas', valor: 3750 },
    ],
  },
  {
    titulo: 'Prácticas diagnósticas y terapéuticas',
    items: [
      { practica: 'Imágenes de baja complejidad (RX simple y ecografía simple)', valor: 9000 },
      { practica: 'Mediana complejidad', valor: 14250 },
      { practica: 'Alta complejidad (TAC, RMN, RIE, laboratorio biomolecular/genético, medicina nuclear, endoscopía)', valor: 37500 },
    ],
  },
  {
    titulo: 'Prácticas kinesiológicas y fisiátricas',
    items: [
      { practica: 'Por sesión', valor: 9000 },
      { practica: 'Por sesión excedente', valor: 13500 },
      { practica: 'Prácticas de enfermería', valor: null },
    ],
  },
  {
    titulo: 'Fonoaudiología',
    items: [
      { practica: 'Por sesión de fonoaudiología y foniatría', valor: 9000 },
    ],
  },
  {
    titulo: 'Atención domiciliaria — Consultas',
    items: [
      { practica: 'Diurna (código verde)', valor: 37500 },
      { practica: 'Nocturna (código verde)', valor: 75000 },
      { practica: 'Emergencias (código rojo)', valor: null },
      { practica: 'Mayores de 65 años', valor: 22500 },
    ],
  },
  {
    titulo: 'Odontología',
    items: [
      { practica: 'Consultas', valor: 14250 },
      { practica: 'Consultas para menores de 15 años y mayores de 65 años', valor: 10500 },
      { practica: 'Prácticas odontológicas', valor: 14250 },
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
    vigencia: 'Julio 2025',
  },
  {
    key: 'monotributo',
    label: 'Monotributo',
    icon: 'fas fa-file-invoice-dollar',
    grupos: GRUPOS_MONOTRIBUTO,
  },
  {
    key: 'monotributo-social',
    label: 'Monotributo Social',
    icon: 'fas fa-hand-holding-heart',
    grupos: GRUPOS_MONOTRIBUTO,
  },
  {
    key: 'servicio-domestico',
    label: 'Servicio Doméstico',
    icon: 'fas fa-broom',
    grupos: GRUPOS_MONOTRIBUTO,
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
