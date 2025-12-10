"use client"

import Link from "next/link"
import Image from "next/image"
import { ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"
import FadeIn from "@/components/FadeIn"

export default function About() {
  return (
    <section id="about" className="bg-neutral-900 py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-3xl pointer-events-none"></div>
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <FadeIn className="flex-1 w-full" direction="right">
            <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-2xl bg-neutral-800 shadow-2xl border border-neutral-700 group">
                {/* Background Gradient/Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-800 via-neutral-900 to-black opacity-90"></div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 pb-20 transition-transform duration-700 group-hover:scale-105">
                  <Image 
                    src="/logo.png" 
                    alt="Renew Dental Center" 
                    width={500} 
                    height={200} 
                    className="h-auto w-80 md:w-96 object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-500 drop-shadow-2xl"
                  />
                  <div className="mt-4 text-center space-y-2">
                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                      Renew Dental Center
                    </h3>
                    <p className="text-primary text-lg md:text-xl font-medium tracking-wider">
                      Trust the Experts
                    </p>
                  </div>
                </div>
            </div>
          </FadeIn>
          <FadeIn className="flex-1 space-y-6 text-center lg:text-right" direction="left">
            <h2 className="text-3xl font-bold text-white">عن المركز</h2>
            <h3 className="text-xl text-primary font-semibold">Renew Dental Center</h3>
            <div className="space-y-4 text-white leading-relaxed">
              <p>
                مركز متخصص في طب وجراحة الفم وتجميل الأسنان.
                نمتلك خبرة طويلة ورعاية مميزة لكل حالة. احجز استشارتك الآن وتعرف على الحل الأنسب لك.
              </p>
              <ul className="space-y-2 list-none inline-block text-right">
                {[
                  "أحدث التقنيات في زراعة الأسنان",
                  "تعقيم عالي المستوى لضمان سلامتكم",
                  "ضمان على جميع التركيبات والزراعات"
                ].map((item, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (idx * 0.1) }}
                    className="flex items-center gap-2"
                  >
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="pt-4">
                <Link 
                href="tel:01068806864" 
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white shadow hover:bg-primary/90 transition-all hover:scale-105"
              >
                احجز الآن
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
