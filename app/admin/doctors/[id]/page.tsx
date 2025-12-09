import { getDoctorsAction } from "@/app/actions"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import DoctorForm from "../DoctorForm"

export const dynamic = 'force-dynamic'

export default async function EditDoctorPage({ params }: { params: { id: string } }) {
  const doctors = await getDoctorsAction()
  const doctor = doctors.find(d => d.id === params.id)

  if (!doctor) {
    return <div className="p-8 text-center text-white">الطبيب غير موجود</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/doctors" className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors text-white">
          <ArrowRight className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold font-serif">تعديل بيانات الطبيب</h1>
      </div>
      
      <DoctorForm doctor={doctor} />
    </div>
  )
}
