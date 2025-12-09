"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Quote, ChevronRight, ChevronLeft, Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "أحمد محمد",
    role: "مريض زراعة",
    content: "تجربة ممتازة جداً. الدكتور محمود وفريق العمل كانوا في قمة الاحترافية. النتيجة فاقت توقعاتي بكثير.",
    rating: 5
  },
  {
    id: 2,
    name: "سارة علي",
    role: "تجميل أسنان",
    content: "العيادة نظيفة جداً والتعامل راقي. عملت فينير والنتيجة طبيعية ورائعة. شكراً لكم.",
    rating: 5
  },
  {
    id: 3,
    name: "خالد حسن",
    role: "علاج عصب",
    content: "كنت خايف جداً من الألم لكن الحمد لله ما حسيت بأي وجع. التقنيات عندهم حديثة جداً.",
    rating: 5
  }
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      next()
    }, 5000)
    return () => clearInterval(timer)
  }, [current])

  const next = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  }

  return (
    <section className="py-20 bg-neutral-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/50 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">آراء عملائنا</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="relative max-w-4xl mx-auto h-[300px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute w-full px-4 md:px-12 text-center"
            >
              <Quote className="h-12 w-12 text-primary/30 mx-auto mb-6" />
              <p className="text-xl md:text-2xl text-white leading-relaxed mb-8 font-light">
                "{testimonials[current].content}"
              </p>
              
              <div className="flex flex-col items-center gap-2">
                <div className="flex gap-1 text-primary">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <h4 className="text-lg font-bold text-white">{testimonials[current].name}</h4>
                <p className="text-sm text-primary">{testimonials[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <button 
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-neutral-800 text-white hover:bg-primary transition-colors z-20"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button 
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-neutral-800 text-white hover:bg-primary transition-colors z-20"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > current ? 1 : -1)
                setCurrent(idx)
              }}
              className={`h-2 transition-all duration-300 rounded-full ${
                idx === current ? "w-8 bg-primary" : "w-2 bg-neutral-700"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
