import PageLayout from '../components/PageLayout'

const VALORES = [
  {
    icon: 'fas fa-heartbeat',
    title: 'Salud de calidad',
    desc: 'Profesionales seleccionados en todas las especialidades, con prestaciones que acompañan al afiliado y su familia en cada etapa de la vida.',
    color: '#3dc2c6',
    bg: '#e6f7f8',
  },
  {
    icon: 'fas fa-map-marked-alt',
    title: 'Presencia federal',
    desc: 'Una red de delegaciones sindicales que lleva OSTCARA a cada rincón del país, cerca de cada trabajador y su familia.',
    color: '#2b91c4',
    bg: '#e5f2fa',
  },
  {
    icon: 'fas fa-hands-helping',
    title: 'Compromiso real',
    desc: 'Una obra social construida desde adentro, que conoce las necesidades de sus afiliados y trabaja todos los días para estar a la altura.',
    color: '#2ba5a9',
    bg: '#e4f5f6',
  },
]

const HISTORIA = [
  'Todo comenzó con una decisión: construir una obra social propia, independiente, con dignidad y respeto como pilares. Un camino que hoy parece lejano pero que, para muchos de nosotros, comenzó ayer.',
  'Como toda organización que hace y no solo promete, cometimos errores. Los reconocimos y los corregimos. Superamos momentos financieros difíciles, prestaciones interrumpidas y situaciones complejas. De cada crisis salimos más fuertes y con mayor claridad sobre lo que queríamos ser.',
  'Decidimos que cada sindicato fuera una delegación real de OSTCARA — no una oficina lejana, sino una presencia concreta. Ser federales de verdad no es una consigna: es nuestra forma de trabajar.',
  'Hoy contamos con un sistema ordenado para gestionar beneficios y prestaciones, con profesionales seleccionados en todas las especialidades. Avanzamos en calidad de atención porque lo demás son solo palabras.',
  'Nuestro proyecto está más vigente que nunca: una organización de salud autónoma, equilibrada, ágil y al servicio de las familias de los trabajadores argentinos.',
]

const QUOTE = 'El papel de los sindicatos no es sólo ser instrumentos de negociación, sino también lugares donde se expresa la personalidad de los trabajadores. Sus servicios contribuyen al desarrollo de una auténtica cultura del trabajo y ayudan a participar de manera plenamente humana en la vida de la empresa.'

export default function Conocenos() {
  return (
    <PageLayout title="Conócenos" subtitle="Sobre OSTCARA">

      {/* Lead */}
      <div
        className="border-l-4 pl-5 mb-8"
        style={{ borderColor: '#3dc2c6' }}
      >
        <p
          className="text-base leading-relaxed font-semibold"
          style={{ color: '#2d3a45', fontFamily: "'Nunito', 'Open Sans', sans-serif" }}
        >
          OSTCARA es la Obra Social de los Trabajadores de la Carne y Afines de la República Argentina
          — una organización de salud construida desde adentro, por y para los trabajadores de la industria.
        </p>
      </div>

      {/* Valores */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {VALORES.map((v) => (
          <div
            key={v.title}
            className="p-5 rounded-sm"
            style={{ backgroundColor: v.bg }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
              style={{ backgroundColor: 'white' }}
            >
              <i className={`${v.icon} text-base`} style={{ color: v.color }}></i>
            </div>
            <h3
              className="text-sm font-bold mb-1.5"
              style={{ color: '#2d3a45', fontFamily: "'Nunito', sans-serif" }}
            >
              {v.title}
            </h3>
            <p
              className="text-xs leading-relaxed"
              style={{ color: '#617585', fontFamily: "'Open Sans', sans-serif" }}
            >
              {v.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Divider con label */}
      <div className="flex items-center gap-3 mb-7">
        <div className="flex-1 h-px" style={{ backgroundColor: '#e8f0f2' }}></div>
        <span
          className="text-[11px] font-bold uppercase tracking-[0.15em] px-3"
          style={{ color: '#3dc2c6', fontFamily: "'Nunito', sans-serif" }}
        >
          Nuestro camino
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: '#e8f0f2' }}></div>
      </div>

      {/* Historia */}
      <div className="space-y-4 mb-10">
        {HISTORIA.map((p, i) => (
          <p
            key={i}
            className="text-sm leading-relaxed"
            style={{ color: '#4a5568', fontFamily: "'Open Sans', sans-serif" }}
          >
            {p}
          </p>
        ))}
      </div>

      {/* Quote */}
      <blockquote
        className="relative pl-6 py-5 pr-5"
        style={{ backgroundColor: '#f6fbfc', borderLeft: '3px solid #3dc2c6' }}
      >
        <i
          className="fas fa-quote-left absolute top-4 right-4 text-2xl opacity-10"
          style={{ color: '#3dc2c6' }}
        ></i>
        <p
          className="text-sm leading-relaxed italic mb-3"
          style={{ color: '#4a5568', fontFamily: "'Open Sans', sans-serif" }}
        >
          {QUOTE}
        </p>
        <footer
          className="text-xs font-bold not-italic flex items-center gap-2"
          style={{ color: '#3dc2c6', fontFamily: "'Nunito', sans-serif" }}
        >
          <span className="w-6 h-px inline-block" style={{ backgroundColor: '#3dc2c6' }}></span>
          Juan Pablo II
        </footer>
      </blockquote>

    </PageLayout>
  )
}
