export type Specialty =
  | "زراعة الأسنان"
  | "تقويم الأسنان"
  | "تجميل الأسنان"
  | "جراحة الوجه والفكين"
  | "علاج الجذور"
  | "طب أسنان الأطفال"
  | "طبيب عام"

export type Doctor = {
  id: string
  name: string
  specialty: Specialty
  rating: number
  location: string
  priceRange: "منخفض" | "متوسط" | "مرتفع"
  imageUrl: string
  bio: string
  clinicImages: string[]
}

export type Slot = {
  id: string
  doctorId: string
  date: string
  time: string
  isAvailable: boolean
}

export type Service = {
  id: string
  title: string
  description: string
  icon: string
}

export const doctors: Doctor[] = [
  {
    id: "d1",
    name: "د. محمود شوشة",
    specialty: "زراعة الأسنان",
    rating: 5.0,
    location: "القاهرة الجديدة",
    priceRange: "متوسط",
    imageUrl:
      "https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=512&auto=format&fit=crop",
    bio: "أخصائي طب وجراحة الفم وتجميل الأسنان، ماجستير التركيبات وزراعة الأسنان.",
    clinicImages: [
      "https://images.unsplash.com/photo-1581093588401-22b752190b6a?q=80&w=1024&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588771930281-251c71a95e53?q=80&w=1024&auto=format&fit=crop",
    ],
  },
  {
    id: "d2",
    name: "د. سارة أحمد",
    specialty: "تقويم الأسنان",
    rating: 4.8,
    location: "مدينة نصر",
    priceRange: "متوسط",
    imageUrl:
      "https://images.unsplash.com/photo-1554728997-1995f94f9f2a?q=80&w=512&auto=format&fit=crop",
    bio: "متخصصة في تقويم الأسنان الشفاف والمعدني للأطفال والكبار.",
    clinicImages: [
      "https://images.unsplash.com/photo-1574921304357-2d2360c87029?q=80&w=1024&auto=format&fit=crop",
    ],
  },
  {
    id: "d3",
    name: "د. يوسف جمال",
    specialty: "علاج الجذور",
    rating: 4.9,
    location: "المعادي",
    priceRange: "مرتفع",
    imageUrl:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc0?q=80&w=512&auto=format&fit=crop",
    bio: "خبرة في علاج جذور الأسنان المعقدة باستخدام الميكروسكوب.",
    clinicImages: [
      "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1024&auto=format&fit=crop",
    ],
  },
]

export const specialties: Specialty[] = [
  "زراعة الأسنان",
  "تقويم الأسنان",
  "تجميل الأسنان",
  "جراحة الوجه والفكين",
  "علاج الجذور",
  "طب أسنان الأطفال",
  "طبيب عام",
]

export function getAvailableSlots(doctorId: string, dateStr: string): Slot[] {
  const times = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"]
  
  // Seed random generator with date and doctor ID to be consistent but vary by day/doctor
  const seed = dateStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + 
               doctorId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  
  return times.map((time, i) => ({
    id: `${doctorId}-${dateStr}-${time}`,
    doctorId,
    date: dateStr,
    time,
    isAvailable: (seed + i) % 3 !== 0 // 2/3 slots available randomly
  }))
}

