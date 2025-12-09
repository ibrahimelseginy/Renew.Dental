import { getDoctorsAction } from "@/app/actions"
import { getAppointments } from "@/lib/db"
import DoctorProfileClient from "./DoctorProfileClient"

export const dynamic = 'force-dynamic'

export default async function DoctorProfilePage({ params }: { params: { id: string } }) {
  const doctors = await getDoctorsAction()
  const doctor = doctors.find((d) => d.id === params.id)
  
  if (!doctor) {
    return <div className="card p-6 text-center text-white">عذراً، الطبيب غير موجود.</div>
  }

  const allAppointments = await getAppointments()
  const bookedSlots = allAppointments
    .filter(a => a.doctorId === doctor.id)
    .map(a => ({ date: a.date, time: a.time }))

  return <DoctorProfileClient doctor={doctor} bookedSlots={bookedSlots} />
}
