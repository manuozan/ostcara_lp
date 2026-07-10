import { Link } from 'react-router-dom'
import logoSSS from '../assets/logo_sss.png'
import logoOstcara from '../assets/logo-ostcara.svg'

const NEWS_ARTICLES = [
  {
    id: 1,
    category: 'Novedades',
    title: 'Nuevo portal para Afiliados de OSTCARA',
    excerpt: 'Accedé de forma rápida y segura a tus autorizaciones, credencial digital, movimientos, aportes y novedades.',
    to: '/nuevo-portal',
  },
  {
    id: 2,
    category: 'Novedades',
    title: 'OSTCARA INFORMA – Hospital Naval',
    excerpt: 'Información importante para nuestros afiliados sobre la cobertura en Hospital Naval.',
    to: '/hospital-naval',
  },
  {
    id: 3,
    category: 'Novedades',
    title: 'Ley Nacional 27.610',
    excerpt: 'Respaldamos el derecho de las personas gestantes a acceder a la IVE de manera segura y legal.',
    to: '/ley-nacional',
  },
  {
    id: 4,
    category: 'Novedades',
    title: 'Identidad de Género: Ley 26.743',
    excerpt: 'En OSTCARA creemos en la igualdad y el respeto para todas las personas.',
    to: '/identidad-genero',
  },
]

const CONTACT_ITEMS = [
  { icon: 'fas fa-map-marker-alt', text: 'Montevideo 589 7° A — CABA' },
  { icon: 'fas fa-phone', text: '(011) 4371-7055 · 0800 345 1266' },
  { icon: 'fab fa-whatsapp', text: '+54 9 11 7172-2501' },
  { icon: 'fas fa-envelope', text: 'secretaria@ostcara.org.ar' },
  { icon: 'fas fa-envelope', text: 'recepcion@ostcara.org.ar' },
  { icon: 'fas fa-envelope', text: 'afiliaciones@ostcara.org.ar' },
]

function NewsCard({ category, title, excerpt, to }) {
  return (
    <Link
      to={to}
      className="group block bg-white p-5 transition-all duration-200 hover:-translate-y-0.5"
      style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.06)'}
    >
      <span
        className="inline-block text-[10px] font-bold text-white px-2.5 py-1 mb-3 uppercase tracking-wider"
        style={{ backgroundColor: '#3dc2c6', fontFamily: "'Nunito', sans-serif" }}
      >
        {category}
      </span>
      <h4
        className="text-sm font-bold text-[#2d3a45] mb-2 leading-snug group-hover:text-[#3dc2c6] transition-colors"
        style={{ fontFamily: "'Nunito', 'Open Sans', sans-serif" }}
      >
        {title}
      </h4>
      <p className="text-xs text-[#617585] leading-relaxed line-clamp-3" style={{ fontFamily: "'Open Sans', sans-serif" }}>
        {excerpt}
      </p>
      <span className="inline-flex items-center gap-1 mt-3 text-[11px] font-bold text-[#3dc2c6]" style={{ fontFamily: "'Nunito', sans-serif" }}>
        Leer más <i className="fas fa-arrow-right text-[9px]"></i>
      </span>
    </Link>
  )
}

export default function Footer() {
  return (
    <footer>
      {/* Zone 1 — News */}
      <section className="py-12 px-4" style={{ backgroundColor: '#f0f8fa' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7">
            <div>
              <p
                className="text-[11px] font-bold uppercase tracking-[0.18em] mb-1"
                style={{ color: '#3dc2c6', fontFamily: "'Nunito', sans-serif" }}
              >
                Noticias
              </p>
              <h2
                className="text-xl font-extrabold text-[#2d3a45]"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Novedades y comunicados
              </h2>
            </div>
            <a
              href="https://ostcara.com.ar/"
              className="text-[11px] font-bold text-[#3dc2c6] border border-[#3dc2c6] px-4 py-2 hover:bg-[#3dc2c6] hover:text-white transition-colors shrink-0"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Ver todas
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {NEWS_ARTICLES.map((article) => (
              <NewsCard key={article.id} {...article} />
            ))}
          </div>
        </div>
      </section>

      {/* Zone 2 — Dark comprehensive footer */}
      <div style={{ backgroundColor: '#1a2e3b' }}>
        <div className="max-w-[1200px] mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Column 1 — Brand */}
            <div>
              <img
                src={logoOstcara}
                alt="OSTCARA"
                width="130"
                style={{ filter: 'brightness(0) invert(1)', opacity: 0.9 }}
                className="mb-4"
              />
              <p
                className="text-sm text-white/55 leading-relaxed mb-5"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                Obra Social de los Trabajadores de la Carne y Afines de la República Argentina. Una salud comprometida con vos.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.facebook.com/ObraSocialOSTCARA/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#3dc2c6'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
                >
                  <i className="fab fa-facebook-f text-white text-xs"></i>
                </a>
                <a
                  href="https://twitter.com/ostcara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#3dc2c6'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
                >
                  <i className="fab fa-twitter text-white text-xs"></i>
                </a>
                <a
                  href="https://afiliados.ostcara.org.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 inline-flex items-center gap-1.5 text-[11px] font-bold text-white px-3 py-1.5 transition-colors duration-200"
                  style={{ backgroundColor: '#3dc2c6', fontFamily: "'Nunito', sans-serif" }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2ba5a9'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#3dc2c6'}
                >
                  <i className="fas fa-user-circle text-xs"></i>
                  Portal
                </a>
              </div>
            </div>

            {/* Column 2 — Contact */}
            <div>
              <h4
                className="text-xs font-bold text-white/40 uppercase tracking-[0.18em] mb-5"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Contacto
              </h4>
              <ul className="space-y-3">
                {CONTACT_ITEMS.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <i
                      className={`${item.icon} text-xs mt-1 shrink-0`}
                      style={{ color: '#3dc2c6', width: '14px', textAlign: 'center' }}
                    ></i>
                    <span
                      className="text-sm text-white/55 leading-snug"
                      style={{ fontFamily: "'Open Sans', sans-serif" }}
                    >
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="max-w-[1200px] mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p
              className="text-[11px] text-white/30"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              © {new Date().getFullYear()} OSTCARA · Todos los derechos reservados
            </p>
            <a
              href="https://www.argentina.gob.ar/sssalud"
              target="_blank"
              rel="noopener noreferrer"
              title="Superintendencia de Servicios de Salud"
              className="shrink-0 opacity-90 hover:opacity-100 transition-opacity"
            >
              <img src={logoSSS} alt="Superintendencia de Servicios de Salud" height="56" className="h-14 w-auto" />
            </a>
            <p
              className="text-[11px] text-white/25"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Obra Social de los Trabajadores de la Carne y Afines de la R.A.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
