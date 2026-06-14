import PageLayout from '../components/PageLayout'

const DOCS = [
  {
    label: 'Cómo acceder a las prestaciones',
    href: 'https://ostcara.com.ar/wp-content/uploads/2025/10/ACCESO-A-PRESTACIONES-DISCAPACIDAD.pdf',
  },
  {
    label: 'Documentación a presentar — Requerimientos',
    href: 'https://ostcara.com.ar/wp-content/uploads/2025/10/REQUERIMIENTOS-DISCAPACIDAD.pdf',
  },
  {
    label: 'Formulario resumen de historia clínica',
    href: 'https://ostcara.com.ar/wp-content/uploads/2025/10/RESUMEN-DE-HISTORIA-CLINICA.pdf',
  },
  {
    label: 'Formulario de independencia funcional (FIM)',
    href: 'https://ostcara.com.ar/wp-content/uploads/2025/10/PLANILLA-FIM.pdf',
  },
  {
    label: 'Formulario conformidad prestación',
    href: 'https://ostcara.com.ar/wp-content/uploads/2025/10/CONFORMIDAD-PRESTACIONAL-REHABILITACION-INSTITUCIONES-.pdf',
  },
  {
    label: 'Requisitos para transporte',
    href: 'https://ostcara.com.ar/wp-content/uploads/2025/10/REQUISTIOS-PARA-TRANSPORTE-.pdf',
  },
  {
    label: 'Solicitud de transporte y presupuesto',
    href: 'https://ostcara.com.ar/wp-content/uploads/2025/10/SOLICITUD-TRANSPORTE-y-PRESUPUESTO.pdf',
  },
  {
    label: 'Solicitud de rehabilitaciones y presupuesto',
    href: 'https://ostcara.com.ar/wp-content/uploads/2025/10/SOLICITUD-DE-REHABILITACIONES-Y-PRESUPUESTO.pdf',
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

export default function Discapacidad() {
  return (
    <PageLayout title="DISCAPACIDAD">
      <p className="text-sm text-[#444] mb-6" style={{ fontFamily: "'Open Sans', sans-serif" }}>
        Descargá los formularios y planillas necesarios para acceder a las prestaciones por discapacidad.
        Para consultas sobre Acompañamiento Terapéutico, enviá un mail a{' '}
        <a href="mailto:secretaria@ostcara.org.ar" className="text-[#3ec6f5] hover:underline">
          secretaria@ostcara.org.ar
        </a>
      </p>
      <div className="space-y-3">
        {DOCS.map((doc) => (
          <DocLink key={doc.href} {...doc} />
        ))}
      </div>
    </PageLayout>
  )
}
