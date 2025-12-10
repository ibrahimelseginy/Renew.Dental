"use client"

import FadeIn from "@/components/FadeIn"
import { Service } from "@/lib/data"
import { Star, Smile, ShieldCheck, Clock, Heart, Zap, Activity } from "lucide-react"

const iconMap: Record<string, any> = {
  Star,
  Smile,
  ShieldCheck,
  Clock,
  Heart,
  Zap,
  Activity
}

export default function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="container mx-auto px-4 py-24">
      <FadeIn className="text-center mb-12" direction="down">
        <h2 className="text-3xl font-bold text-white md:text-4xl">خدماتنا</h2>
        <div className="mt-2 h-1 w-20 bg-primary mx-auto rounded-full"></div>
      </FadeIn>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, idx) => {
          const Icon = iconMap[service.icon] || Star
          
          return (
            <FadeIn key={service.id} delay={idx * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-b from-neutral-800/50 to-neutral-900/50 p-8 shadow-lg hover:shadow-primary/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-neutral-800 border border-neutral-700 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500 shadow-lg">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                  <p className="text-neutral-400 leading-relaxed group-hover:text-white transition-colors duration-300">{service.description}</p>
                </div>
              </div>
            </FadeIn>
          )
        })}
      </div>
    </section>
  )
}
