import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { DELEGACIONES } from '../data/delegaciones'

const pinIcon = L.divIcon({
  className: '',
  html: `<svg width="28" height="40" viewBox="0 0 28 40" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 26 14 26s14-15.5 14-26c0-7.732-6.268-14-14-14z" fill="#3dc2c6"/>
    <circle cx="14" cy="14" r="5.5" fill="#ffffff"/>
  </svg>`,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
  popupAnchor: [0, -34],
})

export default function DelegacionesMap() {
  const containerRef = useRef(null)

  useEffect(() => {
    const map = L.map(containerRef.current, { scrollWheelZoom: false })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map)

    const markers = DELEGACIONES.map((d) => {
      const popupLines = [
        `<strong>${d.nombre} — ${d.provincia}</strong>`,
        d.direccion ? `Dirección: ${d.direccion}` : null,
        d.telefono ? `Tel: ${d.telefono}` : null,
        d.email ? `<a href="mailto:${d.email}">${d.email}</a>` : null,
      ].filter(Boolean).join('<br/>')

      return L.marker([d.lat, d.lng], { icon: pinIcon }).bindPopup(popupLines)
    })

    const group = L.featureGroup(markers).addTo(map)
    map.fitBounds(group.getBounds().pad(0.15))

    const enableScroll = () => map.scrollWheelZoom.enable()
    const disableScroll = () => map.scrollWheelZoom.disable()
    containerRef.current.addEventListener('click', enableScroll)
    containerRef.current.addEventListener('mouseleave', disableScroll)

    return () => {
      containerRef.current?.removeEventListener('click', enableScroll)
      containerRef.current?.removeEventListener('mouseleave', disableScroll)
      map.remove()
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}
