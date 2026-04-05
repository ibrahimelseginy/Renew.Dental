"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Phone, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import FadeIn from "@/components/FadeIn"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black opacity-80"></div>
      <div className="container relative mx-auto px-4 py-12 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <FadeIn className="flex-1 space-y-6 text-center lg:text-right" direction="right">
            <h1 className="text-4xl font-bold leading-tight md:text-6xl lg:leading-tight">
              Renew Dental Center
              <span className="block text-2xl md:text-4xl font-medium text-primary mt-4 tracking-wide font-serif">
                Trust the Experts
              </span>
            </h1>
            <p className="text-lg text-white md:text-xl max-w-2xl mx-auto lg:mx-0">
              استرجع ابتسامتك وكأنك لم تفقدها أبداً. نستخدم أحدث التقنيات لنمنحك ابتسامة مشرقة وصحية.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <Link 
                href="#booking" 
                className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-lg font-semibold text-white shadow hover:bg-primary/90 transition-all hover:scale-105"
              >
                احجز الآن
              </Link>
              <Link 
                href="#services" 
                className="inline-flex h-12 items-center justify-center rounded-md border border-neutral-700 bg-transparent px-8 text-lg font-semibold text-white hover:bg-white/5 transition-all hover:scale-105"
              >
                خدماتنا
              </Link>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-3 pt-8 text-white">
              <p className="flex items-center justify-center lg:justify-start gap-2 text-lg">
                <MapPin className="h-5 w-5 text-primary animate-bounce" />
                <span>فاقوس، شارع الدروس، أعلى ميركاتو</span>
              </p>
              <Link href="tel:01068806864" className="flex items-center justify-center lg:justify-start gap-2 text-lg font-semibold hover:text-primary transition-colors">
                <Phone className="h-5 w-5 text-primary" />
                <span dir="ltr">01068806864</span>
              </Link>
            </div>
            
            {/* Social Icons */}
            <div className="flex justify-center lg:justify-start gap-4 pt-6">
              {[
                { Icon: Facebook, href: "https://www.facebook.com/share/15wiubFiSS/?mibextid=wwXIfr" },
                { Icon: Instagram, href: "https://www.instagram.com/renewdentalcenter.eg?igsh=MTFyNjNnM3pxbXRkYQ==" },
                { Icon: Phone, href: "tel:01068806864" }
              ].map(({ Icon, href }, i) => (
                <Link key={i} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 hover:bg-primary transition-colors cursor-pointer text-white hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                </Link>
              ))}
            </div>
          </FadeIn>
          
          {/* Doctor Image Placeholder */}
          <FadeIn className="flex-1 relative w-full flex justify-center" direction="left" delay={0.2}>
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative mx-auto w-full max-w-[350px] md:max-w-[450px] aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-800 shadow-2xl border border-neutral-700 group"
            >
              {/* Background Gradient/Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-neutral-800 via-neutral-900 to-black opacity-90"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 pb-20 transition-transform duration-700 group-hover:scale-105">
                 <div className="relative">
                    <div className="absolute -inset-4 bg-primary/20 blur-xl rounded-full opacity-50 animate-pulse"></div>
                    <Image 
                      src="/logo.png" 
                      alt="Renew Dental Center" 
                      width={500} 
                      height={200} 
                      className="relative h-auto w-72 md:w-80 object-contain drop-shadow-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                    />
                 </div>
                 
                 <div className="mt-4 text-center space-y-2 relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                      Renew Dental Center
                    </h3>
                    <p className="text-primary text-lg md:text-xl font-medium tracking-wider">
                      Trust the Experts
                    </p>
                 </div>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
