"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Phone, MapPin } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import FadeIn from "@/components/FadeIn"

export default function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden pt-20">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-[-10%] right-[-5%] w-[40%] aspect-square bg-primary/10 rounded-full blur-[120px] mix-blend-screen" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-[-10%] left-[-5%] w-[30%] aspect-square bg-primary/5 rounded-full blur-[100px] mix-blend-screen" 
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          {/* Content Side */}
          <div className="space-y-8">
            <FadeIn direction="up" delay={0.1}>
              <div className="inline-flex items-center px-6 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                <span>نثق فـي خبراتنا لابتسامتكم</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold leading-[1.1] mb-6">
                <span className="block text-white font-sans">Renew</span>
                <span className="text-gradient">Dental Center</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                اكتشف المعنى الحقيقي لطب الأسنان الحديث. نجمع بين الفن والتكنولوجيا لنرسم ابتسامة تعيد لك الثقة واللمعان.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.3} className="flex flex-wrap justify-center gap-5 pt-4">
              <Link 
                href="#booking" 
                className="btn btn-primary px-12 py-4 text-xl group"
              >
                احجز موعدك الآن
                <motion.span 
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="mr-2"
                >
                  ←
                </motion.span>
              </Link>
              <Link 
                href="#services" 
                className="btn bg-white/5 border border-white/10 hover:bg-white/10 px-12 py-4 text-xl"
              >
                خدماتنا المتوفرة
              </Link>
            </FadeIn>

            {/* Quick Contact */}
            <FadeIn direction="up" delay={0.5} className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
              <div className="flex items-center justify-center gap-4 p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="w-7 h-7" />
                </div>
                <div className="text-right">
                  <p className="text-sm text-neutral-500">موقعنا</p>
                  <p className="text-white text-lg font-medium">فاقوس، شارع الدروس</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="w-7 h-7" />
                </div>
                <div className="text-right">
                  <p className="text-sm text-neutral-500">اتصل بنا</p>
                  <p className="text-white text-lg font-medium" dir="ltr">01068806864</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
