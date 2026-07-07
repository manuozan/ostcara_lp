import { Link } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
// import BuscadorPrestadores from '../components/BuscadorPrestadores'

const ITEMS = [
  {
    label: 'Resolución SSS — Aprobación 2026–2027',
    href: 'https://ostcara.com.ar/wp-content/uploads/2026/06/APROBACION-CARTILLA-2026-2027.pdf',
  },
  {
    label: 'Cobertura médica: Anexo I',
    href: 'https://ostcara.com.ar/wp-content/uploads/2026/06/ANEXO-I-2026-2027.pdf',
  },
  {
    label: 'Cobertura médica: Anexo II',
    href: 'https://ostcara.com.ar/wp-content/uploads/2026/06/ANEXO-II-2026-2027.pdf',
  },
  {
    label: 'Cobertura médica: Anexo IV',
    href: 'https://ostcara.com.ar/wp-content/uploads/2026/06/ANEXO-IV-2026-2027.pdf',
  },
]

function DocLink({ label, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-4 border border-gray-200 hover:border-[#3ec6f5] hover:bg-[#f0fbff] transition-colors group"
    >
      <i className="fas fa-file-pdf text-2xl text-red-400 shrink-0"></i>
      <span className="text-sm text-[#444] group-hover:text-[#3ec6f5] font-medium" style={{ fontFamily: "'Open Sans', sans-serif" }}>
        {label}
      </span>
      <i className="fas fa-download ml-auto text-gray-300 group-hover:text-[#3ec6f5] text-sm"></i>
    </a>
  )
}

export default function Cartilla() {
  return (
    <PageLayout title="CARTILLA MÉDICA">
      <p className="text-sm text-[#444] mb-6" style={{ fontFamily: "'Open Sans', sans-serif" }}>
        Profesionales de excelencia de todas las áreas de la salud. Los coseguros vigentes se abonan directamente en el prestador al momento de la consulta.
      </p>
      {/* <BuscadorPrestadores /> */}

      <div className="space-y-3 mt-10 pt-8 border-t border-gray-200">
        <h3 className="text-sm font-bold text-[#444] uppercase tracking-wide mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>
          Documentos y resoluciones
        </h3>
        {ITEMS.map((item) => (
          <DocLink key={item.href} {...item} />
        ))}
        <Link
          to="/coseguros"
          className="flex items-center gap-3 p-4 border border-gray-200 hover:border-[#3ec6f5] hover:bg-[#f0fbff] transition-colors group"
        >
          <i className="fas fa-circle-info text-2xl text-[#3ec6f5] shrink-0"></i>
          <span className="text-sm text-[#444] group-hover:text-[#3ec6f5] font-medium" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            Consultá los coseguros vigentes
          </span>
          <i className="fas fa-arrow-right ml-auto text-gray-300 group-hover:text-[#3ec6f5] text-sm"></i>
        </Link>
      </div>
    </PageLayout>
  )
}
