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

      <div className="relative max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
        {/* Left: icon + text */}
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left flex-1">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'rgba(212,245,66,0.12)', border: '2px solid #d4f542' }}
          >
            <i className="fas fa-video text-2xl" style={{ color: '#d4f542' }}></i>
          </div>
          <div>
            <p
              className="text-[11px] font-bold uppercase tracking-[0.18em] mb-1"
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
            <p
              className="text-white/70 text-sm mt-2 leading-relaxed max-w-md"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Un servicio de atención médica por videollamada las 24 horas, todos los días del año.
            </p>
          </div>
        </div>

        {/* Right: store buttons */}
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <StoreButton href={APP_STORE_URL} icon="fab fa-apple" eyebrow="Descargar en" label="App Store" />
          <StoreButton href={GOOGLE_PLAY_URL} icon="fab fa-google-play" eyebrow="Disponible en" label="Google Play" />
        </div>
      </div>
    </section>
  )
}
