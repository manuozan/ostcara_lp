import llamandoDoctorImg from '../assets/llamando-doctor.png'

const APP_STORE_URL = 'https://apps.apple.com/ar/app/llamando-al-doctor/id1196903602'
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.llamandoaldoctor&hl=es'

function StoreButton({ href, icon, eyebrow, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-200"
      style={{
        backgroundColor: '#2b2740',
        border: '1px solid rgba(255,255,255,0.14)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#d4f542'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
        e.currentTarget.style.transform = 'none'
      }}
    >
      <i className={`${icon} text-2xl text-white shrink-0`}></i>
      <div className="text-left leading-tight">
        <p className="text-[10px] text-white/60">{eyebrow}</p>
        <p className="text-sm font-bold text-white" style={{ fontFamily: "'Nunito', sans-serif" }}>{label}</p>
      </div>
    </a>
  )
}

export default function LlamandoDoctorSection() {
  return (
    <section
      className="w-full relative overflow-hidden"
      style={{ background: '#1f1b2e', padding: '2.75rem 1.5rem' }}
    >
      {/* Dot-grid decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(212,245,66,0.15) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'linear-gradient(to right, transparent, black 40%, black 60%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%, black 60%, transparent)',
        }}
      />

      <div className="relative max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        {/* Left: text + store buttons */}
        <div className="text-center md:text-left flex-1 order-2 md:order-1">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.18em] mb-2"
            style={{ color: '#d4f542', fontFamily: "'Nunito', sans-serif" }}
          >
            Telemedicina 24/7
          </p>
          <h2
            className="text-2xl md:text-3xl font-extrabold text-white leading-tight"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Llamando al Doctor
          </h2>
          <ul className="mt-4 mb-6 space-y-2.5 max-w-md mx-auto md:mx-0">
            {[
              'Videoconsultas a través de nuestra App y plataforma Web',
              'Demanda espontánea las 24 horas, los 7 días de la semana, los 365 días del año',
              'Recetas médicas, órdenes de estudios y constancias de atención digitales',
              'Múltiples especialidades médicas',
              'Profesionales de primer nivel pertenecientes a reconocidas instituciones de salud',
            ].map(item => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-white/70 text-base leading-relaxed text-left"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                <i className="fas fa-check-circle mt-0.5 shrink-0" style={{ color: '#d4f542' }}></i>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3">
            <StoreButton href={APP_STORE_URL} icon="fab fa-apple" eyebrow="Descargar en" label="App Store" />
            <StoreButton href={GOOGLE_PLAY_URL} icon="fab fa-google-play" eyebrow="Disponible en" label="Google Play" />
          </div>
        </div>

        {/* Right: app mockup */}
        <div className="shrink-0 order-1 md:order-2">
          <img
            src={llamandoDoctorImg}
            alt="App Llamando al Doctor"
            className="w-auto object-contain h-[380px] md:h-[600px]"
          />
        </div>
      </div>
    </section>
  )
}
