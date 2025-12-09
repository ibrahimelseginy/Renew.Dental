"use client"
import { useMemo, useState } from "react"
import Image from "next/image"
import { getAvailableSlots, type Doctor, type Slot } from "../../../lib/data"
import BookingModal from "../../../components/BookingModal"
import { Calendar, Clock, MapPin, Star } from "lucide-react"

type BookedSlot = {
  date: string
  time: string
}

export default function DoctorProfileClient({ 
  doctor, 
  bookedSlots 
}: { 
  doctor: Doctor
  bookedSlots: BookedSlot[] 
}) {
  // Generate next 3 days
  const days = useMemo(() => {
    const d = []
    const today = new Date()
    for(let i=0; i<3; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      d.push({
        label: i === 0 ? "اليوم" : i === 1 ? "غداً" : date.toLocaleDateString('ar-EG', { weekday: 'long' }),
        dateStr: date.toISOString().split("T")[0],
        displayDate: date.toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' })
      })
    }
    return d
  }, [])

  const [selectedDayIndex, setSelectedDayIndex] = useState(0)
  
  const slots: Slot[] = useMemo(() => {
     if (!doctor) return []
     const candidates = getAvailableSlots(doctor.id, days[selectedDayIndex].dateStr)
     // Filter out booked slots
     return candidates.map(s => ({
        ...s,
        isAvailable: s.isAvailable && !bookedSlots.some(b => b.date === s.date && b.time === s.time)
     }))
  }, [doctor, days, selectedDayIndex, bookedSlots])

  const [open, setOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<Slot | undefined>(undefined)

  return (
    <div className="space-y-8 container mx-auto px-4 py-8">
      {/* Doctor Header */}
      <section className="card p-6 md:p-8 bg-neutral-900 border-neutral-800">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-2xl bg-neutral-800 shadow-md mx-auto md:mx-0 border border-neutral-700">
            <Image src={doctor.imageUrl} alt={doctor.name} fill className="object-cover" />
          </div>
          <div className="flex-1 text-center md:text-right space-y-4">
            <div>
               <h1 className="text-3xl font-bold text-white font-serif">{doctor.name}</h1>
               <p className="text-lg text-primary font-medium mt-1">{doctor.specialty}</p>
            </div>
            
            <div className="flex items-center justify-center md:justify-start gap-2 text-primary">
               <Star className="h-5 w-5 fill-current" />
               <span className="font-bold text-white">{doctor.rating}</span>
               <span className="text-slate-400 text-sm">(تقييم عام)</span>
            </div>

            <p className="text-slate-300 leading-relaxed max-w-2xl">
               {doctor.bio}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
               <div className="inline-flex items-center gap-2 text-slate-300 bg-neutral-800 border border-neutral-700 px-3 py-1 rounded-full text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  {doctor.location}
               </div>
               <div className="inline-flex items-center gap-2 text-slate-300 bg-neutral-800 border border-neutral-700 px-3 py-1 rounded-full text-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  مدة الكشف: 30 دقيقة
               </div>
            </div>
          </div>
        </div>
        
        {/* Clinic Images */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
           {doctor.clinicImages.map((src, i) => (
             <div key={i} className="relative h-32 w-full overflow-hidden rounded-xl bg-neutral-800 border border-neutral-700">
               <Image src={src} alt="Clinic" fill className="object-cover hover:scale-105 transition-transform duration-300" />
             </div>
           ))}
        </div>
      </section>

      {/* Booking Section */}
      <section className="card p-6 md:p-8 bg-neutral-900 border-neutral-800">
        <div className="flex items-center gap-3 mb-6">
           <Calendar className="h-6 w-6 text-primary" />
           <h2 className="text-xl font-bold text-white">المواعيد المتاحة</h2>
        </div>
        
        {/* Day Selector */}
        <div className="flex gap-2 overflow-x-auto pb-4 md:pb-0 mb-6 scrollbar-hide">
           {days.map((day, idx) => (
             <button
               key={idx}
               onClick={() => setSelectedDayIndex(idx)}
               className={`min-w-[100px] flex-1 rounded-xl p-3 text-center transition-all border ${
                 selectedDayIndex === idx
                   ? "bg-primary text-white border-primary shadow-lg scale-105"
                   : "bg-neutral-800 text-slate-400 border-neutral-700 hover:border-primary/50"
               }`}
             >
               <div className="text-sm font-medium mb-1">{day.label}</div>
               <div className="text-xs opacity-80">{day.displayDate}</div>
             </button>
           ))}
        </div>

        {/* Slots Grid */}
        {slots.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {slots.map((s) => (
              <button
                key={s.id}
                disabled={!s.isAvailable}
                onClick={() => {
                  setSelectedSlot(s)
                  setOpen(true)
                }}
                className={`group relative overflow-hidden rounded-lg border p-3 text-center transition-all ${
                  s.isAvailable 
                    ? "border-neutral-700 bg-neutral-800 text-white hover:border-primary hover:bg-neutral-700" 
                    : "cursor-not-allowed border-neutral-800 bg-neutral-900/50 text-slate-600 opacity-50"
                }`}
              >
                <span className="relative z-10 text-sm font-medium dir-ltr">{s.time}</span>
                {s.isAvailable && (
                  <div className="absolute inset-0 -z-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500">
             لا توجد مواعيد متاحة في هذا اليوم
          </div>
        )}
      </section>

      <BookingModal open={open} onClose={() => setOpen(false)} doctor={doctor} slot={selectedSlot} />
    </div>
  )
}
