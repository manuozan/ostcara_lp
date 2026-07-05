import { useState } from 'react'
import PageLayout from '../components/PageLayout'

const CATEGORIAS = [
  {
    key: 'dependencia',
    label: 'Relación de Dependencia',
    icon: 'fas fa-briefcase',
    grupos: [
      {
        titular: 'Titular',
        items: [
          'Último recibo de sueldo',
          'Alta temprana de trabajador (en caso de ser un alta reciente)',
          'DNI frente y dorso',
          'Certificado de opción de cambio (solo en caso de haberlo realizado)',
        ],
      },
      {
        titular: 'Cónyuge / Concubina',
        items: [
          'Negativa de la ANSES',
          'Certificado de matrimonio / concubinato',
          'DNI frente y dorso',
          'Último recibo de sueldo del titular',
        ],
      },
      {
        titular: 'Hijos',
        items: [
          'Último recibo de sueldo del titular',
          'Constancia de CUIL',
          'DNI frente y dorso',
          'Partida de nacimiento',
        ],
      },
    ],
  },
  {
    key: 'monotributo',
    label: 'Monotributo',
    icon: 'fas fa-file-invoice-dollar',
    grupos: [
      {
        titular: 'Titular',
        items: [
          'F184 ARCA',
          'F152 (credencial de pago de monotributo)',
          'DNI frente y dorso',
          'Últimos 3 pagos',
          'Certificado de opción de cambio SSSalud (solo si se realizó)',
        ],
      },
      {
        titular: 'Cónyuge / Concubina',
        items: [
          'Negativa de la ANSES',
          'F184 ARCA (actualizado con adherentes)',
          'F152 (actualizado con el valor del adherente)',
          'DNI frente y dorso',
          'Certificado de matrimonio / concubinato',
          'Último pago (con el adherente)',
        ],
      },
      {
        titular: 'Hijos',
        items: [
          'F184 ARCA (actualizado con adherentes)',
          'F152 (actualizado con el valor del adherente)',
          'DNI frente y dorso',
          'Constancia de CUIL',
          'Partida de nacimiento',
          'Último pago (con el adherente)',
          'CUD actualizado',
        ],
      },
    ],
  },
  {
    key: 'monotributo-social',
    label: 'Monotributo Social',
    icon: 'fas fa-hand-holding-heart',
    grupos: [
      {
        titular: 'Titular',
        items: [
          'Certificado de elección de obra social (ANSES)',
          'F152 (credencial de pago de monotributo)',
          'DNI frente y dorso',
          'Últimos 3 pagos',
          'Certificado de opción de cambio (solo en caso de haberlo realizado)',
        ],
      },
      {
        titular: 'Cónyuge / Concubina',
        items: [
          'Negativa de la ANSES',
          'Certificado elección obra social (ANSES - adherente actualizado)',
          'F152 (con el valor del adherente actualizado)',
          'DNI frente y dorso',
          'Certificado de matrimonio / concubinato',
          'Último pago (con adherente)',
        ],
      },
      {
        titular: 'Hijos',
        items: [
          'Certificado elección obra social (ANSES - adherente actualizado)',
          'F152 (con el valor del adherente actualizado)',
          'DNI frente y dorso',
          'Partida de nacimiento',
          'Constancia de CUIL',
          'Último pago (con adherente)',
          'CUD actualizado',
        ],
      },
    ],
  },
  {
    key: 'servicio-domestico',
    label: 'Servicio Doméstico',
    icon: 'fas fa-broom',
    grupos: [
      {
        titular: 'Titular',
        items: [
          'F102/RT (formulario de pago ARCA)',
          'Constancia de alta de trabajador (ARCA - solicitar al empleador)',
          'Último recibo de sueldo',
          'Último pago',
          'DNI frente y dorso',
          'Certificado de opción de cambio (solo en caso de haberlo realizado)',
        ],
      },
      {
        titular: 'Cónyuge / Concubina',
        items: [
          'Negativa de la ANSES',
          'F575/RT (con el adherente)',
          'Último recibo de sueldo del titular',
          'Último pago (con el adherente)',
          'DNI frente y dorso',
          'Certificado de matrimonio / concubinato',
        ],
      },
      {
        titular: 'Hijos',
        items: [
          'F575/RT (con el adherente)',
          'Último recibo de sueldo del titular',
          'Último pago (con el adherente)',
          'DNI frente y dorso',
          'Partida de nacimiento',
          'Constancia de CUIL',
        ],
      },
    ],
  },
]

