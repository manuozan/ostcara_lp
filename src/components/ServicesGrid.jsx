import { Link } from 'react-router-dom'

const SERVICES = [
  {
    id: 1,
    icon: 'fas fa-user-plus',
    title: 'Afíliate a Ostcara',
    description: 'La obra social que crece junto a sus afiliados y se preocupa por ellos los 365 días del año.',
    label: 'Afiliación',
    to: '/afiliacion',
    color: '#3dc2c6',
    colorLight: '#e8f9fa',
  },
  {
    id: 2,
    icon: 'fas fa-map-marker-alt',
    title: 'Nuestras Delegaciones',
    description: 'Seguimos creciendo y llevando Ostcara cada vez más cerca de todos nuestros afiliados.',
    label: 'Red de oficinas',
    to: '/delegaciones',
    color: '#22a3d6',
    colorLight: '#e6f4fb',
  },
  {
    id: 3,
    icon: 'fas fa-stethoscope',
    title: 'Cartilla Médica',
    description: 'Profesionales de excelencia en todas las áreas de la salud para brindarte la mejor cobertura.',
    label: 'Prestadores',
    to: '/cartilla',
    color: '#39c9b8',
    colorLight: '#e7f9f7',
  },
  {
    id: 4,
    icon: 'fas fa-comments',
    title: 'Contactanos',
    description: 'Estamos disponibles para vos por email, teléfono y WhatsApp. Tu consulta siempre tiene respuesta.',
    label: 'Atención al afiliado',
    to: '/contacto',
    color: '#2b91c4',
    colorLight: '#e5f2fa',
  },
]

function ServiceCard({ icon, title, description, label, to, color, colorLight }) {
  return (
    <Link
      to={to}
      className="group flex flex-col bg-white relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        borderRadius: '0',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 8px 28px rgba(0,0,0,0.12)`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'
      }}
    >
      {/* Top accent bar */}
      <div
        className="w-full h-1 flex-shrink-0 transition-all duration-300 group-hover:h-[3px]"
        style={{ backgroundColor: color }}
      />

      <div className="flex flex-col items-start p-7 flex-1">
        {/* Label pill */}
        <span
          className="inline-block text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5"
          style={{
            backgroundColor: colorLight,
            color: color,
            fontFamily: "'Open Sans', sans-serif",
            letterSpacing: '0.1em',
          }}
        >
          {label}
        </span>

        {/* Icon circle */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: colorLight }}
        >
          <i
            className={`${icon} text-xl`}
            style={{ color }}
          />
        </div>

        {/* Title */}
        <h3
          className="text-base font-bold text-gray-800 mb-3 leading-snug"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="text-sm text-gray-500 leading-relaxed flex-1"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          {description}
        </p>

        {/* CTA link */}
        <div
          className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 group-hover:gap-3"
          style={{
            color,
            fontFamily: "'Open Sans', sans-serif",
            letterSpacing: '0.08em',
          }}
        >
          Ver más
          <i className="fas fa-arrow-right text-[10px] transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}

export default function ServicesGrid() {
  return (
    <section
      className="w-full py-10 px-4"
      style={{ backgroundColor: '#f0f8fa' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-8">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: '#3dc2c6', fontFamily: "'Open Sans', sans-serif", letterSpacing: '0.15em' }}
          >
            ¿Qué necesitás?
          </p>
          <h2
            className="text-2xl md:text-3xl font-bold text-gray-800"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Estamos para ayudarte
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}
