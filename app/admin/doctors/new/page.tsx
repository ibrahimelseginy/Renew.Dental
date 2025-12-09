import { ArrowRight } from "lucide-react"
import Link from "next/link"
import DoctorForm from "../DoctorForm"

export default function NewDoctorPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/doctors" className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors text-white">
          <ArrowRight className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold font-serif">إضافة طبيب جديد</h1>
      </div>
      
      <DoctorForm />
    </div>
  )
}
