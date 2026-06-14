import PageLayout from '../components/PageLayout'

export default function LeyNacional() {
  return (
    <PageLayout title="Ley Nacional 27.610" subtitle="25/05/2023">
      <div style={{ fontFamily: "'Open Sans', sans-serif" }} className="text-sm text-[#444]">
        <p className="mb-6 leading-relaxed">
          Respaldamos el derecho de las personas gestantes a acceder a la IVE de manera <strong>SEGURA</strong> y Legal.
          Si necesitás apoyo o información adicional, no dudes en comunicarte con nosotros:
        </p>

        <ul className="mb-6 space-y-2">
          <li className="flex items-center gap-2">
            <i className="fas fa-phone text-[#3ec6f5]"></i>
            <span>Línea gratuita: <strong>0800 345 1266</strong></span>
          </li>
          <li className="flex items-center gap-2">
            <i className="fab fa-whatsapp text-[#3ec6f5]"></i>
            <span>WhatsApp: <strong>011 7172-2501</strong></span>
          </li>
        </ul>

        <div className="flex justify-center">
          <img
            src="https://ostcara.com.ar/wp-content/uploads/2023/05/d8298d95-3e6c-4098-b975-162fc08ed4fc-1-1024x1024.jpg"
            alt="Ley Nacional 27.610 - IVE"
            className="max-w-full md:max-w-sm"
          />
        </div>
      </div>
    </PageLayout>
  )
}
