import banner1 from '../assets/banner1.png'
import slide2Afiliate from '../assets/slide2-afiliate.jpg'
import slide3Delegacion from '../assets/slide3-delegacion.jpg'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

const SLIDES = [
  {
    id: 1,
    bg: '#eef6f7',
    bgImage: banner1,
    titleLines: ['PRESTADORES', 'VIGENTES'],
    subtitle: null,
    buttonText: 'Ver listado',
    buttonTo: '/cartilla',
    textColor: '#2d3a45',
    fadeColor: '238,246,247',
  },
  {
    id: 2,
    bg: '#f0f4f8',
    bgImage: slide2Afiliate,
    titleLines: ['AFILIATE A', 'OSTCARA'],
    subtitle: 'Una obra social pensada para vos',
    buttonText: 'Ver requisitos',
    buttonTo: '/afiliacion',
    textColor: '#2d3a45',
    fadeColor: '240,244,248',
  },
  {
    id: 3,
    bg: '#eef6f7',
    bgImage: slide3Delegacion,
    titleLines: ['ENCONTRÁ TU', 'DELEGACIÓN', 'MÁS CERCANA'],
    subtitle: 'OSTCARA está siempre cerca tuyo',
    buttonText: 'Ver delegaciones',
    buttonTo: '/delegaciones',
    textColor: '#2d3a45',
    fadeColor: '238,246,247',
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
          background: #3dc2c6;
          opacity: 0.45;
          width: 8px;
          height: 8px;
        }
        .hero-slider-container .swiper-pagination-bullet-active {
          background: #3dc2c6;
          opacity: 1;
          width: 24px;
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        .swiper-slide-bg {
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
        }
        .hero-slider-container .swiper-button-prev,
        .hero-slider-container .swiper-button-next {
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.82);
          border-radius: 50%;
          color: #9ca3af;
          transition: background 0.2s, color 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 10px rgba(0,0,0,0.13);
          top: 50%;
          transform: translateY(-50%);
          margin-top: 0;
        }
        .hero-slider-container .swiper-button-prev,
        .hero-slider-container .swiper-button-next { display: none; }
        @media (min-width: 768px) {
          .hero-slider-container .swiper-button-prev,
          .hero-slider-container .swiper-button-next { display: flex; }
          .hero-slider-container .swiper-button-prev { left: 32px; }
          .hero-slider-container .swiper-button-next { right: 32px; }
        }
        .hero-slider-container .swiper-button-prev:hover,
        .hero-slider-container .swiper-button-next:hover {
          background: #ffffff;
          color: #3dc2c6;
          transform: translateY(-50%) scale(1.07);
          box-shadow: 0 4px 18px rgba(61,194,198,0.25);
        }
        .hero-slider-container .swiper-button-prev::after,
        .hero-slider-container .swiper-button-next::after {
          font-size: 11px;
          font-weight: 900;
        }
        .hero-slider-container .swiper-button-prev svg,
        .hero-slider-container .swiper-button-next svg {
          width: 14px;
          height: auto;
        }
      `}</style>

      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="w-full"
        style={{ height: 'clamp(300px, 55vw, 700px)' }}
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.id}>
            <SlideWrapper to={slide.to}>
              <div
                className={`swiper-slide-bg w-full h-full flex flex-col justify-end relative overflow-hidden${slide.to ? ' cursor-pointer' : ''}`}
                style={{
                  backgroundColor: slide.bg,
                  backgroundImage: slide.bgImage ? `url('${slide.bgImage}')` : 'none',
                }}
              >
                {/* Gradient fade: image visible top, fades to bg color bottom */}
                {slide.bgImage && (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(
                        to bottom,
                        rgba(${slide.fadeColor}, 0) 0%,
                        rgba(${slide.fadeColor}, 0.15) 35%,
                        rgba(${slide.fadeColor}, 0.82) 68%,
                        rgba(${slide.fadeColor}, 0.97) 85%
                      )`,
                    }}
                  />
                )}

                {/* Content sits in the clean faded area at bottom */}
                <div className="relative z-10 max-w-[1200px] w-full mx-auto px-8 md:px-16 pb-10 md:pb-14">
                  <div className="max-w-sm md:max-w-lg">
                    <h2
                      className="text-3xl md:text-5xl font-bold leading-tight mb-3"
                      style={{ color: slide.textColor, fontFamily: "'Nunito', Montserrat, Arial, sans-serif" }}
                    >
                      {slide.titleLines.map((line, i) => (
                        <span key={i} className="block">{line}</span>
                      ))}
                    </h2>

                    {slide.subtitle && (
                      <p
                        className="text-sm md:text-base mb-5 opacity-75"
                        style={{ color: slide.textColor, fontFamily: "'Open Sans', sans-serif" }}
                      >
                        {slide.subtitle}
                      </p>
                    )}

                    <Link
                      to={slide.buttonTo}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 group"
                      style={{ backgroundColor: '#3dc2c6', fontFamily: "'Nunito', sans-serif" }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2ba5a9'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#3dc2c6'}
                    >
                      {slide.buttonText}
                      <i className="fas fa-arrow-right text-[10px] transition-transform duration-200 group-hover:translate-x-1"></i>
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
