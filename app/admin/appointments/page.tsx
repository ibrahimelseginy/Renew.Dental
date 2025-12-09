import { getAppointments, getDoctors } from "@/lib/db"
import { deleteAppointmentAction } from "@/app/actions"
import { Trash2, Calendar, Clock, User, Phone, FileText } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function AdminAppointmentsPage() {
  const appointments = await getAppointments()
  const doctors = await getDoctors()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <h1 className="text-2xl font-bold font-serif">سجل الحجوزات</h1>
         <div className="text-slate-400 text-sm">إجمالي: {appointments.length}</div>
      </div>

      <div className="card bg-neutral-900 border border-neutral-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right min-w-[900px]">
            <thead className="bg-neutral-950 text-slate-400 font-medium text-sm border-b border-neutral-800">
              <tr>
                <th className="px-6 py-4">المريض</th>
                <th className="px-6 py-4">الطبيب</th>
                <th className="px-6 py-4">الموعد</th>
                <th className="px-6 py-4">السبب</th>
                <th className="px-6 py-4">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {appointments.slice().reverse().map((a) => {
                const doc = doctors.find(d => d.id === a.doctorId)
                return (
                  <tr key={a.id} className="hover:bg-neutral-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 font-medium text-white">
                           <User className="h-3 w-3 text-primary" />
                           {a.patientName}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400" dir="ltr">
                           <Phone className="h-3 w-3" />
                           {a.phone || '-'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      <span className="inline-flex items-center px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-sm">
                        {doc?.name || 'طبيب غير موجود'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      <div className="space-y-1">
                         <div className="flex items-center gap-2" dir="ltr">
                            <Calendar className="h-3 w-3 text-primary" />
                            {a.date}
                         </div>
                         <div className="flex items-center gap-2 text-sm text-slate-400" dir="ltr">
                            <Clock className="h-3 w-3" />
                            {a.time}
                         </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                       <div className="flex items-start gap-2 max-w-[200px]">
                          <FileText className="h-3 w-3 mt-1 text-slate-500 shrink-0" />
                          <span className="truncate">{a.reason}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                      <form action={deleteAppointmentAction.bind(null, a.id)}>
                        <button className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-50 group-hover:opacity-100" title="إلغاء الحجز">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </form>
                    </td>
                  </tr>
                )
              })}
              {appointments.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    لا توجد حجوزات مسجلة حتى الآن.
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
