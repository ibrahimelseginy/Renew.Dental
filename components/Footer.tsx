"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Phone, Clock, Facebook, Instagram, Youtube, ArrowUp } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-neutral-950 pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid gap-12 lg:gap-20 md:grid-cols-2 lg:grid-cols-4 mb-20">
          {/* Brand & Info */}
          <div className="space-y-6 col-span-1 md:col-span-2 lg:col-span-1">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-block"
            >
              <Image 
                src="/logo.png" 
                alt="Renew Dental Center" 
                width={200} 
                height={50} 
                className="h-16 w-auto object-contain brightness-110"
              />
            </motion.div>
            <p className="text-neutral-400 text-lg leading-relaxed text-right">
              نحن في <span className="text-primary font-bold">Renew</span> نؤمن بأن الابتسامة هي لغة العالم الصامتة. نجمع بين الفن والطب لنمنحك الرعاية التي تليق بك.
            </p>
            <div className="flex gap-4">
               {[Facebook, Instagram, Youtube].map((Icon, i) => (
                 <Link key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                    <Icon className="w-5 h-5" />
                 </Link>
               ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white border-r-2 border-primary pr-3">روابط سريعة</h3>
            <ul className="space-y-4">
              {["الرئيسية", "خدماتنا", "قصص النجاح", "عن المركز", "حجز موعد"].map((item, i) => (
                <li key={i}>
                  <Link href={`#${item === "الرئيسية" ? "hero" : item === "قصص النجاح" ? "cases" : i === 4 ? "booking" : i === 1 ? "services" : "about"}`} className="text-neutral-400 hover:text-primary transition-colors flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white border-r-2 border-primary pr-3">تواصل معنا</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">العنوان</p>
                  <p className="text-white font-medium">فاقوس، شارع الدروس، أعلى ميركاتو</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">رقم الهاتف</p>
                  <Link href="tel:01068806864" dir="ltr" className="text-white font-bold text-lg hover:text-primary transition-colors">
                    010 6880 6864
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white border-r-2 border-primary pr-3">مواعيد العمل</h3>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <Clock className="w-5 h-5" />
                <span className="font-bold">الجدول الأسبوعي</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">السبت - الخميس</span>
                  <span className="text-white font-medium">1م - 10م</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">الجمعة</span>
                  <span className="text-primary font-bold italic underline decoration-wavy">عطلة رسمية</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="relative group rounded-[40px] overflow-hidden border border-white/5 shadow-2xl mb-16">
          <div className="absolute inset-0 bg-primary/5 z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-700" />
          <iframe
            src="https://maps.google.com/maps?q=Faqous%20Al%20Dros%20Street&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale hover:grayscale-0 transition-all duration-1000 scale-[1.02] group-hover:scale-100"
          ></iframe>
        </div>

        {/* Copyright & Scroll Top */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} <span className="text-white font-bold">Renew Dental Center</span>. صمم بكل شغف لخدمة ابتسامتكم.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-3 text-neutral-400 hover:text-primary transition-all group"
          >
            <span className="text-sm font-bold uppercase tracking-widest group-hover:pr-2 transition-all">العودة للأعلى</span>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all">
               <ArrowUp className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  )
}
