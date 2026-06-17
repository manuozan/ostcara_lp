import { Link } from 'react-router-dom'

const EXTERNAL_LINKS = [
  { label: 'FESITCARA', href: 'http://fesitcara.org.ar/' },
  { label: 'Sindicato de la Carne', href: 'http://www.sindicatocarne.org.ar/new/' },
  { label: 'CGT', href: 'http://www.cgtrainternacional.com.ar/' },
  { label: 'Superintendencia de Salud', href: 'https://www.sssalud.gob.ar/' },
  { label: 'Ministerio de Trabajo', href: 'https://www.argentina.gob.ar/trabajo' },
  { label: 'ANSES', href: 'https://www.anses.gob.ar/' },
  { label: 'AFIP', href: 'http://www.afip.gob.ar/sitio/externos/' },
]

const QUICK_ACCESS = [
  { icon: 'fas fa-user-plus', label: 'Afiliación', to: '/afiliacion' },
  { icon: 'fas fa-stethoscope', label: 'Cartilla Médica', to: '/cartilla' },
  { icon: 'fas fa-map-marker-alt', label: 'Delegaciones', to: '/delegaciones' },
  { icon: 'fas fa-file-alt', label: 'Coseguros', to: '/coseguros' },
  { icon: 'fas fa-wheelchair', label: 'Discapacidad', to: '/discapacidad' },
  { icon: 'fas fa-comments', label: 'Contacto', to: '/contacto' },
]

export default function PageLayout({ title, subtitle, children }) {
  return (
    <div style={{ backgroundColor: '#f6fbfc' }} className="min-h-screen">

      {/* Page banner */}
      <div
        className="px-4 pt-8 pb-6 border-b"
        style={{ backgroundColor: '#f6fbfc', borderBottomColor: '#e8f0f2' }}
      >
        <div className="max-w-[1200px] mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 mb-4">
            <Link
              to="/"
              className="text-[11px] font-semibold transition-colors"
              style={{ color: '#3dc2c6', fontFamily: "'Open Sans', sans-serif" }}
            >
              Inicio
            </Link>
            <i className="fas fa-chevron-right text-[9px]" style={{ color: '#cbd5da' }}></i>
            <span
              className="text-[11px] font-semibold"
              style={{ color: '#617585', fontFamily: "'Open Sans', sans-serif" }}
            >
              {title}
            </span>
          </nav>

          <div className="flex items-end gap-4">
            <div
              className="w-1 self-stretch rounded-full shrink-0"
              style={{ backgroundColor: '#3dc2c6', minHeight: '2.5rem' }}
            />
            <div>
              <h1
                className="text-3xl md:text-4xl font-extrabold leading-tight"
                style={{ color: '#2d3a45', fontFamily: "'Nunito', 'Open Sans', sans-serif" }}
              >
                {title}
              </h1>
              {subtitle && (
                <p
                  className="text-sm mt-1"
                  style={{ color: '#617585', fontFamily: "'Open Sans', sans-serif" }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content + Sidebar */}
      <div className="max-w-[1200px] mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main content */}
          <main className="flex-1 min-w-0 bg-white p-6 md:p-8" style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
            {children}
          </main>

          {/* Sidebar */}
          <aside className="lg:w-[272px] shrink-0 flex flex-col gap-5">

            {/* Quick access */}
            <div className="bg-white p-5" style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
              <h3
                className="text-[11px] font-bold text-[#617585] uppercase tracking-[0.15em] mb-4 pb-3 border-b border-gray-100"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Accesos rápidos
              </h3>
              <ul className="space-y-1">
                {QUICK_ACCESS.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm font-semibold text-[#4a5568] hover:bg-[#f0fbfc] hover:text-[#3dc2c6] transition-colors group"
                      style={{ fontFamily: "'Nunito', 'Open Sans', sans-serif" }}
                    >
                      <i
                        className={`${item.icon} text-xs w-4 text-center text-[#3dc2c6] opacity-70 group-hover:opacity-100 transition-opacity`}
                      ></i>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Portal CTA */}
            <a
              href="https://afiliados.ostcara.org.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 text-center transition-all duration-200 group"
              style={{
                background: 'linear-gradient(135deg, #3dc2c6 0%, #2b91c4 100%)',
                boxShadow: '0 4px 14px rgba(61,194,198,0.3)',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 20px rgba(61,194,198,0.45)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 14px rgba(61,194,198,0.3)'}
            >
              <i className="fas fa-user-circle text-white text-3xl mb-3 block opacity-90"></i>
              <p
                className="text-white font-extrabold text-base mb-1 leading-tight"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Portal de Afiliados
              </p>
              <p
                className="text-white/70 text-xs mb-4"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                Credencial digital, autorizaciones y más
              </p>
              <span
                className="inline-flex items-center gap-2 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider transition-transform duration-200 group-hover:scale-105"
                style={{ color: '#3dc2c6', fontFamily: "'Nunito', sans-serif" }}
              >
                Ingresar
                <i className="fas fa-arrow-right text-[9px]"></i>
              </span>
            </a>

            {/* External links */}
            <div className="bg-white p-5" style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
              <h3
                className="text-[11px] font-bold text-[#617585] uppercase tracking-[0.15em] mb-4 pb-3 border-b border-gray-100"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Sitios de interés
              </h3>
              <ul className="space-y-2">
                {EXTERNAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-[#617585] hover:text-[#3dc2c6] transition-colors group"
                      style={{ fontFamily: "'Open Sans', sans-serif" }}
                    >
                      <i className="fas fa-external-link-alt text-[9px] text-[#3dc2c6] opacity-50 group-hover:opacity-100 transition-opacity"></i>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
