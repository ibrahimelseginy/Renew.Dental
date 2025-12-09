"use client"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Phone, Mail, MapPin, Smile, Star, ShieldCheck, Clock } from "lucide-react"
import { motion } from "framer-motion"
import FadeIn from "@/components/FadeIn"
import Stats from "@/components/Stats"
import Testimonials from "@/components/Testimonials"
import Blog from "@/components/Blog"

export default function HomePage() {
  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-neutral-950 text-white min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black opacity-80"></div>
        <div className="container relative mx-auto px-4 py-12 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <FadeIn className="flex-1 space-y-6 text-center lg:text-right" direction="right">
              <h1 className="text-4xl font-bold leading-tight md:text-6xl lg:leading-tight">
                Renew Dental Center
                <span className="block text-2xl md:text-4xl font-medium text-primary mt-4 tracking-wide font-serif">
                  Trust the experts
                </span>
              </h1>
              <p className="text-lg text-white md:text-xl max-w-2xl mx-auto lg:mx-0">
                استرجع ابتسامتك وكأنك لم تفقدها أبداً. نستخدم أحدث التقنيات لنمنحك ابتسامة مشرقة وصحية.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                <Link 
                  href="/search" 
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
                <p className="flex items-center justify-center lg:justify-start gap-2 text-lg font-semibold">
                  <Phone className="h-5 w-5 text-primary" />
                  <span dir="ltr">01068806864</span>
                </p>
              </div>
              
              {/* Social Icons */}
              <div className="flex justify-center lg:justify-start gap-4 pt-6">
                {[Facebook, Instagram, Phone].map((Icon, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 hover:bg-primary transition-colors cursor-pointer text-white hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                ))}
              </div>
            </FadeIn>
            
            {/* Doctor Image Placeholder */}
            <FadeIn className="flex-1 relative" direction="left" delay={0.2}>
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative mx-auto h-[400px] w-[300px] md:h-[500px] md:w-[400px] overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-800 to-neutral-900 shadow-2xl border border-neutral-800 flex items-center justify-center group"
              >
                {/* Logo Placeholder - Styled Text */}
                <div className="flex flex-col items-center justify-center p-8 text-center transition-transform duration-500 group-hover:scale-105">
                   <div className="relative">
                      <div className="absolute -inset-4 bg-primary/20 blur-xl rounded-full opacity-50 animate-pulse"></div>
                      <Image 
                        src="/logo.JPG" 
                        alt="Renew Dental Center Logo" 
                        width={280} 
                        height={100} 
                        className="relative h-auto w-72 object-contain drop-shadow-2xl mix-blend-screen"
                      />
                   </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-center">
                  <p className="text-xl font-bold text-white">Renew Dental Center</p>
                  <p className="text-sm text-primary">Trust the experts</p>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <Stats />

      {/* Services Section */}
      <section id="services" className="container mx-auto px-4 py-24">
        <FadeIn className="text-center mb-12" direction="down">
          <h2 className="text-3xl font-bold text-white md:text-4xl">خدماتنا</h2>
          <div className="mt-2 h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </FadeIn>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "زراعة الأسنان", desc: "تعويض الأسنان المفقودة بأحدث تقنيات الغرس", icon: Star },
            { title: "تجميل الأسنان", desc: "ابتسامة هوليود، فينير، وتبييض الأسنان", icon: Smile },
            { title: "التركيبات الثابتة", desc: "تيجان وجسور من الزيركون والبورسلين", icon: ShieldCheck },
            { title: "علاج العصب", desc: "علاج جذور الأسنان بأحدث الأجهزة الدقيقة", icon: Clock },
            { title: "تقويم الأسنان", desc: "تقويم معدني وشفاف لتصحيح وضع الأسنان", icon: Star },
            { title: "طب أسنان الأطفال", desc: "عناية خاصة ومريحة لأسنان طفلك", icon: Smile },
          ].map((service, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 p-8 shadow-sm hover:shadow-md hover:border-primary/30 transition-all hover:-translate-y-1">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{service.title}</h3>
                <p className="text-white group-hover:text-white transition-colors">{service.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-neutral-900 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-3xl pointer-events-none"></div>
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <FadeIn className="flex-1" direction="right">
              <div className="relative h-[400px] w-full overflow-hidden rounded-2xl bg-neutral-800 shadow-lg border border-neutral-700 group">
                 <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 transition-transform duration-700 group-hover:scale-105">
                    <Image 
                      src="/logo.JPG" 
                      alt="Renew Dental Center" 
                      width={300} 
                      height={120} 
                      className="h-auto w-64 object-contain mix-blend-screen opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    />
                 </div>
              </div>
            </FadeIn>
            <FadeIn className="flex-1 space-y-6 text-center lg:text-right" direction="left">
              <h2 className="text-3xl font-bold text-white">عن المركز</h2>
              <h3 className="text-xl text-primary font-semibold">Renew Dental Center</h3>
              <div className="space-y-4 text-white leading-relaxed">
                <p>
                  مركز متخصص في طب وجراحة الفم وتجميل الأسنان.
                  نمتلك خبرة طويلة ورعاية مميزة لكل حالة. احجز استشارتك الآن وتعرف على الحل الأنسب لك.
                </p>
                <ul className="space-y-2 list-none inline-block text-right">
                  {[
                    "أحدث التقنيات في زراعة الأسنان",
                    "تعقيم عالي المستوى لضمان سلامتكم",
                    "ضمان على جميع التركيبات والزراعات"
                  ].map((item, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (idx * 0.1) }}
                      className="flex items-center gap-2"
                    >
                      <ShieldCheck className="h-5 w-5 text-primary" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="pt-4">
                 <Link 
                  href="/search" 
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white shadow hover:bg-primary/90 transition-all hover:scale-105"
                >
                  تواصل معنا
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Cases / Gallery Section */}
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

      {/* Testimonials Section */}
      <Testimonials />

      {/* Blog Section */}
      <Blog />
      
      {/* Contact Banner */}
      <section className="bg-primary py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <FadeIn direction="up">
            <h2 className="text-3xl font-bold mb-4">اسأل عن عروض زراعة الأسنان</h2>
            <p className="mb-8 text-primary-100 max-w-2xl mx-auto">
              عيادة مبتكرة، خبرة طويلة، ورعاية مميزة لكل حالة. احجز استشارتك الآن.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
               <Link 
                href="/search" 
                className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-lg font-bold text-primary shadow-xl hover:bg-slate-100 transition-all hover:scale-105"
              >
                احجز استشارة
              </Link>
              <div className="flex items-center gap-2 group cursor-pointer">
                 <div className="p-2 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                   <Phone className="h-6 w-6" />
                 </div>
                 <span className="text-2xl font-bold tracking-wider" dir="ltr">01068806864</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
