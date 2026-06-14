import PageLayout from '../components/PageLayout'

const MAP_EMBED = 'https://www.google.com/maps/d/embed?mid=1o6VDLtT9HhoSazv9ZZZhGyMaH1P7tH82'

export default function Delegaciones() {
  return (
    <PageLayout title="DELEGACIONES">
      <p className="text-sm text-[#444] mb-6" style={{ fontFamily: "'Open Sans', sans-serif" }}>
        ¡Aprovechá el nuevo mapa interactivo de OSTCARA y buscá tu delegación más cercana, información, calles y mucho más!
      </p>
      <div className="w-full overflow-hidden" style={{ height: 500 }}>
        <iframe
          src={MAP_EMBED}
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Mapa de delegaciones OSTCARA"
        />
      </div>
    </PageLayout>
  )
}
