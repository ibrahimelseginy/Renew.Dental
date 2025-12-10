"use client"
import { useState } from "react"
import type { Doctor, Slot } from "../lib/data"
import { useToast } from "../context/ToastContext"
import { bookAppointmentAction } from "../app/actions"

type Props = {
  open: boolean
  onClose: () => void
  doctor: Doctor
  slot?: Slot
}

export default function BookingModal({ open, onClose, doctor, slot }: Props) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showToast } = useToast()

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="card w-full max-w-lg p-4 md:p-6 animate-in fade-in zoom-in duration-300 bg-neutral-900 border border-neutral-800 shadow-2xl my-auto">
        <h3 className="text-xl font-bold text-white">حجز موعد</h3>
        <p className="mt-1 text-sm text-white">{doctor.name} • {slot ? `${slot.date} الساعة ${slot.time}` : "اختر موعداً"}</p>
        <form
          className="mt-6 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()
            
            if (!slot) {
              showToast("الرجاء اختيار موعد أولاً", "error")
              return
            }

            setIsSubmitting(true)
            try {
              await bookAppointmentAction({
                patientName: name,
                doctorId: doctor.id,
                date: slot.date,
                time: slot.time,
                reason: reason,
                phone: phone
              })
              
              showToast(`تم حجز الموعد بنجاح للسيد/ة ${name}`)
              setName("")
              setPhone("")
              setReason("")
              onClose()
            } catch (err) {
              console.error(err)
              showToast("حدث خطأ أثناء الحجز", "error")
            } finally {
              setIsSubmitting(false)
            }
          }}
        >
          <div>
            <label className="block text-sm font-medium text-white">اسم المريض</label>
            <input
              className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-base md:text-sm text-white placeholder-neutral-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="الاسم الثلاثي"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">رقم الهاتف</label>
            <input
              className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-base md:text-sm text-white placeholder-neutral-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="01xxxxxxxxx"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">سبب الزيارة</label>
            <textarea
              className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-base md:text-sm text-white placeholder-neutral-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="مثال: كشف، حشو، استشارة..."
            />
          </div>
          <div className="mt-6 flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="btn bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-700">إلغاء</button>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary disabled:opacity-50">
              {isSubmitting ? "جاري الحجز..." : "تأكيد الحجز"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
