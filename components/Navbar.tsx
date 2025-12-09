"use client"
import Link from "next/link"
import Image from "next/image"
import { Smile } from "lucide-react"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        {/* Logo/Name - Right Side (RTL) */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
          <Image 
            src="/logo.JPG" 
            alt="Renew Dental Center" 
            width={180} 
            height={60} 
            className="h-14 w-auto object-contain mix-blend-screen"
            priority
          />
        </Link>

        {/* Navigation - Center/Left */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-white hover:text-primary font-medium transition-colors">
            الرئيسية
          </Link>
          <Link href="#services" className="text-white hover:text-primary font-medium transition-colors">
            الخدمات
          </Link>
          <Link href="#about" className="text-white hover:text-primary font-medium transition-colors">
            عن المركز
          </Link>
          <Link href="#cases" className="text-white hover:text-primary font-medium transition-colors">
            الحالات
          </Link>
        </nav>

        {/* CTA Button - Far Left */}
        <div className="flex items-center gap-4">
          <Link 
            href="/search" 
            className="hidden md:inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            احجز الآن
          </Link>
        </div>
      </div>
    </header>
  )
}

