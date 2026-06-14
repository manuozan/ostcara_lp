import { useState, useRef, useEffect } from 'react'

// ── Knowledge base ─────────────────────────────────────────────────────────────

const FLOWS = {
  welcome: {
    messages: [
      '¡Hola! Soy **CARA**, tu asistente de OSTCARA. 👋',
      '¿En qué puedo ayudarte hoy?',
    ],
    options: [
      { label: '📋 Quiero afiliarme', next: 'afiliacion_menu' },
      { label: '✅ Autorizar prestaciones', next: 'autorizaciones_menu' },
      { label: '💳 Coseguros', next: 'coseguros_info' },
      { label: '📞 Contacto y delegaciones', next: 'contacto_info' },
    ],
  },

  // ── AFILIACIÓN ───────────────────────────────────────────────────────────────
  afiliacion_menu: {
    messages: ['¿Qué necesitás saber sobre la afiliación?'],
    options: [
      { label: 'Documentación titular', next: 'afiliacion_titular' },
      { label: 'Grupo familiar (cónyuge e hijos)', next: 'afiliacion_grupo' },
      { label: 'Familiares a cargo', next: 'afiliacion_familiares' },
      { label: 'Opción de cambio de obra social', next: 'afiliacion_cambio' },
    ],
    back: 'welcome',
  },

  afiliacion_titular: {
    messages: [
      '**Documentación para el titular:**',
      '• DNI del titular\n• Últimos 2 recibos de sueldo (o alta temprana firmada por el empleador)',
      '📌 *Monotributistas y empleados domésticos:* deben presentar el ticket de pago AFIP actualizado cada mes.',
      '¿Necesitás más información?',
    ],
    options: [
      { label: 'Ver documentación grupo familiar', next: 'afiliacion_grupo' },
      { label: 'Consultar por mail', next: 'afiliacion_mail' },
      { label: '← Volver a afiliación', next: 'afiliacion_menu' },
    ],
    back: 'afiliacion_menu',
  },

  afiliacion_grupo: {
    messages: [
      '**Documentación para cónyuge / concubina e hijos:**',
      '• DNI de la cónyuge / concubina\n• Certificado de matrimonio o declaración jurada de concubinato\n• DNI de los hijos\n• Partida de nacimiento de los hijos',
      '📌 Los hijos solteros mayores de 21 años tienen cobertura hasta los 25 años presentando certificado de alumno regular.',
      '📌 Para monotributistas, la incorporación del grupo familiar requiere un aporte adicional vía AFIP.',
    ],
    options: [
      { label: 'Ver documentación familiares a cargo', next: 'afiliacion_familiares' },
      { label: 'Consultar por mail', next: 'afiliacion_mail' },
      { label: '← Volver a afiliación', next: 'afiliacion_menu' },
    ],
    back: 'afiliacion_menu',
  },

  afiliacion_familiares: {
    messages: [
      '**Familiares a cargo** (padres mayores de 60 años o nietos):',
      '• DNI\n• Partida de nacimiento\n• Documento judicial de guarda y tutela (para menores)\n• Recibo de sueldo con el descuento adicional del 1,5%',
    ],
    options: [
      { label: 'Consultar por mail', next: 'afiliacion_mail' },
      { label: '← Volver a afiliación', next: 'afiliacion_menu' },
    ],
    back: 'afiliacion_menu',
  },

  afiliacion_cambio: {
    messages: [
      '**Opción de cambio de obra social — Res. 1216/2020**',
      'La opción de cambio se gestiona directamente en **MI SSSALUD** (sssalud.gob.ar/misssalud) desde la web, sin intermediarios.',
      '📌 Necesitás **Clave Fiscal nivel 3** o superior y adherir el servicio MI SSSALUD.',
      '📌 Una vez realizada, debés esperar **1 año** para hacer otra opción.',
      '**Documentación a presentar ante OSTCARA:**\n• Certificado de opción\n• DNI (frente y dorso) del titular\n• Últimos 2 recibos de sueldo\n• Documentación del grupo familiar (si aplica)',
    ],
    options: [
      { label: 'Consultar por mail', next: 'afiliacion_mail' },
      { label: '← Volver a afiliación', next: 'afiliacion_menu' },
    ],
    back: 'afiliacion_menu',
  },

  afiliacion_mail: {
    messages: [
      '📧 Podés enviar tus consultas de afiliación a:\n**afiliaciones@ostcara.org.ar**',
      'Te responderemos a la brevedad.',
    ],
    options: [
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'afiliacion_menu',
  },

  // ── AUTORIZACIONES ───────────────────────────────────────────────────────────
  autorizaciones_menu: {
    messages: ['¿Qué tipo de autorización necesitás?'],
    options: [
      { label: 'Cómo solicitar una autorización', next: 'autorizaciones_como' },
      { label: 'Estudios y prácticas ambulatorias', next: 'autorizaciones_estudios' },
      { label: 'Internación', next: 'autorizaciones_internacion' },
      { label: 'Medicación de alto costo', next: 'autorizaciones_medicacion' },
    ],
    back: 'welcome',
  },

  autorizaciones_como: {
    messages: [
      '**¿Cómo solicitar una autorización?**',
      'Podés gestionarla de las siguientes formas:',
      '1️⃣ **Portal del afiliado:** ingresá a tu portal con tu número de afiliado y solicitá la autorización online.\n2️⃣ **Presencialmente:** acercate a cualquier delegación de OSTCARA con la documentación del médico.\n3️⃣ **Por mail:** enviá la documentación escaneada al área de autorizaciones.',
      '📌 Siempre necesitás la **orden médica** con diagnóstico y código de práctica (nomenclador).',
    ],
    options: [
      { label: 'Documentación necesaria para estudios', next: 'autorizaciones_estudios' },
      { label: 'Contacto autorizaciones', next: 'autorizaciones_contacto' },
      { label: '← Volver a autorizaciones', next: 'autorizaciones_menu' },
    ],
    back: 'autorizaciones_menu',
  },

  autorizaciones_estudios: {
    messages: [
      '**Estudios y prácticas ambulatorias:**',
      '📄 Documentación requerida:\n• Orden médica original con diagnóstico, firma y sello del médico\n• Código de práctica del nomenclador PMO\n• DNI del afiliado\n• Número de afiliado',
      '📌 El médico debe estar inscripto en el **padrón de OSTCARA** (cartilla médica).',
    ],
    options: [
      { label: 'Consultar cartilla de prestadores', next: 'autorizaciones_cartilla' },
      { label: 'Contacto autorizaciones', next: 'autorizaciones_contacto' },
      { label: '← Volver a autorizaciones', next: 'autorizaciones_menu' },
    ],
    back: 'autorizaciones_menu',
  },

  autorizaciones_internacion: {
    messages: [
      '**Internación:**',
      'Para internaciones programadas, el médico tratante o el sanatorio deben comunicarse con OSTCARA **con anticipación** para la autorización previa.',
      '📄 Se requiere:\n• Diagnóstico\n• Práctica o cirugía a realizar\n• Nombre del médico y establecimiento\n• Número de afiliado',
      '🚨 Para **internaciones de urgencia**, el establecimiento tiene 24–48 hs para notificar a la obra social.',
    ],
    options: [
      { label: 'Contacto autorizaciones', next: 'autorizaciones_contacto' },
      { label: '← Volver a autorizaciones', next: 'autorizaciones_menu' },
    ],
    back: 'autorizaciones_menu',
  },

  autorizaciones_medicacion: {
    messages: [
      '**Medicación de alto costo o crónica:**',
      '📄 Documentación requerida:\n• Prescripción médica con diagnóstico y nombre comercial / genérico del medicamento\n• Historia clínica o resumen (para medicación de alto costo)\n• Estudios que avalen el diagnóstico (si corresponde)',
      '📌 Algunos medicamentos requieren auditoría médica previa. El proceso puede demorar hasta 72 hs hábiles.',
    ],
    options: [
      { label: 'Contacto autorizaciones', next: 'autorizaciones_contacto' },
      { label: '← Volver a autorizaciones', next: 'autorizaciones_menu' },
    ],
    back: 'autorizaciones_menu',
  },

  autorizaciones_cartilla: {
    messages: [
      '📋 Podés consultar la cartilla de prestadores en la sección **CARTILLA** del sitio.',
      'Allí encontrás médicos, clínicas y laboratorios habilitados por OSTCARA en tu zona.',
    ],
    options: [
      { label: 'Contacto autorizaciones', next: 'autorizaciones_contacto' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'autorizaciones_menu',
  },

  autorizaciones_contacto: {
    messages: [
      '📧 Contacto para autorizaciones:\n**autorizaciones@ostcara.org.ar**',
      '🕐 Horario de atención: lunes a viernes de 8:00 a 16:00 hs.',
    ],
    options: [
      { label: '← Volver a autorizaciones', next: 'autorizaciones_menu' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'autorizaciones_menu',
  },

  // ── COSEGUROS ────────────────────────────────────────────────────────────────
  coseguros_info: {
    messages: [
      '**Coseguros**',
      'Los coseguros son el porcentaje que abona el afiliado al momento de recibir una prestación médica (consulta, estudio, etc.).',
      '📌 El monto varía según el tipo de práctica y el prestador. Podés consultar los valores vigentes en la sección **COSEGUROS** del sitio.',
      '📌 Los afiliados con ciertas condiciones (jubilados, pensionados, etc.) pueden tener coseguros reducidos o eximidos según normativa vigente.',
    ],
    options: [
      { label: 'Consultar por mail', next: 'contacto_mail' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'welcome',
  },

  // ── CONTACTO ─────────────────────────────────────────────────────────────────
  contacto_info: {
    messages: [
      '**Contacto y delegaciones**',
      '📧 Consultas generales: **consultas@ostcara.org.ar**\n📧 Afiliaciones: **afiliaciones@ostcara.org.ar**',
      '🌐 También podés encontrar la delegación más cercana en la sección **DELEGACIONES** del sitio.',
    ],
    options: [
      { label: 'Ver delegaciones', next: 'contacto_delegaciones' },
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'welcome',
  },

  contacto_delegaciones: {
    messages: [
      '🗺️ OSTCARA cuenta con delegaciones en distintas localidades del país.',
      'Ingresá a la sección **DELEGACIONES** del sitio para ver la dirección, teléfono y horario de la delegación más cercana a vos.',
    ],
    options: [
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'contacto_info',
  },

  contacto_mail: {
    messages: [
      '📧 Consultas generales: **consultas@ostcara.org.ar**',
    ],
    options: [
      { label: '← Volver al inicio', next: 'welcome' },
    ],
    back: 'welcome',
  },
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function renderText(text) {
  // Bold: **text**
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  )
}

function BubbleText({ text }) {
  const lines = text.split('\n')
  return (
    <span>
      {lines.map((line, i) => (
        <span key={i}>
          {renderText(line)}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </span>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function CaraAssistant() {
  const [open, setOpen] = useState(false)
  const [currentFlow, setCurrentFlow] = useState('welcome')
  const [history, setHistory] = useState([])
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)
  const initialized = useRef(false)

  // Push messages from a flow with a typing delay
  const playFlow = (flowKey, userLabel = null) => {
    const flow = FLOWS[flowKey]
    if (!flow) return
    setCurrentFlow(flowKey)

    const newMsgs = []
    if (userLabel) {
      newMsgs.push({ type: 'user', text: userLabel })
    }

    setMessages(prev => [...prev, ...newMsgs])
    setTyping(true)

    let delay = userLabel ? 500 : 200
    const botMsgs = flow.messages.map((text, i) => ({ type: 'bot', text, id: Date.now() + i }))

    botMsgs.forEach((msg, i) => {
      delay += i === 0 ? 600 : 700
      setTimeout(() => {
        setMessages(prev => [...prev, msg])
        if (i === botMsgs.length - 1) setTyping(false)
      }, delay)
    })
  }

  // Initialize on first open
  useEffect(() => {
    if (open && !initialized.current) {
      initialized.current = true
      playFlow('welcome')
    }
  }, [open])

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const handleOption = (option) => {
    setHistory(prev => [...prev, currentFlow])
    playFlow(option.next, option.label)
  }

  const handleReset = () => {
    setMessages([])
    setHistory([])
    setCurrentFlow('welcome')
    initialized.current = false
    setTimeout(() => {
      initialized.current = true
      playFlow('welcome')
    }, 50)
  }

  const flow = FLOWS[currentFlow]
  const showOptions = !typing && flow?.options?.length > 0

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-20 right-4 z-50 flex flex-col shadow-2xl rounded-2xl overflow-hidden"
          style={{
            width: 'min(380px, calc(100vw - 2rem))',
            height: 'min(540px, calc(100vh - 6rem))',
            fontFamily: "'Open Sans', sans-serif",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 shrink-0"
            style={{ background: 'linear-gradient(135deg, #3ec6f5 0%, #3dc2c6 100%)' }}
          >
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <i className="fas fa-robot text-white text-base"></i>
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-sm leading-none">CARA</p>
              <p className="text-white/80 text-xs mt-0.5">Asistente OSTCARA</p>
            </div>
            <button
              onClick={handleReset}
              title="Reiniciar conversación"
              className="text-white/70 hover:text-white transition-colors mr-1"
            >
              <i className="fas fa-rotate-right text-sm"></i>
            </button>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.type === 'bot' && (
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mr-2 mt-0.5"
                    style={{ background: 'linear-gradient(135deg, #3ec6f5, #3dc2c6)' }}
                  >
                    <i className="fas fa-robot text-white text-xs"></i>
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.type === 'user'
                      ? 'text-white rounded-tr-sm'
                      : 'text-[#303030] rounded-tl-sm shadow-sm'
                  }`}
                  style={
                    msg.type === 'user'
                      ? { background: 'linear-gradient(135deg, #3ec6f5, #3dc2c6)' }
                      : { backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }
                  }
                >
                  <BubbleText text={msg.text} />
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex justify-start">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mr-2 mt-0.5"
                  style={{ background: 'linear-gradient(135deg, #3ec6f5, #3dc2c6)' }}
                >
                  <i className="fas fa-robot text-white text-xs"></i>
                </div>
                <div
                  className="px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm"
                  style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}
                >
                  <div className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map(i => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{
                          backgroundColor: '#3ec6f5',
                          animationDelay: `${i * 0.15}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Options / quick replies */}
          {showOptions && (
            <div
              className="shrink-0 px-3 py-3 space-y-2 border-t"
              style={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb' }}
            >
              {flow.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleOption(opt)}
                  className="w-full text-left text-sm px-3 py-2 rounded-xl border transition-all duration-150 hover:text-white active:scale-95"
                  style={{
                    borderColor: '#3ec6f5',
                    color: '#3ec6f5',
                    backgroundColor: 'transparent',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = '#3ec6f5'
                    e.currentTarget.style.color = '#ffffff'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#3ec6f5'
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
        style={{
          background: open
            ? '#888'
            : 'linear-gradient(135deg, #3ec6f5 0%, #3dc2c6 100%)',
          color: '#fff',
          fontFamily: "'Open Sans', sans-serif",
        }}
        aria-label={open ? 'Cerrar CARA' : 'Abrir CARA'}
      >
        <i className={`fas ${open ? 'fa-times' : 'fa-comment-dots'} text-lg`}></i>
        {!open && (
          <span className="font-bold text-sm tracking-widest">CARA</span>
        )}
      </button>
    </>
  )
}
