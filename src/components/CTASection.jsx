export default function CTASection() {
  return (
    <section
      className="w-full py-8 px-4 flex items-center justify-center"
      style={{ backgroundColor: '#3dc2c6' }}
    >
      <a
        href="https://afiliados.ostcara.org.ar"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-10 py-4 text-base md:text-lg font-bold text-white uppercase tracking-wide border-2 border-white hover:bg-white transition-colors duration-200"
        style={{ fontFamily: "'Open Sans', sans-serif" }}
        onMouseEnter={e => { e.currentTarget.style.color = '#3dc2c6' }}
        onMouseLeave={e => { e.currentTarget.style.color = '#ffffff' }}
      >
        Ingresar al Portal de Afiliados
      </a>
    </section>
  )
}
