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
              <div className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 p-8 shadow-sm hover:shadow-md hover:border-primary/30 transition-all hover:-translate-y-1">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{service.title}</h3>
                <p className="text-white group-hover:text-white transition-colors">{service.description}</p>
              </div>
            </FadeIn>
          )
        })}
      </div>
    </section>
  )
}
