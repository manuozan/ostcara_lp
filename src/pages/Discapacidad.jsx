import PageLayout from '../components/PageLayout'

const DOCS = [
  {
    label: 'Requerimientos discapacidad',
    file: '1-REQUERIMIENTOS DISCAPACIDAD.pdf',
  },
  {
    label: 'Resumen de historia clínica',
    file: '2-RESUMEN DE HISTORIA CLÍNICA.pdf',
  },
  {
    label: 'Planilla independencia funcional',
    file: '3-PLANILLA FIM.pdf',
  },
  {
    label: 'Formulario de conformidad prestación rehabilitación-instituciones',
    file: '6-CONFORMIDAD PRESTACIONAL REHABILITACION-INSTITUCIONES.pdf',
  },
  // Falta el PDF "7-CONFORMIDAD PRESTACIONAL TRANSPORTE" en public/disc — agregar cuando esté disponible.
  {
    label: 'Formulario de pedido médico de transporte y presupuesto',
    file: '5-PEDIDO MEDICO DE TRANSPORTE y PRESUPUESTO.pdf',
  },
  {
    label: 'Formulario de pedido médico de rehabilitaciones - instituciones y presupuesto',
    file: '4-PEDIDO MEDICO DE REHABILITACIONES- INSTITUCIONES Y PRESUPUESTO.pdf',
  },
  {
    label: 'Planillas de asistencia',
    file: '8-PLANILLAS DE ASISTENCIA.pdf',
  },
  {
    label: 'Usuario SAAS',
    file: '9-USUARIO SAAS.pdf',
  },
]

function DocLink({ label, file }) {
  return (
    <a
      href={encodeURI(`/disc/${file}`)}
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
          <DocLink key={doc.file} {...doc} />
        ))}
      </div>
    </PageLayout>
  )
}
