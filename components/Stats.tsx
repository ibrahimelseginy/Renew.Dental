"use client"

import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { useRef, useEffect } from "react"
import { Users, Award, Stethoscope, Briefcase } from "lucide-react"

const stats = [
  { label: "سنة خبرة", value: 15, suffix: "+", icon: Briefcase },
  { label: "مريض سعيد", value: 5000, suffix: "+", icon: Users },
  { label: "عملية ناجحة", value: 1200, suffix: "+", icon: Award },
  { label: "طبيب متخصص", value: 12, suffix: "", icon: Stethoscope },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  })

  useEffect(() => {
    if (inView) {
      motionValue.set(value)
    }
  }, [inView, value, motionValue])

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(latest.toFixed(0))
      }
    })
  }, [springValue])

  return (
    <span className="flex items-center justify-center">
      <span ref={ref}>0</span>
      <span>{suffix}</span>
    </span>
  )
}

export default function Stats() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all duration-500 hover:bg-white/[0.07] text-center relative overflow-hidden"
            >
              {/* Icon Overlay */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
              
              <div className="mb-6 inline-flex p-3 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-500">
                <stat.icon className="w-8 h-8" />
              </div>
              
              <div className="text-4xl md:text-5xl font-bold mb-3 font-serif tracking-tight text-white group-hover:text-primary transition-colors">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              
              <p className="text-neutral-500 font-medium text-lg group-hover:text-neutral-300 transition-colors">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
