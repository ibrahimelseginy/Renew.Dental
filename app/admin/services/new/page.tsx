import ServiceForm from "../ServiceForm"

export default function NewServicePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">إضافة خدمة جديدة</h1>
      <ServiceForm />
    </div>
  )
}
