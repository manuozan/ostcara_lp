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
    colorLight: '#e6f7f8',
  },
  {
    id: 2,
    icon: 'fas fa-map-marker-alt',
    title: 'Nuestras Delegaciones',
    description: 'Seguimos creciendo y llevando Ostcara cada vez más cerca de todos nuestros afiliados.',
    label: 'Red de oficinas',
    to: '/delegaciones',
    color: '#2b91c4',
    colorLight: '#e5f2fa',
  },
  {
    id: 3,
    icon: 'fas fa-stethoscope',
    title: 'Cartilla Médica',
    description: 'Profesionales de excelencia en todas las áreas de la salud para brindarte la mejor cobertura.',
    label: 'Prestadores',
    to: '/cartilla',
    color: '#2ba5a9',
    colorLight: '#e4f5f6',
  },
  {
    id: 4,
    icon: 'fas fa-comments',
    title: 'Contactanos',
    description: 'Estamos disponibles para vos por email, teléfono y WhatsApp. Tu consulta siempre tiene respuesta.',
    label: 'Atención al afiliado',
    to: '/contacto',
    color: '#1e7aac',
    colorLight: '#e3eef7',
  },
]

function ServiceCard({ icon, title, description, label, to, color, colorLight, index }) {
  return (
    <Link
      to={to}
      className="group flex flex-col bg-white relative overflow-hidden"
      style={{
        boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
        animation: `fadeUp 0.5s ease both`,
        animationDelay: `${index * 80}ms`,
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.13)'
        e.currentTarget.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.07)'
        e.currentTarget.style.transform = 'none'
      }}
    >
      {/* Top accent bar */}
      <div className="w-full h-[3px]" style={{ backgroundColor: color }} />

      <div className="flex flex-col items-start p-6 flex-1">
        {/* Label */}
        <span
          className="inline-block text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mb-5"
          style={{
            backgroundColor: colorLight,
            color: color,
            fontFamily: "'Nunito', 'Open Sans', sans-serif",
          }}
        >
          {label}
        </span>

        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: colorLight }}
        >
          <i className={`${icon} text-lg`} style={{ color }} />
        </div>

        {/* Title */}
        <h3
          className="text-base font-bold text-[#2d3a45] mb-2.5 leading-snug"
          style={{ fontFamily: "'Nunito', 'Open Sans', sans-serif" }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="text-sm text-[#617585] leading-relaxed flex-1"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          {description}
        </p>

        {/* CTA */}
        <div
          className="mt-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-200 group-hover:gap-3"
          style={{
            color,
            fontFamily: "'Nunito', 'Open Sans', sans-serif",
          }}
        >
          Ver más
          <i className="fas fa-arrow-right text-[9px] transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}

export default function ServicesGrid() {
  return (
    <section className="w-full py-12 px-4" style={{ backgroundColor: '#f6fbfc' }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Section header */}
        <div className="text-center mb-8">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.18em] mb-2"
            style={{ color: '#3dc2c6', fontFamily: "'Nunito', sans-serif" }}
          >
            ¿Qué necesitás?
          </p>
          <h2
            className="text-2xl md:text-3xl font-extrabold text-[#2d3a45]"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Estamos para ayudarte
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} {...service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
