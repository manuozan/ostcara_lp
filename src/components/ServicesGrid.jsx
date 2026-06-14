import { Link } from 'react-router-dom'

const SERVICES = [
  {
    id: 1,
    icon: 'fas fa-heart',
    title: 'AFILIATE A\nOSTCARA',
    description: 'La obra social que crece junto a sus afiliados y se preocupa por ellos los 365 días de año.',
    to: '/afiliacion',
    bgColor: 'rgba(62, 198, 245, 0.4)',
  },
  {
    id: 2,
    icon: 'fas fa-map-marker-alt',
    title: 'NUESTRAS DELEGACIONES',
    description: 'Seguimos creciendo y llevando a OSTCARA cerca de cada uno de nuestros afiliados.',
    to: '/delegaciones',
    bgColor: '#dcf3f8',
  },
  {
    id: 3,
    icon: 'fas fa-user-md',
    title: 'CARTILLA MÉDICA',
    description: 'Profesionales de excelencia de todas las áreas de la salud para darte la mejor cobertura.',
    to: '/cartilla',
    bgColor: 'rgba(62, 198, 245, 0.2)',
  },
  {
    id: 4,
    icon: 'fas fa-headset',
    title: 'COMUNICATE CON NOSOTROS',
    description: 'En OSTCARA queremos siempre estar comunicados con el afiliado, por eso tenemos EMAIL, Teléfono y ahora WHATSAPP',
    to: '/contacto',
    bgColor: '#dcf3f8',
  },
]

function ServiceCard({ icon, title, description, to, bgColor }) {
  return (
    <Link
      to={to}
      className="group block relative overflow-hidden"
      style={{ backgroundColor: bgColor, height: '340px' }}
    >
      {/* Content */}
      <div className="flex flex-col items-center justify-center h-full px-6 text-center transition-transform duration-300 group-hover:-translate-y-20">
        {/* Icon */}
        <i
          className={`${icon} text-[70px] mb-4 transition-transform duration-300`}
          style={{
            background: 'linear-gradient(210deg, #39e5d4, #22a3d6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: '70px',
            width: '70px',
            height: '70px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        ></i>

        {/* Title */}
        <h3
          className="text-sm font-bold text-[#444] mt-2 leading-snug whitespace-pre-line"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          {title}
        </h3>
      </div>

      {/* Description revealed on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 px-6 pb-6 text-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
      >
        <p
          className="text-xs text-[#444] leading-relaxed"
          style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          {description}
        </p>
      </div>
    </Link>
  )
}

export default function ServicesGrid() {
  return (
    <section className="w-full" style={{ backgroundColor: '#f4f4f4' }}>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      >
        {SERVICES.map((service) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>
    </section>
  )
}
