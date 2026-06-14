import PageLayout from '../components/PageLayout'

const DOCS = [
  {
    label: 'Coseguros Monotributo — Octubre 2025',
    href: 'https://ostcara.com.ar/wp-content/uploads/2025/10/COSEGUROS-MONOTRIBUTO-A-OCTUBRE-1.pdf',
  },
  {
    label: 'Coseguros Relación de Dependencia — Octubre 2025',
    href: 'https://ostcara.com.ar/wp-content/uploads/2025/10/COSEGUROS-RELACION-DE-DEPENDENCIA-A-OCTUBRE-2025-1.pdf',
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

export default function Coseguros() {
  return (
    <PageLayout title="COSEGUROS">
      <p className="text-sm text-[#444] mb-6" style={{ fontFamily: "'Open Sans', sans-serif" }}>
        Los coseguros vigentes se abonan directamente en el prestador al momento de la consulta.
      </p>
      <div className="space-y-3">
        {DOCS.map((doc) => (
          <DocLink key={doc.href} {...doc} />
        ))}
      </div>
    </PageLayout>
  )
}
