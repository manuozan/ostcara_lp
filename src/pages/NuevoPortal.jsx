import mockCelular from '../assets/mock-celular.png'
import emojiCarnet from '../assets/emoji-carnet.svg'
import emojiDoc from '../assets/emoji-doc.svg'
import emojiPhone from '../assets/emoji-phone.svg'
import PageLayout from '../components/PageLayout'

const FEATURES = [
  {
    emoji: emojiCarnet,
    title: 'Credencial Digital',
    desc: 'Consultá y descargá tu carnet desde el celular.',
  },
  {
    emoji: emojiDoc,
    title: 'Autorizaciones',
    desc: 'Realizá solicitudes y seguí el estado de tus trámites.',
  },
  {
    emoji: emojiPhone,
    title: 'Todo desde tu celular',
    desc: 'Compatible con Android, iPhone y computadora.',
  },
]

export default function NuevoPortal() {
  return (
    <PageLayout title="NUEVO PORTAL DIGITAL" subtitle="Portal de Afiliados OSTCARA">
      <div style={{ fontFamily: "'Open Sans', sans-serif" }}>

        {/* Hero block */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-[#444] mb-3">Portal de Afiliados OSTCARA</h2>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
              Accedé de forma rápida y segura a tus autorizaciones, credencial digital, movimientos, aportes y novedades.
            </p>
            <a
              href="https://afiliados.ostcara.org.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 text-sm font-bold text-white transition-colors duration-200"
              style={{ backgroundColor: '#3ec6f5' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#5ac8fa'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#3ec6f5'}
            >
              Ingresar al Portal
            </a>
          </div>
          <div className="shrink-0 md:w-80">
            <img src={mockCelular} alt="Portal de Afiliados OSTCARA" className="w-full rounded shadow" />
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {FEATURES.map((f) => (
            <div key={f.title} className="border border-gray-200 p-5 text-center">
              <img src={f.emoji} alt="" className="w-10 h-10 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-[#444] mb-1">
                {f.title}
                {f.tag && (
                  <span className="ml-2 text-xs font-normal text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: '#3ec6f5' }}>
                    {f.tag}
                  </span>
                )}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center py-8 px-6 mb-8" style={{ backgroundColor: '#f0fbff' }}>
          <p className="text-sm text-[#444] mb-2 font-semibold">¡Comenzá a utilizarlo hoy!</p>
          <p className="text-xs text-gray-500 mb-5">
            Estimado afiliado: ya se encuentra disponible el nuevo portal de autogestión de OSTCARA, diseñado para brindarte una experiencia más moderna, simple y accesible desde cualquier dispositivo.
          </p>
          <p className="text-xs text-gray-500 mb-5">Ingresá con tu DNI y comenzá a gestionar tus servicios de manera rápida y segura.</p>
          <a
            href="https://afiliados.ostcara.org.ar/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-7 py-3 text-sm font-bold text-white transition-colors duration-200"
            style={{ backgroundColor: '#3ec6f5' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#5ac8fa'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#3ec6f5'}
          >
            Acceder ahora
          </a>
        </div>

        {/* Help */}
        <div className="flex items-start gap-3 text-sm text-[#444] border-t border-gray-200 pt-6">
          <i className="fas fa-question-circle text-[#3ec6f5] text-xl mt-0.5 shrink-0"></i>
          <div>
            <p className="font-semibold mb-1">¿Necesitás ayuda?</p>
            <p className="text-xs text-gray-500 mb-2">
              Consultá nuestros instructivos paso a paso para Android, iPhone y uso general del portal.
            </p>
            <a
              href="https://ostcara.com.ar/centro-ayuda-portal-ostcara/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#3ec6f5] font-semibold hover:underline"
            >
              Ver instructivos →
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
