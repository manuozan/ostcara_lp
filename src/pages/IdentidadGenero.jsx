import identidadImg from '../assets/identidad-genero.jpg'
import PageLayout from '../components/PageLayout'

const DERECHOS = [
  'Que su identidad de género sea reconocida.',
  'Desarrollar su vida de acuerdo a su identidad de género.',
  'Ser tratada de acuerdo a su identidad de género.',
  'Ser identificada de ese modo.',
]

export default function IdentidadGenero() {
  return (
    <PageLayout title="IDENTIDAD DE GÉNERO: Ley 26.743" subtitle="22/05/2023">
      <div style={{ fontFamily: "'Open Sans', sans-serif" }} className="text-sm text-[#444]">
        <p className="mb-5 leading-relaxed">
          En OSTCARA, creemos en la igualdad y el respeto para todas las personas.
        </p>

        <p className="font-bold mb-3">TODAS LAS PERSONAS tienen derecho a:</p>
        <ul className="mb-6 space-y-2">
          {DERECHOS.map((d, i) => (
            <li key={i} className="flex items-start gap-2">
              <i className="fas fa-check text-[#3ec6f5] mt-0.5 shrink-0"></i>
              <span>{d}</span>
            </li>
          ))}
        </ul>

        <p className="mb-4 leading-relaxed">
          Si necesitás apoyo o información adicional, no dudes en comunicarte con nosotros:
        </p>

        <ul className="mb-8 space-y-2">
          <li className="flex items-center gap-2">
            <i className="fas fa-phone text-[#3ec6f5]"></i>
            <span>Línea gratuita: <strong>0800 345 1266</strong></span>
          </li>
          <li className="flex items-center gap-2">
            <i className="fab fa-whatsapp text-[#3ec6f5]"></i>
            <span>WhatsApp: <strong>011 7172-2501</strong></span>
          </li>
        </ul>

        <div className="flex justify-center">
          <img
            src={identidadImg}
            alt="Identidad de Género - Ley 26.743"
            className="max-w-full md:max-w-sm"
          />
        </div>
      </div>
    </PageLayout>
  )
}
