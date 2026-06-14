import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'
import HeroSlider from './components/HeroSlider'
import CTASection from './components/CTASection'
import ServicesGrid from './components/ServicesGrid'
import Conocenos from './pages/Conocenos'
import Delegaciones from './pages/Delegaciones'
import Cartilla from './pages/Cartilla'
import Discapacidad from './pages/Discapacidad'
import Coseguros from './pages/Coseguros'
import Contacto from './pages/Contacto'
import Afiliacion from './pages/Afiliacion'
import NuevoPortal from './pages/NuevoPortal'
import HospitalNaval from './pages/HospitalNaval'
import LeyNacional from './pages/LeyNacional'
import IdentidadGenero from './pages/IdentidadGenero'

function Home() {
  return (
    <main className="flex-1">
      <HeroSlider />
      <CTASection />
      <ServicesGrid />
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/conocenos" element={<Conocenos />} />
          <Route path="/afiliacion" element={<Afiliacion />} />
          <Route path="/nuevo-portal" element={<NuevoPortal />} />
          <Route path="/hospital-naval" element={<HospitalNaval />} />
          <Route path="/ley-nacional" element={<LeyNacional />} />
          <Route path="/identidad-genero" element={<IdentidadGenero />} />
          <Route path="/delegaciones" element={<Delegaciones />} />
          <Route path="/cartilla" element={<Cartilla />} />
          <Route path="/discapacidad" element={<Discapacidad />} />
          <Route path="/coseguros" element={<Coseguros />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
