import { getDoctorsAction } from "@/app/actions"
import { getAppointments } from "@/lib/db"
import { Users, Calendar, DollarSign, Activity } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const doctors = await getDoctorsAction()
  const appointments = await getAppointments()
  
  // Calculate stats
  const totalDoctors = doctors.length
  const totalAppointments = appointments.length
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
         <h1 className="text-3xl font-bold font-serif">نظرة عامة</h1>
         <div className="text-sm text-slate-400">آخر تحديث: {new Date().toLocaleTimeString('ar-EG')}</div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="card p-6 flex items-center gap-4 bg-neutral-900 border border-neutral-800 hover:border-primary/50 transition-colors">
          <div className="p-4 bg-primary/10 rounded-2xl text-primary">
            <Users className="h-8 w-8" />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-medium">عدد الأطباء</p>
            <h3 className="text-3xl font-bold mt-1">{totalDoctors}</h3>
          </div>
        </div>
        
        <div className="card p-6 flex items-center gap-4 bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 transition-colors">
          <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500">
            <Calendar className="h-8 w-8" />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-medium">الحجوزات</p>
            <h3 className="text-3xl font-bold mt-1">{totalAppointments}</h3>
          </div>
        </div>
        
        <div className="card p-6 flex items-center gap-4 bg-neutral-900 border border-neutral-800 hover:border-blue-500/50 transition-colors">
          <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-500">
            <Activity className="h-8 w-8" />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-medium">نشاط الموقع</p>
            <h3 className="text-3xl font-bold mt-1">نشط</h3>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Appointments */}
        <div className="card bg-neutral-900 border border-neutral-800 overflow-hidden">
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
               <Calendar className="h-5 w-5 text-primary" />
               أحدث الحجوزات
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="bg-neutral-950 text-slate-400 font-medium">
                <tr>
                  <th className="px-6 py-3">المريض</th>
                  <th className="px-6 py-3">الطبيب</th>
                  <th className="px-6 py-3">التاريخ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {appointments.slice(-5).reverse().map((a) => {
                  const doc = doctors.find(d => d.id === a.doctorId)
                  return (
                    <tr key={a.id} className="hover:bg-neutral-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium">{a.patientName}</td>
                      <td className="px-6 py-4 text-slate-300">{doc?.name}</td>
                      <td className="px-6 py-4 text-slate-300" dir="ltr">{a.date}</td>
                    </tr>
                  )
                })}
                {appointments.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-slate-500">لا توجد حجوزات حتى الآن</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Doctors List (Short) */}
        <div className="card bg-neutral-900 border border-neutral-800 overflow-hidden">
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
               <Users className="h-5 w-5 text-primary" />
               الأطباء
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="bg-neutral-950 text-slate-400 font-medium">
                <tr>
                  <th className="px-6 py-3">الاسم</th>
                  <th className="px-6 py-3">التخصص</th>
                  <th className="px-6 py-3">التقييم</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {doctors.slice(0, 5).map((d) => (
                  <tr key={d.id} className="hover:bg-neutral-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{d.name}</td>
                    <td className="px-6 py-4 text-slate-300">{d.specialty}</td>
                    <td className="px-6 py-4 text-amber-500 font-bold">{d.rating} ★</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
