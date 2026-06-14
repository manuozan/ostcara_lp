import PageLayout from '../components/PageLayout'

const PARAGRAPHS = [
  'La Obra Social de los Trabajadores de la Carne es una realidad incontratable. Porque el ESFUERZO HA SIDO MUCHO PERO LA SATISFACCION ES AUN MAYOR, queremos recordar: EL PRINCIPIO. Que hoy parece muy lejano pero para muchos de nosotros fue ayer cuando decidimos iniciar un camino independiente de dignidad y respeto.',
  'COMETIMOS ERRORES. Porque solamente se equivoca el que hace. APRENDIMOS A CORREGIRLOS. Porque es de buen cristiano no buscar culpables sino soluciones. POR ESO PUDIMOS SUPERAR MOMENTOS DIFICILES CON UNA SITUACION FINANCIERA MUY COMPLICADA. Desde tener servicios médicos cortados con tercerizaciones y oportunismos hasta llegar a un presente en el que podemos seleccionar prestadores.',
  'DECIDIMOS CONSOLIDAR A CADA SINDICATO COMO DELEGACION REAL DE NUESTRA OBRA SOCIAL. Nuestro objetivo de ser FEDERALES DE VERDAD y que todos se sientan orgullosos de tener el logo de OSTCARA en la puerta de cada gremio.',
  'ENTONCES AVANZAMOS EN UNA MEJOR CALIDAD EN LA ATENCION. Porque lo demás es palabras y de eso ya estamos bastante cansados.',
  'Y CONSTRUIMOS UN NUEVO SISTEMA PARA OTORGAR BENEFICIOS PRESTACIONALES Y SOCIALES. Y ustedes que son beneficiarios así lo saben.',
  'TENEMOS EN LA ACTUALIDAD UNA HERRAMIENTA MUY ORDENADA Y UTIL QUE NOS PERMITE AVANZAR EN UN DESARROLLO NACIONAL. Porque ahora, sin dudas, iniciamos el camino definitivo de la consolidación y el crecimiento continuo.',
  'PORQUE NUESTRO PROYECTO DE FEDERACION ESTA MAS VIGENTE QUE NUNCA, CON SOLIDO RESPALDO DE UNA ORGANIZACION DE SALUD AUTONOMA, EQUILIBRADA, AGIL Y AL SERVICIO DE LAS FAMILIAS.',
]

const QUOTE = 'El papel de los sindicatos no es sólo como instrumento de negociación, sino también son lugares donde se expresa la personalidad de los trabajadores. Sus servicios contribuyen al desarrollo de una auténtica cultura del trabajo y ayudan a participar de manera plenamente humana en la vida de la empresa.'

export default function Conocenos() {
  return (
    <PageLayout title="CONÓCENOS" subtitle="Sobre OSTCARA">
      <div className="space-y-5 text-sm leading-relaxed text-[#444]" style={{ fontFamily: "'Open Sans', sans-serif" }}>
        {PARAGRAPHS.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        <blockquote className="border-l-4 pl-5 py-2 my-6 italic text-gray-600" style={{ borderColor: '#3ec6f5' }}>
          <p className="mb-1">{QUOTE}</p>
          <footer className="text-xs font-semibold not-italic text-[#3ec6f5]">— Juan Pablo II</footer>
        </blockquote>
      </div>
    </PageLayout>
  )
}
