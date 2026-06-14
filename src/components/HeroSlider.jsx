import banner1 from '../assets/banner1.png'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const SLIDES = [
  {
    id: 1,
    bg: '#f4f4f4',
    bgImage: banner1,
    titleLines: ['PRESTADORES', 'VIGENTES'],
    subtitle: null,
    buttonText: 'VER LISTADO',
    buttonTo: '/cartilla',
    textColor: '#303030',
  },
  {
    id: 2,
    bg: '#f4f4f4',
    bgImage: 'https://ostcara.com.ar/wp-content/uploads/2019/12/SLIDE1-OST.jpg',
    titleLines: ['AFILIATE A', 'OSTCARA'],
    subtitle: 'Una obra social pensada para vos',
    buttonText: 'REQUISITOS',
    buttonTo: '/afiliacion',
    to: '/afiliacion',
    textColor: '#303030',
  },
  {
    id: 3,
    bg: '#f4f4f4',
    bgImage: 'https://ostcara.com.ar/wp-content/uploads/2019/12/SLIDE2-OST.jpg',
    titleLines: ['ENCONTRÁ TU', 'DELEGACIÓN', 'MÁS CERCANA'],
    subtitle: 'OSTCARA está siempre cerca',
    buttonText: 'DELEGACIONES',
    buttonTo: '/delegaciones',
    textColor: '#303030',
  },
]

function SlideWrapper({ to, children }) {
  if (to) return <Link to={to} className="block w-full h-full">{children}</Link>
  return <>{children}</>
}

export default function HeroSlider() {
  return (
    <div className="w-full hero-slider-container">
      <style>{`
        .hero-slider-container .swiper-pagination-bullet {
          background: #3ec6f5;
          opacity: 0.5;
          width: 10px;
          height: 10px;
        }
        .hero-slider-container .swiper-pagination-bullet-active {
          background: #3ec6f5;
          opacity: 1;
        }
        .swiper-slide-bg {
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      `}</style>

      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full"
        style={{ height: 'clamp(300px, 60vw, 550px)' }}
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.id}>
            <SlideWrapper to={slide.to}>
            <div
              className={`swiper-slide-bg w-full h-full flex items-center relative${slide.to ? ' cursor-pointer' : ''}`}
              style={{
                backgroundColor: slide.bg,
                backgroundImage: slide.bgImage ? `url('${slide.bgImage}')` : 'none',
              }}
            >
              {/* Overlay for slides with background images */}
              {slide.bgImage && (
                <div className="absolute inset-0 bg-white/30" />
              )}

              {/* Content */}
              <div className="relative z-10 max-w-[1200px] w-full mx-auto px-8 md:px-16">
                <div className="max-w-sm md:max-w-md">
                  <div className="flex items-center gap-5 mb-3">
                    <h2
                      className="text-4xl md:text-5xl font-bold leading-tight m-0"
                      style={{ color: slide.textColor, fontFamily: 'Montserrat, Arial, sans-serif' }}
                    >
                      {slide.titleLines.map((line, i) => (
                        <span key={i} className="block">{line}</span>
                      ))}
                    </h2>
                    {slide.showLogo && (
                      <img
                        src="https://ostcara.com.ar/wp-content/uploads/2019/12/logo.svg"
                        alt="OSTCARA"
                        className="w-24 md:w-32 shrink-0"
                      />
                    )}
                  </div>

                  {slide.subtitle && (
                    <p
                      className="text-base md:text-lg mb-5"
                      style={{ color: slide.textColor }}
                    >
                      {slide.subtitle}
                    </p>
                  )}

                  <Link
                    to={slide.buttonTo}
                    className="inline-block px-5 py-3 text-sm font-bold text-white transition-colors duration-200"
                    style={{ backgroundColor: '#3ec6f5' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#5ac8fa'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#3ec6f5'}
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
            </SlideWrapper>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
