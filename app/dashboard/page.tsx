"use client"
import { doctors } from "../../lib/data"
import { useAppointments } from "../../context/AppointmentContext"

export default function DashboardPage() {
  const { appointments } = useAppointments()

  return (
    <div className="space-y-6 container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">المواعيد القادمة</h1>
      <div className="card overflow-hidden border border-neutral-800 bg-neutral-900">
        {appointments.length === 0 ? (
          <div className="p-12 text-center text-white">
            <p className="text-lg">لا توجد مواعيد محجوزة حالياً</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-800">
              <thead className="bg-neutral-950">
                <tr>
                  <th className="px-6 py-4 text-start text-xs font-bold uppercase tracking-wider text-primary">المريض</th>
                  <th className="px-6 py-4 text-start text-xs font-bold uppercase tracking-wider text-primary">الدكتور</th>
                  <th className="px-6 py-4 text-start text-xs font-bold uppercase tracking-wider text-primary">التاريخ</th>
                  <th className="px-6 py-4 text-start text-xs font-bold uppercase tracking-wider text-primary">الوقت</th>
                  <th className="px-6 py-4 text-start text-xs font-bold uppercase tracking-wider text-primary">السبب</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 bg-neutral-900">
                {appointments.map((a) => {
                  const doc = doctors.find((d) => d.id === a.doctorId)
                  return (
                    <tr key={a.id} className="hover:bg-neutral-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{a.patientName}</td>
                      <td className="px-6 py-4 text-white">{doc?.name}</td>
                      <td className="px-6 py-4 text-white">{a.date}</td>
                      <td className="px-6 py-4 text-white">{a.time}</td>
                      <td className="px-6 py-4 text-white">{a.reason}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

