"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { ArrowRight, Calendar, User, X, Sparkles, Quote } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import FadeIn from "@/components/FadeIn"

const posts = [
  {
    id: 1,
    title: "أسنانك تستحق فريق كامل لا طبيب واحد في Renew",
    category: "عن المركز",
    content: "نؤمن أن الإحتراف يكمن في التخصص مش محتاج للتنقل بين العيادات لأننا جمعنا لك نخبة من الاستشاريين في مكان واحد. دكتور استشاري لكل تخصص دكتور متخصص لزراعة الأسنان. دكتور متخصص لتقويم الأسنان وتجميلها دقة التشخيص ورفاهية المكان واحترافية النتائج.. كلها تجتمع هنا.",
    date: "9 ديسمبر 2025",
    author: "د. أحمد"
  },
  {
    id: 2,
    title: "استرجع ابتسامتك.. وكأنك لم تفقدها أبداً",
    category: "زراعة الأسنان",
    content: "زراعة الأسنان في Renew مش مجرد تعويض لسن مفقود بل هي استعادة لجودة حياتك لطريقة أكلك ولثقتك في الكلام نستخدم أحدث غرسات التيتانيوم العالمية التي تلتئم بسرعة وتدوم طويلا بأيدي جراح متخصص لضمان أعلى نسب نجاح وأقل نسبة ألم. Renew.. لأنك تستحق ابتسامة كاملة",
    date: "8 ديسمبر 2025",
    author: "د. محمود"
  },
  {
    id: 3,
    title: "التقويم مش بس شكل.. التقويم استثمار في مستقبلك",
    category: "تقويم الأسنان",
    content: "هل تخفي ابتسامتك في الصور؟ مع قسم التقويم في Renew نصمم لك الابتسامة التي تليق بملامحك. اي كان اختيارك بتفضل التقويم الشفاف (Invisalign) غير المرئي أو التقويم التقليدي عندنا الحل الأنسب لأسلوب حياتك. خطة علاجية واضحة، متابعة دورية دقيقة، نتائج تدوم. ابدأ رحلة التغيير اليوم",
    date: "7 ديسمبر 2025",
    author: "د. سارة"
  }
]

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<typeof posts[0] | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="py-20 bg-neutral-900">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">أحدث المقالات</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
            <p className="mt-4 text-white max-w-2xl mx-auto">
              نشارككم أحدث المعلومات والنصائح الطبية لصحة أسنانكم
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <FadeIn key={post.id} delay={index * 0.1}>
              <article className="h-full bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors duration-300 flex flex-col">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-4 text-sm text-primary">
                    <span className="bg-primary/10 px-3 py-1 rounded-full">{post.category}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-white/80 mb-6 line-clamp-4 flex-1">
                    {post.content}
                  </p>
                  
                  <div className="border-t border-neutral-800 pt-4 mt-auto">
                    <div className="flex items-center justify-between text-sm text-white/60">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <button 
                        onClick={() => setSelectedPost(post)}
                        className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                      >
                        اقرأ المزيد
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        {mounted && createPortal(
          <AnimatePresence>
            {selectedPost && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedPost(null)}
                  className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-40%" }}
                  animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                  exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-40%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="fixed left-1/2 top-1/2 z-[101] w-full max-w-2xl p-4"
                >
                  <div className="relative overflow-hidden rounded-3xl bg-neutral-900 shadow-2xl ring-1 ring-white/10">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
                    
                    {/* Header Image/Pattern Area */}
                    <div className="relative h-32 bg-gradient-to-r from-neutral-800 to-neutral-900 border-b border-white/5 flex items-center justify-center overflow-hidden">
                       <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
                       <Quote className="h-16 w-16 text-white/5 absolute -bottom-4 -right-4 rotate-12" />
                       <div className="text-center z-10">
                          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium shadow-sm backdrop-blur-sm">
                            <Sparkles className="h-3.5 w-3.5" />
                            {selectedPost.category}
                          </span>
                       </div>
                       
                       <button
                        onClick={() => setSelectedPost(null)}
                        className="absolute left-4 top-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white/70 hover:text-white transition-all border border-white/5 backdrop-blur-sm group"
                      >
                        <X className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                      <div className="flex flex-col gap-6">
                        <div className="text-center space-y-4">
                           <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                            {selectedPost.title}
                          </h3>
                          <div className="flex items-center justify-center gap-4 text-sm text-white/50 border-y border-white/5 py-3">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-4 w-4 text-primary/80" />
                              <span>{selectedPost.date}</span>
                            </div>
                            <span className="w-1 h-1 rounded-full bg-white/20"></span>
                            <div className="flex items-center gap-1.5">
                              <User className="h-4 w-4 text-primary/80" />
                              <span>{selectedPost.author}</span>
                            </div>
                          </div>
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none text-right">
                          <p className="text-neutral-300 leading-relaxed whitespace-pre-line text-lg">
                            {selectedPost.content}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="p-4 bg-neutral-950/50 border-t border-white/5 flex justify-center">
                        <p className="text-xs text-white/30 font-serif tracking-widest uppercase">Renew Dental Center</p>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
      </div>
    </section>
  )
}
