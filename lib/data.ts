import { cache } from "react"
import type { StaticImageData } from "next/image"

export interface Doctor {
  id: string
  name: string
  specialty: string
  rating: number
  location: string
  priceRange: "منخفض" | "متوسط" | "مرتفع"
  imageUrl: string | StaticImageData
  bio?: string
  clinicImages?: string[]
  experience?: number
  patients?: number
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export const specialties = [
  "تجميل وزراعة الأسنان",
  "تقويم الأسنان",
  "علاج الجذور",
  "طب أسنان الأطفال",
  "جراحة الوجه والفكين",
  "علاج اللثة",
]

export interface Slot {
  id: string
  time: string
  isAvailable: boolean
}

// Fallback data if DB fetch fails
export const DUMMY_DOCTORS: Doctor[] = [
  {
    id: "1",
    name: "د. محمود شوشة",
    specialty: "تجميل وزراعة الأسنان",
    rating: 5.0,
    location: "القاهرة الجديدة",
    priceRange: "متوسط",
    imageUrl: "/mahmoud.png",
    bio: "أخصائي طب وجراحة الفم وتجميل الأسنان، ماجستير التركيبات وزراعة الأسنان.",
    clinicImages: [
      "https://images.unsplash.com/photo-1581093588401-22b752190b6a?q=80&w=1024&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563223771-5fe4038fbcce?q=80&w=1024&auto=format&fit=crop",
    ],
    experience: 15,
    patients: 2500,
  },
  {
    id: "2",
    name: "د. سارة أحمد",
    specialty: "تقويم الأسنان",
    rating: 4.8,
    location: "مدينة نصر",
    priceRange: "متوسط",
    imageUrl: "/sara.png",
    bio: "متخصصة في تقويم الأسنان الشفاف والمعدني للأطفال والكبار.",
    clinicImages: [
      "https://images.unsplash.com/photo-1574921304357-2d2360c87029?q=80&w=1024&auto=format&fit=crop",
    ],
    experience: 8,
    patients: 1200,
  },
  {
    id: "3",
    name: "د. يوسف جمال",
    specialty: "علاج الجذور",
    rating: 4.9,
    location: "المعادي",
    priceRange: "مرتفع",
    imageUrl: "/youssef.png",
    bio: "خبرة في علاج جذور الأسنان المعقدة باستخدام الميكروسكوب.",
    clinicImages: [
      "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1024&auto=format&fit=crop",
    ],
    experience: 12,
    patients: 1800,
  },
]

export const doctors = DUMMY_DOCTORS;

export const SERVICES: Service[] = [
  {
    id: "s1",
    title: "تجميل الأسنان",
    description: "ابتسامة هوليود، الفينير، وتبييض الأسنان بالليزر للحصول على ابتسامة ساحرة.",
    icon: "Star",
  },
  {
    id: "s2",
    title: "زراعة الأسنان",
    description: "تعويض الأسنان المفقودة بأحدث التقنيات وبدون ألم لتعود لك ثقتك.",
    icon: "ShieldCheck",
  },
  {
    id: "s3",
    title: "تقويم الأسنان",
    description: "خيارات متعددة للتقويم تشمل التقويم الشفاف والمعدني لتصحيح إطباق الأسنان.",
    icon: "Smile",
  },
  {
    id: "s4",
    title: "علاج الجذور",
    description: "علاج العصب بجلسة واحدة باستخدام الميكروسكوب لتجربة مريحة وسريعة.",
    icon: "Activity",
  },
  {
    id: "s5",
    title: "طب أسنان الأطفال",
    description: "عناية خاصة بأسنان الأطفال في بيئة مرحة لتشجيعهم وتخليصهم من الخوف.",
    icon: "Heart",
  },
  {
    id: "s6",
    title: "حشوات تجميلية",
    description: "حشوات باللون الطبيعي للأسنان لإصلاح التسوس مع الحفاظ على الشكل الجمالي.",
    icon: "Zap",
  },
]

const ALL_SLOTS = [
  { id: "sl1", time: "01:00 م" },
  { id: "sl2", time: "02:00 م" },
  { id: "sl3", time: "03:00 م" },
  { id: "sl4", time: "04:30 م" },
  { id: "sl5", time: "06:00 م" },
  { id: "sl6", time: "07:30 م" },
  { id: "sl7", time: "08:30 م" },
  { id: "sl8", time: "09:30 م" },
]

export function getAvailableSlots(doctorId: string, date: string): Slot[] {
  // In a real app, this would query a database based on doctor and date.
  // We use the date and doctorId to generate a somewhat consistent pseudo-random availability
  const seed = `${doctorId}-${date}`.length
  
  return ALL_SLOTS.map((slot, index) => {
    // Generate pseudo-random availability
    const isAvailable = index % (seed % 3 + 1) !== 0 || index === 0
    return {
      ...slot,
      isAvailable
    }
  })
}
