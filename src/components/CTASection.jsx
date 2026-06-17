export default function CTASection() {
  return (
    <section
      className="w-full relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #3dc2c6 0%, #2b91c4 100%)',
        padding: '2.75rem 1.5rem',
      }}
    >
      {/* Dot-grid decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'linear-gradient(to right, transparent, black 40%, black 60%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%, black 60%, transparent)',
        }}
      />

      <div className="relative max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
        {/* Left: text */}
        <div className="text-center md:text-left flex-1">
          <p
            className="text-white/70 text-[11px] font-bold uppercase tracking-[0.18em] mb-2"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Portal Digital de Afiliados
          </p>
          <h2
            className="text-2xl md:text-3xl font-extrabold text-white leading-tight"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Tu obra social,<br className="hidden md:block" /> siempre al alcance
          </h2>
          <p
            className="text-white/75 text-sm mt-2 leading-relaxed"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Credencial digital, autorizaciones y gestiones — desde cualquier dispositivo.
          </p>
        </div>

        {/* Right: CTA button */}
        <a
          href="https://afiliados.ostcara.org.ar"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-white font-extrabold text-sm uppercase tracking-wider transition-all duration-200 group"
          style={{
            color: '#3dc2c6',
            fontFamily: "'Nunito', sans-serif",
            letterSpacing: '0.07em',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.18)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'none'
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'
          }}
        >
          Ingresar al Portal
          <i className="fas fa-arrow-right text-xs transition-transform duration-200 group-hover:translate-x-1"></i>
        </a>
      </div>
    </section>
  )
}
