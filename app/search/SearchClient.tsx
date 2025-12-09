"use client"
import { useMemo, useState } from "react"
import DoctorCard from "../../components/DoctorCard"
import { specialties, getAvailableSlots, Doctor } from "../../lib/data"
import { motion, AnimatePresence } from "framer-motion"

export default function SearchClient({ 
  doctors, 
  initialQuery = "", 
  initialSpec = "" 
}: { 
  doctors: Doctor[], 
  initialQuery?: string, 
  initialSpec?: string 
}) {
  const [query, setQuery] = useState(initialQuery)
  const [spec, setSpec] = useState(initialSpec)
  const [price, setPrice] = useState<string>("")
  const [onlyAvailable, setOnlyAvailable] = useState(false)

  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      const matchesQuery = query
        ? d.name.toLowerCase().includes(query.toLowerCase()) || d.location.toLowerCase().includes(query.toLowerCase())
        : true
      const matchesSpec = spec ? d.specialty === spec : true
      const matchesPrice = price ? d.priceRange === price : true
      
      let matchesAvailability = true
      if (onlyAvailable) {
         // Check next 3 days for any available slot
         const today = new Date()
         let hasSlot = false
         for (let i = 0; i < 3; i++) {
            const date = new Date(today)
            date.setDate(today.getDate() + i)
            const dateStr = date.toISOString().split("T")[0]
            if (getAvailableSlots(d.id, dateStr).some(s => s.isAvailable)) {
               hasSlot = true
               break
            }
         }
         matchesAvailability = hasSlot
      }
      
      return matchesQuery && matchesSpec && matchesPrice && matchesAvailability
    })
  }, [doctors, query, spec, price, onlyAvailable])

  return (
    <div className="container mx-auto px-4 py-8 grid gap-8 lg:grid-cols-[280px_1fr]">
      <motion.aside 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="card p-6 h-fit sticky top-24 bg-neutral-900 border-neutral-800"
      >
        <h2 className="text-lg font-bold text-white mb-6 font-serif">تصفية البحث</h2>
        
        <div>
          <label className="text-sm font-medium text-white">بحث</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="الاسم أو الموقع"
            className="mt-2 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-white placeholder-neutral-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>

        <div className="mt-6">
          <label className="text-sm font-medium text-white">التخصص</label>
          <select
            value={spec}
            onChange={(e) => setSpec(e.target.value)}
            className="mt-2 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-white focus:border-primary focus:outline-none transition-all"
          >
            <option value="">الكل</option>
            {specialties.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="mt-6">
          <label className="text-sm font-medium text-white">السعر</label>
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-2 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-white focus:border-primary focus:outline-none transition-all"
          >
            <option value="">الكل</option>
            <option value="منخفض">منخفض</option>
            <option value="متوسط">متوسط</option>
            <option value="مرتفع">مرتفع</option>
          </select>
        </div>

        <div className="mt-6 pt-6 border-t border-neutral-800">
          <label className="flex items-center gap-3 text-sm cursor-pointer group">
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${onlyAvailable ? 'bg-primary border-primary' : 'border-neutral-600 bg-neutral-800 group-hover:border-primary'}`}>
               {onlyAvailable && <span className="text-white text-xs">✓</span>}
            </div>
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="hidden"
            />
            <span className="text-slate-300 group-hover:text-white transition-colors">عرض المتاح فقط</span>
          </label>
        </div>
      </motion.aside>

      <section>
        <h1 className="text-2xl font-bold text-white font-serif mb-6">نتائج البحث <span className="text-base font-normal text-slate-400 mx-2">({filtered.length} طبيب)</span></h1>
        
        {filtered.length === 0 && (
          <div className="card p-12 text-center text-slate-400 bg-neutral-900 border-neutral-800">
            <p className="text-lg">لا يوجد أطباء مطابقين لبحثك.</p>
            <button onClick={() => {setQuery(''); setSpec(''); setPrice(''); setOnlyAvailable(false)}} className="mt-4 text-primary hover:underline">
              إعادة تعيين الفلاتر
            </button>
          </div>
        )}
        
        <div className="grid gap-6 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((d) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <DoctorCard doctor={d} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
