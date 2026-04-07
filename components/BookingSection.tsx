"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, User, Phone, CheckCircle2, ChevronRight, ChevronLeft, Stethoscope, ArrowLeft } from "lucide-react"
import { Doctor, Service, Slot, getAvailableSlots } from "@/lib/data"
import { bookAppointmentAction } from "@/app/actions"
import { cn } from "@/lib/utils"

interface BookingSectionProps {
  doctors: Doctor[]
  services: Service[]
}

const steps = [
  { id: 1, title: "الخدمة والطبيب", icon: Stethoscope },
  { id: 2, title: "الموعد", icon: Calendar },
  { id: 3, title: "تأكيد الحجز", icon: CheckCircle2 }
]

export default function BookingSection({ doctors, services }: BookingSectionProps) {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([])

  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      const slots = getAvailableSlots(selectedDoctor.id, selectedDate)
      setAvailableSlots(slots)
      setSelectedSlot(null)
    }
  }, [selectedDoctor, selectedDate])

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedService || !selectedDoctor || !selectedDate || !selectedSlot || !name || !phone) return

    setIsSubmitting(true)
    
    const message = `*حجز موعد جديد - Renew Dental Center*\n\n` +
      `👤 *الاسم:* ${name}\n` +
      `📞 *الهاتف:* ${phone}\n` +
      `🦷 *الخدمة:* ${selectedService.title}\n` +
      `👨‍⚕️ *الطبيب:* ${selectedDoctor.name}\n` +
      `📅 *التاريخ:* ${selectedDate}\n` +
      `⏰ *الوقت:* ${selectedSlot.time}`

    const waUrl = `https://wa.me/201068806864?text=${encodeURIComponent(message)}`

    try {
      await bookAppointmentAction({
        patientName: name,
        phone: phone,
        doctorId: selectedDoctor.id,
        date: selectedDate,
        timeSlot: selectedSlot.time,
        reason: selectedService.title
      })

      window.open(waUrl, "_blank")
      setStep(4)
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
    <section id="booking" className="relative py-32 overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-xl mx-auto text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center px-6 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider mb-6"
          >
            <span>نظام الحجز الذكي</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            احجز <span className="text-primary">موعدك</span> الآن
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-neutral-400 text-lg"
          >
            نحن نهتم بوقتك كما نهتم بابتسامتك. احجز موعدك في أقل من دقيقة.
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Stepper Navigation */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-4 p-2 bg-neutral-900 shadow-xl border border-white/5 rounded-2xl">
              {steps.map((item, i) => (
                <div key={item.id} className="flex items-center">
                  <button 
                    onClick={() => step > item.id && setStep(item.id)}
                    disabled={step <= item.id}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-500",
                      step === item.id ? "bg-primary text-white shadow-glow" : 
                      step > item.id ? "text-primary hover:bg-primary/5" : "text-neutral-600"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center border transition-colors",
                      step === item.id ? "border-white/20 bg-white/10" : "border-white/5"
                    )}>
                      {step > item.id ? <CheckCircle2 className="w-5 h-5" /> : <item.icon className="w-4 h-4" />}
                    </div>
                    <span className="hidden md:block font-bold text-sm">{item.title}</span>
                  </button>
                  {i < steps.length - 1 && (
                    <div className="w-10 h-[1px] bg-white/5 mx-2" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="card shadow-2xl p-6 md:p-12 relative overflow-hidden bg-neutral-950/60">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-white mb-6 border-r-2 border-primary pr-3">اختر الخدمة</h3>
                      <div className="grid grid-cols-1 gap-3">
                        {services.map((service) => (
                          <button
                            key={service.id}
                            onClick={() => setSelectedService(service)}
                            className={cn(
                              "p-4 rounded-2xl border text-right transition-all duration-300 relative group overflow-hidden",
                              selectedService?.id === service.id 
                                ? "bg-primary/10 border-primary text-white shadow-glow" 
                                : "bg-white/5 border-white/5 text-neutral-400 hover:border-white/10 hover:bg-white/[0.08]"
                            )}
                          >
                            <span className="relative z-10 font-bold">{service.title}</span>
                            {selectedService?.id === service.id && (
                              <motion.div layoutId="service-dot" className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#BF996C]" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-white mb-6 border-r-2 border-primary pr-3">اختر الطبيب</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {doctors.map((doctor) => (
                          <button
                            key={doctor.id}
                            onClick={() => setSelectedDoctor(doctor)}
                            className={cn(
                              "p-4 rounded-2xl border text-right transition-all duration-300 flex items-center gap-4 group",
                              selectedDoctor?.id === doctor.id 
                                ? "bg-primary/10 border-primary text-white shadow-glow" 
                                : "bg-white/5 border-white/5 text-neutral-400 hover:border-white/10"
                            )}
                          >
                            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white/5 group-hover:border-primary/50 transition-colors">
                              <img src={doctor.imageUrl} alt={doctor.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-lg">{doctor.name}</p>
                              <p className="text-sm opacity-60">{doctor.specialty}</p>
                            </div>
                            {selectedDoctor?.id === doctor.id && (
                              <motion.div layoutId="doctor-check" className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-4 h-4 text-white" />
                              </motion.div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-8">
                    <button 
                      onClick={nextStep}
                      disabled={!selectedService || !selectedDoctor}
                      className="btn btn-primary px-12 group h-14 text-xl"
                    >
                      <span>الخطوة التالية</span>
                      <ArrowLeft className="w-6 h-6 mr-3 group-hover:-translate-x-2 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="md:col-span-1 space-y-6">
                      <h3 className="text-xl font-bold text-white mb-6 border-r-2 border-primary pr-3">اختر التاريخ</h3>
                      <div className="relative">
                        <input 
                          type="date" 
                          value={selectedDate}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full bg-neutral-900 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all text-right font-bold"
                        />
                      </div>
                      <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 space-y-3">
                         <div className="flex items-center gap-2 text-primary">
                            <Clock className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase">تعليمات المواعيد</span>
                         </div>
                         <p className="text-xs text-neutral-400 leading-relaxed text-right">
                           يرجى الحضور قبل الموعد بـ 10 دقائق لتسجيل البيانات. في حال التأخير لأكثر من 15 دقيقة قد يتم إلغاء الحجز.
                         </p>
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                      <h3 className="text-xl font-bold text-white mb-6 border-r-2 border-primary pr-3">المواعيد المتاحة</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {availableSlots.length > 0 ? availableSlots.map((slot) => (
                          <button
                            key={slot.id}
                            disabled={!slot.isAvailable}
                            onClick={() => setSelectedSlot(slot)}
                            className={cn(
                              "relative group p-4 rounded-2xl border text-center transition-all duration-300",
                              selectedSlot?.id === slot.id 
                                ? "bg-primary border-primary text-white shadow-glow" 
                                : !slot.isAvailable 
                                ? "bg-neutral-900 border-white/5 text-neutral-700 opacity-40 cursor-not-allowed"
                                : "bg-white/5 border-white/10 text-neutral-300 hover:border-primary/50 hover:bg-primary/5"
                            )}
                          >
                            <span className="text-sm font-bold">{slot.time}</span>
                            {selectedSlot?.id === slot.id && (
                              <motion.div layoutId="slot-accent" className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-primary" />
                            )}
                          </button>
                        )) : (
                          <div className="col-span-full py-12 text-center bg-neutral-900/50 rounded-2xl border border-dashed border-white/5">
                             <p className="text-neutral-500">لا توجد مواعيد متاحة في هذا اليوم</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-8 border-t border-white/5">
                    <button onClick={prevStep} className="btn bg-white/5 border border-white/10 hover:bg-white/10 px-8">رجوع</button>
                    <button 
                      onClick={nextStep}
                      disabled={!selectedSlot}
                      className="btn btn-primary px-12 group h-14 text-xl"
                    >
                      <span>مراجعة البيانات</span>
                      <ArrowLeft className="w-6 h-6 mr-3 group-hover:-translate-x-2 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    <div className="lg:col-span-3 space-y-6">
                      <h3 className="text-xl font-bold text-white mb-6 border-r-2 border-primary pr-3">بيانات المريض</h3>
                      <form onSubmit={handleBooking} className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-sm text-neutral-500 pr-2">الاسم الكامل</label>
                          <div className="relative">
                            <User className="absolute right-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                            <input 
                              required
                              type="text" 
                              placeholder="أدخل اسمك بالكامل هنا"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full bg-neutral-900 border border-white/10 rounded-2xl pr-12 pl-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm text-neutral-500 pr-2">رقم الهاتف (واتساب)</label>
                          <div className="relative">
                            <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                            <input 
                              required
                              type="tel" 
                              placeholder="01xxxxxxxxx"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full bg-neutral-900 border border-white/10 rounded-2xl pr-12 pl-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium text-left"
                              dir="ltr"
                            />
                          </div>
                        </div>
                      </form>
                    </div>

                    <div className="lg:col-span-2">
                      <div className="bg-neutral-900 rounded-3xl p-8 border border-white/5 shadow-inner relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
                        <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                          <div className="w-1 h-6 bg-primary rounded-full" />
                          بطاقة الحجز
                        </h4>
                        
                        <div className="space-y-5">
                          {[
                            { label: "نوع الخدمة", value: selectedService?.title },
                            { label: "الطبيب المختار", value: selectedDoctor?.name },
                            { label: "يوم الحجز", value: selectedDate },
                            { label: "توقيت الموعد", value: selectedSlot?.time },
                          ].map((item, i) => (
                            <div key={i} className="flex flex-col gap-1 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                              <span className="text-xs text-neutral-500 uppercase tracking-wider">{item.label}</span>
                              <span className="text-white font-bold">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-8 border-t border-white/5">
                    <button onClick={prevStep} className="btn bg-white/5 border border-white/10 hover:bg-white/10 px-8">رجوع</button>
                    <button 
                      onClick={handleBooking}
                      disabled={isSubmitting || !name.trim() || phone.length < 10}
                      className="btn btn-primary px-12 group h-14 text-xl disabled:opacity-50"
                    >
                      {isSubmitting ? "جاري المعالجة..." : "تأكيد وإرسال عبر واتساب"}
                      <ChevronLeft className="w-6 h-6 mr-3 group-hover:-translate-x-2 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center space-y-8 py-16"
                >
                  <div className="relative">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 100, damping: 10 }}
                      className="w-28 h-28 bg-primary rounded-full flex items-center justify-center shadow-glow"
                    >
                      <CheckCircle2 className="w-16 h-16 text-white" />
                    </motion.div>
                    <div className="absolute inset-x-0 -bottom-4 flex justify-center">
                       <span className="px-3 py-1 bg-green-500 text-white text-[10px] font-bold uppercase rounded-full">تم النجاح</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-4xl font-bold text-white tracking-tight">تم حجز موعدك بنجاح!</h3>
                    <p className="text-neutral-400 text-xl max-w-lg leading-relaxed">
                      شكراً لاختيارك <span className="text-primary font-bold">Renew</span> يا <span className="text-white">{name}</span>. تم توجيهك لواتساب للتواصل النهائي.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={() => setStep(1)} 
                      className="btn btn-primary px-12 py-4 text-xl"
                    >
                      حجز موعد إضافي
                    </button>
                    <button 
                      onClick={() => window.location.href = "/"}
                      className="btn bg-white/5 border border-white/10 hover:bg-white/10 px-12 py-4 text-xl"
                    >
                      العودة للرئيسية
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
