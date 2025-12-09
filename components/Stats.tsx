"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const stats = [
  { label: "سنة خبرة", value: 15, suffix: "+" },
  { label: "مريض سعيد", value: 5000, suffix: "+" },
  { label: "عملية ناجحة", value: 1200, suffix: "+" },
  { label: "طبيب متخصص", value: 12, suffix: "" },
]

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(nodeRef, { once: true, margin: "-100px" })
  
  useEffect(() => {
    if (!inView) return

    const element = nodeRef.current
    if (!element) return

    let startTime: number
    let animationFrame: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      
      const current = Math.floor(progress * (to - from) + from)
      element.textContent = current.toLocaleString()

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      }
    }

    animationFrame = requestAnimationFrame(step)

    return () => cancelAnimationFrame(animationFrame)
  }, [inView, from, to, duration])

  return <span ref={nodeRef}>{from}</span>
}

export default function Stats() {
  return (
    <div className="bg-neutral-900 border-y border-neutral-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 font-serif flex justify-center items-center">
                <Counter from={0} to={stat.value} />
                <span>{stat.suffix}</span>
              </div>
              <p className="text-white font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
