import { getServiceById } from "@/lib/db"
import { notFound } from "next/navigation"
import ServiceForm from "../ServiceForm"

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const service = await getServiceById(params.id)
  
  if (!service) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">تعديل الخدمة</h1>
      <ServiceForm service={service} />
    </div>
  )
}
