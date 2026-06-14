const EXTERNAL_LINKS = [
  { label: 'FESITCARA', href: 'http://fesitcara.org.ar/' },
  { label: 'SINDICATO DE LA CARNE', href: 'http://www.sindicatocarne.org.ar/new/' },
  { label: 'CGT', href: 'http://www.cgtrainternacional.com.ar/' },
  { label: 'SECRETARÍA DE SALUD', href: 'https://www.sssalud.gob.ar/' },
  { label: 'MINISTERIO DE TRABAJO', href: 'https://www.argentina.gob.ar/trabajo' },
  { label: 'ANSES', href: 'https://www.anses.gob.ar/' },
  { label: 'AFIP', href: 'http://www.afip.gob.ar/sitio/externos/' },
]

export default function PageLayout({ title, subtitle, children }) {
  return (
    <div style={{ backgroundColor: '#f4f4f4' }} className="min-h-screen">
      {/* Page banner */}
      <div style={{ backgroundColor: '#3ec6f5' }} className="py-8 px-4">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-white text-xs font-semibold uppercase tracking-widest mb-1 opacity-80">
            INSTITUCIONAL
          </p>
          <h1
            className="text-3xl md:text-4xl font-bold text-white uppercase"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            {title}
          </h1>
          {subtitle && <p className="text-white/80 text-sm mt-1">{subtitle}</p>}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <main className="flex-1 min-w-0 bg-white p-6 md:p-8 shadow-sm">
            {children}
          </main>

          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0 flex flex-col gap-6">
            {/* Twitter embed */}
            <div className="bg-white shadow-sm p-4">
              <a
                className="twitter-timeline"
                data-width="100%"
                data-height="400"
                href="https://twitter.com/fesitcara?ref_src=twsrc%5Etfw"
              >
                Tweets by fesitcara
              </a>
              <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
            </div>

            {/* External links */}
            <div className="bg-white shadow-sm p-4">
              <h3
                className="text-xs font-bold text-[#444] uppercase tracking-widest mb-3 pb-2 border-b border-gray-200"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                SITIOS DE INTERÉS
              </h3>
              <ul className="space-y-2">
                {EXTERNAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#3ec6f5] hover:underline"
                    >
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
