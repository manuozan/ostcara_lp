import PageLayout from '../components/PageLayout'

const REQUISITOS_TITULAR = [
  'DNI del titular',
  'Últimos 2 recibos de sueldos del titular / alta temprana firmada por el empleador',
]

const REQUISITOS_GRUPO = [
  'DNI de la cónyuge / concubina',
  'Certificado de matrimonio o declaración jurada de concubinato',
  'DNI de los hijos',
  'Partida de nacimiento de los hijos',
]

const REQUISITOS_FAMILIARES = [
  'DNI',
  'Partida de nacimiento',
  'Documento judicial de guarda y tutela (menores)',
  'Recibo de sueldo con el descuento adicional del 1.5%',
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
      style={{ backgroundColor: '#3ec6f5', fontFamily: "'Open Sans', sans-serif" }}
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
          <i className="fas fa-check text-[#3ec6f5] mt-0.5 shrink-0"></i>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function Afiliacion() {
  return (
    <PageLayout title="AFILIACIÓN">
      <div style={{ fontFamily: "'Open Sans', sans-serif" }} className="text-sm text-[#444]">

        <p className="mb-5">
          Para poder acceder a la afiliación de la Obra Social deberá presentar la siguiente documentación:
        </p>

        <SectionTitle>Titular</SectionTitle>
        <CheckList items={REQUISITOS_TITULAR} />

        <SectionTitle>Cónyuge / Concubina e Hijos</SectionTitle>
        <CheckList items={REQUISITOS_GRUPO} />
        <p className="text-xs text-gray-500 mb-4">
          Los hijos solteros mayores de 21 años tienen cobertura hasta los 25 años presentando el certificado de alumno regular.
        </p>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 px-4 py-3 mb-5 text-xs leading-relaxed">
          <p className="font-bold mb-1">MONOTRIBUTISTAS / EMPLEADOS DE SERVICIO DOMÉSTICO</p>
          <p>Deberán presentar todos los meses el ticket de pago AFIP actualizado.</p>
          <p className="mt-1">Para la incorporación de grupo familiar primario deben abonar un importe adicional vía AFIP.</p>
        </div>

        <SectionTitle>Familiares a Cargo</SectionTitle>
        <p className="text-xs text-gray-500 mb-2">Se entiende por familiares a cargo: padres mayores de 60 años o nietos.</p>
        <CheckList items={REQUISITOS_FAMILIARES} />

        <p className="mb-6">
          Por consultas:{' '}
          <a href="mailto:afiliaciones@ostcara.org.ar" className="text-[#3ec6f5] hover:underline">
            afiliaciones@ostcara.org.ar
          </a>
        </p>

        <hr className="border-gray-200 my-6" />

        <SectionTitle>Nuevo Procedimiento de Opción de Cambio — Res. 1216/2020</SectionTitle>
        <p className="mb-3">
          La Opción de Cambio la gestionás directamente en{' '}
          <a href="https://www.sssalud.gob.ar/misssalud/" target="_blank" rel="noopener noreferrer" className="text-[#3ec6f5] hover:underline font-semibold">
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
          className="inline-flex items-center gap-2 px-4 py-2 border border-[#3ec6f5] text-[#3ec6f5] text-xs font-semibold hover:bg-[#3ec6f5] hover:text-white transition-colors"
        >
          <i className="fas fa-file-pdf"></i>
          Ver instructivo opción de cambio (PDF)
        </a>
      </div>
    </PageLayout>
  )
}
