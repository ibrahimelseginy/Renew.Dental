"use client"

import FadeIn from "@/components/FadeIn"
import { motion } from "framer-motion"
import { Service } from "@/lib/data"
import { Star, Smile, ShieldCheck, Clock, Heart, Zap, Activity, ChevronLeft } from "lucide-react"

const iconMap: Record<string, any> = {
  Star,
  Smile,
  ShieldCheck,
  Clock,
  Heart,
  Zap,
  Activity,
}

export default function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="relative py-32 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider"
            >
              <Smile className="w-3 h-3" />
              <span>ما نقدمه لكم</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white"
            >
              خدمات <span className="text-primary font-serif">Renew</span> المتميزة
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-neutral-400 max-w-md text-lg leading-relaxed"
          >
            نجمع بين الخبرة الطبية وأحدث التقنيات لنقدم لك رعاية صحية متكاملة لأسنانك في بيئة مريحة وآمنة.
          </motion.p>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => {
            const Icon = iconMap[service.icon] || Star
            
            return (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="card h-full p-8 relative z-10 overflow-hidden">
                  {/* Hover Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-20">
                    <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-800/50 border border-white/5 text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-xl group-hover:shadow-primary/20">
                      <Icon className="h-8 w-8" />
                    </div>
                    
                    <h3 className="mb-4 text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-neutral-400 text-lg leading-relaxed mb-8 group-hover:text-neutral-200 transition-colors duration-300">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-primary font-semibold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 cursor-pointer">
                      <span>اكتشف المزيد</span>
                      <ChevronLeft className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                
                {/* Visual Accent */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
