import { getDoctorsAction, deleteDoctorAction } from "@/app/actions"
import { Plus, Trash2, MapPin, BadgeDollarSign, Pencil } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const dynamic = 'force-dynamic'

export default async function AdminDoctorsPage() {
  const doctors = await getDoctorsAction()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-serif">إدارة الأطباء</h1>
        <Link href="/admin/doctors/new" className="btn btn-primary gap-2">
          <Plus className="h-4 w-4" />
          <span>إضافة طبيب</span>
        </Link>
      </div>

      <div className="card bg-neutral-900 border border-neutral-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right min-w-[800px]">
            <thead className="bg-neutral-950 text-slate-400 font-medium text-sm border-b border-neutral-800">
              <tr>
                <th className="px-6 py-4">الطبيب</th>
                <th className="px-6 py-4">التخصص</th>
                <th className="px-6 py-4">الموقع</th>
                <th className="px-6 py-4">السعر</th>
                <th className="px-6 py-4">التقييم</th>
                <th className="px-6 py-4">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {doctors.map((d) => (
                <tr key={d.id} className="hover:bg-neutral-800/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-neutral-800 ring-1 ring-neutral-700 group-hover:ring-primary/50 transition-all">
                        <Image src={d.imageUrl} alt={d.name} fill className="object-cover" />
                      </div>
                      <span className="font-medium text-white">{d.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{d.specialty}</td>
                  <td className="px-6 py-4 text-slate-300">
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3 text-primary" />
                      {d.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                     <div className="flex items-center gap-1 text-sm">
                      <BadgeDollarSign className="h-3 w-3 text-primary" />
                      {d.priceRange}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-amber-500 font-bold">{d.rating} ★</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/doctors/${d.id}`} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors" title="تعديل">
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <form action={deleteDoctorAction.bind(null, d.id)}>
                        <button className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="حذف الطبيب">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {doctors.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    لا يوجد أطباء مسجلين. قم بإضافة طبيب جديد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
