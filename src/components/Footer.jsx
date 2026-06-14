import { Link } from 'react-router-dom'

const NEWS_ARTICLES = [
  {
    id: 1,
    category: 'NOVEDADES',
    title: 'Nuevo portal para Afiliados de OSTCARA',
    excerpt: 'Portal de Afiliados OSTCARA. Accedé de forma rápida y segura a tus autorizaciones, credencial digital, movimientos, aportes y novedades.',
    href: '/nuevo-portal',
  },
  {
    id: 2,
    category: 'NOVEDADES',
    title: 'OSTCARA INFORMA – HOSPITAL NAVAL',
    excerpt: 'Información importante para nuestros afiliados sobre la cobertura en Hospital Naval.',
    href: '/hospital-naval',
  },
  {
    id: 3,
    category: 'NOVEDADES',
    title: 'Ley Nacional 27.610',
    excerpt: 'Respaldamos el derecho de las personas gestantes a acceder a la IVE de manera SEGURA y Legal.',
    href: '/ley-nacional',
  },
  {
    id: 4,
    category: 'NOVEDADES',
    title: 'IDENTIDAD DE GÉNERO: Ley 26.743',
    excerpt: 'En OSTCARA, creemos en la igualdad y el respeto para todas las personas.',
    href: '/identidad-genero',
  },
]

const CONTACT_ITEMS = [
  {
    icon: 'fas fa-map-marker-alt',
    title: 'Dirección',
    lines: ['Montevideo 589 7º A - CABA'],
  },
  {
    icon: 'fas fa-mobile-alt',
    title: 'Teléfono',
    lines: ['+54 9 11 7172-2501'],
  },
  {
    icon: 'fas fa-envelope-open',
    title: 'Email',
    lines: ['secretaria@ostcara.org.ar', 'recepcion@ostcara.org.ar', 'afiliaciones@ostcara.org.ar'],
  },
]

function NewsCard({ category, title, excerpt, href }) {
  const isInternal = href.startsWith('/')
  const Wrapper = ({ children }) => isInternal
    ? <Link to={href} className="block bg-white border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden">{children}</Link>
    : <a href={href} className="block bg-white border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden">{children}</a>
  return (
    <Wrapper>
      <div className="p-5">
        <span
          className="inline-block text-xs font-bold text-white px-2 py-1 mb-3"
          style={{ backgroundColor: '#3ec6f5' }}
        >
          {category}
        </span>
        <h4
          className="text-sm font-bold text-[#444] mb-2 leading-snug hover:text-[#3ec6f5] transition-colors"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          {title}
        </h4>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{excerpt}</p>
        <span className="inline-block mt-3 text-xs text-[#3ec6f5] font-semibold">Leer más →</span>
      </div>
    </Wrapper>
  )
}

export default function Footer() {
  return (
    <footer>
      {/* News section */}
      <section style={{ backgroundColor: '#f4f4f4' }} className="py-10 px-4">
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="text-lg font-bold text-[#444] mb-6 uppercase"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            NOTICIAS Y RECOMENDACIONES
            <span className="block text-sm font-normal text-gray-500 mt-1 normal-case">
              Conoce nuestras últimas noticias y campañas de prevención
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {NEWS_ARTICLES.map((article) => (
              <NewsCard key={article.id} {...article} />
            ))}
          </div>

          <div className="mt-6 text-center">
            <a
              href="https://ostcara.com.ar/"
              className="inline-block text-sm font-semibold text-[#3ec6f5] border border-[#3ec6f5] px-5 py-2 hover:bg-[#3ec6f5] hover:text-white transition-colors"
            >
              Cargar más
            </a>
          </div>
        </div>
      </section>

      {/* Delegaciones banner */}
      <section
        className="relative py-12 px-4 overflow-hidden"
        style={{ backgroundColor: '#dcf3f8' }}
      >
        {/* Faint background image */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('https://ostcara.com.ar/wp-content/uploads/2019/12/12971-scaled.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2
              className="text-2xl md:text-3xl font-bold text-[#444] uppercase mb-2"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              ENCONTRÁ NUESTRAS DELEGACIONES
            </h2>
            <p className="text-[#444] text-sm md:text-base">
              Siempre una delegación a un paso de distancia — Aprovechá el nuevo mapa interactivo de OSTCARA y buscá tu delegación más cercana, información, calles y mucho más.
            </p>
          </div>
          <a
            href="https://ostcara.com.ar/delegaciones/"
            className="shrink-0 inline-block px-8 py-3 font-bold text-white transition-colors duration-200"
            style={{ backgroundColor: '#3ec6f5' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#5ac8fa'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#3ec6f5'}
          >
            INGRESAR
          </a>
        </div>
      </section>

      {/* Cartilla section */}
      <section className="py-12 px-4" style={{ backgroundColor: '#fcfcfc' }}>
        <div className="max-w-[1200px] mx-auto text-center">
          <h2
            className="text-2xl font-bold text-[#444] uppercase mb-3"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            CARTILLA MÉDICA
          </h2>
          <p className="text-gray-500 mb-6">
            Gran cantidad de profesionales de todas las especialidades, sanatorios y clínicas de primer nivel
          </p>
          <a
            href="https://ostcara.com.ar/cartilla-medica/"
            className="inline-block px-8 py-3 rounded-full border-2 text-sm font-semibold text-gray-400 border-gray-300 hover:text-[#444] hover:border-gray-400 transition-colors duration-200"
          >
            VER TODAS LAS ESPECIALIDADES
          </a>
        </div>
      </section>

      {/* Contact info */}
      <section className="py-10 px-4" style={{ backgroundColor: '#fcfcfc', borderTop: '1px solid #eaeaea' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CONTACT_ITEMS.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <i
                  className={`${item.icon} text-2xl mt-1`}
                  style={{ color: '#1db4c1' }}
                ></i>
                <div>
                  <h4
                    className="font-bold text-[#444] text-sm mb-1"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                  >
                    {item.title}
                  </h4>
                  {item.lines.map((line, i) => (
                    <p key={i} className="text-xs text-gray-500">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Social + logo */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <a href="https://ostcara.com.ar/" title="OSTCARA">
              <img
                src="https://ostcara.com.ar/wp-content/uploads/2019/12/logo.svg"
                alt="OSTCARA"
                width="160"
              />
            </a>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/ObraSocialOSTCARA/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#3ec6f5] transition-colors"
              >
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a
                href="https://twitter.com/ostcara"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#3ec6f5] transition-colors"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
            </div>
            <p className="text-xs text-gray-400 text-center md:text-right">
              © OSTCARA · Obra Social de los Trabajadores de la Carne y Afines de la República Argentina
            </p>
          </div>
        </div>
      </section>
    </footer>
  )
}
