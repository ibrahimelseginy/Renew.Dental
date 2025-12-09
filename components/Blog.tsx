"use client"

import { ArrowRight, Calendar, User } from "lucide-react"
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
                      <button className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors">
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
      </div>
    </section>
  )
}
