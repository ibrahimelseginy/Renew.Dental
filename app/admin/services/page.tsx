import Link from "next/link"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { getServicesAction, deleteServiceAction } from "@/app/actions"

export default async function ServicesPage() {
  const services = await getServicesAction()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">الخدمات</h1>
          <p className="text-slate-400">إدارة خدمات العيادة المعروضة في الصفحة الرئيسية</p>
        </div>
        <Link 
          href="/admin/services/new" 
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>إضافة خدمة</span>
        </Link>
      </div>

      <div className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-neutral-800 text-slate-300">
            <tr>
              <th className="px-6 py-4 font-medium">الخدمة</th>
              <th className="px-6 py-4 font-medium">الوصف</th>
              <th className="px-6 py-4 font-medium">الأيقونة</th>
              <th className="px-6 py-4 font-medium">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800 text-slate-300">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-neutral-800/50 transition-colors">
                <td className="px-6 py-4 font-medium text-white">{service.title}</td>
                <td className="px-6 py-4">{service.description}</td>
                <td className="px-6 py-4 font-mono text-sm text-primary">{service.icon}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/services/${service.id}`} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors" title="تعديل">
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <form action={deleteServiceAction.bind(null, service.id)}>
                      <button className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="حذف الخدمة">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                  لا توجد خدمات مضافة حالياً
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
