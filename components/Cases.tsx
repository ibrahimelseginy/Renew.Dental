"use client"
 
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import FadeIn from "@/components/FadeIn"
import { ArrowLeft, Maximize2, X } from "lucide-react"

export default function Cases() {
  const [selectedCase, setSelectedCase] = useState<any>(null)

  const cases = [
    { id: 1, beforeImg: "/case1_before.png", afterImg: "/case1_after.png", title: "حالة تجميل كاملة", desc: "تم استخدام الفينير الرقمي لإصلاح تناسق الفكين وابتسامة هوليود." },
    { id: 2, beforeImg: "/case2_before.png", afterImg: "/case2_after.png", title: "إغلاق الفراغات", desc: "تصحيح الفراغات بين الأسنان باستخدام الحشوات التجميلية بشكل طبيعي." },
    { id: 3, beforeImg: "/case3_before.png", afterImg: "/case3_after.png", title: "زراعة الأسنان", desc: "تعويض الأسنان المفقودة بزراعات ذات جودة عالية ومظهر طبيعي تماماً." }
  ]

  return (
    <section id="cases" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-20 space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center px-6 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider mb-4"
          >
            <span>معرض النجاح</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            سجل <span className="text-primary">الابتسامات</span> المشرقة
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-neutral-400 text-lg"
          >
             شاهد التحولات الحقيقية لمرضانا وكيف ساهمنا في استعادة ثقتهم بأنفسهم.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {cases.map((item, idx) => (
            <FadeIn 
              key={item.id} 
              delay={idx * 0.1} 
              direction="up"
              className="group relative"
            >
              <div 
                onClick={() => setSelectedCase(item)}
                className="relative aspect-[16/10] overflow-hidden rounded-[40px] bg-neutral-900 border border-white/5 shadow-2xl cursor-pointer"
              >
                <Image 
                  src={item.afterImg} 
                  alt={item.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay with labels */}
                <div className="absolute inset-x-0 bottom-0 z-20 p-6 flex justify-between items-end bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-xl font-bold text-white">{item.title}</h4>
                    <p className="text-neutral-300 text-xs line-clamp-1">{item.desc}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] text-white/60 font-bold uppercase tracking-widest border border-white/10">قبل</span>
                    <span className="px-3 py-1 bg-primary/80 backdrop-blur-md rounded-full text-[10px] text-white font-bold uppercase tracking-widest">بعد</span>
                  </div>
                </div>

                {/* Hover Details */}
                <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-neutral-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8">
                   <motion.div 
                     initial={{ scale: 0.9, opacity: 0 }}
                     whileInView={{ scale: 1, opacity: 1 }}
                     className="space-y-4"
                   >
                      <h4 className="text-2xl font-bold text-white">{item.title}</h4>
                      <p className="text-neutral-300 text-sm max-w-xs">{item.desc}</p>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCase(item);
                        }}
                        className="flex items-center gap-2 text-primary font-bold hover:underline mx-auto"
                      >
                         <span>عرض التفاصيل</span>
                         <Maximize2 className="w-4 h-4" />
                      </button>
                   </motion.div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        
        <div className="mt-20 text-center">
           <FadeIn direction="up">
              <Link 
                href="/cases"
                className="btn bg-white/5 border border-white/10 hover:bg-white/10 px-12 group h-14 text-xl inline-flex items-center gap-3"
              >
                <span>تصفح كافة الحالات</span>
                <ArrowLeft className="w-5 h-5 mr-3 group-hover:-translate-x-2 transition-transform" />
              </Link>
           </FadeIn>
        </div>

        {/* Case Details Modal */}
        <AnimatePresence>
          {selectedCase && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCase(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-4xl bg-neutral-900 rounded-[32px] overflow-hidden border border-white/10 shadow-2xl z-10"
              >
                <button 
                  onClick={() => setSelectedCase(null)}
                  className="absolute top-6 left-6 z-20 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="flex flex-col gap-2 p-6 bg-neutral-950">
                    <div className="flex-1 relative min-h-[200px] rounded-2xl overflow-hidden border border-white/5">
                      <Image 
                        src={selectedCase.beforeImg} 
                        alt="Before" 
                        fill 
                        className="object-cover"
                      />
                      <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] text-white/80 font-bold uppercase tracking-widest border border-white/10">قبل</div>
                    </div>
                    <div className="flex-1 relative min-h-[200px] rounded-2xl overflow-hidden border border-primary/20">
                      <Image 
                        src={selectedCase.afterImg} 
                        alt="After" 
                        fill 
                        className="object-cover"
                      />
                      <div className="absolute top-4 right-4 px-3 py-1 bg-primary backdrop-blur-md rounded-full text-[10px] text-white font-bold uppercase tracking-widest">بعد</div>
                    </div>
                  </div>

                  <div className="p-8 lg:p-12 flex flex-col justify-center space-y-6">
                    <div className="space-y-4 text-right">
                      <div className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase">تفاصيل الحالة</div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white">{selectedCase.title}</h3>
                      <p className="text-neutral-400 text-lg leading-relaxed">
                        {selectedCase.desc}
                      </p>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-white/5">
                        <p className="text-neutral-500 text-sm italic text-right">
                          تم تنفيذ هذه العملية باستخدام أحدث التقنيات الرقمية المتاحة في مركز رينيو دنتال، مع مراعاة كافة المعايير الجمالية والوظيفية.
                        </p>
                        <Link 
                          href="#booking" 
                          onClick={() => setSelectedCase(null)}
                          className="btn btn-primary w-full h-14 text-lg"
                        >
                          احجز استشارتك الآن
                        </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
