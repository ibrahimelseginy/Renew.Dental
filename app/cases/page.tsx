"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Maximize2, X, Home, ChevronRight } from "lucide-react"
import FadeIn from "@/components/FadeIn"

const ALL_CASES = [
  { 
    id: 1, 
    beforeImg: "/case1_before.png", 
    afterImg: "/case1_after.png", 
    title: "حالة تجميل كاملة", 
    category: "تجميل الأسنان",
    desc: "تم استخدام الفينير الرقمي لإصلاح تناسق الفكين وابتسامة هوليود بشكل كامل وطبيعي.",
    details: "تشمل هذه الحالة تركيب 20 وحدة فينير إيماكس (E-Max) مع تصميم الابتسامة الرقمي (DSD) لضمان أفضل توافق مع ملامح الوجه."
  },
  { 
    id: 2, 
    beforeImg: "/case2_before.png", 
    afterImg: "/case2_after.png", 
    title: "إغلاق الفراغات", 
    category: "حشوات تجميلية",
    desc: "تصحيح الفراغات بين الأسنان باستخدام الحشوات التجميلية بشكل طبيعي في جلسة واحدة.",
    details: "تم استخدام مواد عالية الجودة لغلق المسافات بين القواطع العلوية، مما أدى إلى تحسين مخارج الحروف وثقة المريض في نفسه."
  },
  { 
    id: 3, 
    beforeImg: "/case3_before.png", 
    afterImg: "/case3_after.png", 
    title: "زراعة الأسنان", 
    category: "زراعة الأسنان",
    desc: "تعويض الأسنان المفقودة بزراعات ذات جودة عالية ومظهر طبيعي تماماً.",
    details: "زراعة فورية لضرس مفقود مع تركيب التاج المؤقت في نفس اليوم، مما وفر الوقت والراحة للمريض مع نتائج جمالية فورية."
  }
]

export default function CasesPage() {
  const [selectedCase, setSelectedCase] = useState<any>(null)

  return (
    <main className="min-h-screen bg-black pt-32 pb-20">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] aspect-square bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] aspect-square bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Navigation / Breadcrumbs */}
        <FadeIn direction="down" className="mb-12">
          <nav className="flex items-center gap-4 text-sm text-neutral-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Home className="w-4 h-4" />
              <span>الرئيسية</span>
            </Link>
            <ChevronRight className="w-4 h-4 rotate-180" />
            <span className="text-white font-medium">معرض الحالات</span>
          </nav>

          <div className="space-y-6 text-right">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
              معرض <span className="text-gradient">قصص النجاح</span>
            </h1>
            <p className="text-neutral-400 text-xl max-w-2xl ml-auto leading-relaxed">
              نفخر بمشاركة هذه التحولات الحقيقية لمرضانا. كل حالة تمثل التزامنا بالدقة، الجمال، واحترافية طب الأسنان الحديث.
            </p>
          </div>
        </FadeIn>

        {/* Case Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {ALL_CASES.map((item, idx) => (
            <FadeIn 
              key={item.id} 
              delay={idx * 0.1}
              className="group relative"
            >
              <div 
                onClick={() => setSelectedCase(item)}
                className="relative aspect-[16/11] overflow-hidden rounded-[32px] bg-neutral-900 border border-white/5 cursor-pointer"
              >
                <Image 
                  src={item.afterImg} 
                  alt={item.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Visual Indicators */}
                <div className="absolute top-6 right-6 flex gap-2">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] text-white/80 font-bold uppercase tracking-widest border border-white/10">قبل</span>
                  <span className="px-3 py-1 bg-primary/90 backdrop-blur-md rounded-full text-[10px] text-white font-bold uppercase tracking-widest">بعد</span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <div className="space-y-2 text-right">
                    <span className="text-primary text-xs font-bold uppercase tracking-widest">{item.category}</span>
                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                  </div>
                </div>

                {/* Hover Action */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Contact Banner */}
        <FadeIn direction="up" className="mt-32">
          <div className="p-12 md:p-16 rounded-[48px] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32" />
            
            <h2 className="text-3xl md:text-5xl font-bold text-white max-w-2xl mx-auto">هل ترغب في الحصول على ابتسامة مماثلة؟</h2>
            <p className="text-neutral-400 text-lg">احجز موعد استشارتك اليوم وابدأ رحلة التحول الخاصة بك مع خبراء رينيو.</p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/#booking" className="btn btn-primary px-12 h-16 text-lg">
                احجز موعدك الآن
              </Link>
              <Link href="/#contact" className="btn bg-white/5 border border-white/10 hover:bg-white/10 px-12 h-16 text-lg">
                تواصل معنا
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedCase && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCase(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-neutral-900 border border-white/10 rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedCase(null)}
                className="absolute top-6 left-6 z-10 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-primary transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full md:w-1/2 flex flex-col gap-2 p-6 bg-neutral-950">
                <div className="flex-1 relative min-h-[250px] rounded-2xl overflow-hidden border border-white/5">
                  <Image 
                    src={selectedCase.beforeImg} 
                    alt="Before" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] text-white/80 font-bold uppercase tracking-widest border border-white/10">قبل</div>
                </div>
                <div className="flex-1 relative min-h-[250px] rounded-2xl overflow-hidden border border-primary/20">
                  <Image 
                    src={selectedCase.afterImg} 
                    alt="After" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-primary backdrop-blur-md rounded-full text-[10px] text-white font-bold uppercase tracking-widest">بعد</div>
                </div>
              </div>

              <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center space-y-8 overflow-y-auto">
                <div className="space-y-4 text-right">
                  <span className="text-primary text-xs font-bold uppercase tracking-widest">{selectedCase.category}</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">{selectedCase.title}</h2>
                  <p className="text-neutral-300 text-lg leading-relaxed">{selectedCase.desc}</p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-right">
                  <p className="text-neutral-400 leading-relaxed italic">{selectedCase.details}</p>
                </div>

                <div className="flex flex-col gap-4">
                  <Link 
                    href="/#booking" 
                    onClick={() => setSelectedCase(null)}
                    className="btn btn-primary w-full h-14 text-lg"
                  >
                    بدء رحلة العلاج
                  </Link>
                  <button 
                    onClick={() => setSelectedCase(null)}
                    className="text-neutral-500 hover:text-white transition-colors text-sm"
                  >
                    إغلاق العرض
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  )
}
