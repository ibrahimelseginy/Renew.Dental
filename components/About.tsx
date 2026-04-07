"use client"

import Link from "next/link"
import Image from "next/image"
import { ShieldCheck, ArrowLeft, Star } from "lucide-react"
import { motion } from "framer-motion"
import FadeIn from "@/components/FadeIn"

export default function About() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Visual Side */}
          <FadeIn className="flex-1 w-full relative" direction="right">
            <div className="relative aspect-square md:aspect-[4/5] w-full max-w-[500px] mx-auto overflow-hidden rounded-[40px] shadow-2xl border border-white/5 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-neutral-900/80 to-transparent z-10" />
                
                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 z-20 p-10 flex flex-col items-center text-center transition-transform duration-700 group-hover:scale-105">
                  <motion.div 
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mb-6 shadow-glow"
                  >
                    <Image src="/logo.png" alt="Icon" width={50} height={50} className="w-12 h-auto brightness-0 invert" />
                  </motion.div>
                  
                  <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">خبرة تمتد لسنوات</h3>
                  <p className="text-primary font-medium text-lg">من الرعاية والتميز الطبي</p>
                </div>

                <div className="absolute inset-0 flex items-center justify-center bg-neutral-950">
                   <div className="relative w-full h-full opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                      <Image 
                        src="/logo.png" 
                        alt="Background" 
                        fill
                        className="object-contain p-12"
                      />
                   </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute top-8 right-8 z-30 bg-neutral-900/90 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-2">
                   <div className="flex -space-x-1">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full border border-white/10 bg-primary/20 flex items-center justify-center overflow-hidden">
                          <Star className="w-3 h-3 text-primary fill-primary" />
                        </div>
                      ))}
                   </div>
                   <span className="text-[10px] text-white font-bold uppercase tracking-widest">+5000 مريض</span>
                </div>
            </div>
          </FadeIn>

          {/* Content Side */}
          <FadeIn className="flex-1 space-y-10 text-center lg:text-right" direction="left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
                <div className="w-10 h-[1px] bg-primary" />
                <span>من نحن</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">مركز <span className="text-primary font-serif italic pr-2">Renew</span> لطب الأسنان المتخصص</h2>
            </div>

            <div className="space-y-8">
              <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl">
                نحن لسنا مجرد مركز لطب الأسنان، نحن وجهتك لاستعادة الثقة. نؤمن بأن كل ابتسامة هي لوحة فنية فريدة، لذا نكرس خبراتنا الطبية وأحدث ما توصل إليه العلم في تجميل وزراعة الأسنان لنمنحك النتيجة التي تستحقها.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {[
                  "أحدث تقنيات زراعة الأسنان الألمانية",
                  "تعقيم رقمي ذكي لكل الأدوات",
                  "ضمان ممتد على كافة التركيبات",
                  "فريق طبي من أكفأ الاستشاريين"
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="flex items-center gap-4 group cursor-default"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <span className="text-lg text-neutral-200 group-hover:text-white transition-colors">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-8 flex flex-wrap justify-center lg:justify-start gap-5">
              <Link 
                href="tel:01068806864" 
                className="btn btn-primary px-12 group h-14 text-lg"
              >
                <span>ابدأ رحلتك الآن</span>
                <ArrowLeft className="w-5 h-5 mr-3 group-hover:-translate-x-2 transition-transform" />
              </Link>
              <Link 
                href="#services" 
                className="btn bg-white/5 border border-white/10 hover:bg-white/10 px-10 h-14"
              >
                تعرف على خدماتنا
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
