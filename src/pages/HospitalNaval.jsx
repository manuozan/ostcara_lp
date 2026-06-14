import hospitalImg from '../assets/hospital-naval.jpg'
import PageLayout from '../components/PageLayout'

export default function HospitalNaval() {
  return (
    <PageLayout title="OSTCARA INFORMA – HOSPITAL NAVAL" subtitle="17/11/2023">
      <div className="flex justify-center">
        <img
          src={hospitalImg}
          alt="OSTCARA Informa – Hospital Naval"
          className="max-w-full md:max-w-lg"
        />
      </div>
    </PageLayout>
  )
}