const OPCION_CAMBIO_DOCS = [
  'Certificado de opción',
  'DNI frente y dorso del titular',
  'Últimos 2 recibos de sueldo',
  'DNI frente y dorso de cónyuge/concubina (en caso de tener)',
  'Certificado de matrimonio/concubinato (en caso de tener)',
  'DNI frente y dorso de hijos (en caso de tener)',
  'Partida de nacimiento de hijos (en caso de tener)',
]

function SectionTitle({ children }) {
  return (
    <h3
      className="text-sm font-bold text-white uppercase px-3 py-2 mb-3 mt-6 first:mt-0"
      style={{ backgroundColor: '#3dc2c6', fontFamily: "'Open Sans', sans-serif" }}
    >
      {children}
    </h3>
  )
}

function CheckList({ items }) {
  return (
    <ul className="space-y-2 mb-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-[#444]">
          <i className="fas fa-check text-[#3dc2c6] mt-0.5 shrink-0"></i>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function Afiliacion() {
  const [activeTab, setActiveTab] = useState(CATEGORIAS[0].key)
  const categoria = CATEGORIAS.find((c) => c.key === activeTab)

  return (
    <PageLayout title="AFILIACIÓN">
      <div style={{ fontFamily: "'Open Sans', sans-serif" }} className="text-sm text-[#444]">

        <p className="mb-5">
          Para poder acceder a la afiliación de la Obra Social deberá presentar la siguiente documentación
          según su tipo de aporte:
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

        {categoria.grupos.map((grupo) => (
          <div key={grupo.titular}>
            <SectionTitle>{grupo.titular}</SectionTitle>
            <CheckList items={grupo.items} />
          </div>
        ))}

        {(activeTab === 'monotributo' || activeTab === 'monotributo-social') && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 px-4 py-3 mb-5 text-xs leading-relaxed">
            <p className="font-bold mb-1">MONOTRIBUTISTAS</p>
            <p>Deberán presentar todos los meses el ticket de pago AFIP actualizado.</p>
            <p className="mt-1">Para la incorporación de grupo familiar primario deben abonar un importe adicional vía AFIP.</p>
          </div>
        )}

        {activeTab === 'servicio-domestico' && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 px-4 py-3 mb-5 text-xs leading-relaxed">
            <p className="font-bold mb-1">EMPLEADOS DE SERVICIO DOMÉSTICO</p>
            <p>Deberán presentar todos los meses el ticket de pago AFIP actualizado.</p>
          </div>
        )}

        <p className="text-xs text-gray-500 mb-6">
          Los hijos solteros mayores de 21 años tienen cobertura hasta los 25 años presentando el certificado de alumno regular.
        </p>

        <p className="mb-6">
          Por consultas:{' '}
          <a href="mailto:afiliaciones@ostcara.org.ar" className="text-[#3dc2c6] hover:underline">
            afiliaciones@ostcara.org.ar
          </a>
        </p>

        <hr className="border-gray-200 my-6" />

        <SectionTitle>Nuevo Procedimiento de Opción de Cambio — Res. 1216/2020</SectionTitle>
        <p className="mb-3">
          La Opción de Cambio la gestionás directamente en{' '}
          <a href="https://www.sssalud.gob.ar/misssalud/" target="_blank" rel="noopener noreferrer" className="text-[#3dc2c6] hover:underline font-semibold">
            MI SSSALUD
          </a>{' '}
          desde el sitio web, sin intermediarios ni necesidad de trasladarte.
        </p>
        <p className="mb-3 text-xs text-gray-500">
          Requisito: tener CLAVE FISCAL nivel 3 o superior y adherir el servicio MI SSSALUD. La opción entra en vigencia según la fecha que indique el certificado. Una vez realizada, deberás esperar 1 año para poder realizar otra.
        </p>

        <p className="mb-2 font-semibold text-xs uppercase tracking-wide">Documentación a presentar ante la Obra Social elegida:</p>
        <CheckList items={OPCION_CAMBIO_DOCS} />

        <a
          href="https://ostcara.com.ar/wp-content/uploads/2023/08/instructivo_opcion_de_cambio_clave_fiscal_3.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 border border-[#3dc2c6] text-[#3dc2c6] text-xs font-semibold hover:bg-[#3dc2c6] hover:text-white transition-colors"
        >
          <i className="fas fa-file-pdf"></i>
          Ver instructivo opción de cambio (PDF)
        </a>
      </div>
    </PageLayout>
  )
}
