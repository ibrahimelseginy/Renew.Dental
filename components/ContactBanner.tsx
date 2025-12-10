"use client"

import Link from "next/link"
import { Phone, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import FadeIn from "@/components/FadeIn"

export default function ContactBanner() {
  const content = (
    <div className="flex items-center gap-8 text-xl md:text-2xl font-bold text-white whitespace-nowrap px-4">
      <span>اسأل عن عروض زراعة الأسنان</span>
      <Sparkles className="h-6 w-6 text-yellow-300" />
      <span>عيادة مبتكرة</span>
      <Sparkles className="h-6 w-6 text-yellow-300" />
      <span>خبرة طويلة</span>
      <Sparkles className="h-6 w-6 text-yellow-300" />
      <span>رعاية مميزة لكل حالة</span>
      <Sparkles className="h-6 w-6 text-yellow-300" />
      <span>احجز استشارتك الآن</span>
      <Sparkles className="h-6 w-6 text-yellow-300" />
    </div>
  )

  return (
    <section id="contact" className="bg-primary py-16 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <FadeIn direction="up">
          {/* Marquee Tape */}
          <div className="mb-12 overflow-hidden border-y-2 border-white/20 bg-white/10 backdrop-blur-sm -mx-4 sm:-mx-0 rounded-xl">
             <div className="flex">
               <motion.div 
                 className="flex min-w-full shrink-0 items-center justify-around py-6"
                 animate={{ x: ["0%", "-100%"] }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               >
                 {content}
               </motion.div>
               <motion.div 
                 className="flex min-w-full shrink-0 items-center justify-around py-6"
                 animate={{ x: ["0%", "-100%"] }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               >
                 {content}
               </motion.div>
             </div>
           </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link 
              href="tel:01068806864" 
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-lg font-bold text-primary shadow-xl hover:bg-slate-100 transition-all hover:scale-105"
            >
              احجز الآن
            </Link>
            <Link href="tel:01068806864" className="flex items-center gap-2 group cursor-pointer hover:opacity-80 transition-opacity">
                <div className="p-2 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                  <Phone className="h-6 w-6" />
                </div>
                <span className="text-2xl font-bold tracking-wider" dir="ltr">01068806864</span>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
