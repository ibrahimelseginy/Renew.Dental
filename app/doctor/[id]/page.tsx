import { DUMMY_DOCTORS } from "@/lib/data"
import DoctorProfileClient from "./DoctorProfileClient"

export function generateStaticParams() {
  return DUMMY_DOCTORS.map((doctor) => ({
    id: doctor.id,
  }))
}

export default function DoctorProfilePage({ params }: { params: { id: string } }) {
  const doctor = DUMMY_DOCTORS.find((d) => d.id === params.id)
  
  if (!doctor) {
    return <div className="card p-6 text-center text-white">عذراً، الطبيب غير موجود.</div>
  }

  const bookedSlots: {date: string, time: string}[] = []

  return <DoctorProfileClient doctor={doctor} bookedSlots={bookedSlots} />
}
