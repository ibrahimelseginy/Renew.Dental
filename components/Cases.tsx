"use client"

import FadeIn from "@/components/FadeIn"

export default function Cases() {
  return (
    <section id="cases" className="container mx-auto px-4 py-24">
      <FadeIn className="text-center mb-12" direction="up">
        <h2 className="text-3xl font-bold text-white">حالات مركزنا</h2>
        <p className="mt-2 text-white">صور قبل وبعد العلاج لبعض حالاتنا المميزة</p>
      </FadeIn>
      
      <div className="grid gap-6 sm:grid-cols-2">
        {[1, 2, 3, 4].map((item, idx) => (
            <FadeIn key={item} delay={idx * 0.1} className="overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 aspect-video relative group cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-700">
                  <span className="font-medium">قبل / بعد {item}</span>
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white font-semibold">
                  <span className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">عرض التفاصيل</span>
              </div>
            </FadeIn>
        ))}
      </div>
      
      <FadeIn className="text-center mt-12" direction="up" delay={0.4}>
          <button className="rounded-full bg-neutral-800 border border-neutral-700 px-8 py-3 text-white font-medium hover:bg-primary hover:text-white hover:border-primary transition-colors hover:shadow-lg hover:shadow-primary/20">
            المزيد من الحالات
          </button>
      </FadeIn>
    </section>
  )
}
