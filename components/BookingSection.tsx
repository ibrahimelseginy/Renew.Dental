"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, User, Phone, CheckCircle2, ChevronRight, ChevronLeft, Stethoscope } from "lucide-react"
import FadeIn from "./FadeIn"
import { Doctor, Service, Slot, getAvailableSlots } from "@/lib/data"
import { bookAppointmentAction } from "@/app/actions"

interface BookingSectionProps {
  doctors: Doctor[]
  services: Service[]
}

export default function BookingSection({ doctors, services }: BookingSectionProps) {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([])

  // Get available slots when doctor or date changes
  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      const slots = getAvailableSlots(selectedDoctor.id, selectedDate)
      setAvailableSlots(slots)
      setSelectedSlot(null)
    }
  }, [selectedDoctor, selectedDate])

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSlot || !selectedDoctor || !selectedService) return

    setIsSubmitting(true)
    
    // Format WhatsApp message
    const message = `*حجز موعد جديد - Renew Dental Center*\n\n` +
      `👤 *الاسم:* ${name}\n` +
      `📞 *الهاتف:* ${phone}\n` +
      `🦷 *الخدمة:* ${selectedService.title}\n` +
      `👨‍⚕️ *الطبيب:* ${selectedDoctor.name}\n` +
      `📅 *التاريخ:* ${selectedDate}\n` +
      `🕒 *الوقت:* ${selectedSlot.time}\n\n` +
      `أريد تأكيد هذا الحجز من فضلك.`

    const waUrl = `https://wa.me/201068806864?text=${encodeURIComponent(message)}`

    try {
      // Save for records (optional but good)
      await bookAppointmentAction({
        patientName: name,
        phone: phone,
        doctorId: selectedDoctor.id,
        date: selectedDate,
        time: selectedSlot.time,
        reason: selectedService.title
      })

      // Redirect to WhatsApp
      window.open(waUrl, "_blank")
      setStep(4) // Success step
    } catch (error) {
      console.error("Booking error:", error)
      alert("حدث خطأ أثناء الحجز، يرجى المحاولة مرة أخرى.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  return (
    <section id="booking" className="relative py-24 bg-neutral-950 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white md:text-5xl mb-4">احجز موعدك الآن</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
            خطوات بسيطة تفصلك عن ابتسامتك المثالية. اختر الخدمة، الطبيب، والموعد المناسب لك.
          </p>
          <div className="mt-6 h-1 w-24 bg-primary mx-auto rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"></div>
        </FadeIn>

        <div className="max-w-4xl mx-auto">
          {/* Progress bar */}
          <div className="flex justify-between mb-12 relative px-2">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-neutral-800 -translate-y-1/2 z-0"></div>
            <div 
                className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-500" 
                style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
            
            {[1, 2, 3].map((num) => (
              <div 
                key={num}
                className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-500 ${
                  step >= num ? "bg-primary border-primary text-white scale-110 shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]" : "bg-neutral-900 border-neutral-700 text-neutral-500"
                }`}
              >
                {step > num ? <CheckCircle2 className="w-6 h-6" /> : num}
              </div>
            ))}
          </div>

          {/* Form Content */}
          <div className="bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-3xl p-6 md:p-10 shadow-2xl min-h-[500px] flex flex-col">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <Stethoscope className="text-primary w-6 h-6" />
                      اختر الخدمة والطبيب
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-3">الخدمة المطلوبة</label>
                            <div className="grid grid-cols-1 gap-3">
                                {services.map((service) => (
                                    <button
                                        key={service.id}
                                        onClick={() => setSelectedService(service)}
                                        className={`p-4 rounded-xl border text-right transition-all duration-300 flex items-center justify-between group ${
                                            selectedService?.id === service.id 
                                            ? "bg-primary/20 border-primary text-white" 
                                            : "bg-neutral-800/50 border-neutral-700 text-neutral-300 hover:border-neutral-500"
                                        }`}
                                    >
                                        <span className="font-medium">{service.title}</span>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                            selectedService?.id === service.id ? "border-primary bg-primary" : "border-neutral-600"
                                        }`}>
                                            {selectedService?.id === service.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-3">اختر الطبيب</label>
                            <div className="grid grid-cols-1 gap-3">
                                {doctors.map((doctor) => (
                                    <button
                                        key={doctor.id}
                                        onClick={() => setSelectedDoctor(doctor)}
                                        className={`p-4 rounded-xl border text-right transition-all duration-300 flex items-center gap-4 group ${
                                            selectedDoctor?.id === doctor.id 
                                            ? "bg-primary/20 border-primary text-white" 
                                            : "bg-neutral-800/50 border-neutral-700 text-neutral-300 hover:border-neutral-500"
                                        }`}
                                    >
                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-neutral-700 group-hover:border-primary transition-colors">
                                            <img src={doctor.imageUrl} alt={doctor.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-bold">{doctor.name}</div>
                                            <div className="text-xs text-neutral-400">{doctor.specialty}</div>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                            selectedDoctor?.id === doctor.id ? "border-primary bg-primary" : "border-neutral-600"
                                        }`}>
                                            {selectedDoctor?.id === doctor.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-6">
                    <button 
                        onClick={nextStep}
                        disabled={!selectedService || !selectedDoctor}
                        className="btn btn-primary px-10 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        المرحلة التالية
                        <ChevronLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <Calendar className="text-primary w-6 h-6" />
                      اختر التاريخ والوقت
                    </h3>
                    
                    <div className="space-y-8">
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-3">تاريخ الموعد</label>
                            <input 
                                type="date" 
                                value={selectedDate}
                                min={new Date().toISOString().split('T')[0]}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full md:w-64 bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-3">الأوقات المتاحة</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                {availableSlots.map((slot) => (
                                    <button
                                        key={slot.id}
                                        disabled={!slot.isAvailable}
                                        onClick={() => setSelectedSlot(slot)}
                                        className={`p-3 rounded-xl border text-center transition-all duration-300 ${
                                            selectedSlot?.id === slot.id 
                                            ? "bg-primary border-primary text-white shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]" 
                                            : !slot.isAvailable 
                                            ? "bg-neutral-900 border-neutral-800 text-neutral-600 cursor-not-allowed opacity-50"
                                            : "bg-neutral-800/50 border-neutral-700 text-neutral-300 hover:border-primary/50"
                                        }`}
                                    >
                                        <div className="text-sm font-bold flex items-center justify-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            {slot.time}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-6">
                    <button onClick={prevStep} className="btn bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-700 px-8">السابق</button>
                    <button 
                        onClick={nextStep}
                        disabled={!selectedSlot}
                        className="btn btn-primary px-10 py-3 text-lg disabled:opacity-50 group"
                    >
                        تأكيد البيانات
                        <ChevronLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <User className="text-primary w-6 h-6" />
                      البيانات الشخصية
                    </h3>
                    
                    <form onSubmit={handleBooking} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-neutral-400 mb-2">الاسم الكامل</label>
                                <div className="relative">
                                    <User className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
                                    <input 
                                        required
                                        type="text" 
                                        placeholder="الاسم الثلاثي من فضلك"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-neutral-800 border border-neutral-700 rounded-xl pr-12 pl-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-400 mb-2">رقم الهاتف (واتساب)</label>
                                <div className="relative">
                                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
                                    <input 
                                        required
                                        type="tel" 
                                        placeholder="01xxxxxxxxx"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full bg-neutral-800 border border-neutral-700 rounded-xl pr-12 pl-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-left"
                                        dir="ltr"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-neutral-800/30 p-6 rounded-2xl border border-neutral-700/50 space-y-4">
                            <h4 className="font-bold text-white border-b border-neutral-700 pb-3 mb-4">ملخص الحجز</h4>
                            <div className="flex justify-between text-sm">
                                <span className="text-neutral-400">الخدمة:</span>
                                <span className="text-white font-medium">{selectedService?.title}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-neutral-400">الطبيب:</span>
                                <span className="text-white font-medium">{selectedDoctor?.name}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-neutral-400">التاريخ:</span>
                                <span className="text-white font-medium">{selectedDate}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-neutral-400">الوقت:</span>
                                <span className="text-white font-medium">{selectedSlot?.time}</span>
                            </div>
                        </div>

                        <div className="md:col-span-2 flex justify-between pt-6">
                            <button type="button" onClick={prevStep} className="btn bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-700 px-8">السابق</button>
                            <button 
                                type="submit"
                                disabled={isSubmitting || !name || !phone}
                                className="btn btn-primary px-10 py-3 text-lg disabled:opacity-50 flex items-center gap-2"
                            >
                                {isSubmitting ? "جاري الحجز..." : "تأكيد الحجز عبر واتساب"}
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </button>
                        </div>
                    </form>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center space-y-6 py-12"
                >
                    <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-16 h-16 text-primary" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">تم تأكيد الحجز بنجاح!</h3>
                    <p className="text-neutral-400 text-lg max-w-md">
                        شكراً لك يا {name}. لقد تم تحويلك إلى واتساب لإتمام التأكيد النهائي مع الفريق الطبي. نحن نتطلع لرؤيتك!
                    </p>
                    <button 
                        onClick={() => setStep(1)} 
                        className="btn bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-700 px-10 py-3"
                    >
                        حجز موعد أخر
                    </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
