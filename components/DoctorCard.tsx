"use client"
import Link from "next/link"
import Image from "next/image"
import { Star, MapPin, BadgeDollarSign } from "lucide-react"
import type { Doctor } from "../lib/data"

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  const fullStars = Math.floor(doctor.rating)
  const halfStar = doctor.rating - fullStars >= 0.5
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

  return (
    <Link href={`/doctor/${doctor.id}`} className="block group">
      <div className="card p-4 transition-all hover:shadow-lg group-hover:border-primary/50">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 mx-auto sm:mx-0">
            <Image src={doctor.imageUrl} alt={doctor.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
          <div className="flex-1 w-full text-center sm:text-right">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{doctor.name}</h3>
                <p className="text-sm font-medium text-primary">{doctor.specialty}</p>
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                <span className="text-sm font-bold text-slate-700 ml-1">{doctor.rating.toFixed(1)}</span>
                {Array.from({ length: fullStars }).map((_, i) => (
                  <Star key={`full-${i}`} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <div className="mt-3 flex flex-wrap justify-center sm:justify-start items-center gap-4 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4 text-secondary" /> {doctor.location}
              </span>
              <span className="inline-flex items-center gap-1">
                <BadgeDollarSign className="h-4 w-4 text-secondary" /> {doctor.priceRange}
              </span>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <div className="btn btn-primary flex-1 justify-center text-sm group-hover:bg-primary-600 transition-colors">
                احجز الآن
              </div>
              <div className="btn btn-secondary flex-1 justify-center text-sm group-hover:bg-neutral-700 transition-colors">
                عرض الملف
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

