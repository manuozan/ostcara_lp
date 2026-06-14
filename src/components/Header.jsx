import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'INICIO', to: '/' },
  { label: 'CONÓCENOS', to: '/conocenos' },
  { label: 'AFILIACIÓN', to: '/afiliacion' },
  { label: 'DELEGACIONES', to: '/delegaciones' },
  { label: 'CARTILLA', to: '/cartilla' },
  { label: 'DISCAPACIDAD', to: '/discapacidad' },
  { label: 'COSEGUROS', to: '/coseguros' },
  { label: 'CONTACTO', to: '/contacto' },
]

const LOGO_URL = 'https://ostcara.com.ar/wp-content/uploads/2019/12/logo.svg'

const NAV_LINK_CLASS = 'text-sm font-semibold text-[#444] hover:text-[#3ec6f5] transition-colors duration-200 tracking-wide'

function NavLink({ item, onClick }) {
  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={NAV_LINK_CLASS} onClick={onClick}>
        {item.label}
      </a>
    )
  }
  return (
    <Link to={item.to} className={NAV_LINK_CLASS} onClick={onClick}>
      {item.label}
    </Link>
  )
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sticky, setSticky] = useState(false)
  const location = useLocation()

  useEffect(() => { setMobileMenuOpen(false) }, [location])

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`w-full z-50 bg-white transition-shadow duration-300 ${sticky ? 'fixed top-0 left-0 shadow-md' : 'relative'}`}
    >
      {/* Desktop header */}
      <div className="hidden md:block">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <a href="https://ostcara.com.ar/" title="OSTCARA">
            <img src={LOGO_URL} alt="OSTCARA" width="120" />
          </a>

          {/* Nav */}
          <nav className="flex items-center gap-6">
            <ul className="flex items-center gap-6 list-none m-0 p-0">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <NavLink item={item} />
                </li>
              ))}
            </ul>

            {/* Social icons */}
            <div className="flex items-center gap-3 ml-4">
              <a
                href="https://www.facebook.com/ObraSocialOSTCARA/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#444] hover:text-[#3ec6f5] transition-colors"
              >
                <i className="fab fa-facebook-f text-base"></i>
              </a>
              <a
                href="https://twitter.com/ostcara"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#444] hover:text-[#3ec6f5] transition-colors"
              >
                <i className="fab fa-twitter text-base"></i>
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden">
        <div className="px-4 py-3 flex items-center justify-between bg-white shadow-sm">
          <a href="https://ostcara.com.ar/" title="OSTCARA">
            <img src={LOGO_URL} alt="OSTCARA" width="90" />
          </a>
          <button
            className="text-[#444] focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <nav className="bg-white border-t border-gray-200 shadow-lg">
            <ul className="list-none m-0 p-0">
              {NAV_ITEMS.map((item) => (
                <li key={item.label} className="border-b border-gray-100 last:border-0">
                  <div className="block px-5 py-3 hover:bg-gray-50">
                    <NavLink item={item} onClick={() => setMobileMenuOpen(false)} />
                  </div>
                </li>
              ))}
              <li className="flex gap-4 px-5 py-4 border-t border-gray-100">
                <a href="https://www.facebook.com/ObraSocialOSTCARA/" target="_blank" rel="noopener noreferrer" className="text-[#444] hover:text-[#3ec6f5]">
                  <i className="fab fa-facebook-f text-lg"></i>
                </a>
                <a href="https://twitter.com/ostcara" target="_blank" rel="noopener noreferrer" className="text-[#444] hover:text-[#3ec6f5]">
                  <i className="fab fa-twitter text-lg"></i>
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}
