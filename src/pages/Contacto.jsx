import { useState } from 'react'
import PageLayout from '../components/PageLayout'

const CONTACT_INFO = [
  { icon: 'fas fa-map-marker-alt', label: 'Dirección', value: 'Montevideo 589 7º A - CABA' },
  { icon: 'fas fa-phone', label: 'Teléfono', value: '(011) 4371-7055 | 0800 345 1266' },
  { icon: 'fab fa-whatsapp', label: 'WhatsApp', value: '+54 9 11 7172-2501' },
  { icon: 'fas fa-envelope', label: 'Email', value: 'secretaria@ostcara.org.ar' },
  { icon: 'fas fa-envelope', label: '', value: 'recepcion@ostcara.org.ar' },
  { icon: 'fas fa-envelope', label: '', value: 'afiliaciones@ostcara.org.ar' },
]

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', asunto: '', email: '', mensaje: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Compose mailto as fallback (no backend available in static site)
    const mailto = `mailto:secretaria@ostcara.org.ar?subject=${encodeURIComponent(form.asunto)}&body=${encodeURIComponent(`Nombre: ${form.nombre}\nEmail: ${form.email}\n\n${form.mensaje}`)}`
    window.location.href = mailto
    setSent(true)
  }

  return (
    <PageLayout title="CONTACTO" subtitle="Estamos para lo que necesites">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form */}
        <div>
          <h3 className="text-sm font-bold text-[#444] uppercase tracking-wide mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            Completá el formulario
          </h3>
          {sent ? (
            <p className="text-sm text-green-600 font-medium">¡Gracias! Tu consulta fue enviada.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#444] mb-1 uppercase">Nombre completo *</label>
                <input
                  type="text"
                  required
                  value={form.nombre}
                  onChange={e => setForm({ ...form, nombre: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#3ec6f5]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#444] mb-1 uppercase">Asunto</label>
                <input
                  type="text"
                  value={form.asunto}
                  onChange={e => setForm({ ...form, asunto: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#3ec6f5]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#444] mb-1 uppercase">Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#3ec6f5]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#444] mb-1 uppercase">Mensaje *</label>
                <textarea
                  required
                  rows={5}
                  value={form.mensaje}
                  onChange={e => setForm({ ...form, mensaje: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#3ec6f5] resize-none"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 text-sm font-bold text-white transition-colors duration-200"
                style={{ backgroundColor: '#3ec6f5' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#5ac8fa'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#3ec6f5'}
              >
                Enviar
              </button>
            </form>
          )}
        </div>

        {/* Contact info */}
        <div>
          <h3 className="text-sm font-bold text-[#444] uppercase tracking-wide mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            Información de contacto
          </h3>
          <ul className="space-y-3">
            {CONTACT_INFO.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <i className={`${item.icon} text-[#3ec6f5] mt-0.5 w-4 text-center`}></i>
                <div>
                  {item.label && <span className="text-xs font-bold text-[#444] block">{item.label}</span>}
                  <span className="text-sm text-gray-500">{item.value}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageLayout>
  )
}
