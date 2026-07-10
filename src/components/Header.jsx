import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoOstcara from '../assets/logo-ostcara.svg'

const NAV_ITEMS = [
  { label: 'Inicio', to: '/' },
  { label: 'Conócenos', to: '/conocenos' },
  { label: 'Afiliación', to: '/afiliacion' },
  { label: 'Delegaciones', to: '/delegaciones' },
  { label: 'Cartilla', to: '/cartilla' },
  { label: 'Discapacidad', to: '/discapacidad' },
  { label: 'Coseguros', to: '/coseguros' },
  { label: 'Contacto', to: '/contacto' },
]

const LOGO_URL = logoOstcara

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sticky, setSticky] = useState(false)
  const location = useLocation()

  useEffect(() => { setMobileOpen(false) }, [location])

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 44)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <header className={`w-full z-50 ${sticky ? 'fixed top-0 left-0' : 'relative'}`}>

      {/* Top info bar — hidden when sticky */}
      {!sticky && (
        <div className="hidden md:block" style={{ backgroundColor: '#1e2d3a' }}>
          <div className="max-w-[1200px] mx-auto px-6 py-2 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <a
                href="https://wa.me/5491171722501"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] flex items-center gap-1.5"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                <i className="fab fa-whatsapp text-[#3dc2c6] text-[10px]"></i>
                (011) 7172-2501
              </a>
              <span className="text-[11px] text-white/60 flex items-center gap-1.5">
                <i className="fas fa-envelope text-[#3dc2c6] text-[10px]"></i>
                recepcion@ostcara.org.ar
              </span>
              <span className="text-[11px] text-white/60 flex items-center gap-1.5">
                <i className="fas fa-headset text-[#3dc2c6] text-[10px]"></i>
                Atención al beneficiario 24 hs 0800-345-1266
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main nav bar */}
      <div
        className="bg-white transition-shadow duration-300"
        style={{ boxShadow: sticky ? '0 2px 16px rgba(0,0,0,0.09)' : '0 1px 0 rgba(0,0,0,0.07)' }}
      >
        {/* Desktop */}
        <div className="hidden md:flex max-w-[1200px] mx-auto px-6 items-center justify-between h-16">
          <Link to="/" title="OSTCARA" className="shrink-0">
            <img src={LOGO_URL} alt="OSTCARA" width="105" />
          </Link>

          <nav>
            <ul className="flex items-center list-none m-0 p-0 h-16">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.to)
                return (
                  <li key={item.label} className="h-full flex items-center">
                    <Link
                      to={item.to}
                      className="h-full flex items-center px-3 text-[11px] font-bold uppercase tracking-wider transition-colors duration-200 border-b-2"
                      style={{
                        fontFamily: "'Nunito', 'Open Sans', sans-serif",
                        color: active ? '#3dc2c6' : '#4a5568',
                        borderBottomColor: active ? '#3dc2c6' : 'transparent',
                        letterSpacing: '0.07em',
                      }}
                      onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#3dc2c6' }}
                      onMouseLeave={e => { if (!active) e.currentTarget.style.color = '#4a5568' }}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <a
            href="https://afiliados.ostcara.org.ar"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 text-[11px] font-bold text-white uppercase tracking-wider transition-all duration-200"
            style={{
              backgroundColor: '#3dc2c6',
              fontFamily: "'Nunito', 'Open Sans', sans-serif",
              letterSpacing: '0.07em',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2ba5a9'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#3dc2c6'}
          >
            <i className="fas fa-user-circle text-xs"></i>
            Portal
          </a>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <div className="px-4 h-14 flex items-center justify-between">
            <Link to="/" title="OSTCARA">
              <img src={LOGO_URL} alt="OSTCARA" width="85" />
            </Link>
            <div className="flex items-center gap-3">
              <a
                href="https://afiliados.ostcara.org.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-white px-3 py-1.5"
                style={{ backgroundColor: '#3dc2c6', fontFamily: "'Nunito', sans-serif" }}
              >
                Portal
              </a>
              <button
                className="text-[#4a5568] focus:outline-none p-1"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menú"
              >
                <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </div>

          {mobileOpen && (
            <nav className="border-t border-gray-100">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.to)
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50 text-sm font-bold"
                    style={{
                      fontFamily: "'Nunito', 'Open Sans', sans-serif",
                      color: active ? '#3dc2c6' : '#4a5568',
                      backgroundColor: active ? '#f0fbfc' : 'white',
                    }}
                  >
                    {item.label}
                    <i className={`fas fa-chevron-right text-xs ${active ? 'text-[#3dc2c6]' : 'text-gray-300'}`}></i>
                  </Link>
                )
              })}
              <div className="flex items-center gap-4 px-5 py-4 bg-gray-50">
                <a href="https://www.facebook.com/ObraSocialOSTCARA/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#3dc2c6] transition-colors">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com/ostcara" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#3dc2c6] transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}
